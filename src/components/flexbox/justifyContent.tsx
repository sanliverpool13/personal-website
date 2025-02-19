"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { JustifyContent, GapSize } from "./types";
import ToggleButtonGroup from "./ToggleButtonGroup";
import BoxGroup from "./boxgroup";
import Box from "./box";

const justifyContentOptions = [
  { type: JustifyContent.start, label: "Flex Start" },
  { type: JustifyContent.end, label: "Flex End" },
  { type: JustifyContent.center, label: "Center" },
  { type: JustifyContent.between, label: "Space Between" },
  { type: JustifyContent.around, label: "Space Around" },
  { type: JustifyContent.evenly, label: "Space Evenly" },
];

const JustifyContentComponent = () => {
  const [justifyContent, setJustifyContent] = useState<JustifyContent>(
    JustifyContent.start,
  );

  const [containerWidth, setContainerWidth] = useState(0);

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
    const gapValue = parseInt(GapSize.xlarge); // Convert px string to number

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
  }, [justifyContent, containerWidth]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <ToggleButtonGroup
          label="Justify-Content"
          options={justifyContentOptions}
          selected={justifyContent}
          onChange={setJustifyContent}
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

export default JustifyContentComponent;
