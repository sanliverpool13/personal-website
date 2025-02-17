"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { GapSize } from "./types";

const gapOptions = [
  { type: GapSize.small, label: "4px" },
  { type: GapSize.medium, label: "8px" },
  { type: GapSize.large, label: "12px" },
  { type: GapSize.xlarge, label: "16px" },
  { type: GapSize.xxlarge, label: "32px" },
];

const GapComponent = () => {
  const [gap, setGap] = useState<GapSize>(GapSize.small);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const boxPositions = useMemo(() => {
    const boxWidth = 100;
    const totalBoxes = 3;
    const gapValue = parseInt(gap); // Convert px string to number

    return [16, 16 + boxWidth + gapValue, 16 + 2 * (boxWidth + gapValue)];
  }, [gap, containerWidth]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {gapOptions.map((item) => (
          <button
            key={item.type}
            className={`p-1 border rounded w-[100px] hover:border-orange-300 hover:text-orange-300 ${
              gap === item.type ? " text-orange-300 border-orange-300" : ""
            }`}
            onClick={() => setGap(item.type)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        ref={containerRef}
        className="relative border rounded transition-all duration-500 ease-in-out h-[136px] "
      >
        {boxPositions.map((left, index) => {
          return (
            <div
              key={index}
              className="absolute rounded w-[100px] h-[100px] bg-orange-300 transition-all duration-500 ease-in-out flex justify-center items-cente"
              style={{
                left: `${left}px`,
                top: `16px`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default GapComponent;
