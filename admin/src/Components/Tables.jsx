/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sequences */
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import GridLayout from "react-grid-layout";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
export default function Tables() {
  const token = useSelector((state) => state.user.accessToken);
  const [updated, setUpdated] = useState(true);
  const [layout, setLayout] = useState([
    {
      i: "Table 1",
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      round: false,
    },
    { i: "Table 2", x: 1, y: 0, w: 3, h: 2, round: true },
    {
      i: "Table 3",
      x: 4,
      y: 0,
      w: 1,
      h: 2,
      round: true,
      // active: false,
      // userId: user._id,
      // userName: user.name,
    },
  ]);
  const handleClick = (table) => {
    const editableLayout = layout;
    const editableTableIndex = editableLayout.findIndex(
      (tab) => tab.i === table.i
    );
    console.log(editableTableIndex);
    if (editableTableIndex > -1) {
      editableLayout[editableTableIndex].round =
        !editableLayout[editableTableIndex].round;
      console.log(editableLayout);
      setLayout(editableLayout);
      setUpdated(!updated);
    }
  };

  useEffect(() => {
    fetchSchema();
  }, []);
  const fetchSchema = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/table`,
        options
      );
      if (response.ok) {
        const schema = await response.json();
        console.log(schema[0].schema);
        setLayout(schema[0].schema);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitSchema = async () => {
    const schema = [];
    layout.map(
      (lay) => (
        (lay.active = false),
        (lay.userId = ""),
        (lay.userName = ""),
        schema.push(lay)
      )
    );
    const objToSend = { schema };
    try {
      const options = {
        method: "PUT",
        body: JSON.stringify(objToSend),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/table/640b17e1d9353f3a0281c762`,
        options
      );
      if (response.ok) {
        fetchSchema();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTable = () => {
    const currentLayout = layout;
    currentLayout.push({
      i: uniqid(),
      x: (currentLayout.length * 2) % 40,
      y: Infinity,
      w: 10,
      h: 10,
      round: false,
      tableName: `New Table`,
    });
    console.log(currentLayout, "currents");
    setLayout(currentLayout);
    setUpdated(!updated);
  };

  const deleteTable = (table) => {
    const currentLayout = layout;
    const filteredLayout = currentLayout.filter((tab) => tab.i !== table.i);
    console.log(filteredLayout);
    setLayout(filteredLayout);
    setUpdated(!updated);
  };

  const changeTableName = (e, table) => {
    const editableLayout = layout;
    const editableTableIndex = editableLayout.findIndex(
      (tab) => tab.i === table.i
    );
    console.log(editableTableIndex);
    if (editableTableIndex > -1) {
      editableLayout[editableTableIndex].tableName = e.target.value;
      console.log(editableLayout[editableTableIndex]);
      setLayout(editableLayout);
      setUpdated(!updated);
    }
  };

  return (
    <Col className="ml-3 mt-4">
      <h2>Table Schema</h2>
      <Row className="d-flex ml-2 mb-3">
        {" "}
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select">
            <option>Room</option>
          </Form.Control>
        </Form.Group>{" "}
        <Button onClick={() => addTable()} className="mt-4 ml-4">
          Add Table
        </Button>
      </Row>
      <GridLayout
        className="layout gridTables"
        layout={layout}
        cols={40}
        rowHeight={10}
        width={800}
        height={500}
        autoSize={true}
        compactType={null}
        onLayoutChange={(currentLayout) => {
          let editableLayout = layout;
          editableLayout = editableLayout.map((m) => {
            const m2 = currentLayout.find((i2) => i2.i === m.i);
            return m2 ? { ...m, ...m2 } : m;
          });

          setLayout(editableLayout);
          setUpdated(true);
        }}
      >
        {layout.length !== 0 ? (
          layout.map((table) => (
            <div
              key={table.i}
              className={table.round ? "table roundTable" : "table"}
              onDoubleClick={() => handleClick(table)}
            >
              <input
                type="text"
                className="inputTable"
                defaultValue={table.tableName}
                onChange={(e) => changeTableName(e, table)}
                onFocus={(e) => (e.target.value = "")}
              />
              <span
                className="deleteTableButton"
                onClick={() => deleteTable(table)}
              >
                X
              </span>
            </div>
          ))
        ) : (
          <></>
        )}
      </GridLayout>
      <Button onClick={() => submitSchema()}>Save Schema</Button>
    </Col>
  );
}
