import React, { useState, useEffect } from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Table,
  ButtonGroup,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { post, get } from "../../utils/api";
import {
  DefaultInput,
  DefaultInputWithIcon,
  DefaultTextarea,
} from "../../components/Common/input";
import { validateForgetPassword } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";
import Pagination from "react-js-pagination";
import { DefaultLoader } from "../../components/Common/common";

export default function ContactList(props) {
  const [pageData, setpageData] = useState({
    page: 1,
    perPage: 10,
    searchItem: "",
  });
  const [userData, setuserData] = useState([]);
  const [totalPages, settotalPages] = useState(0);

  const [searchItem, setsearchItem] = useState("");
  const [loader, setloader] = useState(true);
  const [show, setShow] = useState({
    show: false,
    _id: null,
  });
  const [reply, setReply] = useState("");

  useEffect(() => {
    getData();
  }, [pageData]);

  const getData = () => {
    get(
      `/contact/get?page=${pageData?.page || 1}&perPage=${
        pageData?.perPage || 10
      }&searchItem=${pageData?.searchItem || ""}`
    ).then((data) => handleResponse(data));
  };

  const handleResponse = (data) => {
    if (!data.status) ShowToast(data.message, data.status);
    else {
      setuserData([...data?.data]);
      settotalPages(data?.pages);
    }
  };

  const changePage = (index) => {
    setpageData({
      ...pageData,
      page: index,
    });
  };

  const statusChange = (status, id) => {
    if (confirm("Are you sure")) {
      let formData = {
        _id: id,
      };
      post(
        `${status ? "/contact/inactive" : "/contact/active"}`,
        formData
      ).then((data) => {
        handleStatusChange(data);
      });
    }
  };

  const handleStatusChange = (data) => {
    ShowToast(data.message, data.status);
    getData();
  };

  const deleteData = (id) => {
    if (confirm("Are you sure")) {
      let formData = {
        _id: id,
      };
      post(`${"/contact/delete"}`, formData).then((data) => {
        handleDelete(data);
      });
    }
  };

  const handleDelete = (data) => {
    ShowToast(data.message, data.status);
    getData();
  };

  const onSearchCLick = () => {
    setpageData({
      ...pageData,
      searchItem: searchItem,
    });
  };

  const handleClose = () => setShow(false);

  const sendReply = () => {
    let formData = {
      _id: show._id,
      reply: reply,
    };
    post("/contact/reply", formData).then((data) => handleReply(data));
  };

  const handleReply = (data) => {
    ShowToast(data.message, data.status);
    getData();
    setShow({
      show: false,
      _id: null,
    });
  };

  return (
    <>
      <Container className="container" fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">contact</Card.Title>
                <Row>
                  <Col md="4">
                    <DefaultInputWithIcon
                      type={"text"}
                      placeholder="search"
                      customType={"search"}
                      value={searchItem}
                      onClick={onSearchCLick}
                      onChange={(e) => setsearchItem(e.target.value)}
                    />
                  </Col>
                  <Col md="6"></Col>
                  <Col md="2"></Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>S. No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((ele, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {pageData?.perPage * (pageData?.page - 1) +
                              index +
                              1}
                          </td>
                          <td>{ele?.name}</td>
                          <td>{ele?.email}</td>
                          <td>{ele?.message}</td>
                          <td>
                            <Button
                              size="sm"
                              variant={ele?.status ? "success" : "danger"}
                              onClick={() =>
                                statusChange(ele?.status, ele?._id)
                              }
                            >
                              {ele?.status ? "Active" : "Deactive"}
                            </Button>
                          </td>
                          <td>
                            <ButtonGroup aria-label="Basic example">
                              <Button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  !ele?.isReplied
                                    ? setShow({ show: true, _id: ele?._id })
                                    : null;
                                  setReply("");
                                }}
                              >
                                {ele?.isReplied ? "Replied" : "Reply"}
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => deleteData(ele?._id)}
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>

                {!userData.length && (
                  <>
                    <h1>NO data</h1>
                  </>
                )}

                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={pageData?.page}
                  itemsCountPerPage={pageData?.perPage}
                  totalItemsCount={totalPages * 10}
                  pageRangeDisplayed={5}
                  onChange={changePage}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <DefaultLoader visible={loader} /> */}

        <Modal show={show.show} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Add Reply</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DefaultTextarea
              type={"text"}
              placeholder={"Reply"}
              name={"Add reply to send on user's email"}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => sendReply()}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
