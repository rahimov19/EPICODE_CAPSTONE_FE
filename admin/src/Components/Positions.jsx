/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Positions() {
  const navigate = useNavigate();

  const [positions, setPositions] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.user.accessToken);
  const [show, setShow] = useState(false);
  const [editableElement, setEditableElement] = useState({});
  const [name, setName] = useState("");
  const [bulkPositions, setBulkPositions] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [stats, setStats] = useState(false);
  const [finance, setFinance] = useState(false);
  const [menu, setMenu] = useState(false);
  const [warehouse, setWarehouse] = useState(false);
  const [access, setAccess] = useState(false);
  const [accountSettings, setAccountSettings] = useState(false);
  const [terminalAdmin, setTerminalAdmin] = useState(false);

  useEffect(() => {
    filterPositions();
  }, [filterQuery]);

  const filterPositions = () => {
    if (filterQuery.length !== 0) {
      const filteredPositions = bulkPositions.filter((pr) =>
        pr.name.toLowerCase().includes(filterQuery)
      );
      setPositions(filteredPositions);
    } else {
      setPositions(bulkPositions);
    }
  };

  useEffect(() => {
    setName(editableElement.name);
    editableElement.stats ? setStats(true) : setStats(false);
    editableElement.finance ? setFinance(true) : setFinance(false);
    editableElement.menu ? setMenu(true) : setMenu(false);
    editableElement.access ? setAccess(true) : setAccess(false);
    editableElement.accountSettings
      ? setAccountSettings(true)
      : setAccountSettings(false);
    editableElement.terminalAdmin
      ? setTerminalAdmin(true)
      : setTerminalAdmin(false);
    editableElement.warehouse ? setWarehouse(true) : setWarehouse(false);
    console.log(stats, finance, menu, access);
  }, [editableElement]);
  const submitHandler = async () => {
    const position = {
      name,
      stats,
      finance,
      menu,
      access,
      accountSettings,
      terminalAdmin,
      warehouse,
    };

    if (editableElement.name) {
      try {
        const options = {
          method: "PUT",
          body: JSON.stringify(position),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/position/${editableElement._id}`,
          options
        );
        if (response.ok) {
          fetchPositions();
          handleClose();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify(position),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/position`,
          options
        );
        if (response.ok) {
          fetchPositions();
          handleClose();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditableElement({});
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/position`,
        options
      );
      const positions = await response.json();
      setIsLoading(false);
      setBulkPositions(positions);
      setPositions(positions);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async () => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/position/${editableElement._id}`,
        options
      );
      if (response.ok) {
        alert("Position deleted Successfully");
        handleClose();
        fetchPositions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Col>
        <Row className="d-flex justify-content-between my-4">
          <div>
            <h4>Positions: {positions.length}</h4>
          </div>
          <div>
            <Button variant="info" className="mr-2">
              Recycle Bin
            </Button>
            <Button variant="info" className="mr-2">
              Export
            </Button>
            <Button variant="info" className="mr-2">
              Print
            </Button>
            <Button variant="primary" className="mr-2" onClick={handleShow}>
              Add new
            </Button>
          </div>
        </Row>
        <Row>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Filter</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter Positions"
              defaultValue={editableElement.description}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="my-2 descRow">
          <Col>Name</Col>
          <Col>Stats settings</Col>
          <Col>Finance settings</Col>
          <Col>Menu settings</Col>
          <Col>Warehouse settings</Col>
          <Col>Access settings</Col>
          <Col>Account settings</Col>
          <Col>Terminal Admin</Col>
        </Row>
        {positions.length !== 0 ? (
          positions.map((pr) => (
            <Row className="mt-1" key={pr._id}>
              <Col>{pr.name}</Col>
              <Col>{pr.stats ? <p>v</p> : <p>x</p>}</Col>
              <Col>{pr.finance ? <p>v</p> : <p>x</p>}</Col>
              <Col>{pr.menu ? <p>v</p> : <p>x</p>}</Col>
              <Col>{pr.warehouse ? <p>v</p> : <p>x</p>}</Col>
              <Col>{pr.access ? <p>v</p> : <p>x</p>}</Col>
              <Col>{pr.accountSettings ? <p>v</p> : <p>x</p>}</Col>
              <Col className="d-flex justify-content-between">
                {pr.terminalAdmin ? <p>v</p> : <p>x</p>}
                <Button
                  onClick={() => {
                    setEditableElement(pr);
                    handleShow();
                  }}
                >
                  Edit
                </Button>
              </Col>
            </Row>
          ))
        ) : (
          <>No positions to show</>
        )}
      </Col>

      {editableElement.name ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  defaultValue={editableElement.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Stats settings"
                  checked={editableElement.stats ? true : false}
                  onChange={() => setStats(!stats)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Finance settings"
                  checked={editableElement.finance ? true : false}
                  onChange={() => setFinance(!finance)}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Menu settings"
                  checked={editableElement.menu ? true : false}
                  onChange={() => setMenu(!menu)}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Warehouse settings"
                  checked={editableElement.warehouse ? true : false}
                  onChange={() => setWarehouse(!warehouse)}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Access settings"
                  checked={editableElement.access ? true : false}
                  onChange={() => setAccess(!access)}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  checked={editableElement.accountSettings ? true : false}
                  label="Account settings"
                  onChange={() => setAccountSettings(!accountSettings)}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Terminal Admin"
                  checked={editableElement.terminalAdmin ? true : false}
                  onChange={() => setTerminalAdmin(!terminalAdmin)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={submitHandler}>
              Save Changes
            </Button>
            <Button variant="danger" onClick={deleteHandler}>
              Delete Product
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  defaultValue={editableElement.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Stats settings"
                  onChange={() => setStats(!stats)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Finance settings"
                  onChange={() => setFinance(!finance)}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Menu settings"
                  onChange={() => setMenu(!menu)}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Warehouse settings"
                  onChange={() => setWarehouse(!warehouse)}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Access settings"
                  onChange={() => setAccess(!access)}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Account settings"
                  onChange={() => setAccountSettings(!accountSettings)}
                />
              </Form.Group>{" "}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Terminal Admin"
                  onChange={() => setTerminalAdmin(!terminalAdmin)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={submitHandler}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
