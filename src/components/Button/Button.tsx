import className from "classnames";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./ButtonProps";
import { PropsWithChildren } from "react";
import { GoSync } from "react-icons/go";

function Button(props: PropsWithChildren<ButtonProps>) {
  const {
    children,
    primary,
    secondary,
    basic,
    error,
    raised,
    underlined,
    outlined,
    disabled,
    loading,
    ...rest
  } = props;

  const isRaised = raised || (!underlined && !outlined && !raised);
  const isBasic = basic || (!primary && !secondary && !error && !basic);

  const classes = twMerge(
    className(
      "flex items-center px-16 py-2 rounded-full font-roboto font-medium",
      {
        "bg-pm-orange-base text-pm-white": primary,
        "bg-pm-green-base text-pm-white": secondary,
        "bg-pm-white text-pm-black": isBasic,
        "bg-pm-error-base text-pm-white": error,
        "drop-shadow-xl uppercase active:drop-shadow-none active:shadow-inner":
          isRaised,
        "hover:bg-pm-orange-hover": isRaised && primary,
        "hover:bg-pm-green-hover": isRaised && secondary,
        "hover:bg-pm-grey-hover": isRaised && isBasic,
        "hover:bg-pm-error-hover": isRaised && error,
        "bg-transparent normal-case hover:underline active:": underlined,
        "text-pm-orange-base px-1": underlined && primary,
        "text-pm-green-base px-1": underlined && secondary,
        "text-pm-black px-1": underlined && isBasic,
        "lowercase bg-transparent border border-pm-black m-1 px-3 py-1 drop-shadow-none":
          outlined,
        "border-pm-orange-base text-pm-orange-base hover:bg-pm-orange-lighter":
          outlined && primary,
        "border-pm-green-base text-pm-green-base hover:bg-pm-green-lighter":
          outlined && secondary,
        "border-pm-black text-pm-black hover:bg-pm-grey-light":
          outlined && isBasic,
        "border-pm-error-base text-pm-error-base hover:bg-pm-error-lighter":
          outlined && error,
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
  }: ButtonProps) {
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

  function checkStyleVariation({ raised, underlined }: ButtonProps) {
    const count = Number(!!raised) + Number(!!underlined);
    if (count > 1) {
      throw new Error("Only one of raised, underlined can be true");
    }
  }

  checkTypeVariation(props);
  checkStyleVariation(props);

  return (
    <button {...rest} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
}

export default Button;
