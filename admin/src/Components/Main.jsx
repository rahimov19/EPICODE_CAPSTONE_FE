import React from "react";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "./Categories";
import Products from "./Products";
import Sidebar from "./Sidebar";
import Tables from "./Tables";

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
          </Routes>
        </BrowserRouter>
      </Row>
    </Container>
  );
}
