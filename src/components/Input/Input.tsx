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
      basic,
      raised,
      error,
      disabled = false,
      icon,
      iconPlacement = "left",
      id,
      type,
      value,
      onChange,
      handleKeyDown,
      errors,
      ...rest
    } = props;

    const isBasic = basic || (!basic && !raised);

    const classes = twMerge(
      className(
        "flex grow items-center px-11 py-2 rounded-full w-full",
        "font-roboto font-medium text-pm-black",
        "placeholder:text-pm-grey-darker focus-visible:outline-2 focus-visible:outline-pm-green-base",
        {
          "bg-pm-grey-base": isBasic,
          "bg-pm-white drop-shadow-xl": raised,
          "border border-pm-error-base focus-visible:outline-2 focus-visible:outline-pm-error-base":
            error,
          "opacity-20 pointer-events-none": disabled,
        },
        rest.className,
      ),
    );

    checkTypeVariation(props);

    const handleWheel = (event: Event) => {
      event.preventDefault();
    };

    const handleFocus = (event: React.FocusEvent) =>
      event.target.addEventListener("wheel", handleWheel, { passive: false });

    const handleBlur = (event: React.FocusEvent) => {
      event.target.removeEventListener("wheel", handleWheel);
    };

    return (
      <>
        <div className="relative w-full">
          <input
            type={type ? type : "text"}
            ref={ref}
            id={id}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            {...rest}
            className={classes}
            autoComplete="off"
          />
          <div
            className={
              "absolute top-1/2 -translate-y-1/2 text-m mx-1 text-pm-grey-darker " +
              (iconPlacement === "left" ? "left-4" : "right-4")
            }
          >
            {icon}
          </div>
        </div>
        {errors && (
          <p className="col-span-2 text-pm-error-base text-sm font-medium w-full text-right pr-4 pt-0.5">
            {errors.message}
          </p>
        )}
      </>
    );
  },
);

export default Input;
