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
  DefaultInput,
  DefaultInputWithIcon,
} from "../../components/Common/input";
import { validateTechnology } from "../../utils/validator";
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
    if(id)
    get(`/technology/getSingle?_id=${id}`).then((data) =>
      handleSingleData(data)
    );
  };

  const handleSingleData = (data) => {
    if (!data.status) return ShowToast(data.message, data.status);
    formRef.current.setFieldValue("nameEN", data?.data?.nameEN);
    formRef.current.setFieldValue("nameDE", data?.data?.nameDE);
  };

  const submit = (values) => {
    let formData = {
      nameEN: values.nameEN,
      nameDE: values.nameDE,
    };
    if (id)
      put(`${`/technology/update?_id=${id}`}`, formData).then((data) =>
        handleResponse(data)
      );
    else
      post(`${"/technology/insert"}`, formData).then((data) =>
        handleResponse(data)
      );
  };

  const handleResponse = (data) => {
    ShowToast(data.message, data.status);
    if(!id) history.goBack()
  };

  return (
    <>
      <Container className="container" fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">{`Technology ${id ? 'Edit' : 'Add'}`}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="2"></Col>
                  <Col md="8">
                    <Formik
                      initialValues={{ nameEN: "", nameDE: "" }}
                      validate={validateTechnology}
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
                            placeholder={"Name (EN)"}
                            name={"name (EN)"}
                            id={"nameEN"}
                            value={props.values.nameEN}
                            onChange={props.handleChange("nameEN")}
                            onBlur={() => props.setFieldTouched("nameEN", true)}
                            error={props.touched.nameEN && props.errors.nameEN}
                          />

                          <DefaultInput
                            type={"text"}
                            placeholder={"Name (DE)"}
                            name={"name (DE)"}
                            id={"nameDE"}
                            value={props.values.nameDE}
                            onChange={props.handleChange("nameDE")}
                            onBlur={() => props.setFieldTouched("nameDE", true)}
                            error={props.touched.nameDE && props.errors.nameDE}
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
