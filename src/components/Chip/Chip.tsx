import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { CgClose } from "react-icons/cg";

import { ChipProps } from "./ChipProps";
import Button from "../Button/Button";

function Chip(props: ChipProps) {
  const {
    label,
    isSelected,
    allowDelete,
    selectionType,
    onChipClick,
    ...rest
  } = props;
  const classes = twMerge(
    classNames(
      {
        "pointer-events-none": !allowDelete && selectionType === "none",
        "bg-pm-orange-base text-pm-white border-transparent": isSelected,
      },
      rest.className
    )
  );

  function handleClick() {
    onChipClick(label);
  }

  return (
    <Button
      outlined
      type="button"
      className={classes}
      onClick={handleClick}
      {...rest}
    >
      {label}
      <span className="pl-1">{props.allowDelete ? <CgClose /> : ""}</span>
    </Button>
  );
}

export default Chip;
