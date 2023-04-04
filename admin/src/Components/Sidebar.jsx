/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveTokenAction } from "../redux/actions";
import Collapse, { Panel } from "rc-collapse";
import motion from "./_util/motionUtil";

export default function Sidebar() {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.accessToken);

  const [activeKey, setActiveKey] = useState(["0"]);
  const arrowPath =
    "M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88" +
    ".5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3." +
    "6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-0.7 5." +
    "2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z";
  function expandIcon({ isActive }) {
    return (
      <i style={{ marginRight: ".5rem" }}>
        <svg
          viewBox="0 0 1024 1024"
          width="1em"
          height="1em"
          fill="currentColor"
          style={{
            verticalAlign: "-.125em",
            transition: "transform .2s",
            transform: `rotate(${isActive ? 90 : 0}deg)`,
          }}
        >
          <path d={arrowPath} />
        </svg>
      </i>
    );
  }
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Col xs={2} className="sidebar">
      <div className="sidebarDiv">
        <div className="my-4 d-flex align-items-end">
          <img
            src="/54580d586a59e096a5813d643c2d1665.png"
            className="logo"
            alt="logo"
          />

          <h3 className="mt-1">
            {" "}
            <b>MopAdmin </b>
          </h3>
        </div>

        <Collapse
          accordion={true}
          onChange={setActiveKey}
          activeKey={activeKey}
          expandIcon={expandIcon}
          openMotion={motion}
        >
          <Panel header="Statistic">
            <div
              className=" p-2 ml-2 sidebarNavName"
              onClick={() => navigate("/main/sales")}
            >
              Sales
            </div>
            <div className=" p-2 ml-2 sidebarNavName">Customers</div>
            <div className=" p-2 ml-2 sidebarNavName">Workers</div>
            <div className=" p-2 ml-2 sidebarNavName">Tables</div>
            <div className=" p-2 ml-2 sidebarNavName">Cheques</div>
            <div className=" p-2 ml-2 sidebarNavName">Payments</div>
          </Panel>
          <Panel header="Finance">
            <div className=" p-2 ml-2 sidebarNavName">Transactions</div>
            <div className=" p-2 ml-2 sidebarNavName">Reports</div>
            <div className=" p-2 ml-2 sidebarNavName">Salaries</div>
          </Panel>
          <Panel header="Menu">
            <div
              className=" p-2 ml-2 sidebarNavName"
              onClick={() => {
                navigate("/main/products");
              }}
            >
              Products
            </div>
            <div className=" p-2 ml-2 sidebarNavName">Flow Charts</div>
            <div className=" p-2 ml-2 sidebarNavName">Ingridients</div>
            <div className=" p-2 ml-2 sidebarNavName">
              Semi-finished Products
            </div>
            <div
              className=" p-2 ml-2 sidebarNavName"
              onClick={() => navigate("/main/categories")}
            >
              Products Categories
            </div>
            <div className=" p-2 ml-2 sidebarNavName">
              Ingridients Categories
            </div>
          </Panel>
          <Panel header="Warehouse">
            <div className=" p-2 ml-2 sidebarNavName">Remains</div>
            <div className=" p-2 ml-2 sidebarNavName">Supplies</div>
            <div className=" p-2 ml-2 sidebarNavName">Decommissioning</div>
            <div className=" p-2 ml-2 sidebarNavName">Inventory</div>
            <div className=" p-2 ml-2 sidebarNavName">Suppliers</div>
            <div className=" p-2 ml-2 sidebarNavName">Warehouses</div>
          </Panel>
          <Panel header="Marketing">
            <div className=" p-2 ml-2 sidebarNavName">Customers</div>
            <div className=" p-2 ml-2 sidebarNavName">Customer groups</div>
            <div className=" p-2 ml-2 sidebarNavName">Actions</div>
          </Panel>

          <Panel header="Access">
            <div
              className=" p-2 ml-2 sidebarNavName"
              onClick={() => navigate("/main/workers")}
            >
              Workers
            </div>
            <div
              className=" p-2 ml-2 sidebarNavName"
              onClick={() => navigate("/main/positions")}
            >
              Positions
            </div>
            <div
              className=" p-2 ml-2 sidebarNavName"
              onClick={() => navigate("/main/terminals")}
            >
              Terminals
            </div>
            <div className=" p-2 ml-2 sidebarNavName">Integrations</div>
          </Panel>
          <Panel header="Settings">
            <div className=" p-2 ml-2 sidebarNavName">Main Settings</div>
            <div className=" p-2 ml-2 sidebarNavName">Payments</div>
            <div className=" p-2 ml-2 sidebarNavName">Orders</div>
            <div
              className=" p-2 ml-2 sidebarNavName"
              onClick={() => navigate("/main/tables")}
            >
              Tables
            </div>
            <div className=" p-2 ml-2 sidebarNavName">Security</div>
            <div className=" p-2 ml-2 sidebarNavName">Cheque</div>
          </Panel>
        </Collapse>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-2 userPanel">
        <div className="d-flex align-items-center mt-2">
          <img src={user.avatar} alt="" className="userAva" />{" "}
          <h5 className="mt-2 ml-2">{user.name}</h5>
        </div>
        <div onClick={() => dispatch(saveTokenAction(""))}>
          <i className="bi bi-door-open-fill"></i>
        </div>
      </div>
    </Col>
  );
}
