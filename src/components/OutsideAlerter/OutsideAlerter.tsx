import { useRef, useEffect, PropsWithChildren, RefObject } from "react";
import { OutsideAlerterProps } from "./OutsideAlerterProps";

interface useOutsideAlerterProps {
  handleOutsideClick: () => void;
}

function useOutsideAlerter(
  { handleOutsideClick }: useOutsideAlerterProps,
  ref: RefObject<HTMLDivElement>,
) {
  useEffect(() => {
    function handleClickOutside(e: Event) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handleOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleOutsideClick]);
}

function OutsideAlerter({
  handleOutsideClick,
  children,
  ...rest
}: PropsWithChildren<OutsideAlerterProps>) {
  const wrapperRef = useRef(null);
  useOutsideAlerter({ handleOutsideClick }, wrapperRef);

  return (
    <div ref={wrapperRef} {...rest}>
      {children}
    </div>
  );
}

export default OutsideAlerter;
