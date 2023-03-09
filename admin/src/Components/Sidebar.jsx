import React from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  return (
    <Col xs={2}>
      <div className="my-4">Logo</div>
      <div className="mx-auto max-w-lg">
        <div className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <details className="group" open>
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Statistic
              <div className="text-secondary-500 ml-2"></div>
            </summary>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Sales
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Customers
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Workers
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Tables
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Cheques
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Payments
            </div>
          </details>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Finance
              <div className="text-secondary-500 ml-2"></div>
            </summary>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Transactions
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Reports
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Salaries
            </div>
          </details>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Menu
              <div className="text-secondary-500 ml-2"></div>
            </summary>
            <div
              className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2"
              onClick={() => navigate("/main/products")}
            >
              Products
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Flow Charts
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Ingridients
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Semi-finished Products
            </div>
            <div
              className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2"
              onClick={() => navigate("/main/categories")}
            >
              Products Categories
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Ingridients Categories
            </div>
          </details>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Warehouse
              <div className="text-secondary-500 ml-2"></div>
            </summary>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Remains
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Supplies
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Decommissioning
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Inventory
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Suppliers
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Warehouses
            </div>
          </details>{" "}
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Marketing
              <div className="text-secondary-500 ml-2"></div>
            </summary>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Customers
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Customer groups
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Actions
            </div>
          </details>{" "}
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Access
              <div className="text-secondary-500 ml-2"></div>
            </summary>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Workers
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Positions
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Terminals
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Integrations
            </div>
          </details>{" "}
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between p-2 text-lg font-medium text-secondary-900 group-open:bg-gray-50">
              Settings
              <div className="text-secondary-500 ml-2"></div>
            </summary>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Main Settings
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Payments
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Orders
            </div>
            <div
              className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2"
              onClick={() => navigate("/main/tables")}
            >
              Tables
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Security
            </div>
            <div className="border-t border-t-gray-100 p-2 text-secondary-500 ml-2">
              Cheque
            </div>
          </details>
        </div>
      </div>
      <div className="d-flex align-items-center mt-2">
        <img src={user.avatar} alt="" className="userAva" />{" "}
        <h4 className="mt-2 ml-2">{user.name}</h4>
      </div>
    </Col>
  );
}
