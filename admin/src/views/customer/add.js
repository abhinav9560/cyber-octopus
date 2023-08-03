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
import { validateCustomer, validateExpert } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";

export default function ExpertAdd(props) {
  const history = useHistory();

  const [experience, setExperience] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [imageUrl, setimageUrl] = useState("");

  const { id } = useParams();
  const formRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    getSingle();
    generateExperience();
    getTechnology();
  }, []);

  const generateExperience = () => {
    let array = [];
    for (let index = 1; index <= 10; index++) {
      array.push({
        label: `${index} Years`,
        value: String(index),
      });
    }
    setExperience(array);
  };

  const getTechnology = () => {
    get(`/technology/getAll`).then((data) => handleTechnology(data));
  };

  const handleTechnology = (data) => {
    if (data.status && Array.isArray(data?.data)) {
      let temp = data?.data.map((ele) => {
        return { value: ele._id, label: ele.nameEN };
      });
      setTechnology(temp);
    }
  };

  const getSingle = () => {
    if (id)
      get(`/customer/getSingle?_id=${id}`).then((data) =>
        handleSingleData(data)
      );
  };

  const handleSingleData = (data) => {
    if (!data.status) return ShowToast(data.message, data.status);
    setimageUrl(data?.imageUrl);
    formRef.current.setFieldValue("fName", data?.data?.fName);
    formRef.current.setFieldValue("lName", data?.data?.lName);
    formRef.current.setFieldValue("email", data?.data?.email);
    formRef.current.setFieldValue("mobile", data?.data?.mobile);
    formRef.current.setFieldValue("experience", data?.data?.experience);
    formRef.current.setFieldValue("technology", data?.data?.technology);
    formRef.current.setFieldValue("image", data?.data?.image);
  };

  const submit = (values) => {
    let formData = new FormData();
    for (var ele in values) {
      formData.append(ele, values[ele]);
    }
    if (id)
      put(`${`/customer/update?_id=${id}`}`, formData, 1).then((data) =>
        handleResponse(data)
      );
    else
      post(`${"/customer/insert"}`, formData, 1).then((data) =>
        handleResponse(data)
      );
  };

  const handleResponse = (data) => {
    ShowToast(data.message, data.status);
    if (!id && data.status) history.goBack();
  };

  return (
    <>
      <Container className="container" fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">{`Customer ${
                  id ? "Edit" : "Add"
                }`}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="2"></Col>
                  <Col md="8">
                    <Formik
                      initialValues={{
                        fName: "",
                        lName: "",
                        email: "",
                        image: "",
                        experience: "",
                        technology: [],
                        password: "",
                        confirmPassword: "",
                      }}
                      validate={(values) => validateCustomer(values, id)}
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
                            maxLength={50}
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
                            maxLength={50}
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
                            maxLength={50}
                            value={props.values.email}
                            onChange={props.handleChange("email")}
                            onBlur={() => props.setFieldTouched("email", true)}
                            error={props.touched.email && props.errors.email}
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

                          {/* <DefaultMobileInput
                            type={"text"}
                            placeholder={"Mobile"}
                            name={"mobile"}
                            id={"mobile"}
                            maxLength={13}
                            value={props.values.mobile}
                            onChange={(val) =>
                              props.setFieldValue("mobile", val || "")
                            }
                            onBlur={() => props.setFieldTouched("mobile", true)}
                            error={props.touched.mobile && props.errors.mobile}
                          /> */}

                          {/* <DefaultSelect
                            data={experience}
                            placeholder={"Select Experience"}
                            name={"experience"}
                            value={props.values.experience}
                            onChange={props.handleChange("experience")}
                            id={"experience"}
                            onBlur={() =>
                              props.setFieldTouched("experience", true)
                            }
                            error={
                              props.touched.experience &&
                              props.errors.experience
                            }
                          /> */}

                          {/* <DefaultSelect
                            data={technology}
                            multiple={true}
                            placeholder={"Select Technology"}
                            name={"technology"}
                            value={props.values.technology}
                            onChange={props.handleChange("technology")}
                            id={"technology"}
                            onBlur={() =>
                              props.setFieldTouched("technology", true)
                            }
                            error={
                              props.touched.technology &&
                              props.errors.technology
                            }
                          /> */}

                          {!id ? (
                            <>
                              <DefaultInput
                                type={"password"}
                                placeholder={"Password"}
                                name={"Password"}
                                id={"password"}
                                value={props.values.password}
                                onChange={props.handleChange("password")}
                                onBlur={() =>
                                  props.setFieldTouched("password", true)
                                }
                                error={
                                  props.touched.password &&
                                  props.errors.password
                                }
                              />

                              <DefaultInput
                                type={"password"}
                                placeholder={"Password"}
                                name={"Confirm Password"}
                                id={"confirmPassword"}
                                value={props.values.confirmPassword}
                                onChange={props.handleChange("confirmPassword")}
                                onBlur={() =>
                                  props.setFieldTouched("confirmPassword", true)
                                }
                                error={
                                  props.touched.confirmPassword &&
                                  props.errors.confirmPassword
                                }
                              />
                            </>
                          ) : null}

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
