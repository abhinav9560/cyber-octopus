import React from "react";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { post } from "../../utils/api";
import { DefaultInput } from "../../components/Common/input";
import { validateForgetPassword } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";


function Forgot() {
  const forgetPassword = (values) => {
    console.log(values)
    let formData = {
      email: values.email,
    };
    post("/auth/forgot-password", formData).then((data) => handleSubmit(data));
  };

  const handleSubmit = (data) => {
    ShowToast(data.message, data.status);
    if (data.status) {
      console.log(data);
    }
  };

  return (
    <>
      <Container className="container" fluid>
        <Row className="auth">
          <Col md="3"></Col>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h2">Forgot Password</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{ email: ""}}
                  validate={validateForgetPassword}
                  onSubmit={(values, { setSubmitting }) => {
                    forgetPassword(values);
                    setSubmitting(false);
                  }}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      <DefaultInput
                        type={"email"}
                        placeholder={"Email"}
                        name={"email"}
                        value={props.values.email}
                        onChange={props.handleChange("email")}
                        onBlur={() => props.setFieldTouched("email", true)}
                        error={props.touched.email && props.errors.email}
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
