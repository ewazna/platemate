import { useState, useEffect } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { ExpansionPanelProps } from "./ExpansionPanelProps";

function ExpansionPanel({
  title,
  children,
  isExpanded,
  ...rest
}: ExpansionPanelProps) {
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
