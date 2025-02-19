"use client";
import React from "react";

interface BoxProps {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  bgColor?: string;
  label?: string;
}

const Box: React.FC<BoxProps> = ({
  left = 16,
  top = 16,
  width = 100,
  height = 100,
  bgColor = "bg-orange-300",
  label = "",
}) => {
  return (
    <div
      className={`absolute rounded flex items-center dark:text-[#1b221d] justify-center  text-xl transition-all duration-500 ease-in-out ${bgColor}`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {label}
    </div>
  );
};

export default Box;
