import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import GridLayout from "react-grid-layout";

export default function Tables() {
  const [layout, setLayout] = useState([
    {
      i: "Table 1",
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    },
    { i: "Table 2", x: 1, y: 0, w: 3, h: 2 },
    {
      i: "Table 3",
      x: 4,
      y: 0,
      w: 1,
      h: 2,
      // active: false,
      // userId: user._id,
      // userName: user.name,
    },
  ]);
  const handleClick = (e) => {
    e.currentTarget.classList.toggle("roundTable");
  };

  const addTable = () => {
    const currentLayout = layout;
    currentLayout.concat([
      {
        i: `Table ${layout.length + 1}`,
        x: 1,
        y: 1,
        w: 2,
        h: 2,
      },
    ]);
    console.log(currentLayout, "currents");
    setLayout(currentLayout);
  };

  console.log(layout);
  return (
    <Col>
      <h2>Table Schema</h2>
      <Row className="d-flex justify-content-between">
        {" "}
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select">
            <option>Room</option>
          </Form.Control>
        </Form.Group>{" "}
        <Button onClick={() => addTable()}>Add Table</Button>
      </Row>
      <GridLayout
        className="layout gridTables"
        layout={layout}
        cols={40}
        rowHeight={30}
        width={800}
        autoSize={true}
        height={800}
        compactType={null}
        onLayoutChange={(currentLayout) => setLayout(currentLayout)}
      >
        {layout.map((table) => (
          <div
            key={table.i}
            className="table"
            onDoubleClick={(e) => handleClick(e)}
          >
            <input type="text" className="inputTable" defaultValue={table.i} />
          </div>
        ))}
      </GridLayout>
      <Button>Save Schema</Button>
    </Col>
  );
}
