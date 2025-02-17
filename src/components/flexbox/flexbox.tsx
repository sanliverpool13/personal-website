"use client";
import { useState, useMemo, useRef, useEffect } from "react";

enum FlexDirection {
  Row = "Row",
  Column = "Column",
}

enum JustifyContent {
  start = "START",
  end = "END",
  center = "CENTER",
  between = "BETWEEN",
  around = "AROUND",
  evenly = "EVENLY",
}

const flexDirectionOptions = [
  { type: FlexDirection.Row, label: "Row" },
  { type: FlexDirection.Column, label: "Column" },
];

const justifyContentButtons = [
  { property: "flex-start", type: JustifyContent.start },
  { property: "flex-end", type: JustifyContent.end },
  { property: "center", type: JustifyContent.center },
  { property: "space-between", type: JustifyContent.between },
  { property: "space-around", type: JustifyContent.around },
  { property: "space-evenly", type: JustifyContent.evenly },
];

enum AlignItems {
  start = "START",
  end = "END",
  center = "CENTER",
  stretch = "STRETCH",
  baseline = "BASELINE",
}

const alignItemsButtons = [
  { property: "flex-start", type: AlignItems.start },
  { property: "flex-end", type: AlignItems.end },
  { property: "center", type: AlignItems.center },
  { property: "stretch", type: AlignItems.stretch },
  { property: "baseline", type: AlignItems.baseline },
];

enum GapSize {
  small = "4px",
  medium = "8px",
  large = "12px",
  xlarge = "16px",
  xxlarge = "32px",
}

const gapOptions = [
  { type: GapSize.small, label: "4px" },
  { type: GapSize.medium, label: "8px" },
  { type: GapSize.large, label: "12px" },
  { type: GapSize.xlarge, label: "16px" },
  { type: GapSize.xxlarge, label: "32px" },
];

const boxColors = ["bg-orange-300", "bg-orange-400", "bg-orange-500"];

