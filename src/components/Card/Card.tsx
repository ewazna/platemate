import className from "classnames";
import { twMerge } from "tailwind-merge";
import { CardProps } from "./CardProps";

function Card({ children, ...rest }: CardProps) {
  const classes = twMerge(
    className(
      "w-full p-4 rounded-2xl drop-shadow-[0_-5px_20px_rgba(0,0,0,0.15)]",
      rest.className
    )
  );

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
}

export default Card;
