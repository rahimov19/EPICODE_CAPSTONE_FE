import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Archive() {
  const cheques = useSelector((state) => state.cheques.cheques);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [activeCheque, setActiveCheque] = useState({});
  return (
    <Container fluid>
      <Row className="navbarMain mb-4">
        <Col className="d-flex">
          <Button>Orders</Button>
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
        </Col>
        <Col className="d-flex flex-row-reverse">
          <Button onClick={() => navigate("/login")}>{user.name}</Button>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          {cheques.map((ch) => (
            <Row onClick={() => setActiveCheque(ch)}>
              <Col xs={9}>
                <div>
                  <h4>#{ch.chequeNumber}</h4>
                  <p>{ch.dishes[0].dish.name}</p>
                </div>
              </Col>
              <Col xs={3}>{ch.chequeTotal} $</Col>
            </Row>
          ))}
        </Col>
        <Col xs={8}>
          {activeCheque._id ? (
            <div>
              <h2>Cheque #{activeCheque.chequeNumber}</h2>
              <Row className="mb-2">
                <Col xs={6}>Order Type</Col>
                <Col xs={6}>{activeCheque.type}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6}>Waiter</Col>
                <Col xs={6}>{activeCheque.createdBy.name}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6}>Created</Col>
                <Col xs={6}>{activeCheque.createdAt}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6}>Table Number</Col>
                <Col xs={6}>1</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6}>Number of Guests</Col>
                <Col xs={6}>{activeCheque.numberOfGuests}</Col>
              </Row>
              <div className="my-5">
                <Row>
                  <Col xs={6}>
                    {" "}
                    <h5>Name</h5>
                  </Col>
                  <Col xs={2}>
                    <h5>Quantity</h5>
                  </Col>
                  <Col xs={2}>
                    <h5>Price</h5>
                  </Col>
                  <Col xs={2}>
                    <h5>Total</h5>
                  </Col>
                </Row>
                {activeCheque.dishes.map((dsh) => (
                  <Row>
                    <Col xs={6}>
                      {" "}
                      <h6>{dsh.dish.name} </h6>
                    </Col>
                    <Col xs={2}>
                      <h6>{dsh.quantity} </h6>
                    </Col>
                    <Col xs={2}>
                      <h6>{dsh.dish.price} $</h6>
                    </Col>
                    <Col xs={2}>
                      <h6>{dsh.total} $</h6>
                    </Col>
                  </Row>
                ))}
              </div>
              <div>
                <Row>
                  <Col xs={9}>
                    <h3>Total</h3>
                  </Col>
                  <Col xs={3}>{activeCheque.chequeTotal} $</Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col xs={9}>
                    <h3>Discount</h3>
                  </Col>
                  <Col xs={3}>{activeCheque.discount} %</Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col xs={9}>
                    <h3>To Pay</h3>
                  </Col>
                  <Col xs={3}>
                    {activeCheque.chequeTotal -
                      (activeCheque.chequeTotal / 100) *
                        activeCheque.discount}{" "}
                    $
                  </Col>
                </Row>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
}
