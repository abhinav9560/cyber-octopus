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
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { post, get } from "../../utils/api";
import {
  DefaultInput,
  DefaultInputWithIcon,
  DefaultSelect,
} from "../../components/Common/input";
import { validateForgetPassword } from "../../utils/validator";
import { Formik } from "formik";
import { ShowToast } from "../../components/Common/common";
import Pagination from "react-js-pagination";
import { DefaultLoader } from "../../components/Common/common";

export default function QuestList(props) {
  const filterData = [
    { label: "All", value: 1 },
    { label: "Solved", value: 2 },
    { label: "Un-Solved", value: 3 },
    { label: "Scheduled", value: 4 },
  ];

  const [pageData, setpageData] = useState({
    page: 1,
    perPage: 10,
    searchItem: "",
    type: 1,
  });
  const [userData, setuserData] = useState([]);
  const [totalPages, settotalPages] = useState(0);

  const [searchItem, setsearchItem] = useState("");
  const [loader, setloader] = useState(true);

  useEffect(() => {
    getData();
  }, [pageData]);

  const getData = () => {
    get(
      `/quest/get?page=${pageData?.page || 1}&perPage=${
        pageData?.perPage || 10
      }&searchItem=${pageData?.searchItem || ""}&type=${pageData.type}`
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
      post(`${status ? "/quest/inactive" : "/quest/active"}`, formData).then(
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
      post(`${"/quest/delete"}`, formData).then((data) => {
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
                <Card.Title as="h4">Quest</Card.Title>
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
                  <Col md="6">
                    <DefaultSelect
                      hideLable={true}
                      data={filterData}
                      placeholder={"Select Type"}
                      name={"type"}
                      value={pageData.type}
                      onChange={(val) =>
                        setpageData({ ...pageData, type: val.target.value })
                      }
                    />
                  </Col>
                  <Col md="2"></Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>S. No</th>
                      <th>Id</th>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Customer Name</th>
                      <th>Expert Name</th>
                      <th>Answer Status</th>
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
                          <td>{ele?.displayId}</td>
                          <td>{ele?.title}</td>
                          <td>
                            {ele?.questType == 1 ? "Priority" : "Standerd"}
                          </td>
                          <td>
                            {ele?.customerId?.fName} {ele?.customerId?.lName}
                          </td>
                          <td>
                            {ele?.expertId?.fName
                              ? ele?.expertId?.fName
                              : "Unassigned"}{" "}
                            {ele?.expertId?.lName}
                          </td>
                          <td>
                            {ele?.isComplete ? (
                              <span className="">
                                <Badge variant="primary">Answered</Badge>
                              </span>
                            ) : (
                              <span className="">
                                <Badge variant="warning">Not-Answered</Badge>
                              </span>
                            )}
                          </td>

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
                                to={`quests/edit/${ele?._id}`}
                              >
                                View
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
        {/* <DefaultLoader visible={loader} /> */}
      </Container>
    </>
  );
}
