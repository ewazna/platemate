import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./ButtonProps";
import React, { ForwardedRef, PropsWithChildren } from "react";
import { GoSync } from "react-icons/go";

const Button = React.forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (props, ref: ForwardedRef<HTMLButtonElement>) => {
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
        "flex items-center justify-center px-8 py-2 font-roboto font-medium focus-visible:outline-0",
        {
          "bg-pm-orange-base text-pm-white focus-visible:outline-pm-orange-base": primary,
          "bg-pm-green-base text-pm-white focus-visible:outline-pm-green-base": secondary,
          "bg-pm-white text-pm-black focus-visible:outline-pm-orange-base": isBasic,
          "bg-pm-error-base text-pm-white focus-visible:outline-pm-error-base": error,
          "rounded-full drop-shadow-xl uppercase active:drop-shadow-none active:shadow-inner focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-2":
            isRaised,
          "hover:bg-pm-orange-hover": isRaised && primary,
          "hover:bg-pm-green-hover": isRaised && secondary,
          "hover:bg-pm-grey-hover active:bg-pm-grey-base": isRaised && isBasic,
          "hover:bg-pm-error-hover": isRaised && error,
          "bg-transparent normal-case hover:underline active:shadow-none focus-visible:border-b-2 focus-visible:hover:no-underline focus-visible:-translate-y-1":
            underlined,
          "text-pm-orange-base px-1 active:text-pm-black active:font-black focus-visible:border-pm-orange-base":
            underlined && primary,
          "text-pm-green-base px-1 active:text-pm-black active:font-black focus-visible:border-pm-green-base":
            underlined && secondary,
          "text-pm-black px-1 active:text-pm-orange-base focus-visible:border-pm-black":
            underlined && isBasic,
          "rounded-full lowercase bg-transparent border border-pm-black m-1 px-3 py-1 drop-shadow-none focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-2":
            outlined,
          "border-pm-orange-base text-pm-orange-base hover:bg-pm-orange-lighter":
            outlined && primary,
          "border-pm-green-base text-pm-green-base hover:bg-pm-green-lighter":
            outlined && secondary,
          "border-pm-black text-pm-black hover:bg-pm-grey-base": outlined && isBasic,
          "border-pm-error-base text-pm-error-base hover:bg-pm-error-lighter": outlined && error,
          "opacity-80 pointer-events-none": loading,
          "opacity-20 pointer-events-none": disabled,
        },
        rest.className,
      ),
    );

    function checkTypeVariation({ primary, secondary, basic, error }: ButtonProps) {
      const count = Number(!!primary) + Number(!!secondary) + Number(!!basic) + Number(!!error);
      if (count > 1) {
        throw new Error("Only one of primary, secondary, basic, error can be true");
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
      <button type="button" {...rest} ref={ref} className={classes} disabled={disabled}>
        {loading ? <GoSync className="animate-spin" /> : children}
      </button>
    );
  },
);

export default Button;
