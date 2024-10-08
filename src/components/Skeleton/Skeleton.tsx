import classNames from "classnames";
import { SkeletonProps } from "./SkeletonProps";

function Skeleton({ times, className }: SkeletonProps) {
  const outerClassName = classNames(
    "relative overflow-hidden rounded-xl bg-pm-grey-light shadow-md",
    className,
  );
  const innerClassName =
    "animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-pm-grey-light via-white";
  const renderedItems = [];

  for (let i = 0; i < times; i++) {
    renderedItems.push(
      <div key={i} className={outerClassName}>
        <div className={innerClassName} />
      </div>,
    );
  }

  return (
    <div className="flex flex-wrap justify-between items-start h-full overflow-auto pb-6">
      {renderedItems}
    </div>
  );
}

export default Skeleton;
