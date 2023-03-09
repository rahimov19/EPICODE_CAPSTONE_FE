/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.user.accessToken);
  const [show, setShow] = useState(false);
  const [editableElement, setEditableElement] = useState({});
  const [name, setName] = useState("");
  const [cover, setCover] = useState("");
  const [bulkProducts, setBulkProducts] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    filterProducts();
  }, [filterQuery]);

  const filterProducts = () => {
    if (filterQuery.length !== 0) {
      const filteredProducts = bulkProducts.filter((pr) =>
        pr.name.toLowerCase().includes(filterQuery)
      );
      setCategories(filteredProducts);
    } else {
      setCategories(bulkProducts);
    }
  };
  const submitHandler = async () => {
    const category = {
      name,
      cover,
    };

    if (editableElement.name) {
      try {
        const options = {
          method: "PUT",
          body: JSON.stringify(category),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/dishes/category/${editableElement._id}`,
          options
        );
        if (response.ok) {
          fetchCategories();
          handleClose();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify(category),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/dishes/category`,
          options
        );
        if (response.ok) {
          fetchCategories();
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
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/dishes/category`,
        options
      );
      const categories = await response.json();
      setIsLoading(false);
      setBulkProducts(categories);
      setCategories(categories);
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
        `${process.env.REACT_APP_BE_URL}/dishes/category/${editableElement._id}`,
        options
      );
      if (response.ok) {
        alert("Category deleted Successfully");
        handleClose();
        fetchCategories();
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
            <h4>Categories: {categories.length}</h4>
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
            <Form.Label>Descriprion</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Description"
              defaultValue={editableElement.description}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="my-2 descRow">
          <Col>Name</Col>
          <Col>Cover</Col>
        </Row>
        {categories.length !== 0 ? (
          categories.map((pr) => (
            <Row className="mt-1" key={pr._id}>
              <Col>{pr.name}</Col>

              <Col className="d-flex justify-content-between">
                <img src={pr.cover} alt="cover" className="imageList" />
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
          <>No categories to show</>
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
                <Form.Label>Cover</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Place URL of image or upload one with button below"
                  defaultValue={editableElement.cover}
                  onChange={(e) => setCover(e.target.value)}
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
                <Form.Label>Cover</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Place URL of image or upload one with button below"
                  onChange={(e) => setCover(e.target.value)}
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
