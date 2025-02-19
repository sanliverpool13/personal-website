"use client";
import React, { useState, useEffect } from "react";
import Box from "./box";
import BoxGroup from "./boxgroup";

const boxColors = ["bg-orange-300", "bg-orange-400", "bg-orange-500"];

const OrderComponent = () => {
  const [boxOrders, setBoxOrders] = useState([0, 0, 0]); // Default order
  const [positions, setPositions] = useState<number[]>([16, 136, 256]); // Initial left positions

  const updatePositions = () => {
    const sortedBoxes = [...boxOrders].sort((a, b) => a - b);
    const newPositions = sortedBoxes.map((_, index) => 16 + index * 120); // Space between elements
    setPositions(newPositions);
  };

  //   useEffect(() => {
  //     updatePositions();
  //   }, [boxOrders]);

  const changeOrder = (index: number, newOrder: number) => {
    setBoxOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders[index] = newOrder;
      return updatedOrders;
    });
    updatePositions();
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {boxOrders.map((order, index) => (
          <div key={index} className="flex flex-col items-center">
            <span>Box: {index + 1}</span>
            <input
              type="number"
              min="-2"
              max="4"
              value={order}
              onChange={(e) => changeOrder(index, parseInt(e.target.value))}
              className="border rounded p-1 w-[60px] text-center"
            />
          </div>
        ))}
      </div>
      <BoxGroup height={136}>
        {[...boxOrders]
          .map((order, index) => ({ order, index }))
          .sort((a, b) => a.order - b.order)
          .map(({ order, index }, index2) => (
            <Box
              key={index}
              left={positions[index2]}
              bgColor={boxColors[index % boxColors.length]}
              label={order.toString()}
            />
          ))}
      </BoxGroup>
    </div>
  );
};

export default OrderComponent;
