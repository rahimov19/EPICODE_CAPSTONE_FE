import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <Container fluid>
      <Row className="navbarMain">
        <Col className="d-flex">
          <Button>Orders</Button>
          <Button>Tables</Button>
          {user.position.terminalAdmin ? <Button>Archive</Button> : <></>}
        </Col>
        <Col className="d-flex flex-row-reverse">
          <Button onClick={() => navigate("/login")}>{user.name}</Button>
        </Col>
      </Row>
    </Container>
  );
}
