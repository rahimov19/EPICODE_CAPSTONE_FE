/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseSessionModal from "./CloseSessionModal";

export default function Navbar() {
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
          <Button
            onClick={() => {
              navigate("/orders");
            }}
          >
            Orders
          </Button>
          <Button
            onClick={() => {
              navigate("/tables");
            }}
          >
            Tables
          </Button>
          {user.position.terminalAdmin ? (
            <Button
              onClick={() => {
                navigate("/archive");
              }}
            >
              Archive
            </Button>
          ) : (
            <></>
          )}
          <Col className="d-flex flex-row-reverse">
            <div className="d-flex flex-row align-items-center">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div
                className="dropdown-menu dropDownMenu"
                aria-labelledby="dropdownMenuButton"
              >
                <div></div>
                <div
                  className="dropdown-item dropDownItem"
                  onClick={() => navigate("/reservations")}
                >
                  Reservations
                </div>
                <CloseSessionModal />
              </div>
              <button className="userButton" onClick={() => navigate("/login")}>
                {user.name}
              </button>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

//
//
