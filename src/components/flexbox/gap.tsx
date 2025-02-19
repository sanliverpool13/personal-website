"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { GapSize } from "./types";
import ToggleButtonGroup from "./ToggleButtonGroup";
import Box from "./box";
import BoxGroup from "./boxgroup";

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
        <ToggleButtonGroup
          label="Gap"
          options={gapOptions}
          selected={gap}
          onChange={setGap}
        />
      </div>
      <BoxGroup containerRef={containerRef} height={136}>
        {boxPositions.map((left, index) => (
          <Box key={index} left={left} />
        ))}
      </BoxGroup>
    </div>
  );
};

export default GapComponent;
