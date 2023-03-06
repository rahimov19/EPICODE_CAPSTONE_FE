import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Order() {
  const [category, setCategory] = useState({});
  const [menuFiltered, setMenuFiltered] = useState([]);
  const categoryList = useSelector((state) => state.menu.categories);
  const menu = useSelector((state) => state.menu.menu);
  const location = useLocation();
  const table = location.state.table;
  console.log(category);
  useEffect(() => {
    filterMenu();
  }, [category]);

  const filterMenu = () => {
    let filteredMenu = [];
    console.log(menu);
    if (category.name) {
      filteredMenu = menu.filter((dish) => dish.category._id === category._id);
      setMenuFiltered(filteredMenu);
    } else {
      console.log("nothing to filter");
    }
  };

  return (
    <Container fluid>
      <Row>
        <h4>{table.i}</h4>
        <h5>{table.userId}</h5>
      </Row>
      <Row>
        <Col xs={8}>
          <Row className="d-flex ">
            {category.name ? (
              <Row>
                {menuFiltered.map((dish) => (
                  <Col xs={3} className="mx-5">
                    <Card style={{ width: "15em" }} className="mx-4">
                      <Card.Img variant="top" src={dish.cover} />
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
        <Col xs={4}>World</Col>
      </Row>
    </Container>
  );
}
