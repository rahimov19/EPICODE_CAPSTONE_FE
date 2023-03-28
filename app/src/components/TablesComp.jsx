import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import ResponsiveGridLayout from "react-grid-layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TablesComp() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user.user);
  const layout = useSelector((state) => state.menu.tablePositions);

  return (
    <div className="tableComp">
      {" "}
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        className="toastTable"
      >
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
          <small className="mr-2">Table</small>
        </Toast.Header>
        <Toast.Body>Table is alredy booked.</Toast.Body>
      </Toast>
      <ResponsiveGridLayout
        className="layout gridTables"
        isDraggable={false}
        isResizable={false}
        layout={layout}
        cols={40}
        rowHeight={40}
        height={1200}
        autoSize={true}
        compactType={null}
        width={window.innerWidth - (window.innerWidth / 100) * 2}
        breakpoints={{ lg: 1500, md: 996, sm: 768, xs: 480, xxs: 0 }}
      >
        {layout.map((table) => (
          <div
            key={table.i}
            className={
              !table.round &&
              (!table.active ||
                table.userId === user._id ||
                user.position.terminalAdmin)
                ? "table "
                : table.round &&
                  (!table.active ||
                    table.userId === user._id ||
                    user.position.terminalAdmin)
                ? "table roundTable"
                : table.round
                ? "tableBusy roundTable"
                : "tableBusy"
            }
            onClick={() =>
              !table.active ||
              table.userId === user._id ||
              user.position.terminalAdmin
                ? navigate("/order", { state: { table } })
                : setShow(true)
            }
          >
            <div
              className={
                !table.active || table.userId === user._id
                  ? "tableP"
                  : "tableBusyP"
              }
            >
              <p className="pTable">{table.tableName}</p>
              <p className="pTable">{table.userName}</p>
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
