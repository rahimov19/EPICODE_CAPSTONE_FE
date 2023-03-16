import React from "react";
import GridLayout from "react-grid-layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TablesComp() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const layout = useSelector((state) => state.menu.tablePositions);

  return (
    <GridLayout
      className="layout gridTables"
      isDraggable={false}
      isResizable={false}
      layout={layout}
      cols={40}
      rowHeight={40}
      width={1400}
      height={1200}
      autoSize={true}
      compactType={null}
    >
      {layout.map((table) => (
        <div
          key={table.i}
          className={
            !table.active || table.userId === user._id
              ? "table"
              : "table tableBusy"
          }
          onClick={() =>
            !table.active || table.userId === user._id
              ? navigate("/order", { state: { table } })
              : console.log("321")
          }
        >
          <div>
            <p>{table.tableName}</p>
            <p>{table.userName}</p>
          </div>
        </div>
      ))}
    </GridLayout>
  );
}
