"use client";
import { useState } from "react";
import { Direction } from "./types";
import ToggleButtonGroup from "./ToggleButtonGroup";
import BoxGroup from "./boxgroup";
import Box from "./box";

const flexDirectionOptions = [
  { type: Direction.Row, label: "Row" },
  { type: Direction.Column, label: "Column" },
];

const FlexDirectionComponent = () => {
  const [flexDirection, setFlexDirection] = useState<Direction>(Direction.Row);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <ToggleButtonGroup
          label="Direction"
          options={flexDirectionOptions}
          selected={flexDirection}
          onChange={setFlexDirection}
        />
      </div>

      <BoxGroup height={flexDirection === Direction.Row ? 132 : 380}>
        <Box key={0} left={16} top={16} />
        <Box
          key={1}
          left={flexDirection === Direction.Row ? 132 : 16}
          top={flexDirection === Direction.Column ? 132 : 16}
        />
        <Box
          key={2}
          left={flexDirection === Direction.Row ? 248 : 16}
          top={flexDirection === Direction.Column ? 248 : 16}
        />
      </BoxGroup>
    </div>
  );
};

export default FlexDirectionComponent;
