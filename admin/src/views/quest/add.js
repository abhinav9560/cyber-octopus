import React, { useState, useEffect, useRef } from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Image,
  Table,
  Pagination,
  Badge,
} from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { post, get, put } from "../../utils/api";
import {
  DefaultEditor,
  DefaultInput,
  DefaultInputWithIcon,
  DefaultSelect,
  DefaultTextarea,
} from "../../components/Common/input";
import { Formik } from "formik";
import { DefaultDocument, ShowToast } from "../../components/Common/common";
import Country from "../../constants/country.json";
import moment from "moment";

export default function QuestAdd(props) {
  const history = useHistory();
  const [questData, setQuestData] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [expertData, setexpertData] = useState([]);
  const [threadData, setthreadData] = useState([]);
  const [imageArray, setimageArray] = useState([]);

  const { id } = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    getSingle();
    getAllExpert();
  }, []);

  const getAllExpert = () => {
    get(`/expert/getAll`).then((data) => handleExpert(data));
  };

  const handleExpert = (data) => {
    if (data.data) {
      let temp = data.data.map((ele, index) => {
        return { label: ele.fName + " " + ele.lName, value: ele._id };
      });
      setexpertData(temp);
    }
  };

  const getSingle = () => {
    if (id)
      get(`/quest/getSingle?_id=${id}`).then((data) => handleSingleData(data));
  };

  const handleSingleData = (data) => {
    if (!data.status) return ShowToast(data.message, data.status);
    setQuestData(data?.data);
    setimageUrl(data?.imageUrl);
    setthreadData(data?.threads);
    formRef.current.setFieldValue("title", data?.data?.title);
    formRef.current.setFieldValue("description", data?.data?.description);
    formRef.current.setFieldValue("displayId", data?.data?.displayId);
    formRef.current.setFieldValue(
      "isLiveSession",
      data?.data?.isLiveSession ? "YES" : "NO"
    );
    formRef.current.setFieldValue(
      "liveSession",
      data?.data?.isLiveSession
        ? moment(data?.data?.liveSession).format("MMMM-DD-yyyy h:mm a")
        : "-"
    );
    formRef.current.setFieldValue(
      "questType",
      data?.data?.questType == 1 ? "Priority" : "Standard"
    );
    formRef.current.setFieldValue("documents", data?.data?.documents);
    formRef.current.setFieldValue(
      "customerName",
      data?.data?.customerId.fName + " " + data?.data?.customerId.lName
    );
    formRef.current.setFieldValue(
      "customerEmail",
      data?.data?.customerId.email
    );
    formRef.current.setFieldValue(
      "expertId",
      data?.data?.expertId?._id ? data?.data?.expertId?._id : null
    );
    formRef.current.setFieldValue(
      "expertEmail",
      data?.data?.expertId?.email ? data?.data?.expertId.email : "-"
    );
  };

  const assign = () => {
    if (formRef.current.values.expertId) {
      let formData = {
        questId: questData?._id,
        expertId: formRef.current.values.expertId,
      };
      post("/quest/assignExpert", formData).then((data) =>
        handleAssignResponse(data)
      );
    } else {
      alert("Please select Expert");
    }
  };

  const handleAssignResponse = (data) => {
    ShowToast(data.message, data.status);
    getSingle();
  };

  const submit = (values) => {
    console.log(values)
    if (!values?.answer.trim()) {
      return alert("please enter answer");
    }
    let formData = new FormData();
    formData.append("answer", values.answer);
    formData.append("questId", String(questData._id));

    Array.from(imageArray).map((file) => formData.append("image", file));
    post("/quest/answer", formData, 1).then((data) => handleAnswer(data));
  };

  const handleAnswer = (data) => {
    ShowToast(data.message, data.status);
    formRef.current.setFieldValue("answer", "");
    getSingle();
    setimageArray([]);
  };

  const startMeeting = () => {
    if (confirm('Are You Sure')) {
      console.log('start meeting')
    } else {
      return false
    }
  }

  return (
    <>
      <Container className="container" fluid>
        <Row>
          <Col md="12">
            <Formik
              initialValues={{
                title: "",
                title_en: "",
                title_gr: "",
                description_en: "",
                description_gr: "",
                expertId: "",
                answer: "",
              }}
              // validate={validatequest}
              onSubmit={(values, { setSubmitting }) => {
                submit(values);
                setSubmitting(false);
              }}
              innerRef={formRef}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h4">{`Quest ${id ? "Edit" : "Add"
                        }`}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md="2"></Col>
                        <Col md="8">
                          <Row>
                            <Col lg="6">
                              <Card>
                                <Card.Header>
                                  <h4 className="cardHeading">
                                    Customer Detail
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <h5>
                                    Customer Name :{" "}
                                    <strong>{props.values.customerName}</strong>
                                  </h5>
                                  <h5>
                                    Customer Email :{" "}
                                    <strong>
                                      {props.values.customerEmail}
                                    </strong>
                                  </h5>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col lg="6">
                              <Card>
                                <Card.Header>
                                  <h4 className="cardHeading">
                                    Quest Detail
                                    <span style={{ marginLeft: "10px" }}>
                                      {questData?.isComplete ? (
                                        <span class="badge badge-success">
                                          Answered
                                        </span>
                                      ) : (
                                        <span class="badge badge-warning">
                                          Un-Answered
                                        </span>
                                      )}
                                    </span>
                                  </h4>
                                </Card.Header>
                                <Card.Body>
                                  <h5>
                                    Id :{" "}
                                    <strong>{props.values.displayId}</strong>
                                  </h5>
                                  <h5>
                                    Quest Detail :{" "}
                                    <strong>{props.values.questType}</strong>
                                  </h5>
                                  <h5>
                                    Live Session :{" "}
                                    <strong>
                                      {props?.values?.isLiveSession}{" "}
                                      {props?.values?.isLiveSession
                                        ? props?.values?.liveSession
                                        : ""}
                                    </strong>
                                  </h5>

                                  {props?.values?.isLiveSession && <button type="button" className="btn btn-primary" onClick={startMeeting} >Start Meeting</button>}

                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <Card>
                                <Card.Header>
                                  <h4 className="cardHeading">Quest</h4>
                                </Card.Header>
                                <Card.Body>
                                  <h5>
                                    Title :{" "}<br />
                                    <strong>{props?.values?.title}</strong>
                                  </h5>
                                  <h5>
                                    Description :{" "}

                                    <div dangerouslySetInnerHTML={{ __html: props?.values?.description }} />
                                  </h5>

                                  <h4>Document List</h4>

                                  <Row>
                                    {questData &&
                                      questData.documents.map((ele, index) => {
                                        return (
                                          <>
                                            <div>
                                              <Image
                                                src={`${imageUrl}${ele}`}
                                                style={{
                                                  maxHeight: "80px",
                                                  maxWidth: "80px",
                                                  alignItems: "center",
                                                  margin: "10px",
                                                }}
                                              />
                                            </div>
                                          </>
                                        );
                                      })}
                                  </Row>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>

                          <Row>
                            <Col md="6">
                              <DefaultSelect
                                data={expertData}
                                placeholder={"Select Expert"}
                                name={"Expert Name"}
                                value={props.values.expertId}
                                onChange={props.handleChange("expertId")}
                                id={"expertId"}
                                onBlur={() =>
                                  props.setFieldTouched("expertId", true)
                                }
                                error={
                                  props.touched.expertId &&
                                  props.errors.expertId
                                }
                              />
                            </Col>
                            <Col md="6">
                              <DefaultInput
                                type={"text"}
                                placeholder={"Expert Email"}
                                name={"Expert Email"}
                                value={props.values.expertEmail}
                                onChange={props.handleChange("expertEmail")}
                                onBlur={() =>
                                  props.setFieldTouched("expertEmail", true)
                                }
                                error={
                                  props.touched.expertEmail &&
                                  props.errors.expertEmail
                                }
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="3"></Col>
                            <Col md="2">
                              {!questData?.isComplete && <button
                                type="button"
                                className={"btn btn-primary"}
                                onClick={assign}
                              >
                                {questData?.expertId?._id
                                  ? "Change Expert"
                                  : "Assign Expert"}
                              </button>}

                            </Col>

                            <Col md="3"></Col>
                          </Row>

                          <Row>
                            <Col>
                              <Card>
                                <Card.Header>
                                  <h4 className="cardHeading">Threads</h4>
                                </Card.Header>
                                <Card.Body>
                                  {threadData.map((ele, index) => {
                                    return (
                                      <>
                                        <div>
                                          <h5>
                                            By :{" "}
                                            <strong>
                                              {ele?.threadBy?.fName}{" "}
                                              {ele?.threadBy?.lName}
                                            </strong>
                                          </h5>
                                          <div dangerouslySetInnerHTML={{ __html: ele?.content }} />

                                          <Row>
                                            {ele &&
                                              ele.documents.map(
                                                (element, index) => {
                                                  return (
                                                    <>
                                                      <div>
                                                        <DefaultDocument
                                                          url={`${imageUrl}${element}`}
                                                        />
                                                      </div>
                                                    </>
                                                  );
                                                }
                                              )}
                                          </Row>
                                          <hr></hr>
                                        </div>
                                      </>
                                    );
                                  })}
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>

                          {!questData?.isComplete && questData?.expertId && (
                            <>
                              <Row>
                                <Col>
                                  <DefaultEditor
                                    placeholder={"Answer"}
                                    name={"answer"}
                                    value={props.values.answer}
                                    onChange={props.handleChange("answer")}
                                    onBlur={() =>
                                      props.setFieldTouched("answer", true)
                                    }
                                    error={
                                      props.touched.answer &&
                                      props.errors.answer
                                    }
                                  />

                                  <DefaultInput
                                    placeholder={"Documents"}
                                    label={"Documents"}
                                    name={"documents"}
                                    type={"file"}
                                    accept="image/*,application/pdf,application/doc,application/docx"
                                    multiple={true}
                                    // value={imageUrl}
                                    // @ts-ignore
                                    onChange={(e) =>
                                      setimageArray(e.target.files)
                                    }
                                    onBlur={() =>
                                      props.setFieldTouched("documents", true)
                                    }
                                    error={
                                      props.touched.documents &&
                                      props.errors.documents
                                    }
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col md="3"></Col>
                                <Col md="2">
                                  <button
                                    type="submit"
                                    className={"btn btn-success"}
                                  >
                                    {"Submit"}
                                  </button>
                                </Col>
                                <Col md="2">
                                  <button
                                    type="button"
                                    className={"btn btn-warning"}
                                    onClick={() => history.goBack()}
                                  >
                                    {"Go Back"}
                                  </button>
                                </Col>

                                <Col md="3"></Col>
                              </Row>
                            </>
                          )}
                        </Col>
                        <Col md="2"></Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
}
