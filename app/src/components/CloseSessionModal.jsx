import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function CloseSessionModal() {
  const [show, setShow] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [cashInReg, setCashInReg] = useState(0);

  const cheques = useSelector((state) => state.cheques.cheques);

  const todaySales = function getTotalSum() {
    let total = 0;
    for (let i = 0; i < cheques.length; i++) {
      total += cheques[i].chequeTotal;
    }
    setTotalSales(total);
  };

  const todayPaid = function getTotalSum() {
    let total = 0;
    for (let i = 0; i < cheques.length; i++) {
      if (cheques[i].amountPaid) {
        total += cheques[i].amountPaid;
      }
    }
    setTotalPaid(total);
  };
  useEffect(() => {
    todayPaid();
    todaySales();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="dropdown-item dropDownItem" onClick={handleShow}>
        Close Session
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        className="closeSessionModal"
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Close Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between mb-3">
            <h2>Today's Sales:</h2>
            <input
              disabled
              type="number"
              name="today"
              id="today"
              value={totalSales}
            />{" "}
          </div>
          <div className="d-flex justify-content-between mb-3">
            <h2>Today's Paid:</h2>
            <input
              disabled
              type="number"
              name="today"
              id="today"
              value={totalPaid}
            />{" "}
          </div>

          <div className="d-flex justify-content-between mb-3">
            <h2>Final Cash (To be): </h2>
            <input
              disabled
              type="number"
              name="today"
              id="today"
              value={totalPaid}
            />{" "}
          </div>
          <div className="d-flex justify-content-between mb-3">
            <h2>Final Cash (Is):</h2>
            <input
              type="number"
              name="today"
              id="today"
              onChange={(e) => setCashInReg(e.target.value)}
            />{" "}
          </div>
          <div className="d-flex justify-content-between mb-3">
            <h2>Difference:</h2>
            <input
              type="number"
              name="today"
              id="today"
              value={cashInReg - totalPaid}
              disabled
            />{" "}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close Session
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
