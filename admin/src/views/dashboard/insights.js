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
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
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

export const data1 = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function Insights(props) {
  const [chartData, setchartData] = useState();
  const [newUserData, setnewUserData] = useState();
  const [insightsType, setinsightsType] = useState(1);
  const [imageUrl, setimageUrl] = useState("");

  const [userList, setuserList] = useState([]);
  const [userAmountList, setuserAmountList] = useState([]);
  const [questPerUser, setquestPerUser] = useState([]);
  const [userData, setuserData] = useState([]);
  const [barChartData, setbarChartData] = useState();
  const [userPerIndustry, setuserPerIndustry] = useState({});

  const [showQuestData, setshowQuestData] = useState({});

  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = () => {
    get(`/auth/getChartDataInsight`).then((data) => handleChartResponse(data));
  };

  const handleChartResponse = (data) => {
    setquestPerUser(data?.data?.questPerUser);
    setshowQuestData({
      priority: data?.data?.priority,
      questData: data?.data?.questData,
      meeting: data?.data?.meeting,
    });
    let temp = data?.data?.data.map((item) => item?.users);
    let temp1 = data?.data?.data.map((item) => (item?.total ? item?.total : 0));

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
    setnewUserData({
      labels,
      datasets: [
        {
          label: "New User",
          data: temp1,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });

    let newArray = data?.data?.getRevenuePerUser.map((ele) => {
      return {
        fName:
          ele.user && ele.user.length
            ? `${ele.user[0].fName} ${ele.user[0].lName}`
            : "-",
        total: ele.total,
        count: ele.count,
      };
    });
    let userList = newArray.map((ele) => ele.fName);
    let amountList = newArray.map((ele) => (ele.total ? ele.total : 0));
    setuserList(userList);
    setuserAmountList(amountList);

    setbarChartData({
      labels: userList,
      datasets: [
        {
          label: "Revenue From User",
          data: amountList,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });

    let userPerIndustryLabels = data?.data?.userPerIndustry.map(
      (ele) => ele?._id
    );
    let userPerIndustryData = data?.data?.userPerIndustry.map(
      (ele) => ele?.total
    );

    setuserPerIndustry({
      labels: userPerIndustryLabels,
      datasets: [
        {
          label: "User Per Industry",
          data: userPerIndustryData,
          borderWidth: 1,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
        },
      ],
    });
  };

  const getPercent = (total, number) => (number * 100) / total;

  return (
    <>
      <Container className="container" fluid>
        <div style={{ marginBottom: "10px", marginTop: "10px" }}>
          <Button
            variant="primary"
            active={insightsType == 1}
            onClick={() => setinsightsType(1)}
          >
            Finance
          </Button>{" "}
          <Button
            variant="primary"
            active={insightsType == 2}
            onClick={() => setinsightsType(2)}
          >
            Quests
          </Button>{" "}
          <Button
            variant="primary"
            active={insightsType == 3}
            onClick={() => setinsightsType(3)}
          >
            Users
          </Button>{" "}
        </div>

        {insightsType == 1 ? (
          <div>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Revenue</Card.Title>
              </Card.Header>
              <Card.Body style={{ padding: "10px" }}>
                <Line
                  height={"55%"}
                  options={options}
                  data={
                    chartData && chartData.labels && chartData.datasets
                      ? chartData
                      : data
                  }
                />
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title as="h4">Top Revenue From Users</Card.Title>
              </Card.Header>
              <Card.Body style={{ padding: "10px" }}>
                <Bar
                  height={"55%"}
                  options={options}
                  data={
                    barChartData && barChartData.labels && barChartData.datasets
                      ? barChartData
                      : data
                  }
                />
              </Card.Body>
            </Card>
          </div>
        ) : insightsType == 2 ? (
          <div>
            <Row>
              <Col md="3">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Number Of Quests</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <h4
                      style={{ margin: "0px" }}
                    >{`${showQuestData?.questData?.questComplete} of ${showQuestData?.questData?.quest}`}</h4>
                    <p>{`${showQuestData?.questData?.percent}% Of all quests answered`}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Priority Quests</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <h4 style={{ margin: "0px" }}>
                      {showQuestData?.priority?.priorityQuest}
                    </h4>
                    <p>{`${showQuestData?.priority?.priorityPercent}% quests are marked as priority`}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Schedules Meetings</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <h4 style={{ margin: "0px" }}>
                      {showQuestData?.meeting?.meetingQuest}
                    </h4>
                    <p>{`${showQuestData?.meeting?.meetingPercent}% quests are marked as priority`}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Average Time</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <h4 style={{ margin: "0px" }}>6 Days</h4>
                    <p>1 - 24 days to completed quest</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Quests Per User</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Quests</th>
                      <th>Solved</th>
                      <th>Priority</th>
                      <th>Meeting</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questPerUser.map((ele, index) => {
                      return (
                        <>
                          <tr>
                            <td>{`${ele?.user[0].fName} ${ele?.user[0].lName}`}</td>
                            <td>{ele?.total}</td>
                            <td>{`${getPercent(ele?.total, ele?.solved)}%`}</td>
                            <td>{ele?.priority}</td>
                            <td>{ele?.meeting}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>

                {!questPerUser.length && (
                  <>
                    <h1>NO data</h1>
                  </>
                )}

                {/* <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={pageData?.page}
                  itemsCountPerPage={pageData?.perPage}
                  totalItemsCount={totalPages * 10}
                  pageRangeDisplayed={5}
                  onChange={changePage}
                /> */}
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div>
            <Card>
              <Card.Header>
                <Card.Title as="h4">New Users</Card.Title>
              </Card.Header>
              <Card.Body style={{ padding: "10px" }}>
                <Line
                  height={"55%"}
                  options={options}
                  data={
                    newUserData && newUserData.labels && newUserData.datasets
                      ? newUserData
                      : data
                  }
                />
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title as="h4">User Per Industry</Card.Title>
              </Card.Header>
              <Card.Body style={{ padding: "10px" }}>
                <Doughnut
                  height={400}
                  data={
                    userPerIndustry && userPerIndustry?.labels
                      ? userPerIndustry
                      : data1
                  }
                  options={{ maintainAspectRatio: false, responsive: true }}
                />
              </Card.Body>
            </Card>
          </div>
        )}
      </Container>
    </>
  );
}
