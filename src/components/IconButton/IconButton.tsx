import React, { ForwardedRef, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";
import { IconButtonProps } from "./IconButtonProps";
import { GoSync } from "react-icons/go";
import className from "classnames";

const IconButton = React.forwardRef<
  HTMLButtonElement,
  PropsWithChildren<IconButtonProps>
>((props, ref: ForwardedRef<HTMLButtonElement>) => {
  const {
    children,
    primary,
    secondary,
    basic,
    error,
    raised,
    disabled,
    loading,
    ...rest
  } = props;

  const isBasic = basic || (!primary && !secondary && !error && !basic);

  const classes = twMerge(
    className(
      "flex items-center px-2 py-2 rounded-full hover:bg-pm-grey-base active:shadow-inner ",
      "focus-visible:outline focus-visible:outline-2 ",
      {
        "bg-transparent text-pm-orange-base focus-visible:outline-pm-orange-base ":
          primary,
        "bg-trannsparent text-pm-green-base focus-visible:outline-pm-green-base ":
          secondary,
        "bg-transparent text-pm-black focus-visible:outline-pm-white ": isBasic,
        "bg-transparent text-pm-error-base focus-visible:outline-pm-error-base ":
          error,
        "drop-shadow-xl active:drop-shadow-none focus-visible:outline-4 focus-visible:outline-offset-2":
          raised,
        "bg-pm-orange-base text-pm-white hover:bg-pm-orange-hover active:bg-pm-white active:text-pm-orange-base":
          raised && primary,
        "bg-pm-green-base text-pm-white hover:bg-pm-green-hover active:bg-pm-white active:text-pm-green-base":
          raised && secondary,
        "bg-pm-white text-pm-orange-base hover:bg-pm-grey-base active:bg-pm-orange-base active:text-pm-white":
          raised && isBasic,
        "bg-pm-error-base text-pm-white hover:bg-pm-error-hover active:bg-pm-white active:text-pm-error-base":
          raised && error,
        "opacity-80 pointer-events-none": loading,
        "opacity-40 pointer-events-none focus-visible:outline-0": disabled,
      },
      rest.className
    )
  );

  function checkTypeVariation({
    primary,
    secondary,
    basic,
    error,
  }: IconButtonProps) {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!basic) +
      Number(!!error);
    if (count > 1) {
      throw new Error(
        "Only one of primary, secondary, basic, error can be true"
      );
    }
  }

  checkTypeVariation(props);

  return (
    <button ref={ref} {...rest} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
});

export default IconButton;
