/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Workers() {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.user.accessToken);
  const [show, setShow] = useState(false);
  const [editableElement, setEditableElement] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terminalCode, setTerminalCode] = useState();
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [bulkWorkers, setBulkWorkers] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    filterWorkers();
  }, [filterQuery]);

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
      if (response.ok) {
        const positions = await response.json();
        setPositions(positions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterWorkers = () => {
    if (filterQuery.length !== 0) {
      const filteredProducts = bulkWorkers.filter((pr) =>
        pr.name.toLowerCase().includes(filterQuery)
      );
      setWorkers(filteredProducts);
    } else {
      setWorkers(bulkWorkers);
    }
  };

  useEffect(() => {
    if (editableElement.name) {
      setName(editableElement.name);
      setEmail(editableElement.email);
      setAvatar(editableElement.avatar);
      setPassword(editableElement.password);
      setTerminalCode(editableElement.terminalCode);
      setPosition(editableElement.position.name);
      setSalary(editableElement.salary);
    }
  }, [editableElement]);

  const submitHandler = async () => {
    const positionId = positions.find((pos) => pos.name === position);
    const worker = {
      name,
      email,
      avatar,
      password,
      terminalCode: parseInt(terminalCode),
      position: positionId._id,
      salary: parseInt(salary),
    };
    console.log(editableElement);
    const terminalCodeToCheck = workers.find(
      (w) => w.terminalCode === worker.terminalCode
    );
    console.log(terminalCodeToCheck);
    if (
      terminalCodeToCheck &&
      terminalCodeToCheck.terminalCode !== editableElement.terminalCode
    ) {
      alert(
        "Sorry, Terminal code is already used by another user, please choose another"
      );
    } else {
      if (editableElement.name) {
        try {
          const options = {
            method: "PUT",
            body: JSON.stringify(worker),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          const response = await fetch(
            `${process.env.REACT_APP_BE_URL}/users/${editableElement._id}`,
            options
          );
          if (response.ok) {
            fetchWorkers();
            handleClose();
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const options = {
            method: "POST",
            body: JSON.stringify(worker),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(
            `${process.env.REACT_APP_BE_URL}/users/register`,
            options
          );
          if (response.ok) {
            fetchWorkers();
            handleClose();
          }
        } catch (error) {
          console.log(error);
        }
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
    fetchWorkers();
    fetchPositions();
  }, []);

  const fetchWorkers = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users`,
        options
      );
      const workers = await response.json();
      setIsLoading(false);
      setBulkWorkers(workers);
      setWorkers(workers);
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
        `${process.env.REACT_APP_BE_URL}/users/${editableElement._id}`,
        options
      );
      if (response.ok) {
        alert("User is deleted Successfully");
        handleClose();
        fetchWorkers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Col className="ml-3 mt-2">
        <Row className="d-flex justify-content-between my-4">
          <div>
            <h4>Workers: {workers.length}</h4>
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
              placeholder="Filter Workers"
              defaultValue={editableElement.description}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="my-2 descRow">
          <Col>Name</Col>
          <Col>Avatar</Col>
          <Col>Email</Col>
          <Col>Terminal Code</Col>
          <Col>Position</Col>
          <Col>Salary</Col>
        </Row>
        {workers.length !== 0 && positions.length !== 0 ? (
          workers.map((pr) => (
            <Row className="mt-1" key={pr._id}>
              <Col>{pr.name}</Col>
              <Col>
                <img src={pr.avatar} alt="avatar" className="imageList" />
              </Col>
              <Col>{pr.email}</Col>
              <Col>{pr.terminalCode}</Col>
              <Col>{pr.position.name}</Col>
              <Col className="d-flex justify-content-between">
                {pr.salary}{" "}
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
          <>No workers to show</>
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

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Place URL of image or upload one with button below"
                  defaultValue={editableElement.avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  defaultValue={editableElement.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  defaultValue={editableElement.password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Terminal Code</Form.Label>
                <Form.Control
                  type="number"
                  min={1000}
                  max={9999}
                  placeholder="Terminal Code"
                  defaultValue={editableElement.terminalCode}
                  onChange={(e) => setTerminalCode(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={editableElement.position.name}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  {positions.map((pos) => (
                    <option key={pos._id}>{pos.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Salary"
                  defaultValue={editableElement.salary}
                  onChange={(e) => setSalary(e.target.value)}
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
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Place URL of image or upload one with button below"
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Terminal Code</Form.Label>
                <Form.Control
                  type="number"
                  min={1000}
                  max={9999}
                  placeholder="Terminal Code"
                  onChange={(e) => setTerminalCode(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setPosition(e.target.value)}
                >
                  {positions.length !== 0 ? (
                    positions.map((pos) => (
                      <option key={pos._id}>{pos.name}</option>
                    ))
                  ) : (
                    <></>
                  )}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Salary"
                  onChange={(e) => setSalary(e.target.value)}
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
      )}
    </>
  );
}
