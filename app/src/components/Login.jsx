/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCatsAction,
  fetchMenuAction,
  getUserAction,
  saveTokenAction,
} from "../redux/actions";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const submitHandler = async (e) => {
    e.preventDefault();
    const loginObj = { name: login, terminalCode: password };
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginObj),
      };
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/terminal/login`,
        options
      );
      if (response.ok) {
        const data = await response.json();
        setToken(data.accessToken);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(saveTokenAction(token));
    dispatch(fetchCatsAction(token));
    dispatch(fetchMenuAction(token));
    dispatch(getUserAction(token));
  }, [token]);
  return (
    <div className="loginDiv">
      {" "}
      <Container className="d-flex flex-column justify-content-center align-items-center h-100">
        <h1 className="mb-5">Welcome to Mopster</h1>
        <div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setLogin(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Terminal Code"
              aria-label="Terminal Code"
              aria-describedby="basic-addon1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </div>
        <Button onClick={(e) => submitHandler(e)}>Log In</Button>
      </Container>
    </div>
  );
}
