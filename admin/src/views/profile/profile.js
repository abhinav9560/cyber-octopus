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
} from "../../components/Common/input";
import { validateProfile } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";

export default function Profile(props) {
  const history = useHistory();

  const [imageUrl, setimageUrl] = useState();

  const { id } = useParams();
  const formRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    get(`/auth/profile`).then((data) => handleSingleData(data));
  };

  const handleSingleData = (data) => {
    if (!data.status) return ShowToast(data.message, data.status);
    formRef.current.setFieldValue("fName", data?.data?.fName);
    formRef.current.setFieldValue("lName", data?.data?.lName);
    formRef.current.setFieldValue("email", data?.data?.email);
    formRef.current.setFieldValue("mobile", data?.data?.mobile);
    if (data?.data?.image)
      setimageUrl(`${data?.imageUrl}/${data?.data?.image}`);
  };

  const submit = async (values) => {
    let formData = new FormData();
    for (var ele in values) {
      formData.append(ele, values[ele]);
    }
    post(`${"/auth/profile"}`, formData, 1).then((data) =>
      handleResponse(data)
    );
  };

  const handleResponse = (data) => {
    ShowToast(data.message, data.status);
    formRef.current.resetForm();
    fileRef.current.value = null;
    getProfile();
  };

  return (
    <>
      <Container className="container" fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">{"Profile"}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="2"></Col>
                  <Col md="8">
                    <div
                      style={{
                        display: "flex",
                        flex: "1",
                        justifyContent: "center",
                      }}
                    >
                      {imageUrl && (
                        <Image
                          src={`${imageUrl}`}
                          roundedCircle
                          style={{
                            maxHeight: "80px",
                            maxWidth: "80px",
                            alignItems: "center",
                          }}
                        />
                      )}
                    </div>

                    <Formik
                      initialValues={{
                        fName: "",
                        lName: "",
                        email: "",
                        gender: "",
                        image: "",
                        mobile: "",
                      }}
                      validate={validateProfile}
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
                            placeholder={"First Name"}
                            name={"fName"}
                            id={"fName"}
                            value={props.values.fName}
                            onChange={props.handleChange("fName")}
                            onBlur={() => props.setFieldTouched("fName", true)}
                            error={props.touched.fName && props.errors.fName}
                          />

                          <DefaultInput
                            type={"text"}
                            placeholder={"Last Name"}
                            name={"lName"}
                            id={"lName"}
                            value={props.values.lName}
                            onChange={props.handleChange("lName")}
                            onBlur={() => props.setFieldTouched("lName", true)}
                            error={props.touched.lName && props.errors.lName}
                          />

                          <DefaultInput
                            type={"email"}
                            placeholder={"Email"}
                            name={"email"}
                            id={"email"}
                            disabled={true}
                            value={props.values.email}
                            // onChange={props.handleChange("email")}
                            onBlur={() => props.setFieldTouched("email", true)}
                            error={props.touched.email && props.errors.email}
                          />

                          <DefaultMobileInput
                            type={"text"}
                            placeholder={"Mobile"}
                            name={"mobile"}
                            id={"mobile"}
                            value={props.values.mobile}
                            onChange={(val) =>
                              props.setFieldValue("mobile", val || "")
                            }
                            onBlur={() => props.setFieldTouched("mobile", true)}
                            error={props.touched.mobile && props.errors.mobile}
                          />

                          <DefaultInput
                            type={"file"}
                            placeholder={"Image"}
                            name={"image"}
                            accept="image/*"
                            // value={props.values.image}
                            refr={fileRef}
                            onChange={(e) => {
                              props.setFieldValue("image", e.target.files[0]);
                            }}
                            onBlur={() => props.setFieldTouched("image", true)}
                            error={props.touched.image && props.errors.image}
                          />

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
