import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { saveTokenAction, saveUserAction } from "../redux/actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandle = async (e) => {
    e.preventDefault();
    const user = { email, password };
    console.log(user);
    const options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/login`,
        options
      );
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        dispatch(saveTokenAction(user.accessToken));
        dispatch(saveUserAction(user.user));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center h-100 mt-5"
    >
      <Row>
        <Col xs={6}>
          <img
            src="http://placekitten.com/1200/400"
            alt="kit"
            className="w-100"
          />
        </Col>
        <Col xs={6}>
          <div>
            <h2>Log in</h2>{" "}
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => submitHandle(e)}
              >
                Log In
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
