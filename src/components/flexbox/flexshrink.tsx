"use client";
import React, { useState, useRef, useEffect } from "react";
import Box from "./box";
import BoxGroup from "./boxgroup";

const boxColors = ["bg-orange-300", "bg-orange-400", "bg-orange-500"];

const FlexShrinkcomponent = () => {
  const [flexShrinkValues, setFlexShrinkValues] = useState<number[]>([0, 0, 0]); // Default: equal shrink
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const minWidth = 50; // Minimum allowed width

  // Compute initial base width (1/3 of available space + 10px extra)
  const baseShrinkWidth = containerWidth / 3 + 20;

  // Compute total width before shrinking (should slightly exceed containerWidth)
  const totalBaseWidth = baseShrinkWidth * flexShrinkValues.length;

  // **Determine how much needs to be shrunk**
  const shrinkSpace = Math.max(0, totalBaseWidth - containerWidth); // Extra space that needs to be removed

  // Compute total shrink factor (sum of shrink values)
  const totalShrinkFactor = flexShrinkValues.reduce(
    (sum, shrink) => sum + shrink,
    0,
  );

  const boxWidthsShrink = flexShrinkValues.map((shrink) => {
    if (shrinkSpace === 0 || totalShrinkFactor === 0) return baseShrinkWidth; // No shrinking needed

    const shrinkRatio = shrink / totalShrinkFactor; // Proportional shrinking
    const shrinkAmount = shrinkSpace * shrinkRatio; // Amount removed
    return Math.max(baseShrinkWidth - shrinkAmount, minWidth); // Prevents over-shrinking
  });

  const boxLeftPositionsShrink = boxWidthsShrink.map((_, index) => {
    return index === 0
      ? 0 // First box starts at 16px padding
      : boxWidthsShrink.slice(0, index).reduce((sum, width) => sum + width, 0); // Add widths + 16px gap
  });

  // Get container width on mount and when justifyContent changes
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const updateFlexShrink = (index: number, newValue: number) => {
    setFlexShrinkValues((prev) => {
      const updated = [...prev];
      updated[index] = newValue;
      return updated;
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {flexShrinkValues.map((shrink, index) => (
          <div key={index} className="flex flex-col items-center">
            <span>Box {index + 1}</span>
            <input
              type="number"
              value={shrink}
              min="0"
              max="10"
              onChange={(e) =>
                updateFlexShrink(index, parseInt(e.target.value) || 0)
              }
              className="border rounded p-1 w-[60px] text-center"
            />
          </div>
        ))}
      </div>
      <BoxGroup containerRef={containerRef} height={136}>
        {boxWidthsShrink.map((width, index) => (
          <Box
            key={index}
            left={boxLeftPositionsShrink[index]}
            width={width}
            bgColor={boxColors[index % boxColors.length]}
            label={flexShrinkValues[index].toString()}
          />
        ))}
      </BoxGroup>
    </div>
  );
};

export default FlexShrinkcomponent;
