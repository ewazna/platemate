import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import className from "classnames";

import ChipsList from "../ChipsList/ChipsList";
import { ChipsInputProps } from "./ChipsInputProps";

function ChipsInput({
  children,
  id,
  placeholder,
  disabled,
  value = [],
  onChange,
  ...rest
}: ChipsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const classes = twMerge(
    className(
      "flex grow ml-2 max-w-[70%] items-center px-4 py-2 rounded-full bg-pm-grey-base",
      "font-roboto font-medium outline-none text-pm-black",
      "placeholder:text-pm-grey-darker focus:border focus:border-pm-green-base",
      {
        "opacity-20 pointer-events-none": disabled,
      },
    ),
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setInputValue(event.target.value);
  };

  const handleDeleteChip = (chipToDelete: string) => {
    onChange(value.filter((chip) => chip !== chipToDelete));
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const newChip = inputValue.trim();
      if (newChip !== "" && !value.includes(newChip)) {
        onChange([...value, newChip]);
        setInputValue("");
      }
    } else if (event.key === "Backspace" && inputValue === "") {
      const lastChip = value[value.length - 1];
      handleDeleteChip(lastChip);
    }
  };

  return (
    <>
      <div {...rest}>
        <label>{children}</label>
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          className={classes}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          value={inputValue}
        />
      </div>
      <ChipsList
        className="flex flex-wrap"
        onChange={onChange}
        chips={value}
        allowDelete
        selectionType="none"
        deleteChip={(chip: string) => handleDeleteChip(chip)}
      />
    </>
  );
}

export default ChipsInput;
