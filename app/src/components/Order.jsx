/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function Order() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const [menuFiltered, setMenuFiltered] = useState([]);
  const [check, setCheck] = useState([]);
  const categoryList = useSelector((state) => state.menu.categories);
  const menu = useSelector((state) => state.menu.menu);
  const location = useLocation();
  const table = location.state.table;
  useEffect(() => {
    filterMenu();
  }, [category]);

  const filterMenu = () => {
    let filteredMenu = [];
    if (category.name) {
      filteredMenu = menu.filter((dish) => dish.category._id === category._id);
      setMenuFiltered(filteredMenu);
    } else {
      console.log("nothing to filter");
    }
  };
  const [sum, setSum] = useState(0);

  const findTotal = () => {
    let sumToCount = 0;
    check.forEach((dish) => {
      const dishTotal = dish.dish.price * dish.quantity;
      sumToCount += dishTotal;
    });
    setSum(sumToCount);
  };
  const addToCheck = (dish) => {
    const cheque = check;
    const changableObj = cheque.findIndex((e) => e.dish._id === dish._id);
    if (changableObj > -1) {
      cheque[changableObj] = {
        dish: dish,
        quantity: cheque[changableObj].quantity + 1,
      };
      setCheck(cheque);
      findTotal();
    } else {
      cheque.push({ dish: dish, quantity: 1 });
      setCheck(cheque);
      findTotal();
    }
  };

  const removeFromCheck = (dish) => {
    const cheque = check;
    const changableObj = cheque.findIndex((e) => e.dish._id === dish.dish._id);
    console.log(cheque[changableObj].quantity > 1);
    if (cheque[changableObj].quantity > 1) {
      cheque[changableObj] = {
        ...cheque[changableObj],
        quantity: cheque[changableObj].quantity - 1,
      };
      setCheck(cheque);
      findTotal();
    } else {
      const filteredCheque = cheque.filter((e) => e.dish._id !== dish.dish._id);
      setCheck(filteredCheque);
      findTotal();
    }
  };

  return (
    <Container fluid>
      <Row>
        <div
          className="m-4 w-100 d-flex flex-row-reverse"
          onClick={() => navigate("/login")}
        >
          {" "}
          <h5>{table.userName}</h5>
        </div>
      </Row>
      <Row>
        <Col xs={8}>
          <Row className="d-flex ">
            {category.name ? (
              <Row>
                {menuFiltered.map((dish) => (
                  <Col xs={3} className="mx-5">
                    <Card
                      style={{ width: "15em" }}
                      className="mx-4"
                      onClick={() => addToCheck(dish)}
                    >
                      <Card.Img variant="top" src={dish.image} />
                      <Card.Body>
                        <Card.Title>{dish.name}</Card.Title>
                        <h3>{dish.price}</h3>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
                <Button onClick={() => setCategory({})}>Back</Button>
              </Row>
            ) : (
              categoryList.map((cat) => (
                <Col xs={3} onClick={() => setCategory(cat)}>
                  <Card style={{ width: "15em" }} className="mx-4">
                    <Card.Img variant="top" src={cat.cover} />
                    <Card.Body>
                      <Card.Title>{cat.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
        <Col xs={4}>
          {" "}
          {check.length > 0 ? (
            <div>
              <h2>Current Order</h2>
              <h3>{table.i}</h3>{" "}
              <div>
                {check.map((dish) => (
                  <div className="d-flex justify-content-between">
                    <h5>{dish.dish.name}</h5>
                    <h5>{dish.dish.price}</h5>
                    <h5>{dish.quantity}</h5>
                    <h5>{dish.quantity * dish.dish.price}</h5>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCheck(dish)}
                    >
                      -
                    </Button>
                  </div>
                ))}
              </div>
              <h3>Total: {sum}</h3>
            </div>
          ) : (
            <></>
          )}
          <div>
            <Button>Save Cheque</Button>
            <Button variant="danger">Delete Cheque</Button>
            <Button variant="info">Print Cheque</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
