import React, { useState, useEffect, useRef } from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Image,
} from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { post, get, put } from "../../utils/api";
import {
  DefaultInput,
  DefaultInputWithIcon,
  DefaultMobileInput,
  DefaultSelect,
  DefaultTextarea,
} from "../../components/Common/input";
import { validateCustomer, validateExpert } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";

export default function GlobalAdd(props) {
  const history = useHistory();

  const [experience, setExperience] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [imageUrl, setimageUrl] = useState("");

  const { id } = useParams();
  const formRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    getSingle();
  }, []);

  const getSingle = () => {
    get(`/global/getSingle`).then((data) => handleSingleData(data));
  };

  const handleSingleData = (data) => {
    if (!data.status) return ShowToast(data.message, data.status);
    setimageUrl(data?.imageUrl);
    formRef.current.setFieldValue("title", data?.data?.title);
    formRef.current.setFieldValue("description", data?.data?.description);
    formRef.current.setFieldValue("email", data?.data?.email);
    formRef.current.setFieldValue("phone", data?.data?.phone);
    formRef.current.setFieldValue("address", data?.data?.address);
    formRef.current.setFieldValue("facebook", data?.data?.facebook);
    formRef.current.setFieldValue("twitter", data?.data?.twitter);
    formRef.current.setFieldValue("linkden", data?.data?.linkden);
    formRef.current.setFieldValue("creditType", data?.data?.creditType);
    formRef.current.setFieldValue("creditLiveSession", data?.data?.creditLiveSession);
  };

  const submit = (values) => {
    let formData = new FormData();
    for (var ele in values) {
      formData.append(ele, values[ele]);
    }

    post(`${"/global/insert"}`, formData, 1).then((data) =>
      handleResponse(data)
    );
  };

  const handleResponse = (data) => {
    ShowToast(data.message, data.status);
    if (!id && data.status) history.replace("global");
  };

  return (
    <>
      <Container className="container" fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">{"Global Setting"}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="2"></Col>
                  <Col md="8">
                    <Formik
                      initialValues={{
                        title: "",
                        description: "",
                        address: "",
                        email: "",
                        phone: "",
                        facebook: "",
                        twitter: "",
                        linkden: "",
                        creditType: "",
                        creditLiveSession:""
                      }}
                      //   validate={(values) => validateCustomer(values, id)}
                      onSubmit={(values, { setSubmitting }) => {
                        submit(values);
                        setSubmitting(false);
                      }}
                      innerRef={formRef}
                    >
                      {(props) => (
                        <form onSubmit={props.handleSubmit}>
                          <DefaultInput
                            type={"text"}
                            placeholder={"Title"}
                            name={"title"}
                            id={"title"}
                            maxLength={50}
                            value={props.values.title}
                            onChange={props.handleChange("title")}
                            onBlur={() => props.setFieldTouched("title", true)}
                            error={props.touched.title && props.errors.title}
                          />

                          <DefaultTextarea
                            placeholder={"Description"}
                            name={"description"}
                            id={"description"}
                            maxLength={50}
                            value={props.values.description}
                            onChange={props.handleChange("description")}
                            onBlur={() =>
                              props.setFieldTouched("description", true)
                            }
                            error={
                              props.touched.description &&
                              props.errors.description
                            }
                          />

                          <DefaultInput
                            type={"number"}
                            placeholder={"Credit Deducation for Quest Type"}
                            name={"Credit Deducation For Quest Type"}
                            id={"creditType"}
                            maxLength={10}
                            value={props.values.creditType}
                            onChange={props.handleChange("creditType")}
                            onBlur={() =>
                              props.setFieldTouched("creditType", true)
                            }
                            error={
                              props.touched.creditType && props.errors.creditType
                            }
                          />

                          <DefaultInput
                            type={"number"}
                            placeholder={"Credit Deducation for Live Session"}
                            name={"Credit Deducation For Live Session"}
                            id={"creditLiveSession"}
                            maxLength={10}
                            value={props.values.creditLiveSession}
                            onChange={props.handleChange("creditLiveSession")}
                            onBlur={() =>
                              props.setFieldTouched("creditLiveSession", true)
                            }
                            error={
                              props.touched.creditLiveSession && props.errors.creditLiveSession
                            }
                          />

                          <DefaultInput
                            type={"text"}
                            placeholder={"address"}
                            name={"address"}
                            id={"address"}
                            maxLength={50}
                            value={props.values.address}
                            onChange={props.handleChange("address")}
                            onBlur={() =>
                              props.setFieldTouched("address", true)
                            }
                            error={
                              props.touched.address && props.errors.address
                            }
                          />

                          <DefaultInput
                            type={"text"}
                            placeholder={"email"}
                            name={"email"}
                            id={"email"}
                            maxLength={50}
                            value={props.values.email}
                            onChange={props.handleChange("email")}
                            onBlur={() => props.setFieldTouched("email", true)}
                            error={props.touched.email && props.errors.email}
                          />

                          <DefaultInput
                            type={"text"}
                            placeholder={"phone"}
                            name={"phone"}
                            id={"phone"}
                            maxLength={50}
                            value={props.values.phone}
                            onChange={props.handleChange("phone")}
                            onBlur={() => props.setFieldTouched("phone", true)}
                            error={props.touched.phone && props.errors.phone}
                          />

                          <DefaultInput
                            type={"text"}
                            placeholder={"facebook"}
                            name={"facebook"}
                            id={"facebook"}
                            maxLength={50}
                            value={props.values.facebook}
                            onChange={props.handleChange("facebook")}
                            onBlur={() =>
                              props.setFieldTouched("facebook", true)
                            }
                            error={
                              props.touched.facebook && props.errors.facebook
                            }
                          />

                          <DefaultInput
                            type={"text"}
                            placeholder={"twitter"}
                            name={"twitter"}
                            id={"twitter"}
                            maxLength={50}
                            value={props.values.twitter}
                            onChange={props.handleChange("twitter")}
                            onBlur={() =>
                              props.setFieldTouched("twitter", true)
                            }
                            error={
                              props.touched.twitter && props.errors.twitter
                            }
                          />

                          <DefaultInput
                            type={"text"}
                            placeholder={"linkden"}
                            name={"linkden"}
                            id={"linkden"}
                            maxLength={50}
                            value={props.values.linkden}
                            onChange={props.handleChange("linkden")}
                            onBlur={() =>
                              props.setFieldTouched("linkden", true)
                            }
                            error={
                              props.touched.linkden && props.errors.linkden
                            }
                          />

                          <DefaultInput
                            type={"file"}
                            placeholder={"Image"}
                            name={"image"}
                            // value={props.values.image}
                            accept="image/*"
                            refr={fileRef}
                            onChange={(e) => {
                              props.setFieldValue("image", e.target.files[0]);
                            }}
                            onBlur={() => props.setFieldTouched("image", true)}
                            error={props.touched.image && props.errors.image}
                          />

                          {props.values.image && (
                            <Image
                              src={`${imageUrl}${props.values.image}`}
                              roundedCircle
                              style={{
                                maxHeight: "90px",
                                maxWidth: "90px",
                                borderRadius: 50,
                                alignItems: "center",
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                            />
                          )}

                          <Row>
                            <Col md="3"></Col>
                            <Col md="2">
                              <button
                                type="submit"
                                className={"btn btn-success"}
                                disabled={props.isSubmitting}
                              >
                                Submit
                              </button>
                            </Col>
                            <Col md="2">
                              <button
                                type="button"
                                className={"btn btn-warning"}
                                onClick={() => history.goBack()}
                              >
                                Go Back
                              </button>
                            </Col>
                            <Col md="3"></Col>
                          </Row>
                        </form>
                      )}
                    </Formik>
                  </Col>
                  <Col md="2"></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
