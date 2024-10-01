import React, { ForwardedRef } from "react";

import className from "classnames";
import { twMerge } from "tailwind-merge";
import { InputProps } from "./InputProps";

function checkTypeVariation({ basic, raised }: InputProps) {
  const count = Number(!!basic) + Number(!!raised);
  if (count > 1) {
    throw new Error("Only one of basic, raised can be true");
  }
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      children,
      basic,
      raised,
      error,
      disabled,
      icon,
      id,
      type,
      value,
      errors,
      ...rest
    } = props;

    const isBasic = basic || (!basic && !raised);

    const classes = twMerge(
      className(
        "flex grow items-center px-11 py-2 rounded-full",
        "font-roboto font-medium text-pm-black",
        "placeholder:text-pm-grey-darker focus-visible:outline focus-visible:outline-pm-green-base",
        {
          "bg-pm-grey-base": isBasic,
          "bg-pm-white drop-shadow-xl": raised,
          "border border-pm-error-base focus-visible:outline focus-visible:outline-pm-error-base":
            error,
          "opacity-20 pointer-events-none": disabled,
        },
        rest.className
      )
    );

    checkTypeVariation(props);

    return (
      <>
        <label htmlFor={id}>{children}</label>
        <input
          type={type ? type : "text"}
          ref={ref}
          id={id}
          value={value}
          {...rest}
          className={classes}
        />
        {errors && (
          <p className="text-pm-error-base text-sm font-medium w-full text-right pr-4">
            {errors.message}
          </p>
        )}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-m mx-1 text-pm-grey-darker">
          {icon}
        </div>
      </>
    );
  }
);

export default Input;
