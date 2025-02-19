import React from "react";

interface ToggleButtonGroupProps<T> {
  label: string;
  options: { type: T; label: string }[];
  selected: T;
  onChange: (value: T) => void;
}

const ToggleButtonGroup = <T,>({
  label,
  options,
  selected,
  onChange,
}: ToggleButtonGroupProps<T>) => {
  return (
    <div className="flex flex-col gap-2">
      <h1>{label}</h1>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={String(option.type)}
            className={`p-1 border rounded w-[100px] hover:border-orange-300 hover:text-orange-300 ${
              selected === option.type
                ? "text-orange-300 border-orange-300"
                : ""
            }`}
            onClick={() => onChange(option.type)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleButtonGroup;
