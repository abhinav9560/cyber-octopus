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
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { post, get } from "../../utils/api";
import {
  DefaultInput,
  DefaultInputWithIcon,
} from "../../components/Common/input";
import { validateForgetPassword } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";
import Pagination from "react-js-pagination";

export default function ExpertList(props) {
  const [pageData, setpageData] = useState({
    page: 1,
    perPage: 10,
    searchItem: "",
  });
  const [userData, setuserData] = useState([]);
  const [totalPages, settotalPages] = useState(0);
  const [imageUrl, setimageUrl] = useState("");
  const [searchItem, setsearchItem] = useState("");

  useEffect(() => {
    getData();
  }, [pageData]);

  const getData = () => {
    get(
      `/customer/get?page=${pageData?.page || 1}&perPage=${
        pageData?.perPage || 10
      }&searchItem=${pageData?.searchItem || ""}`
    ).then((data) => handleResponse(data));
  };

  const handleResponse = (data) => {
    if (!data.status) ShowToast(data.message, data.status);
    else {
      setuserData([...data?.data]);
      settotalPages(data?.pages);
      setimageUrl(data?.imageUrl);
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
      post(`${status ? "/customer/inactive" : "/customer/active"}`, formData).then(
        (data) => {
          handleStatusChange(data);
        }
      );
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
      post(`${"/customer/delete"}`, formData).then((data) => {
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

  return (
    <>
      <Container className="container" fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Customer</Card.Title>
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
                  <Col md="2">
                    <Link className="btn btn-primary" to="/admin/customer/add">
                      Add
                    </Link>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>S. No</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      {/* <th>Mobile</th> */}
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
                          <td>
                            {ele?.image && (
                              <Image
                                src={`${imageUrl}${ele?.image}`}
                                roundedCircle
                                style={{
                                  maxHeight: "50px",
                                  maxWidth: "50px",
                                  borderRadius: 50,
                                  alignItems: "center",
                                }}
                              />
                            )}
                          </td>
                          <td>{ele?.fName} {ele?.lName}</td>
                          <td>{ele?.email}</td>
                          {/* <td>{ele?.mobile}</td> */}
                        
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
                              <Link
                                className="btn btn-primary btn-sm"
                                to={`customer/edit/${ele?._id}`}
                              >
                                Edit
                              </Link>
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
      </Container>
    </>
  );
}
