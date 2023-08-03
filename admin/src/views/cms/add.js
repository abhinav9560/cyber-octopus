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
import { validateTemplate } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";

export default function CmsAdd(props) {
  const history = useHistory();

  const { id } = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    getSingle();
  }, []);

  const getSingle = () => {
    if (id)
      get(`/cms/getSingle?_id=${id}`).then((data) => handleSingleData(data));
  };

  const handleSingleData = (data) => {
    if (!data.status) return ShowToast(data.message, data.status);
    formRef.current.setFieldValue("titleEN", data?.data?.titleEN);
    formRef.current.setFieldValue("titleDE", data?.data?.titleDE);
    formRef.current.setFieldValue("slug", data?.data?.slug);
    formRef.current.setFieldValue("contentEN", data?.data?.contentEN);
    formRef.current.setFieldValue("contentDE", data?.data?.contentDE);
  };

  const submit = (values) => {
    let formData = {
      titleEN: values.titleEN,
      titleDE: values.titleDE,
      slug: values.slug,
      contentEN: values.contentEN,
      contentDE: values.contentDE,
    };
    if (id)
      put(`${`/cms/update?_id=${id}`}`, formData).then((data) =>
        handleResponse(data)
      );
    else
      post(`${"/cms/insert"}`, formData).then((data) => handleResponse(data));
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
                      initialValues={{
                        titleEN: "",
                        titleDE: "",
                        slug: "",
                        contentEN: "",
                        contentDE: "",
                      }}
                      validate={validateTemplate}
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
                            placeholder={"Title (En)"}
                            name={"title"}
                            value={props.values.titleEN}
                            onChange={props.handleChange("titleEN")}
                            onBlur={() =>
                              props.setFieldTouched("titleEN", true)
                            }
                            error={
                              props.touched.titleEN && props.errors.titleEN
                            }
                          />

                          <DefaultInput
                            type={"title"}
                            placeholder={"Title (De)"}
                            name={"title"}
                            value={props.values.titleDE}
                            onChange={props.handleChange("titleDE")}
                            onBlur={() =>
                              props.setFieldTouched("titleDE", true)
                            }
                            error={
                              props.touched.titleDE && props.errors.titleDE
                            }
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
                            placeholder={"Content (En)"}
                            name={"content"}
                            value={props.values.contentEN}
                            onChange={(val) =>
                              props.setFieldValue("contentEN", val)
                            }
                            onBlur={() =>
                              props.setFieldTouched("contentEN", true)
                            }
                            error={
                              props.touched.contentEN && props.errors.contentEN
                            }
                          />

                          <DefaultEditor
                            type={"content"}
                            placeholder={"Content (De)"}
                            name={"content"}
                            value={props.values.contentDE}
                            onChange={(val) =>
                              props.setFieldValue("contentDE", val)
                            }
                            onBlur={() =>
                              props.setFieldTouched("contentDE", true)
                            }
                            error={
                              props.touched.contentDE && props.errors.contentDE
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
