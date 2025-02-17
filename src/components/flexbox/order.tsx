"use client";
import React, { useState, useEffect } from "react";

const boxColors = ["bg-orange-300", "bg-orange-400", "bg-orange-500"];

const OrderComponent = () => {
  const [boxOrders, setBoxOrders] = useState([0, 0, 0]); // Default order
  const [positions, setPositions] = useState<number[]>([16, 136, 256]); // Initial left positions

  const updatePositions = () => {
    const sortedBoxes = [...boxOrders].sort((a, b) => a - b);
    const newPositions = sortedBoxes.map((_, index) => 16 + index * 120); // Space between elements
    setPositions(newPositions);
  };

  useEffect(() => {
    updatePositions();
  }, [boxOrders, updatePositions]);

  const changeOrder = (index: number, newOrder: number) => {
    setBoxOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders[index] = newOrder;
      return updatedOrders;
    });
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
      <div className="relative border rounded transition-all duration-500 ease-in-out h-[136px]">
        {[...boxOrders]
          .map((order, index) => ({ order, index }))
          .sort((a, b) => a.order - b.order)
          .map(({ order, index }, index2) => (
            <div
              key={index}
              className={`absolute rounded w-[100px] h-[100px] flex items-center justify-center  text-xl transition-all duration-500 ease-in-out ${
                boxColors[index % boxColors.length]
              }`}
              style={{
                left: `${positions[index2]}px`,
                top: "16px",
              }}
            >
              {order}
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderComponent;
