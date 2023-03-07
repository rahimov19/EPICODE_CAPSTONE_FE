/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUserAction } from "../redux/actions";
import useFocusOnKeyDown from "react-focus-onkeydown";

export default function TerminalLogin() {
  const ref = useRef(null);
  useFocusOnKeyDown(ref);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const users = useSelector((state) => state.user.users);
  useEffect(() => {
    dispatch(saveUserAction([]));
    document.querySelector("#passInput").focus();
  }, []);
  useEffect(() => {
    checkPassword();
  }, [password]);
  const checkPassword = () => {
    const user = users.filter((u) => u.terminalCode === parseInt(password));
    console.log("PASS", password);
    if (user.length !== 0) {
      console.log(user[0]);
      dispatch(saveUserAction(user[0]));
      navigate("/main");
    }
  };
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center terminalLoginContainer">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="User Code"
          aria-label="User Code"
          aria-describedby="basic-addon1"
          id="passInput"
          value={password}
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === "1") {
              setPassword(`${password}` + 1);
            } else if (e.key === "2") {
              setPassword(`${password}` + 2);
            } else if (e.key === "3") {
              setPassword(`${password}` + 3);
            } else if (e.key === "4") {
              setPassword(`${password}` + 4);
            } else if (e.key === "5") {
              setPassword(`${password}` + 5);
            } else if (e.key === "6") {
              setPassword(`${password}` + 6);
            } else if (e.key === "7") {
              setPassword(`${password}` + 7);
            } else if (e.key === "8") {
              setPassword(`${password}` + 8);
            } else if (e.key === "9") {
              setPassword(`${password}` + 9);
            } else if (e.key === "Escape") {
              setPassword("");
            } else if (e.key === "0") {
              setPassword(`${password}` + 0);
            } else if (e.key === "Backspace") {
              setPassword(password.slice(0, -1));
            }
          }}
        />
      </InputGroup>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            className="loginButton"
            onClick={() => setPassword(`${password}` + 1)}
          >
            1
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            className="loginButton"
            onClick={() => setPassword(`${password}` + 2)}
          >
            2
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            className="loginButton"
            onClick={() => setPassword(`${password}` + 3)}
          >
            3
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            className="loginButton"
            onClick={() => setPassword(`${password}` + 4)}
          >
            4
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            className="loginButton"
            onClick={() => setPassword(`${password}` + 5)}
          >
            5
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            className="loginButton"
            onClick={() => setPassword(`${password}` + 6)}
          >
            6
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            className="loginButton"
            onClick={() => setPassword(`${password}` + 7)}
          >
            7
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            className="loginButton"
            onClick={() => setPassword(`${password}` + 8)}
          >
            8
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            className="loginButton"
            onClick={() => setPassword(`${password}` + 9)}
          >
            9
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <Button className="loginButton" onClick={() => setPassword("")}>
            C
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            className="loginButton"
            onClick={() => setPassword(`${password}` + 0)}
          >
            0
          </Button>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            className="loginButton"
            onClick={() => setPassword(password.slice(0, -1))}
          >
            X
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
