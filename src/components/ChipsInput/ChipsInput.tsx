import React from "react";
import { twMerge } from "tailwind-merge";
import className from "classnames";

import ChipsList from "../ChipsList/ChipsList";
import { ChipsInputProps } from "./ChipsInputProps";

function modifyResults(result: string, query: string) {
  return result.replace(query, "<b>$&</b>");
}

function ChipsInput({
  children,
  id,
  placeholder,
  direction,
  disabled,
  value = [],
  data,
  inputValue,
  allowNew,
  onChange,
  onInputChange,
  ...rest
}: ChipsInputProps) {
  const suggestionsLength = 4;

  const filteredData = data.filter((element) => {
    return !value.includes(element);
  });

  const list = filteredData.slice(0, suggestionsLength).map((element) => {
    return (
      <li
        className="w-full mb-1 mx-2 text-black text-left"
        key={element}
        onClick={() => handleAddNewChip(element)}
        dangerouslySetInnerHTML={{ __html: modifyResults(element, inputValue) }}
      />
    );
  });

  if (filteredData.length > suggestionsLength) {
    list.push(
      <li className="w-full mx-2 text-black text-left" key="more">
        ...
      </li>,
    );
  }

  const classes = twMerge(
    className(
      "flex grow items-center px-4 py-2 rounded-full bg-pm-grey-base",
      "font-roboto font-medium outline-none text-pm-black",
      "placeholder:text-pm-grey-darker focus-visible:outline-offset-0 focus-visible:outline-2 focus-visible:outline-pm-green-base",
      {
        "opacity-20 pointer-events-none": disabled,
      },
      rest.className,
    ),
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };

  const handleDeleteChip = (chipToDelete: string) => {
    onChange(value.filter((chip) => chip !== chipToDelete));
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const newChip = inputValue.trim().toLowerCase();
      const notEmpty = newChip !== "";
      const notSelected = !value.includes(newChip);
      const isInSuggestions = filteredData.includes(newChip);
      if (notEmpty && notSelected && (isInSuggestions || allowNew)) {
        handleAddNewChip(newChip);
      }
    } else if (event.key === "Backspace" && inputValue === "" && value.length) {
      const lastChip = value[value.length - 1];
      handleDeleteChip(lastChip);
    }
  };

  const handleAddNewChip = (chip: string) => {
    onChange([...value, chip]);
    onInputChange("");
  };

  const handleBlur = () => {
    if (!allowNew) {
      onInputChange("");
    }
  };

  return (
    <>
      <div className="flex flex-wrap relative mt-2 items-center justify-between ">
        <label htmlFor={id}>{children}</label>
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          autoComplete="off"
          className={
            classes +
            (inputValue && !allowNew && filteredData.length <= 0
              ? " focus-visible:outline-pm-error-base"
              : " focus-visible:outline-pm-green-base")
          }
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleBlur}
          value={inputValue}
        />
        {inputValue && filteredData.length > 0 ? (
          <ul
            className={
              rest.className +
              " flex flex-wrap absolute right-0 z-10 w-full bg-pm-grey-base rounded-[20px] my-1 px-2 py-4 " +
              (direction === "up"
                ? "bottom-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)]"
                : "top-10 shadow-md")
            }
          >
            {list}
          </ul>
        ) : null}
      </div>
      <ChipsList
        className="flex flex-wrap mt-2"
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
