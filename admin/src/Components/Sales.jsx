/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Line } from "@nivo/line";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salesChart, setSalesChart] = useState([]);
  const [avgSum, setAvgSum] = useState({});
  const token = useSelector((state) => state.user.accessToken);

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const query = new URLSearchParams(
      `createdAt<ISODate("${endDate}")&createdAt>ISODate("${startDate}")`
    )
      .toString()
      .replace(/=$|=(?=&)/g, "");
    const res = await fetch(
      `${process.env.REACT_APP_BE_URL}/cheques?${query}`,
      options
    );
    const data = await res.json();
    setSales(data);
    console.log("sales", data);

    let salesChart = [{ id: "sales", color: "hsl(99, 70%, 50%)", data: [] }];

    const grouped = {};
    for (const cheque of data) {
      const date = new Date(cheque.createdAt);
      const key = `${date.getDate()}/${date.getMonth() + 1}`;
      if (!grouped[key]) {
        grouped[key] = 0;
      }
      grouped[key] += cheque.chequeTotal;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      const key = `${date.getDate()}/${date.getMonth() + 1}`;
      salesChart[0].data.push({
        x: key,
        y: grouped[key] || 0,
      });
    }

    setSalesChart(salesChart);

    console.log(salesChart);
  };

  function setDateRange() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);

    setStartDate(startDate.toISOString().slice(0, 10));
    setEndDate(endDate.toISOString().slice(0, 10));
  }

  function calculateYStats() {
    const total = salesChart[0].data.reduce((sum, { y }) => sum + y, 0);
    const average = total / salesChart[0].data.length;
    setAvgSum({ total, average });
  }
  useEffect(() => {
    if (salesChart[0]) {
      calculateYStats();
    }
  }, [salesChart]);
  useEffect(() => {
    setDateRange();
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <Col className="mt-4">
      <h2>Sales Table</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="d-flex align-items-center mb-4">
          <Form.Group controlId="startDate" className="mx-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="searchButton">
            Search
          </Button>
          {avgSum.total ? (
            <div className="avgSumDiv">
              <h3>Total Sales: {avgSum.total.toFixed(2)} $</h3>
              <h3>Average Sales: {avgSum.average.toFixed(2)} $</h3>
            </div>
          ) : (
            <></>
          )}
        </Row>
      </Form>
      {salesChart[0] && salesChart[0].data.length !== 0 ? (
        <div>
          <Line
            className="chart"
            width={window.innerWidth - (window.innerWidth / 100) * 20}
            height={300}
            lineWidth={5}
            data={salesChart}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "date",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "sales",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />{" "}
        </div>
      ) : (
        <></>
      )}

      <div className="salesTable">
        <Row>
          <Col>Cheque Number</Col>
          <Col>Created At</Col>
          <Col>Created By</Col>
          <Col>Cheque Total</Col>
          <Col>Discount %</Col>

          <Col>Cheque Paid</Col>
          <Col>Status</Col>
        </Row>
        {sales ? (
          sales.map((sale) => (
            <Row key={sale._id}>
              <Col># {sale.chequeNumber}</Col>
              <Col>
                {sale.createdAt
                  .replace("T", " ")
                  .substring(0, sale.createdAt.length - 5)}
              </Col>
              <Col>{sale.createdBy.name}</Col>
              <Col>{sale.chequeTotal}</Col>
              <Col>{sale.discount}</Col>
              <Col>{sale.amountPaid}</Col>
              <Col>{sale.status}</Col>
            </Row>
          ))
        ) : (
          <></>
        )}
      </div>
    </Col>
  );
};

export default Sales;
