import React, { useEffect, useState } from "react";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import { post } from "../../utils/api";
import { DefaultInput } from "../../components/Common/input";
import { validateResetPassword } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";

function Forgot() {
  const params = useParams();
  const history = useHistory();

  const [paramsData, setparamsData] = useState({});

  useEffect(() => {
    let data = atob(params.id);
    data = data.split(":");
    setparamsData({ _id: data[0], otp: data[1] });
    let formData = {
      _id: data[0],
      otp: data[1],
    };
    post("/auth/verifyOTP", formData).then((data) => handleResponse(data));
  }, []);

  const handleResponse = (data) => {
    if (!data.status) {
      ShowToast(data.message, data.status);
      history.push("/");
    }
  };

  const submit = (values) => {
    let formData = {
      _id: paramsData?._id,
      password: values.password,
    };
    post("/auth/reset-password", formData).then((data) => handleSubmit(data));
  };

  const handleSubmit = (data) => {
    ShowToast(data.message, data.status);
    history.push("/");
  };

  return (
    <>
      <Container className="container" fluid>
        <Row className="auth">
          <Col md="3"></Col>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h2">Reset Password</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{ password: "", confirmPassword: "" }}
                  validate={validateResetPassword}
                  onSubmit={(values, { setSubmitting }) => {
                    submit(values);
                    setSubmitting(false);
                  }}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      <DefaultInput
                        type={"password"}
                        placeholder={"New Password"}
                        name={"password"}
                        value={props.values.password}
                        onChange={props.handleChange("password")}
                        onBlur={() => props.setFieldTouched("password", true)}
                        error={props.touched.password && props.errors.password}
                      />

                      <DefaultInput
                        type={"password"}
                        placeholder={"Confirm New Password"}
                        name={"cassword"}
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

                      <button
                        type="submit"
                        className={"btn btn-primary"}
                        disabled={props.isSubmitting}
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </Formik>

                <div style={{ padding: "15px 1px 15px 1px" }}>
                  <Link to="/auth/login">Go Back</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="3"></Col>
        </Row>
      </Container>
    </>
  );
}

export default Forgot;
