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
  DefaultSelect,
} from "../../components/Common/input";
import { validateAttack, validateTemplate } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";
import Country from "../../constants/country.json";

export default function AttackAdd(props) {
  const history = useHistory();

  const { id } = useParams();
  const formRef = useRef(null);

  useEffect(() => {
    getSingle();
    console.log(Country);
  }, []);

  const getSingle = () => {
    if (id)
      get(`/attack/getSingle?_id=${id}`).then((data) => handleSingleData(data));
  };

  const handleSingleData = (data) => {
    if (!data.status) return ShowToast(data.message, data.status);
    formRef.current.setFieldValue("titleEN", data?.data?.titleEN);
    formRef.current.setFieldValue("country", data?.data?.country);
    formRef.current.setFieldValue("titleDE", data?.data?.titleDE);
    formRef.current.setFieldValue("descriptionEN", data?.data?.descriptionEN);
    formRef.current.setFieldValue("descriptionDE", data?.data?.descriptionDE);
    // formRef.current.setFieldValue("link", data?.data?.link);
  };

  const submit = (values) => {
    let formData = {
      country: values.country,
      titleEN: values.titleEN,
      titleDE: values.titleDE,
      descriptionEN: values.descriptionEN,
      descriptionDE: values.descriptionDE,
    };
    if (id)
      put(`${`/attack/update?_id=${id}`}`, formData).then((data) =>
        handleResponse(data)
      );
    else
      post(`${"/attack/insert"}`, formData).then((data) =>
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
                <Card.Title as="h4">{`Attack ${
                  id ? "Edit" : "Add"
                }`}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md="2"></Col>
                  <Col md="8">
                    <Formik
                      initialValues={{
                        country: "",
                        titleEN: "",
                        titleDE: "",
                        descriptionEN: "",
                        descriptionDE: "",
                      }}
                      validate={validateAttack}
                      onSubmit={(values, { setSubmitting }) => {
                        submit(values);
                        setSubmitting(false);
                      }}
                      innerRef={formRef}
                    >
                      {(props) => (
                        <form onSubmit={props.handleSubmit}>
                          <DefaultSelect
                            data={Country}
                            type={"country"}
                            placeholder={"Select Country"}
                            name={"experience"}
                            value={props.values.country}
                            onChange={props.handleChange("country")}
                            id={"country"}
                            onBlur={() =>
                              props.setFieldTouched("country", true)
                            }
                            error={
                              props.touched.country &&
                              props.errors.country
                            }
                          />

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
                            placeholder={"Title (Gr)"}
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

                          <DefaultEditor
                            type={"content"}
                            placeholder={"Description (En)"}
                            name={"descriptionEN"}
                            value={props.values.descriptionEN}
                            onChange={(val) =>
                              props.setFieldValue("descriptionEN", val)
                            }
                            onBlur={() =>
                              props.setFieldTouched("descriptionEN", true)
                            }
                            error={
                              props.touched.descriptionEN &&
                              props.errors.descriptionEN
                            }
                          />

                          <DefaultEditor
                            type={"content"}
                            placeholder={"Description (Gr)"}
                            name={"descriptionDE"}
                            value={props.values.descriptionDE}
                            onChange={(val) =>
                              props.setFieldValue("descriptionDE", val)
                            }
                            onBlur={() =>
                              props.setFieldTouched("descriptionDE", true)
                            }
                            error={
                              props.touched.descriptionDE &&
                              props.errors.descriptionDE
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
