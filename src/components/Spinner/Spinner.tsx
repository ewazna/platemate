import classNames from "classnames";
import { SpinnerProps } from "./SpinnerProps";

function Spinner({ color, className }: SpinnerProps) {
  return (
    <svg
      className={classNames("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <g transform="rotate(360 12 12)">
        <circle cx="12" cy="2.5" r="1.5" fill={color} opacity="0.14" />
        <circle cx="16.75" cy="3.77" r="1.5" fill={color} opacity="0.29" />
        <circle cx="20.23" cy="7.25" r="1.5" fill={color} opacity="0.43" />
        <circle cx="21.5" cy="12" r="1.5" fill={color} opacity="0.57" />
        <circle cx="20.23" cy="16.75" r="1.5" fill={color} opacity="0.71" />
        <circle cx="16.75" cy="20.23" r="1.5" fill={color} opacity="0.86" />
        <circle cx="12" cy="21.5" r="1.5" fill={color} />
      </g>
    </svg>
  );
}

export default Spinner;
