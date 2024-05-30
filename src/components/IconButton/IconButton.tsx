import className from "classnames";
import { twMerge } from "tailwind-merge";
import { IconButtonProps } from "./IconButtonProps";
import { PropsWithChildren } from "react";
import { GoSync } from "react-icons/go";

function IconButton(props: PropsWithChildren<IconButtonProps>) {
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
      "flex items-center px-2 py-2 rounded-full hover:bg-pm-grey-base active:shadow-inner",
      {
        "bg-transparent text-pm-orange-base": primary,
        "bg-trannsparent text-pm-green-base": secondary,
        "bg-transparent text-pm-black": isBasic,
        "bg-transparent text-pm-error-base": error,
        "drop-shadow-xl active:drop-shadow-none": raised,
        "bg-pm-orange-base text-pm-white hover:bg-pm-orange-hover active:bg-pm-white active:text-pm-orange-base":
          raised && primary,
        "bg-pm-green-base text-pm-white hover:bg-pm-green-hover active:bg-pm-white active:text-pm-green-base":
          raised && secondary,
        "bg-pm-white text-pm-orange-base hover:bg-pm-grey-base active:bg-pm-orange-base active:text-pm-white":
          raised && isBasic,
        "bg-pm-error-base text-pm-white hover:bg-pm-error-hover active:bg-pm-white active:text-pm-error-base":
          raised && error,
        "opacity-80 pointer-events-none": loading,
        "opacity-20 pointer-events-none": disabled,
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
    <button {...rest} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
}

export default IconButton;
