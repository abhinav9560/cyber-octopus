import React from "react";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { post } from "../../utils/api";
import { DefaultInput } from "../../components/Common/input";
import { validateLogin } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";
import { useDispatch, useSelector } from "react-redux";

import { authentication } from "../../redux/action/auth";
import { userDetail } from "../../redux/action/userDetail";
import { TOKEN, UserDetail } from "../../redux/constants/index";

function Login(props) {
  const dispatch = useDispatch();
  const login = (values) => {
    let formData = {
      email: values.email,
      password: values.password,
    };
    post("/auth/login", formData).then((data) => handleLogin(data));
  };

  const handleLogin = (data) => {
    ShowToast(data.message, data.status);
    if (data.status) {
      setTimeout(() => {
        dispatch(
          authentication(TOKEN, { token: data.token, userId: data.data._id })
        );
        dispatch(
          userDetail(UserDetail, {
            _id: data.data._id,
            name: data.data.fName + " " + data.data.lName,
            mobile: data.data.mobile,
            email: data.data.email,
            role: data.data.role,
          })
        );
        props.history.replace(`/admin/dashboard`);
      }, 500);
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
                <Card.Title as="h2">Login</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validate={validateLogin}
                  onSubmit={(values, { setSubmitting }) => {
                    login(values);
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

                      <DefaultInput
                        type={"password"}
                        placeholder={"Password"}
                        name={"password"}
                        value={props.values.password}
                        onChange={props.handleChange("password")}
                        onBlur={() => props.setFieldTouched("password", true)}
                        error={props.touched.password && props.errors.password}
                      />

                      <button
                        type="submit"
                        className={"btn btn-primary"}
                        disabled={props.isSubmitting}
                      >
                        Login
                      </button>
                    </form>
                  )}
                </Formik>

                <div style={{ padding: "15px 1px 15px 1px" }}>
                  <Link to="/auth/forgot">Forgot Password ?</Link>
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

export default Login;
