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
import { validateEmail, validateTemplate } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";

export default function TechnologyAdd(props) {
  const history = useHistory();

  const { id } = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    getSingle();
  }, []);

  const getSingle = () => {
    if (id)
      get(`/template/getSingle?_id=${id}`).then((data) =>
        handleSingleData(data)
      );
  };

  const handleSingleData = (data) => {
    if (!data.status) return ShowToast(data.message, data.status);
    formRef.current.setFieldValue("title", data?.data?.title);
    formRef.current.setFieldValue("slug", data?.data?.slug);
    formRef.current.setFieldValue("content", data?.data?.content);
  };

  const submit = (values) => {
    let formData = {
      title: values.title,
      slug: values.slug,
      content: values.content,
    };
    if (id)
      put(`${`/template/update?_id=${id}`}`, formData).then((data) =>
        handleResponse(data)
      );
    else
      post(`${"/template/insert"}`, formData).then((data) =>
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
                <Card.Title as="h4">{`Template ${
                  id ? "Edit" : "Add"
                }`}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="2"></Col>
                  <Col md="8">
                    <Formik
                      initialValues={{ title: "", slug: "", content: "" }}
                      validate={validateEmail}
                      onSubmit={(values, { setSubmitting }) => {
                        submit(values);
                        setSubmitting(false);
                      }}
                      innerRef={formRef}
                    >
                      {(props) => (
                        <form onSubmit={props.handleSubmit}>
                          <DefaultInput
                            type={"title"}
                            placeholder={"Title"}
                            name={"title"}
                            value={props.values.title}
                            onChange={props.handleChange("title")}
                            onBlur={() => props.setFieldTouched("title", true)}
                            error={props.touched.title && props.errors.title}
                          />

                          <DefaultInput
                            type={"slug"}
                            placeholder={"Slug"}
                            name={"slug"}
                            value={props.values.slug}
                            onChange={props.handleChange("slug")}
                            onBlur={() => props.setFieldTouched("slug", true)}
                            error={props.touched.slug && props.errors.slug}
                          />

                          <DefaultEditor
                            type={"content"}
                            placeholder={"Content"}
                            name={"content"}
                            value={props.values.content}
                            onChange={val=> props.setFieldValue('content',val)}
                            onBlur={() =>
                              props.setFieldTouched("content", true)
                            }
                            error={
                              props.touched.content && props.errors.content
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
