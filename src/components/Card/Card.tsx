import React, { ForwardedRef } from "react";

import className from "classnames";
import { twMerge } from "tailwind-merge";
import { CardProps } from "./CardProps";

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { children, ...rest } = props;
    const classes = twMerge(
      className(
        "w-full bg-white p-4 rounded-2xl drop-shadow-[0_-5px_20px_rgba(0,0,0,0.15)] ",
        rest.className,
      ),
    );

    return (
      <div {...rest} className={classes} ref={ref}>
        {children}
      </div>
    );
  },
);

export default Card;
