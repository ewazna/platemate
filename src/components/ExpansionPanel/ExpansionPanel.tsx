import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { ExpansionPanelProps } from "./ExpansionPanelProps";

function ExpansionPanel({ title, children, ...rest }: ExpansionPanelProps) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <section {...rest}>
      <div
        onClick={handleClick}
        className="flex justify-start items-center cursor-pointer"
      >
        <div className="mr-2">{title}</div>
        <div>{expanded ? <GoChevronDown /> : <GoChevronUp />}</div>
      </div>
      {expanded && <div>{children}</div>}
    </section>
  );
}

export default ExpansionPanel;