const Flexbox = () => {
  const [flexDirection, setFlexDirection] = useState<FlexDirection>(
    FlexDirection.Row,
  );

  const [justifyContent, setJustifyContent] = useState<JustifyContent>(
    JustifyContent.start,
  );

  const [alignItems, setAlignItems] = useState<AlignItems>(AlignItems.start);

  const [gap, setGap] = useState<GapSize>(GapSize.small);

  const [boxOrders, setBoxOrders] = useState([0, 0, 0]); // Default order
  const [positions, setPositions] = useState<number[]>([16, 136, 256]); // Initial left positions

  const [flexGrowValues, setFlexGrowValues] = useState<number[]>([1, 1, 1]); // Default: equal growth

  const [flexShrinkValues, setFlexShrinkValues] = useState<number[]>([0, 0, 0]); // Default: equal shrink

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
  }, [justifyContent]);

  //   const boxPositions = useMemo(() => {
  //     // const containerWidth = 600;
  //     const boxWidth = 100;
  //     const gap = 16;
  //     const totalBoxes = 3;

  //     switch (justifyContent) {
  //       case JustifyContent.start:
  //         return [16, 136, 252];

  //       case JustifyContent.center: {
  //         const start =
  //           (containerWidth - (totalBoxes * boxWidth + (totalBoxes - 1) * gap)) /
  //           2;
  //         return [start, start + boxWidth + gap, start + 2 * (boxWidth + gap)];
  //       }

  //       case JustifyContent.end:
  //         return [
  //           containerWidth - 16 - boxWidth * 3 - gap * 2,
  //           containerWidth - 16 - boxWidth * 2 - gap,
  //           containerWidth - 16 - boxWidth,
  //         ];

  //       case JustifyContent.between:
  //         return [
  //           16,
  //           containerWidth / 2 - boxWidth / 2,
  //           containerWidth - 16 - boxWidth,
  //         ];

  //       case JustifyContent.around:
  //         return [
  //           containerWidth * (1 / 6) - boxWidth / 2,
  //           containerWidth * (3 / 6) - boxWidth / 2,
  //           containerWidth * (5 / 6) - boxWidth / 2,
  //         ];
  //       case JustifyContent.evenly:
  //         return [
  //           containerWidth * (1 / 4) - boxWidth / 2,
  //           containerWidth * (2 / 4) - boxWidth / 2,
  //           containerWidth * (3 / 4) - boxWidth / 2,
  //         ];

  //       default:
  //         return [16, 136, 252];
  //     }
  //   }, [justifyContent, containerWidth]);

  const updatePositions = () => {
    const sortedBoxes = [...boxOrders].sort((a, b) => a - b);
    const newPositions = sortedBoxes.map((_, index) => 16 + index * 120); // Space between elements
    setPositions(newPositions);
  };

  const changeOrder = (index: number, newOrder: number) => {
    setBoxOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders[index] = newOrder;
      return updatedOrders;
    });
  };

  const updateFlexGrow = (index: number, newValue: number) => {
    setFlexGrowValues((prev) => {
      const updated = [...prev];
      updated[index] = newValue;
      return updated;
    });
  };

  const updateFlexShrink = (index: number, newValue: number) => {
    setFlexShrinkValues((prev) => {
      const updated = [...prev];
      updated[index] = newValue;
      return updated;
    });
  };

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
    <div className="flex flex-col gap-4 lg:w-[80%]">
      <h1>Flex Direction</h1>
      <div className="flex gap-2">
        {flexDirectionOptions.map((option) => (
          <button
            key={option.type}
            className={`p-1 border rounded w-[100px] hover:bg-gray-400 ${
              flexDirection === option.type ? "bg-slate-400" : ""
            }`}
            onClick={() => setFlexDirection(option.type)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div
        className={`relative  border rounded transition-all duration-500 ease-in-out`}
        style={{
          height: flexDirection === FlexDirection.Row ? "132px" : "380px",
          width: flexDirection === FlexDirection.Row ? "100%" : "132px",
        }}
      >
        {/* Box 1 */}
        <div
          className="absolute rounded w-[100px] h-[100px] bg-orange-300 transition-all duration-500 ease-in-out"
          style={{
            left: "16px",
            top: "16px",
          }}
        ></div>
        {/* Box 2 */}
        <div
          className="absolute rounded w-[100px] h-[100px] bg-orange-300 transition-all duration-500 ease-in-out "
          style={{
            left: flexDirection === FlexDirection.Row ? "132px" : "16px",
            top: flexDirection === FlexDirection.Column ? "132px" : "16px",
          }}
        ></div>
        {/* Box 3 */}
        <div
          className="absolute rounded w-[100px] h-[100px] bg-orange-300 transition-all duration-500 ease-in-out "
          style={{
            left: flexDirection === FlexDirection.Row ? "248px" : "16px",
            top: flexDirection === FlexDirection.Column ? "248px" : "16px",
          }}
        ></div>
      </div>

      <div className="flex flex-col gap-2">
        <h1>Justify Content</h1>
        <div className="flex gap-2">
          {justifyContentButtons.map((item) => (
            <button
              key={item.type}
              className={`p-1 border rounded w-[100px] hover:border-white hover:text-white ${
                justifyContent === item.type ? " text-white border-white" : ""
              }`}
              onClick={() => setJustifyContent(item.type)}
            >
              {item.property}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1>Align Items</h1>
        <div className="flex gap-2">
          {alignItemsButtons.map((item) => (
            <button
              key={item.type}
              className={`p-1 border rounded w-[100px] hover:border-white hover:text-white ${
                alignItems === item.type ? " text-white border-white" : ""
              }`}
              onClick={() => setAlignItems(item.type)}
            >
              {item.property}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1>Gap</h1>
        <div className="flex gap-2">
          {gapOptions.map((item) => (
            <button
              key={item.type}
              className={`p-1 border rounded w-[100px] hover:border-white hover:text-white ${
                gap === item.type ? " text-white border-white" : ""
              }`}
              onClick={() => setGap(item.type)}
            >
              {item.label}
            </button>
          ))}
        </div>
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

      <h1>Order</h1>
      <div className="flex gap-2">
        {boxOrders.map((order, index) => (
          <div key={index} className="flex flex-col items-center">
            <span>Box: {index + 1}</span>
            <input
              type="number"
              min="-2"
              max="4"
              value={order}
              onChange={(e) => changeOrder(index, parseInt(e.target.value))}
              className="border rounded p-1 w-[60px] text-center"
            />
          </div>
        ))}
      </div>
      <div className="relative border rounded transition-all duration-500 ease-in-out h-[136px]">
        {[...boxOrders] // ✅ Create a copy to prevent mutating state
          .map((order, index) => ({ order, index })) // ✅ Pair indexes with orders
          .sort((a, b) => a.order - b.order) // ✅ Sort by order value
          .map(({ order, index }, index2) => (
            <div
              key={index}
              className={`absolute rounded w-[100px] h-[100px] flex items-center justify-center text-white text-xl transition-all duration-500 ease-in-out ${
                boxColors[index % boxColors.length]
              }`}
              style={{
                left: `${positions[index2]}px`, // ✅ Corrected position mapping
                top: "16px",
              }}
            >
              {order}
            </div>
          ))}
      </div>

      <h1>Flex Grow</h1>
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
      <div className="relative border rounded transition-all duration-500 ease-in-out h-[136px]">
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

      <h1>Flex Shrink</h1>
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
      <div className="relative border rounded transition-all duration-500 ease-in-out h-[136px] w-[containerWidth]">
        {boxWidthsShrink.map((width, index) => (
          <div
            key={index}
            className={`absolute rounded h-[100px] flex items-center justify-center text-white text-xl transition-all duration-500 ease-in-out ${
              boxColors[index % boxColors.length]
            }`}
            style={{
              left: `${boxLeftPositionsShrink[index]}px`, // Corrected left position
              width: `${width}px`, // Updated width based on shrinking
              top: "16px",
            }}
          >
            {flexShrinkValues[index]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flexbox;
