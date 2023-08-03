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
} from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { post, get, put } from "../../utils/api";
import {
  DefaultEditor,
  DefaultInput,
  DefaultInputWithIcon,
} from "../../components/Common/input";
import { validateFaq, validateTemplate } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";

export default function ContactAdd(props) {
  const history = useHistory();

  const { id } = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    getSingle();
  }, []);

  const getSingle = () => {
    if (id)
      get(`/contact/getSingle?_id=${id}`).then((data) =>
        handleSingleData(data)
      );
  };

  const handleSingleData = (data) => {
    if (!data.status) return ShowToast(data.message, data.status);
    formRef.current.setFieldValue("question", data?.data?.question);
    formRef.current.setFieldValue("answer", data?.data?.answer);
  };

  const submit = (values) => {
    let formData = {
      question: values.question,
      answer: values.answer,
    };
    if (id)
      put(`${`/contact/update?_id=${id}`}`, formData).then((data) =>
        handleResponse(data)
      );
    else
      post(`${"/contact/insert"}`, formData).then((data) =>
        handleResponse(data)
      );
  };

  const handleResponse = (data) => {
    ShowToast(data.message, data.status);
    if (!id) history.goBack();
  };

  return (
    <>
      <Container className="container" fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">{`Contact ${
                  id ? "Edit" : "Add"
                }`}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="2"></Col>
                  <Col md="8">
                    <Formik
                      initialValues={{ question: "", answer: "" }}
                      validate={validateFaq}
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
                            placeholder={"Question"}
                            name={"question"}
                            value={props.values.question}
                            onChange={props.handleChange("question")}
                            onBlur={() =>
                              props.setFieldTouched("question", true)
                            }
                            error={
                              props.touched.question && props.errors.question
                            }
                          />

                          <DefaultInput
                            type={"text"}
                            placeholder={"answer"}
                            name={"answer"}
                            value={props.values.answer}
                            onChange={props.handleChange("answer")}
                            onBlur={() => props.setFieldTouched("answer", true)}
                            error={props.touched.answer && props.errors.answer}
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
