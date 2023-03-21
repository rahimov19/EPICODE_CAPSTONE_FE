import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Orders() {
  const tables = useSelector((state) => state.menu.tablePositions);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [activeCheque, setActiveCheque] = useState({});

  const cheques = tables.filter((tb) => tb.cheque);
  console.log(activeCheque);

  return (
    <Container fluid>
      <Navbar />
      <Row className="mt-4">
        <Col className="archiveCol" xs={4}>
          {cheques.map((ch) => (
            <Row className="archiveRow" onClick={() => setActiveCheque(ch)}>
              <Col xs={9}>
                <div>
                  <h4>
                    Table: {ch.tableName} | {ch.cheque.userName}
                  </h4>
                  <p>{ch.cheque.check[0].dish.name}</p>
                </div>
              </Col>
              <Col className="archivePrice" xs={3}>
                {ch.cheque.total} $
              </Col>
            </Row>
          ))}
        </Col>
        <Col className="archiveDetails" xs={8}>
          {activeCheque.userId ? (
            <div>
              <Row className="mb-2 archiveCheque">
                <Col xs={6}>Waiter</Col>
                <Col xs={6}>{activeCheque.cheque.userName}</Col>
              </Row>
              <Row className="mb-2 archiveCheque">
                <Col xs={6}>Created</Col>
                <Col xs={6}>
                  {" "}
                  {new Date(activeCheque.cheque.creationTime).toUTCString()}
                </Col>
              </Row>
              <Row className="mb-2 archiveCheque">
                <Col xs={6}>Table Number</Col>
                <Col xs={6}>{activeCheque.tableName}</Col>
              </Row>
              <Row className="mb-2 archiveCheque">
                <Col xs={6}>Number of Guests</Col>
                <Col xs={6}>{activeCheque.cheque.numberOfGuests}</Col>
              </Row>
              <div className="my-5 chequeBottomPart">
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
                {activeCheque.cheque.check.map((dsh) => (
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
                      <h6>{dsh.quantity * dsh.dish.price} $</h6>
                    </Col>
                  </Row>
                ))}
              </div>
              <div>
                <Row className="ordersTotal">
                  <Col xs={9}>
                    <h3>Total</h3>
                  </Col>
                  <Col xs={3}>
                    <h3>{activeCheque.cheque.total} $</h3>
                  </Col>
                </Row>
              </div>
              <div></div>
            </div>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
}
