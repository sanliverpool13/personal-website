"use client";
import React, { useState, useRef, useEffect } from "react";

const boxColors = ["bg-orange-300", "bg-orange-400", "bg-orange-500"];
const Flexgrowcomponent = () => {
  const [flexGrowValues, setFlexGrowValues] = useState<number[]>([0, 0, 0]); // Default: equal growth
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const baseWidth = 100; // Minimum width for all boxes
  const padding = 32;
  const defaultGap = 16;

  // Step 1: Find total space that can grow
  const totalFlexGrow = flexGrowValues.reduce(
    (sum, val) => sum + (val > 0 ? val : 0),
    0,
  );

  // Step 2: Calculate remaining space after assigning base width
  const usedSpace =
    flexGrowValues.length * baseWidth +
    padding +
    (flexGrowValues.length - 1) * defaultGap; // Total space occupied by fixed-size boxes
  const remainingSpace = Math.max(0, containerWidth - usedSpace); // Prevent negative space

  // Step 3: Compute final widths
  const boxWidths = flexGrowValues.map((grow) => {
    return grow > 0
      ? (grow / totalFlexGrow) * remainingSpace + baseWidth // Growable boxes get extra space
      : baseWidth; // Non-growing boxes keep the base width
  });
  const boxLeftPositions = boxWidths.map((_, index) => {
    return index === 0
      ? 16 // First box starts at 16px
      : boxWidths.slice(0, index).reduce((sum, width) => sum + width + 16, 16); // Add widths + 16px gap
  });

  // Get container width on mount and when justifyContent changes
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const updateFlexGrow = (index: number, newValue: number) => {
    setFlexGrowValues((prev) => {
      const updated = [...prev];
      updated[index] = newValue;
      return updated;
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {flexGrowValues.map((grow, index) => (
          <div key={index} className="flex flex-col items-center">
            <span>Box {index + 1}</span>
            <input
              type="number"
              value={grow}
              min="0"
              max="10"
              onChange={(e) =>
                updateFlexGrow(index, parseInt(e.target.value) || 0)
              }
              className="border rounded p-1 w-[60px] text-center"
            />
          </div>
        ))}
      </div>
      <div
        ref={containerRef}
        className="relative border rounded transition-all duration-500 ease-in-out h-[136px]"
      >
        {boxWidths.map((width, index) => (
          <div
            key={index}
            className={`absolute rounded h-[100px] flex items-center justify-center text-white text-xl transition-all duration-500 ease-in-out ${
              boxColors[index % boxColors.length]
            }`}
            style={{
              left: `${boxLeftPositions[index]}px`,
              width: `${width}px`,
              top: "16px",
            }}
          >
            {flexGrowValues[index]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flexgrowcomponent;
