"use client";
import React, { ReactNode, useRef, useEffect, useState } from "react";

interface BoxGroupProps {
  children: ReactNode;
  height?: number;
  containerRef?: React.RefObject<HTMLDivElement>;
}

const BoxGroup: React.FC<BoxGroupProps> = ({
  children,
  height = 136,
  containerRef,
}) => {
  return (
    <div
      ref={containerRef}
      className="relative border rounded transition-all duration-500 ease-in-out"
      style={{ height: `${height}px` }}
    >
      {children}
    </div>
  );
};

export default BoxGroup;
