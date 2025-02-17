"use client";
import { useState } from "react";
import { Direction } from "./types";

const flexDirectionOptions = [
  { type: Direction.Row, label: "Row" },
  { type: Direction.Column, label: "Column" },
];

const FlexDirectionComponent = () => {
  const [flexDirection, setFlexDirection] = useState<Direction>(Direction.Row);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {flexDirectionOptions.map((option) => (
          <button
            key={option.type}
            className={`p-1 border rounded w-[100px] hover:border-orange-300 hover:text-orange-300 ${
              flexDirection === option.type
                ? "text-orange-300 border-orange-300"
                : ""
            }`}
            onClick={() => setFlexDirection(option.type)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div
        className={`relative  border rounded transition-all duration-500 ease-in-out`}
        style={{
          height: flexDirection === Direction.Row ? "132px" : "380px",
          width: flexDirection === Direction.Row ? "100%" : "132px",
        }}
      >
        {/* Box 1 */}
        <div
          className="absolute rounded w-[100px] h-[100px] bg-orange-300 transition-all duration-500 ease-in-out"
          style={{
            left: "16px",
            top: "16px",
          }}
        ></div>
        {/* Box 2 */}
        <div
          className="absolute rounded w-[100px] h-[100px] bg-orange-300 transition-all duration-500 ease-in-out "
          style={{
            left: flexDirection === Direction.Row ? "132px" : "16px",
            top: flexDirection === Direction.Column ? "132px" : "16px",
          }}
        ></div>
        {/* Box 3 */}
        <div
          className="absolute rounded w-[100px] h-[100px] bg-orange-300 transition-all duration-500 ease-in-out "
          style={{
            left: flexDirection === Direction.Row ? "248px" : "16px",
            top: flexDirection === Direction.Column ? "248px" : "16px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default FlexDirectionComponent;
