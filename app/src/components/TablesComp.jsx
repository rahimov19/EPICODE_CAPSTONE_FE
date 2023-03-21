import React from "react";
import ResponsiveGridLayout from "react-grid-layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TablesComp() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const layout = useSelector((state) => state.menu.tablePositions);

  return (
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
      width={window.innerWidth}
      breakpoints={{ lg: 1500, md: 996, sm: 768, xs: 480, xxs: 0 }}
    >
      {layout.map((table) => (
        <div
          key={table.i}
          className={
            !table.active || table.userId === user._id ? "table" : "tableBusy"
          }
          onClick={() =>
            !table.active || table.userId === user._id
              ? navigate("/order", { state: { table } })
              : console.log("321")
          }
        >
          <div
            className={
              !table.active || table.userId === user._id
                ? "tableP"
                : "tableBusyP"
            }
          >
            <p>{table.tableName}</p>
            <p>{table.userName}</p>
          </div>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
