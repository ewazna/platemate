import React, { useRef } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import IconButton from "../IconButton/IconButton";
import { ContextMenuProps } from "./ContextMenuProps";

function ContextMenu({ id, children, className }: ContextMenuProps) {
  const classes = twMerge(
    classNames("bg-transparent m-0 p-0 drop-shadow-[0_2px_5px_rgba(0,0,5,0.25)]"),
    className,
  );

  const contextMenuTrigger = useRef<HTMLButtonElement>(null);
  const contextMenuPanel = useRef<HTMLDivElement>(null);

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const trigger = contextMenuTrigger.current;
    const panel = contextMenuPanel.current;
    if (trigger && panel) {
      panel.style.top = trigger.getBoundingClientRect().bottom + 10 + "px";
      panel.style.left = trigger.getBoundingClientRect().left - 132 + "px";
    }
  };

  return (
    <>
      <IconButton
        ref={contextMenuTrigger}
        type="button"
        className="px-1"
        onClick={handleMenuClick}
        popovertarget={id}
        popovertargetaction="toggle"
      >
        <PiDotsThreeOutlineVerticalFill />
      </IconButton>

      <div popover="auto" id={id} className={classes} ref={contextMenuPanel}>
        <div className="rounded-xl bg-pm-grey-light px-2 py-1 drop-shadow-none">{children}</div>
      </div>
    </>
  );
}

export default ContextMenu;
