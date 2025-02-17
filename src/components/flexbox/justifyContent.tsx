"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { JustifyContent, GapSize } from "./types";

const justifyContentButtons = [
  { property: "flex-start", type: JustifyContent.start },
  { property: "flex-end", type: JustifyContent.end },
  { property: "center", type: JustifyContent.center },
  { property: "space-between", type: JustifyContent.between },
  { property: "space-around", type: JustifyContent.around },
  { property: "space-evenly", type: JustifyContent.evenly },
];

const JustifyContentComponent = () => {
  const [justifyContent, setJustifyContent] = useState<JustifyContent>(
    JustifyContent.start,
  );

  const [containerWidth, setContainerWidth] = useState(0);
  const [gap, setGap] = useState<GapSize>(GapSize.small);

  const containerRef = useRef<HTMLDivElement | null>(null);
  // Get container width on mount and when justifyContent changes
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [justifyContent]);

  const boxPositions = useMemo(() => {
    const boxWidth = 100;
    const totalBoxes = 3;
    const gapValue = parseInt(gap); // Convert px string to number

    switch (justifyContent) {
      case JustifyContent.start:
        return [16, 16 + boxWidth + gapValue, 16 + 2 * (boxWidth + gapValue)];

      case JustifyContent.center: {
        const start =
          (containerWidth -
            (totalBoxes * boxWidth + (totalBoxes - 1) * gapValue)) /
          2;
        return [
          start,
          start + boxWidth + gapValue,
          start + 2 * (boxWidth + gapValue),
        ];
      }

      case JustifyContent.end:
        return [
          containerWidth - 16 - boxWidth * 3 - gapValue * 2,
          containerWidth - 16 - boxWidth * 2 - gapValue,
          containerWidth - 16 - boxWidth,
        ];

      case JustifyContent.between:
        return [
          16,
          containerWidth / 2 - boxWidth / 2,
          containerWidth - 16 - boxWidth,
        ];

      case JustifyContent.around:
        return [
          containerWidth * (1 / 6) - boxWidth / 2,
          containerWidth * (3 / 6) - boxWidth / 2,
          containerWidth * (5 / 6) - boxWidth / 2,
        ];

      case JustifyContent.evenly:
        return [
          containerWidth * (1 / 4) - boxWidth / 2,
          containerWidth * (2 / 4) - boxWidth / 2,
          containerWidth * (3 / 4) - boxWidth / 2,
        ];

      default:
        return [16, 136, 252];
    }
  }, [justifyContent, gap, containerWidth]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {justifyContentButtons.map((item) => (
          <button
            key={item.type}
            className={`p-1 border rounded w-[100px] hover:border-orange-300 hover:text-orange-300 ${
              justifyContent === item.type
                ? " text-orange-300 border-orange-300"
                : ""
            }`}
            onClick={() => setJustifyContent(item.type)}
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
          return (
            <div
              key={index}
              className="absolute rounded w-[100px] h-[100px] bg-orange-300 transition-all duration-500 ease-in-out flex justify-center items-center "
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

export default JustifyContentComponent;
