import { useRef, useEffect, PropsWithChildren, RefObject } from "react";
import { OutsideAlerterProps } from "./OutsideAlerterProps";

interface useOutsideAlerterProps {
  handleOutsideClick: () => void;
  triggerRef?: RefObject<HTMLElement>;
  wrapperRef: RefObject<HTMLDivElement>;
}

function useOutsideAlerter({ handleOutsideClick, triggerRef, wrapperRef }: useOutsideAlerterProps) {
  useEffect(() => {
    function globalClickHandller(e: Event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        (!triggerRef?.current ||
          (triggerRef?.current && !triggerRef.current.contains(e.target as Node)))
      ) {
        handleOutsideClick();
      }
    }

    document.addEventListener("mousedown", globalClickHandller);

    return () => {
      document.removeEventListener("mousedown", globalClickHandller);
    };
  }, [wrapperRef, triggerRef, handleOutsideClick]);
}

function OutsideAlerter({
  handleOutsideClick,
  triggerRef,
  children,
  ...rest
}: PropsWithChildren<OutsideAlerterProps>) {
  const wrapperRef = useRef(null);
  useOutsideAlerter({ handleOutsideClick, triggerRef, wrapperRef });

  return (
    <div ref={wrapperRef} {...rest}>
      {children}
    </div>
  );
}

export default OutsideAlerter;
