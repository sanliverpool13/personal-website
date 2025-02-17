"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { AlignItems } from "./types";

const alignItemsButtons = [
  { property: "flex-start", type: AlignItems.start },
  { property: "flex-end", type: AlignItems.end },
  { property: "center", type: AlignItems.center },
  { property: "stretch", type: AlignItems.stretch },
  { property: "baseline", type: AlignItems.baseline },
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
        {alignItemsButtons.map((item) => (
          <button
            key={item.type}
            className={`p-1 border rounded w-[100px] hover:border-orange-300 hover:text-orange-300 ${
              alignItems === item.type
                ? " text-orange-300 border-orange-300"
                : ""
            }`}
            onClick={() => setAlignItems(item.type)}
          >
            {item.property}
          </button>
        ))}
      </div>
      <div
        ref={containerRef}
        className="relative border rounded transition-all duration-500 ease-in-out h-[136px] "
      >
        {boxPositions.map((left, index) => {
          const { top, height } = boxStyles(index);
          return (
            <div
              key={index}
              className="absolute rounded w-[100px] bg-orange-300 transition-all duration-500 ease-in-out flex justify-center items-center text-white"
              style={{
                left: `${left}px`,
                top: `${top}px`,
                height: `${height}px`,
              }}
            >
              Text
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlignItemsComponent;
