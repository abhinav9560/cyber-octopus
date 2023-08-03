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
  DefaultSelect,
} from "../../components/Common/input";
import { validateChangePass } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";

export default function ChangePassword(props) {
  const history = useHistory();

  const [imageUrl, setimageUrl] = useState();

  const formRef = useRef(null);

  useEffect(() => {}, []);

  const submit = async (values) => {
    post(`${"/auth/change-password"}`, values).then((data) =>
      handleResponse(data)
    );
  };

  const handleResponse = (data) => {
    ShowToast(data.message, data.status);
    formRef.current.resetForm();
  };

  return (
    <>
      <Container className="container" fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">{"Change Password"}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="2"></Col>
                  <Col md="8">
                    <Formik
                      initialValues={{
                        currentPassword: "",
                        newPassword: "",
                        confirmNewPassword: "",
                      }}
                      validate={validateChangePass}
                      onSubmit={(values, { setSubmitting }) => {
                        submit(values);
                        setSubmitting(false);
                      }}
                      innerRef={formRef}
                    >
                      {(props) => (
                        <form onSubmit={props.handleSubmit}>
                          <DefaultInput
                            type={"password"}
                            placeholder={"Current Password"}
                            name={"Current Password"}
                            id={"currentPassword"}
                            value={props.values.currentPassword}
                            onChange={props.handleChange("currentPassword")}
                            onBlur={() =>
                              props.setFieldTouched("currentPassword", true)
                            }
                            error={
                              props.touched.currentPassword &&
                              props.errors.currentPassword
                            }
                          />

                          <DefaultInput
                            type={"password"}
                            placeholder={"New Password"}
                            name={"New Password"}
                            id={"NewPassword"}
                            value={props.values.newPassword}
                            onChange={props.handleChange("newPassword")}
                            onBlur={() =>
                              props.setFieldTouched("newPassword", true)
                            }
                            error={
                              props.touched.newPassword &&
                              props.errors.newPassword
                            }
                          />

                          <DefaultInput
                            type={"password"}
                            placeholder={"Confirm New Password"}
                            name={"Confirm New Password"}
                            id={"confirmNewPassword"}
                            value={props.values.confirmNewPassword}
                            onChange={props.handleChange("confirmNewPassword")}
                            onBlur={() =>
                              props.setFieldTouched("confirmNewPassword", true)
                            }
                            error={
                              props.touched.confirmNewPassword &&
                              props.errors.confirmNewPassword
                            }
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
