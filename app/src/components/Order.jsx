/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchChequesAction, updateTableState } from "../redux/actions";
import { intlFormat } from "date-fns";

export default function Order() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const layout = useSelector((state) => state.menu.tablePositions);
  const user = useSelector((state) => state.user.user);
  const categoryList = useSelector((state) => state.menu.categories);
  const menu = useSelector((state) => state.menu.menu);
  const token = useSelector((state) => state.user.accessToken);

  const table = location.state.table;

  const [category, setCategory] = useState({});
  const [menuFiltered, setMenuFiltered] = useState([]);
  const [check, setCheck] = useState([]);
  const [show, setShow] = useState(false);
  const [sum, setSum] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountNumber, setDiscountNumber] = useState(0);
  const [tip, setTip] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [change, setChange] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    filterMenu();
  }, [category]);

  useEffect(() => {
    if (table.cheque) {
      setCheck(table.cheque.check);
      setSum(table.cheque.total);
    }
  }, []);

  // useEffect(() => {
  //   setDiscountPercent(Math.ceil(100 / (sum / discountNumber)));
  // }, [discountNumber]);

  useEffect(() => {
    setDiscountNumber(Math.ceil(sum / (100 / discountPercent)));
  }, [discountPercent]);

  const filterMenu = () => {
    let filteredMenu = [];
    if (category.name) {
      filteredMenu = menu.filter((dish) => dish.category._id === category._id);
      setMenuFiltered(filteredMenu);
    } else {
      console.log("nothing to filter");
    }
  };

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

  const saveChequeFunc = () => {
    const currentTable = table;
    const allTables = layout.slice();
    currentTable.cheque = {
      check,
      userId: user._id,
      userName: user.name,
      total: sum,
      table: currentTable.tableName,
      creationTime: new Date(),
      numberOfGuests: 1,
    };
    currentTable.active = true;
    currentTable.userId = user._id;
    currentTable.userName = user.name;
    const tableIndex = allTables.findIndex((tb) => tb.i === table.i);
    allTables[tableIndex] = currentTable;

    dispatch(updateTableState(allTables));
    navigate("/login");
  };

  const deleteChequeFunc = () => {
    const currentTable = table;
    const allTables = layout.slice();
    delete currentTable.cheque;
    currentTable.active = false;
    currentTable.userId = "";
    currentTable.userName = "";
    const tableIndex = allTables.findIndex((tb) => tb.i === table.i);
    allTables[tableIndex] = currentTable;
    console.log(allTables);
    dispatch(updateTableState(allTables));
    navigate("/tables");
  };

  const closeChequeFunc = async () => {
    const chequeObj = {
      type: "House",
      dishes: [],
      createdBy: user._id,
      discount: discountPercent,
      table: table.tableName,
      numberOfGuests: 1,
      chequeTotal: sum,
      amountPaid: amountPaid,
      status: "",
    };
    if (change < 0) {
      chequeObj.status = "Paid";
    } else {
      chequeObj.status = "Closed";
    }
    check.map((ch) =>
      chequeObj.dishes.push({
        dish: ch.dish._id,
        quantity: ch.quantity,
        total: ch.dish.price * ch.quantity,
      })
    );

    try {
      const options = {
        method: "POST",
        body: JSON.stringify(chequeObj),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/cheques`,
        options
      );
      if (response.ok) {
        dispatch(fetchChequesAction(token));
        deleteChequeFunc();
        handleClose();
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="orderCont">
      <div className={check.length > 0 ? "buttonsDiv" : "d-none"}>
        <Button onClick={() => saveChequeFunc()}>Save Cheque</Button>
        <Button variant="danger" onClick={() => deleteChequeFunc()}>
          Delete Cheque
        </Button>
        <Button variant="info" onClick={handleShow}>
          Close Cheque
        </Button>
      </div>
      <div className={category.name ? "backDiv" : "d-none"}>
        <Button onClick={() => setCategory({})}>Back</Button>
      </div>
      <Row>
        <div
          className="m-4 w-100 d-flex flex-row-reverse buttonTopLogout"
          onClick={() => navigate("/tables")}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </div>
      </Row>
      <Row>
        <Col xs={8}>
          <Row className="d-flex ">
            {category.name ? (
              <Row className="ml-5 mr-3 w-100">
                {menuFiltered.map((dish) => (
                  <Col xs={4}>
                    <Card
                      style={{ width: "100%" }}
                      onClick={() => addToCheck(dish)}
                    >
                      <Card.Body className="d-flex justify-content-between dishCard">
                        <Col xs={7}>
                          <h5 className="dishName">{dish.name}</h5>
                          <h5>{dish.price}</h5>
                        </Col>
                        <Col xs={5}>
                          <img
                            src={dish.image}
                            alt="dish"
                            className="dishImage"
                          />
                        </Col>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              categoryList.map((cat) => (
                <Col
                  xl={3}
                  lg={4}
                  md={6}
                  xs={12}
                  onClick={() => setCategory(cat)}
                >
                  <Card style={{ width: "15em" }} className="mx-4">
                    <Card.Img
                      variant="top"
                      src={cat.cover}
                      className="cardImage"
                    />
                    <Card.Body>
                      <Card.Title>{cat.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
        <Col className="orderModal">
          {" "}
          {check.length > 0 ? (
            <div>
              <h2 className="currentOrder">Current Order</h2>
              <h3 className="tableOrder">Table: {table.tableName}</h3>{" "}
              <div>
                <Row className="orderRow d-flex justify-content-between">
                  <Col xl={5} lg={4} md={3}>
                    <h5 className="orderCol">Name</h5>
                  </Col>
                  <Col xl={2} lg={2} md={3}>
                    <h5 className="orderCol">Price</h5>
                  </Col>
                  <Col xl={2} lg={2} md={2}>
                    <h5 className="orderCol">Q-ty</h5>
                  </Col>
                  <Col xl={2} lg={3} md={3}>
                    <h5 className="orderCol">Total</h5>
                  </Col>
                  <Col xl={1} lg={1} md={1}></Col>
                </Row>
                {check.map((dish) => (
                  <Row className="orderList d-flex justify-content-between chequeRow">
                    <Col xs={5}>
                      <h5>{dish.dish.name}</h5>
                    </Col>
                    <Col xs={2}>
                      <h5>{dish.dish.price}</h5>
                    </Col>
                    <Col xs={2}>
                      <h5>{dish.quantity}</h5>
                    </Col>
                    <Col xs={2}>
                      <h5>{dish.quantity * dish.dish.price}</h5>
                    </Col>
                    <Col xs={1}>
                      <Button
                        className="removeButton"
                        variant="danger"
                        onClick={() => removeFromCheck(dish)}
                      >
                        -
                      </Button>
                    </Col>
                  </Row>
                ))}
              </div>
              <h3 className="tableOrder tableTotal">Total: {sum}</h3>
            </div>
          ) : (
            <></>
          )}
        </Col>
      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        className="closeChequeModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Close Cheque</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Table: {table.tableName}</h5>
            <h5>Waiter: {user.name}</h5>
            <h5>
              Guest: <input type={"text"} className="guestChequeInput"></input>
            </h5>
            <h5>
              Opened:{" "}
              {intlFormat(
                Date.now(),
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                },
                {
                  locale: "en-EN",
                }
              )}
            </h5>
          </div>

          <Row className="d-flex justify-content-between chequeRowNaming mt-5">
            <Col xs={5}>
              <h6>Name</h6>
            </Col>
            <Col xs={2}>
              <h6>Price</h6>
            </Col>
            <Col xs={2}>
              <h6>Quantity</h6>
            </Col>
            <Col xs={2}>
              <h6>Total</h6>
            </Col>
          </Row>

          {check.map((dish) => (
            <Row className="d-flex justify-content-between chequeRow">
              <Col xs={5}>
                <h6>{dish.dish.name}</h6>
              </Col>
              <Col xs={2}>
                <h6>{dish.dish.price}</h6>
              </Col>
              <Col xs={2}>
                <h6>{dish.quantity}</h6>
              </Col>
              <Col xs={2}>
                <h6>{dish.quantity * dish.dish.price}</h6>
              </Col>
            </Row>
          ))}

          <div className="mt-4">
            <h5 className="">Total: {sum}</h5>
            <h5>
              Discount:{" "}
              <input
                type={"number"}
                value={discountPercent}
                className={"discountInput"}
                onChange={(e) => setDiscountPercent(parseInt(e.target.value))}
                // onFocus={() => setDiscountPercent("")}
              />{" "}
              % or{" "}
              <input
                type={"number"}
                value={discountNumber}
                onChange={(e) => {
                  setDiscountNumber(parseInt(e.target.value));
                }}
                onFocus={() => {
                  setDiscountPercent("");
                  setDiscountNumber("");
                }}
                className={"discountInput"}
              />{" "}
              $
            </h5>
            <h5>
              Tip:
              <input
                type={"number"}
                value={tip}
                onChange={(e) => setTip(parseInt(e.target.value))}
                onFocus={() => setTip("")}
                className={"discountInput"}
              />
              $
            </h5>

            <h5>Total with disount: {sum - discountNumber + tip}</h5>

            <h5>
              Paid:{" "}
              <input
                type={"number"}
                value={amountPaid}
                onChange={(e) => {
                  setAmountPaid(parseInt(e.target.value));
                  setTotalSum(sum - discountNumber + tip);
                }}
                onFocus={() => setAmountPaid("")}
                className={"discountInput"}
              />
              $
            </h5>

            <h5>
              Change:{" "}
              <input
                type={"number"}
                value={amountPaid - totalSum}
                onChange={(e) => setChange(parseInt(e.target.value))}
                className={"discountInput"}
              />
              $
            </h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="primary">Print Cheque</Button>

          <Button variant="primary" onClick={() => closeChequeFunc()}>
            Close Cheque
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
