import { useState, useEffect } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { ExpansionPanelProps } from "./ExpansionPanelProps";

function ExpansionPanel({ title, children, isExpanded, ...rest }: ExpansionPanelProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      setExpanded(true);
    }
  }, [isExpanded]);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <section {...rest}>
      <button
        type="button"
        onClick={handleClick}
        className="m-1 max-w-fit flex justify-start items-center cursor-pointer hover:text-pm-orange-base focus-visible:outline-offset-2 focus-visible:outline-2 focus-visible:outline-pm-orange-base"
      >
        {title}
        {expanded ? <GoChevronDown className="ml-2" /> : <GoChevronUp className="ml-2" />}
      </button>
      {expanded && <div className="mx-1">{children}</div>}
    </section>
  );
}

export default ExpansionPanel;
