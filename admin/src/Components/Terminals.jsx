/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Terminals() {
  const navigate = useNavigate();
  const [terminals, setTerminals] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.user.accessToken);
  const [show, setShow] = useState(false);
  const [editableElement, setEditableElement] = useState({});
  const [name, setName] = useState("");
  const [terminalCode, setTerminalCode] = useState("");
  const [active, setActive] = useState(true);
  const [bulkTerminals, setBulkTerminals] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    filterProducts();
  }, [filterQuery]);

  useEffect(() => {
    if (editableElement.name) {
      setName(editableElement.name);
      setTerminalCode(editableElement.terminalCode);
      setActive(editableElement.active);
    }
  }, [editableElement]);

  const filterProducts = () => {
    if (filterQuery.length !== 0) {
      const filteredProducts = bulkTerminals.filter((pr) =>
        pr.name.toLowerCase().includes(filterQuery)
      );
      setTerminals(filteredProducts);
    } else {
      setTerminals(bulkTerminals);
    }
  };
  const submitHandler = async () => {
    const terminal = {
      name,
      terminalCode,
      active,
    };

    if (editableElement.name) {
      try {
        const options = {
          method: "PUT",
          body: JSON.stringify(terminal),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/terminal/${editableElement._id}`,
          options
        );
        if (response.ok) {
          fetchTerminals();
          handleClose();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify(terminal),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/users/terminal`,
          options
        );
        if (response.ok) {
          fetchTerminals();
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
    fetchTerminals();
  }, []);

  const fetchTerminals = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/terminal`,
        options
      );
      const terminals = await response.json();
      setIsLoading(false);
      setBulkTerminals(terminals);
      setTerminals(terminals);
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
        `${process.env.REACT_APP_BE_URL}/users/terminal/${editableElement._id}`,
        options
      );
      if (response.ok) {
        alert("Terminal deleted Successfully");
        handleClose();
        fetchTerminals();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = () => {
    setActive(!active);
  };

  return (
    <>
      <Col>
        <Row className="d-flex justify-content-between my-4">
          <div>
            <h4>Terminals: {terminals.length}</h4>
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
              placeholder="Filter terminals"
              defaultValue={editableElement.description}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="my-2 descRow">
          <Col>Name</Col>
          <Col>Terminal Code</Col>
          <Col>Active</Col>
        </Row>
        {terminals.length !== 0 ? (
          terminals.map((pr) => (
            <Row className="mt-1" key={pr._id}>
              <Col>{pr.name}</Col>
              <Col>{pr.terminalCode}</Col>

              <Col className="d-flex justify-content-between">
                {pr.active ? <p>V</p> : <p>X</p>}
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
          <>No terminals to show</>
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
                <Form.Label>Terminal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Place URL of image or upload one with button below"
                  defaultValue={editableElement.terminalCode}
                  onChange={(e) => setTerminalCode(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Active</Form.Label>
                <Form.Control
                  type="checkbox"
                  placeholder="Place URL of image or upload one with button below"
                  checked={active}
                  onChange={onChangeHandler}
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
                <Form.Label>terminalCode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Place URL of image or upload one with button below"
                  onChange={(e) => setTerminalCode(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Active</Form.Label>
                <Form.Control
                  type="checkbox"
                  placeholder="Place URL of image or upload one with button below"
                  onChange={onChangeHandler}
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
