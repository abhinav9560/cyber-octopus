import React, { useEffect, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { get } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ApiResponse } from "../common/utils/interface";
import { ShowToast } from "../common/component/common";

const Faq: NextPage = () => {
  const [active, setActive] = useState(0);

  const [faqData, setfaqData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    get(`${Endpoint.faq}`).then((data) => handleResponse(data));
  };

  const handleResponse = (data: ApiResponse) => {
    setfaqData(data?.data);
    if (!data.status) ShowToast(data.message, data.status);
  };

  return (
    <>
      <div className="wrapper-inner-cms">
        <div className="breadcrumb-block">
          <img src="images/breadcrumb-bg.jpg" />
          <div className="container">
            <div className="breadcrumb-head">
              <h4>Frequently Asked Questions</h4>
            </div>
          </div>
        </div>
        <section className="information-content-section">
          <div className="container">
            <div className="help-content" id="accordion">
              {faqData.map((ele:any, index) => {
                return (
                  <Accordion defaultActiveKey="0" key={index}>
                    <Card>
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey={String(index)}
                        style={{ padding: "15px", cursor: "pointer" }}
                      >
                        <Row>
                          <Col md={11}>
                            <h5>{ele?.question}</h5>
                          </Col>
                          <Col
                            md={1}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <h5>{active == index ? "-" : "+"}</h5>
                          </Col>
                        </Row>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={String(index)}>
                        <Card.Body>
                          <p>{ele?.answer}</p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Faq;
