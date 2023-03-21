import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Archive() {
  const cheques = useSelector((state) => state.cheques.cheques);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [activeCheque, setActiveCheque] = useState({});
  const num =
    activeCheque.chequeTotal -
    (activeCheque.chequeTotal / 100) * activeCheque.discount;
  return (
    <Container fluid>
      <Navbar />
      <Row className="mt-3">
        <Col className="archiveCol" xs={4}>
          {cheques.map((ch) => (
            <Row className="archiveRow" onClick={() => setActiveCheque(ch)}>
              <Col xs={9}>
                <div>
                  <h4>#{ch.chequeNumber}</h4>
                  <p>{ch.dishes[0].dish.name}</p>
                </div>
              </Col>
              <Col className="archivePrice" xs={3}>
                {ch.chequeTotal} $
              </Col>
            </Row>
          ))}
        </Col>
        <Col className="archiveDetails" xs={8}>
          {activeCheque._id ? (
            <div>
              <h2>Cheque #{activeCheque.chequeNumber}</h2>
              <Row className="mb-2 archiveCheque">
                <Col xs={6}>Order Type</Col>
                <Col className="chequeRow" xs={6}>
                  {activeCheque.type}
                </Col>
              </Row>
              <Row className="mb-2 archiveCheque">
                <Col xs={6}>Waiter</Col>
                <Col className="chequeRow" xs={6}>
                  {activeCheque.createdBy.name}
                </Col>
              </Row>
              <Row className="mb-2 archiveCheque">
                <Col xs={6}>Created</Col>
                <Col className="chequeRow" xs={6}>
                  {" "}
                  {new Date(activeCheque.createdAt).toUTCString()}
                </Col>
              </Row>
              <Row className="mb-2 archiveCheque">
                <Col xs={6}>Table Number</Col>
                <Col className="chequeRow" xs={6}>
                  1
                </Col>
              </Row>
              <Row className="mb-2 archiveCheque">
                <Col xs={6}>Number of Guests</Col>
                <Col className="chequeRow" xs={6}>
                  {activeCheque.numberOfGuests}
                </Col>
              </Row>
              <div className="my-5 chequeBottomPart">
                <Row>
                  <Col className="archiveBottomPart" xs={6}>
                    {" "}
                    <h5>Name</h5>
                  </Col>
                  <Col className="archiveBottomPart" xs={2}>
                    <h5>Quantity</h5>
                  </Col>
                  <Col className="archiveBottomPart" xs={2}>
                    <h5>Price</h5>
                  </Col>
                  <Col className="archiveBottomPart" xs={2}>
                    <h5>Total</h5>
                  </Col>
                </Row>
                {activeCheque.dishes.map((dsh) => (
                  <Row>
                    <Col className="archiveBottomPart" xs={6}>
                      {" "}
                      <h6>{dsh.dish.name} </h6>
                    </Col>
                    <Col className="archiveBottomPart" xs={2}>
                      <h6>{dsh.quantity} </h6>
                    </Col>
                    <Col className="archiveBottomPart" xs={2}>
                      <h6>{dsh.dish.price} $</h6>
                    </Col>
                    <Col className="archiveBottomPart" xs={2}>
                      <h6>{dsh.total} $</h6>
                    </Col>
                  </Row>
                ))}
              </div>
              <div>
                <Row className="checqueBottomRow">
                  <Col xs={9}>
                    <h3>Total</h3>
                  </Col>
                  <Col xs={3}>
                    <h4>{activeCheque.chequeTotal} $</h4>
                  </Col>
                </Row>
              </div>
              <div>
                <Row className="checqueBottomRow">
                  <Col xs={9}>
                    <h3>Discount</h3>
                  </Col>
                  <Col xs={3}>
                    <h4>{activeCheque.discount} %</h4>
                  </Col>
                </Row>
              </div>
              <div>
                <Row className="checqueBottomRow">
                  <Col xs={9}>
                    <h3>To Pay</h3>
                  </Col>
                  <Col xs={3}>
                    <h4> {(Math.round(num * 100) / 100).toFixed(2)} $</h4>
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
