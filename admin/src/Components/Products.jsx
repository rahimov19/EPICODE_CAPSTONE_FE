/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.user.accessToken);
  const [show, setShow] = useState(false);
  const [editableElement, setEditableElement] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState({});
  const [bulkProducts, setBulkProducts] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("Category");

  useEffect(() => {
    filterProducts();
  }, [filterQuery]);

  useEffect(() => {
    if (editableElement.name) {
      setName(editableElement.name);
      setPrice(editableElement.price);
      setCostPrice(editableElement.costPrice);
      setDescription(editableElement.description);
      setImage(editableElement.image);
      setCategory(editableElement.category.name);
    }
  }, [editableElement]);

  useEffect(() => {
    filterByCategories();
  }, [filterCategory]);

  const filterByCategories = () => {
    if (filterCategory === "Category") {
      setProducts(bulkProducts);
    } else {
      const filteredProducts = bulkProducts.filter(
        (pr) => pr.category.name === filterCategory
      );
      setProducts(filteredProducts);
    }
  };

  const filterProducts = () => {
    if (filterQuery.length !== 0) {
      const filteredProducts = bulkProducts.filter((pr) =>
        pr.name.toLowerCase().includes(filterQuery)
      );
      setProducts(filteredProducts);
    } else {
      setProducts(bulkProducts);
    }
  };
  const submitHandler = async () => {
    const categoryToFind = categories.filter((c) => c.name === category);
    const product = {
      name,
      price,
      costPrice,
      description,
      image,
      category: categoryToFind[0]._id,
    };

    if (editableElement.name) {
      try {
        const options = {
          method: "PUT",
          body: JSON.stringify(product),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/dishes/${editableElement._id}`,
          options
        );
        if (response.ok) {
          fetchProducts();
          handleClose();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(
          `${process.env.REACT_APP_BE_URL}/dishes`,
          options
        );
        if (response.ok) {
          fetchProducts();
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
    fetchProducts();
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
      const dishes = await response.json();

      setCategories(dishes);
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
        `${process.env.REACT_APP_BE_URL}/dishes/${editableElement._id}`,
        options
      );
      if (response.ok) {
        alert("Dish deleted Successfully");
        handleClose();
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/dishes`,
        options
      );
      const dishes = await response.json();

      setProducts(dishes);
      setBulkProducts(dishes);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };
  return (
    <>
      <Col className="ml-3 mt-2">
        <Row className="d-flex justify-content-between my-4">
          <div>
            <h4>Products: {products.length}</h4>
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
              placeholder="Filter Products"
              defaultValue={editableElement.description}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option>Category</option>
              {categories.map((cat) => (
                <option key={cat._id}>{cat.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
        <Row className="my-2 descRow">
          <Col>Name</Col>
          <Col>Category</Col>
          <Col>Cost Price</Col>
          <Col>Price</Col>
        </Row>
        {products.length !== 0 ? (
          products.map((pr) => (
            <Row className="mt-1" key={pr._id}>
              <Col>{pr.name}</Col>
              <Col>{pr.category.name}</Col>
              <Col>{pr.costPrice}</Col>
              <Col className="d-flex justify-content-between">
                {pr.price}{" "}
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
          <>No products to show</>
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
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Product Price"
                  defaultValue={editableElement.price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Cost Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Product Cost Price"
                  defaultValue={editableElement.costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Descriprion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Description"
                  defaultValue={editableElement.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Place URL of image or upload one with button below"
                  defaultValue={editableElement.image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat._id}>{cat.name}</option>
                  ))}
                </Form.Control>
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
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Product Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Cost Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Product Cost Price"
                  onChange={(e) => setCostPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Descriprion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Place URL of image or upload one with button below"
                  onChange={(e) => setImage(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat._id}>{cat.name}</option>
                  ))}
                </Form.Control>
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
