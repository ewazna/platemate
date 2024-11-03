import { useState } from "react";
import Input from "../Input/Input";
import OutsideAlerter from "../OutsideAlerter/OutsideAlerter";
import { SearchInputProps } from "./SearchInputProps";

function modifyResults(result: string, query: string) {
  const re = new RegExp(
    query
      .split("")
      .map((char: string) => {
        return char.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      })
      .join("[-\\s.]*"),
    "ig",
  );
  return result.replace(re, "<b>$&</b>");
}

function SearchInput(props: SearchInputProps) {
  const { searchData, direction, value, onChange, ...rest } = props;

  const [isSearchListShown, setIsSearchListShown] = useState(false);

  const suggestionsLength = 4;
  let list;
  let filteredData;
  if (value) {
    filteredData = (searchData || []).filter((element) => {
      return !(value as string).includes(element);
    });

    list = filteredData!.slice(0, suggestionsLength).map((element) => {
      return (
        <li
          className="w-full mb-1 mx-2 text-black text-left"
          key={element}
          onClick={() => handleSelect(element)}
          dangerouslySetInnerHTML={{ __html: modifyResults(element, value as string) }}
        />
      );
    });

    if (filteredData!.length > suggestionsLength) {
      list.push(
        <li className="w-full mx-2 text-black text-left" key="more">
          ...
        </li>,
      );
    }
  }

  const handleSelect = (newValue: string) => {
    setIsSearchListShown(false);
    onChange(newValue);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Tab") {
      setIsSearchListShown(true);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      setIsSearchListShown(false);
    }
  };

  const listClasses =
    rest.className +
    " flex flex-wrap absolute right-0 z-10 w-full bg-pm-grey-base rounded-[20px] my-1 px-2 py-4 " +
    (direction === "up"
      ? "bottom-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)]"
      : "top-10 shadow-md");

  const containerClasses =
    "flex flex-wrap w-full justify-end " + (isSearchListShown ? "" : "hidden");

  return (
    <>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        handleKeyDown={handleInputKeyDown}
        {...rest}
      />
      {value && filteredData && filteredData.length > 0 ? (
        <OutsideAlerter
          className={containerClasses}
          handleOutsideClick={() => setIsSearchListShown(false)}
        >
          <ul className={listClasses}>{list}</ul>
        </OutsideAlerter>
      ) : null}
    </>
  );
}

export default SearchInput;
