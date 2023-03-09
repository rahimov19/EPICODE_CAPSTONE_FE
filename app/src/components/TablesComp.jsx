import React from "react";
import GridLayout from "react-grid-layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function TablesComp() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const layout = [
    {
      i: "Table 1",
      x: 0,
      y: 0,
      w: 1,
      h: 2,
      active: true,
      userId: user._id,
      userName: user.name,
    },
    { i: "Table 2", x: 1, y: 0, w: 3, h: 2, active: false, userId: "" },
    {
      i: "Table 3",
      x: 4,
      y: 0,
      w: 1,
      h: 2,
      active: false,
      userId: user._id,
      userName: user.name,
    },
  ];
  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
      autoSize={true}
      height={800}
      compactType={null}
    >
      {layout.map((table) => (
        <div
          key={table.i}
          className="table"
          onClick={() =>
            table.active || table.userId === user._id
              ? navigate("/order", { state: { table } })
              : console.log("321")
          }
        >
          {table.i}
        </div>
      ))}
    </GridLayout>
  );
}
