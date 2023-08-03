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
import moment from "moment";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Revenue",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [21, 20, 43, 4, 3, 43, 54, 5, 45, 45, 45, 12],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function Dashboard(props) {
  const [userData, setuserData] = useState([]);
  const [questData, setquestData] = useState([]);
  const [transaction, settransaction] = useState([]);
  const [chartData, setchartData] = useState();
  const [imageUrl, setimageUrl] = useState("");

  useEffect(() => {
    getData();
    getChartData();
  }, []);

  const getData = () => {
    get(`/auth/dashborad`).then((data) => handleResponse(data));
  };

  const handleResponse = (data) => {
    if (!data.status) ShowToast(data.message, data.status);
    else {
      setuserData(data?.users);
      setquestData(data?.threads);
      settransaction(data?.transactions);
      setimageUrl(data?.imageUrl);
    }
  };

  const getChartData = () => {
    get(`/auth/getChartData`).then((data) => handleChartResponse(data));
  };

  const handleChartResponse = (data) => {
    let temp = data?.data?.data.map((item) => item?.users);
    const as = {
      labels,
      datasets: [
        {
          label: "Revenue",
          data: temp,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    setchartData(as);
  };

  return (
    <>
      <Container className="container" fluid>
        <Row>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Latest Quest Replies</Card.Title>
              </Card.Header>
              <Card.Body>
                {questData.map((item, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col-md-10">
                        <div
                          dangerouslySetInnerHTML={{ __html: item?.content }}
                          style={{ height: "45px", overflow: "hidden" }}
                        />
                        <pre>
                          {moment(item?.createdAt).format("DD/MMM/YYYY")}
                        </pre>
                      </div>
                      <div className="col-md-2">
                        <button className="btn btn-info">Go</button>
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Latest Users</Card.Title>
              </Card.Header>
              <Card.Body>
                {userData.map((item, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col-md-2">
                        <Image
                          src={`${imageUrl}${item?.image}`}
                          roundedCircle
                          style={{
                            maxHeight: "40px",
                            width: "auto",
                          }}
                        />
                      </div>
                      <div className="col-md-10">
                        <h4 style={{ margin: "0px" }}>
                          {item?.fName} {item?.lName}
                        </h4>
                        <p>{item?.email}</p>
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Latest Transactions</Card.Title>
              </Card.Header>
              <Card.Body>
                {transaction.map((item, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col-md-8">
                        <h5 style={{ margin: "0px" }}>
                          {item?.userId?.fName} {item?.userId?.lName}
                        </h5>
                        <p>{item?.userId.email}</p>
                      </div>
                      <div className="col-md-4">
                        <h5 style={{ margin: "0px" }}>$ {item?.amount}</h5>
                        <p style={{ margin: "0px" }}>By- {item?.type}</p>
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Header>
            <Card.Title as="h4">Revenue</Card.Title>
          </Card.Header>
          <Card.Body style={{ padding: "40px" }}>
            <Line
              options={options}
              data={
                chartData && chartData.labels && chartData.datasets
                  ? chartData
                  : data
              }
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
