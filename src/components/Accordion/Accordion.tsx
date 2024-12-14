import { useState } from "react";
import { GoChevronRight, GoChevronDown } from "react-icons/go";
import { AccordionProps } from "./AccordionProps";
import Card from "../Card/Card";

function Accordion({ options, className }: AccordionProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const baseClasses =
    "w-full h-16 px-4 flex justify-between items-center bg-pm-grey-light cursor-pointer text-s focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-pm-orange-base";
  const disabledClasses = " text-pm-grey-darker pointer-events-none";
  const borderClasses = " border-b-2 border-pm-grey-base";

  const handleClick = (i: number) => {
    if (i === expanded) {
      setExpanded(null);
    } else {
      setExpanded(i);
    }
  };

  const AccordionPanel = options.map((option, i) => {
    const isNotLast = i !== options.length - 1;
    const isFirst = i === 0;
    const isLast = i === options.length - 1;
    const isExpanded = i === expanded;
    const isNotExpanded = i !== expanded;

    const iconClasses =
      "h-6 w-6 mr-4 " + (option.disabled ? "text-pm-grey-dark" : "text-pm-orange-base");
    const arrowClasses =
      "h-6 w-6 " + (option.disabled ? "text-pm-grey-base" : "text-pm-grey-darker");
    const buttonClasses =
      baseClasses +
      (isNotLast ? borderClasses : "") +
      (isFirst ? " rounded-t-md" : "") +
      (isLast && isNotExpanded ? " rounded-b-md" : "") +
      (option.disabled ? disabledClasses : "");

    const icon = <div className={iconClasses}>{option.icon}</div>;
    const body = (
      <Card
        className={
          "w-full rounded-t-none drop-shadow-none mb-4 " +
          "grid transition-all duration-[300ms] h-fit " +
          (isExpanded ? " grid-rows-[1fr]" : " grid-rows-[0fr] p-0 m-0")
        }
      >
        <div
          className={
            "block transition-all duration-[300ms] overflow-hidden " +
            (isExpanded ? "opacity-100" : "opacity-0")
          }
        >
          {option.body}
        </div>
      </Card>
    );
    const heading = (
      <div className="flex">
        {icon} {option.heading}
      </div>
    );

    return (
      <section key={option.heading}>
        <button
          type="button"
          onClick={() => handleClick(i)}
          className={buttonClasses}
          disabled={option.disabled}
        >
          {heading}
          {isNotExpanded ? (
            <GoChevronRight className={arrowClasses} />
          ) : (
            <GoChevronDown className={arrowClasses} />
          )}
        </button>
        <>{body}</>
      </section>
    );
  });

  return <div className={className}>{AccordionPanel}</div>;
}

export default Accordion;
