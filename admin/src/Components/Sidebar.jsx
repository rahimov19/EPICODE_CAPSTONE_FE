import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveTokenAction } from "../redux/actions";

export default function Sidebar() {
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setOpen(!open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Col xs={2} className="sidebar">
      <div className="my-4 d-flex align-items-end">
        <img
          src="/54580d586a59e096a5813d643c2d1665.png"
          className="logo"
          alt="logo"
        />
        <h4 className="mt-1">RMS</h4>
      </div>
      <div className="group">
        <div className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <details
            className="group"
            open={index === 1 ? true : false}
            onClick={() => setIndex(1)}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Statistic
              <div className="text-secondary-500 ml-2"></div>
            </summary>
            <div className=" p-2 ml-2 sidebarNavName">Sales</div>
            <div className=" p-2 ml-2 sidebarNavName">Customers</div>
            <div className=" p-2 ml-2 sidebarNavName">Workers</div>
            <div className=" p-2 ml-2 sidebarNavName">Tables</div>
            <div className=" p-2 ml-2 sidebarNavName">Cheques</div>
            <div className=" p-2 ml-2 sidebarNavName">Payments</div>
          </details>
          <details
            className="group"
            open={index === 2 ? true : false}
            onClick={() => setIndex(2)}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Finance
              <div className="text-secondary-500 ml-2"></div>
            </summary>
            <div className=" p-2 ml-2 sidebarNavName">Transactions</div>
            <div className=" p-2 ml-2 sidebarNavName">Reports</div>
            <div className=" p-2 ml-2 sidebarNavName">Salaries</div>
          </details>
          <details
            className="group"
            open={index === 3 ? true : false}
            onClick={() => setIndex(3)}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Menu
              <div className="text-secondary-500 ml-2"></div>
            </summary>
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
          </details>
          <details
            className="group"
            open={index === 4 ? true : false}
            onClick={() => setIndex(4)}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Warehouse
              <div className="text-secondary-500 ml-2"></div>
            </summary>
            <div className=" p-2 ml-2 sidebarNavName">Remains</div>
            <div className=" p-2 ml-2 sidebarNavName">Supplies</div>
            <div className=" p-2 ml-2 sidebarNavName">Decommissioning</div>
            <div className=" p-2 ml-2 sidebarNavName">Inventory</div>
            <div className=" p-2 ml-2 sidebarNavName">Suppliers</div>
            <div className=" p-2 ml-2 sidebarNavName">Warehouses</div>
          </details>{" "}
          <details
            className="group"
            open={index === 5 ? true : false}
            onClick={() => setIndex(5)}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Marketing
              <div className="text-secondary-500 ml-2"></div>
            </summary>
            <div className=" p-2 ml-2 sidebarNavName">Customers</div>
            <div className=" p-2 ml-2 sidebarNavName">Customer groups</div>
            <div className=" p-2 ml-2 sidebarNavName">Actions</div>
          </details>{" "}
          <details
            className="group"
            open={index === 6 ? true : false}
            onClick={() => setIndex(6)}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Access
              <div className="text-secondary-500 ml-2"></div>
            </summary>
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
          </details>{" "}
          <details
            className="group"
            open={index === 7 ? true : false}
            onClick={() => setIndex(7)}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Settings
              <div className="text-secondary-500 ml-2"></div>
            </summary>
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
          </details>
        </div>
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
