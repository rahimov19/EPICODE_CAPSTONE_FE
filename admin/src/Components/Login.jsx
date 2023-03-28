import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import { saveTokenAction, saveUserAction } from "../redux/actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
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
      } else {
        setShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center mt-5 loginContainer"
    >
      <Row className="w-100 d-flex justify-content-center ">
        <Col xs={5} className="loginImgCol pr-0">
          <img
            src="https://www.trendreport.de/wp-content/uploads/2019/05/camera-coffee-composition-1509428-scaled.jpg"
            alt="kit"
            className="loginImg"
          />
        </Col>
        <Col
          xs={5}
          className="d-flex justify-content-center py-4 loginRow pl-0"
        >
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
              <Form.Group className="mb-3 mr-5" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <div className="d-flex justify-content-between">
                {" "}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => submitHandle(e)}
                >
                  Log In
                </Button>
                <p className="pForgot">Forgot Password?</p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={5000}
        autohide
        style={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Login</strong>
        </Toast.Header>
        <Toast.Body>Provided Login or Password are not valid!</Toast.Body>
      </Toast>
    </Container>
  );
}
