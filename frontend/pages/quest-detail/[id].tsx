import { Formik } from "formik";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DefaultDocument, ShowToast } from "../../common/component/common";
import {
  DefaultInput,
  DefaultTextarea,
} from "../../common/component/defaultinput";
// import DefaultEditor from "../../common/component/editor";
import { get, post } from "../../common/utils/api";
import { Endpoint } from "../../common/utils/endpoints";
import { ApiResponse } from "../../common/utils/interface";

const DefaultEditor = dynamic(() => import('../common/defaulteditor'), {
  ssr: false
})

const QuestDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const formRef = useRef();

  const [questDetail, setQuestDetail] = useState<any>();
  const [threadList, setthreadList] = useState<any>([]);
  const [imageUrl, setimageUrl] = useState("");
  const [imageArray, setimageArray] = useState([]);

  useEffect(() => {
    getSingleData();
  }, [router]);

  const getSingleData = () => {
    if (id)
      get(`${Endpoint.getSingleQuest}?id=${id}`).then((data) =>
        handleResponse(data)
      );
  };

  const handleResponse = (data: ApiResponse) => {
    if (data.status) {
      setQuestDetail(data?.data);
      // @ts-ignore
      setimageUrl(data?.imageUrl);
      // @ts-ignore
      setthreadList(data?.threads);
    } else {
      ShowToast(data.message, data.status);
    }
  };

  const submit = (values: any) => {
    console.log(imageArray);
    let formData = new FormData();
    formData.append("answer", values.answer);
    formData.append("questId", String(id));

    Array.from(imageArray).map((file) => formData.append("image", file));

    post(Endpoint.answer, formData, 1).then((data) => handleAnswer(data));
  };

  const handleAnswer = (data: ApiResponse) => {
    //@ts-ignore
    formRef.current.setFieldValue("answer", "");
    setimageArray([]);
    ShowToast(data.message, data.status);
    if (data.status) {
      getSingleData();
    }
  };

  const markAsComplete = () => {
    if (confirm("Are You Sure")) {
      let formData = {
        questId: id,
      };
      post(Endpoint.markAsComplete, formData).then((data) =>
        handleCompletion(data)
      );
    } else {
    }
  };

  const handleCompletion = (data: ApiResponse) => {
    ShowToast(data.message, data.status);
    if (data.status) {
      getSingleData();
    }
  };

  const joinMeeting = () => {
    if (confirm('Are You Sure')) {
      console.log('start meeting')
    } else {
      return false
    }
  }

  return (
    <>
      <div className="wrapper-inner-dashboard">
        <section className="quest-detail-sec">
          <div className="container">
            <div className="quest-detail-block">
              <div className="quest-detail-head">
                <div className="quest-detail-head-left">
                  <h4>Quest</h4>
                </div>

                <div className="quest-detail-right-head-act">
                  <button type="button" className="btn common-btn grey">
                    {questDetail?.questType == 1 ? "Priority" : "Standard"}
                  </button>
                  {questDetail?.isComplete ? (
                    <>
                      <button type="button" className="btn common-btn">
                        Quest Completed
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={markAsComplete}
                      className="btn common-btn"
                    >
                      Mark As Complete
                    </button>
                  )}
                </div>
              </div>

              {questDetail?.isLiveSession && <>
                <div style={{ margin: '10px 1px 10px 1px;' }}>
                  <div className="row">
                    <div className="col-lg-4"> </div>
                    <div className="col-lg-4" style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                      <button type="button" className="btn common-btn" onClick={joinMeeting}>
                        Join Meeting
                      </button>
                    </div>
                    <div className="col-lg-4"></div>
                  </div>
                </div>
              </>}

              <div className="quest-detail-main-block mb-4">
                <div className="quest-detail-left-block quest-info-dtl">
                  <article>
                    <figure>
                      <img
                        src={`${imageUrl}${questDetail?.customerId?.image}`}
                      />
                    </figure>
                    <figcaption>
                      <h4>
                        {questDetail?.customerId?.fName}{" "}
                        {questDetail?.customerId?.lName}
                      </h4>
                      {/* <p>Cyber Security Expert</p> */}
                    </figcaption>
                  </article>
                  {/* <ul>
                    <li>Experience : 13 year</li>
                    <li>Solved Quest : 40</li>
                  </ul> */}
                </div>
                <div className="quest-detail-right-block">
                  <div className="quest-detail-right-head">
                    <h4>Quest</h4>
                    {/* <div className="quest-detail-right-head-act">
                      <button type="button" className="btn common-btn grey">
                        Mark As Completed
                      </button>
                      <button type="button" className="btn common-btn">
                        Reply
                      </button>
                    </div> */}
                  </div>
                  <div className="quest-detail-right-content">
                    <h5>{questDetail?.title}</h5>

                    {/* <p>{questDetail?.description}</p> */}

                    <div dangerouslySetInnerHTML={{ __html: questDetail?.description }} />

                    <h4>Attachments files</h4>
                    <ul>
                      {questDetail?.documents.map((ele: any, index: number) => {
                        return (
                          <>
                            <DefaultDocument src={`${imageUrl}/${ele}`} type={'detail'} />
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {threadList.map((ele: any, index: number) => {
                return (
                  <>
                    <div
                      className="quest-detail-main-block"
                      style={{ marginTop: "15px" }}
                    >
                      <div className="quest-detail-left-block quest-info-dtl">
                        <article>
                          <figure>
                            <img src={`${imageUrl}${ele.threadBy.image}`} />
                          </figure>
                          <figcaption>
                            <h4>
                              {ele?.threadBy?.fName} {ele?.threadBy?.lName}
                            </h4>
                            <p>Cyber Security Expert</p>
                          </figcaption>
                        </article>
                        <ul>
                          <li>Experience : 13 year</li>
                          <li>Solved Quest : 40</li>
                        </ul>
                      </div>
                      <div className="quest-detail-right-block">
                        <div className="quest-detail-right-head">
                          {/* <h4>Latest Answer</h4> */}
                          {/* <div className="quest-detail-right-head-act">
                            <button
                              type="button"
                              className="btn common-btn grey"
                            >
                              Mark As Completed
                            </button>
                            <button type="button" className="btn common-btn">
                              Reply
                            </button>
                          </div> */}
                        </div>
                        <div className="quest-detail-right-content">

                          <div dangerouslySetInnerHTML={{ __html: ele?.content }} />

                          {ele?.documents?.length ? (
                            <h4>Attachments files</h4>
                          ) : (
                            ""
                          )}
                          <ul>
                            {ele?.documents.map((ele: any, index: number) => {
                              return (
                                <>
                                  <DefaultDocument src={`${imageUrl}/${ele}`} type={'detail'} />
                                </>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

              <div style={{ marginTop: "25px" }}>
                {!questDetail?.isComplete && (
                  <Formik
                    initialValues={{
                      answer: "",
                      documents: [],
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      if (values && !values.answer.trim()) {
                        return alert("Please enter data");
                      }
                      submit(values);
                      setSubmitting(false);
                    }}
                    // @ts-ignore
                    innerRef={formRef}
                  >
                    {(props) => (
                      <form onSubmit={props.handleSubmit}>
                        {/* <DefaultTextarea
                          placeholder={"Answer"}
                          name={"answer"}
                          type={"answer"}
                          value={props.values.answer}
                          onChange={props.handleChange("answer")}
                          onBlur={() => props.setFieldTouched("answer", true)}
                          error={props.touched.answer && props.errors.answer}
                        /> */}

                        <DefaultEditor
                          placeholder={"Answer"}
                          name={"answer"}
                          type={"answer"}
                          value={props.values.answer}
                          onChange={props.handleChange("answer")}
                          onBlur={() => props.setFieldTouched("answer", true)}
                          error={props.touched.answer && props.errors.answer}
                        />

                        <DefaultInput
                          placeholder={"Documents"}
                          label={"Documents"}
                          name={"documents"}
                          type={"file"}
                          multiple={true}
                          accept="image/*,application/pdf,application/doc,application/docx"
                          // value={imageUrl}
                          // @ts-ignore
                          onChange={(e: any) => setimageArray(e.target.files)}
                          onBlur={() =>
                            props.setFieldTouched("documents", true)
                          }
                          error={
                            props.touched.documents && props.errors.documents
                          }
                        />

                        <Row>
                          <Col md={"3"}></Col>
                          <Col md={"4"}>
                            <div
                              className="form-btn-group"
                              style={{ marginTop: "15px" }}
                            >
                              <button className="btn common-btn" type="submit">
                                {"Submit"}
                              </button>
                            </div>
                          </Col>
                          <Col md={"3"}></Col>
                        </Row>
                      </form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </div>
        </section>
      </div >
    </>
  );
};

export default QuestDetail;
