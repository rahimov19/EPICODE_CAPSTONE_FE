/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import TablesComp from "./TablesComp";

export default function Tables() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <Container fluid>
      <Navbar />
      <Row id="layoutMainDiv">
        <TablesComp />
      </Row>
    </Container>
  );
}
