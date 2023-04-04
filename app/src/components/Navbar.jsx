/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseSessionModal from "./CloseSessionModal";
import {
  fetchCatsAction,
  fetchChequesAction,
  fetchMenuAction,
  fetchTablePositionsActions,
} from "../redux/actions";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.accessToken);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const syncData = () => {
    dispatch(fetchTablePositionsActions(token));
    dispatch(fetchCatsAction(token));
    dispatch(fetchMenuAction(token));
    dispatch(fetchChequesAction(token));
  };

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
                className={
                  user.position.terminalAdmin ? "btn dropdown-toggle" : "d-none"
                }
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
                  className={"dropdown-item dropDownItem"}
                  onClick={() => navigate("/reservations")}
                >
                  Reservations
                </div>
                <div
                  className={"dropdown-item dropDownItem"}
                  onClick={() => syncData()}
                >
                  Syncronize Data
                </div>
                <CloseSessionModal />
              </div>
              <button
                className="userButton d-flex justify-content-between"
                onClick={() => navigate("/login")}
              >
                <h3 className="ml-4 mt-1">{user.name}</h3>{" "}
                <i className="bi bi-lock-fill  mt-1 mr-4"></i>
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
