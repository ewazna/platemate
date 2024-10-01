import classNames from "classnames";
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
    classNames(
      "flex items-center px-16 py-2 rounded-full font-roboto font-medium ",
      "focus-visible:outline focus-visible:outline-2",
      {
        "bg-pm-orange-base text-pm-white focus-visible:outline-pm-orange-base ":
          primary,
        "bg-pm-green-base text-pm-white focus-visible:outline-pm-green-base":
          secondary,
        "bg-pm-white text-pm-black focus-visible:outline-pm-white": isBasic,
        "bg-pm-error-base text-pm-white focus-visible:outline-pm-error-base":
          error,
        "drop-shadow-xl uppercase active:drop-shadow-none active:shadow-inner":
          isRaised,
        "notmobile:hover:bg-pm-orange-hover": isRaised && primary,
        "notmobile:hover:bg-pm-green-hover": isRaised && secondary,
        "notmobile:hover:bg-pm-grey-hover": isRaised && isBasic,
        "notmobile:hover:bg-pm-error-hover": isRaised && error,
        "bg-transparent normal-case notmobile:hover:underline active:shadow-none":
          underlined,
        "text-pm-orange-base px-1": underlined && primary,
        "text-pm-green-base px-1": underlined && secondary,
        "text-pm-black px-1 active:text-pm-orange-base": underlined && isBasic,
        "lowercase bg-transparent border border-pm-black m-1 px-3 py-1 drop-shadow-none":
          outlined,
        "border-pm-orange-base text-pm-orange-base notmobile:hover:bg-pm-orange-lighter":
          outlined && primary,
        "border-pm-green-base text-pm-green-base notmobile:hover:bg-pm-green-lighter":
          outlined && secondary,
        "border-pm-black text-pm-black notmobile:hover:bg-pm-grey-light":
          outlined && isBasic,
        "border-pm-error-base text-pm-error-base notmobile:hover:bg-pm-error-lighter":
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
