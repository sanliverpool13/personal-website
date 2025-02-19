"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { AlignItems } from "./types";
import ToggleButtonGroup from "./ToggleButtonGroup";
import Box from "./box";
import BoxGroup from "./boxgroup";

const alignItemsOptions = [
  { type: AlignItems.start, label: "Flex Start" },
  { type: AlignItems.end, label: "Flex End" },
  { type: AlignItems.center, label: "Center" },
  { type: AlignItems.stretch, label: "Stretch" },
  { type: AlignItems.baseline, label: "Baseline" },
];

const boxPositions = [16, 132, 248];

const AlignItemsComponent = () => {
  const [alignItems, setAlignItems] = useState<AlignItems>(AlignItems.start);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [alignItems]);

  const boxHeights = [50, 80, 100]; // Different heights for visual effect

  const boxStyles = (index: number) => {
    let top = 16; // Default for "flex-start"
    let height = boxHeights[index];

    switch (alignItems) {
      case AlignItems.center:
        top = (136 - height) / 2;
        break;

      case AlignItems.end:
        top = 136 - height - 16;
        break;

      case AlignItems.stretch:
        height = 136 - 32; // Stretch height to full container height
        break;

      case AlignItems.baseline:
        top = index === 1 ? 40 : 16; // Custom positioning for baseline effect
        break;

      default:
        top = 16;
    }

    return { top, height };
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <ToggleButtonGroup
          label="Align Items"
          options={alignItemsOptions}
          selected={alignItems}
          onChange={setAlignItems}
        />
      </div>
      <BoxGroup containerRef={containerRef} height={136}>
        {boxPositions.map((left, index) => {
          const { top, height } = boxStyles(index);
          return (
            <Box
              key={index}
              left={left}
              top={top}
              height={height}
              label="Text"
            />
          );
        })}
      </BoxGroup>
    </div>
  );
};

export default AlignItemsComponent;
