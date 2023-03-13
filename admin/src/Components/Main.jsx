import React from "react";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "./Categories";
import Positions from "./Positions";
import Products from "./Products";
import Sidebar from "./Sidebar";
import Tables from "./Tables";
import Terminals from "./Terminals";
import Workers from "./Workers";

export default function Main() {
  return (
    <Container fluid>
      <Row>
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/main/categories" element={<Categories />} />
            <Route path="/main/products" element={<Products />} />
            <Route path="/main/tables" element={<Tables />} />
            <Route path="/main/workers" element={<Workers />} />
            <Route path="/main/positions" element={<Positions />} />
            <Route path="/main/terminals" element={<Terminals />} />
          </Routes>
        </BrowserRouter>
      </Row>
    </Container>
  );
}
