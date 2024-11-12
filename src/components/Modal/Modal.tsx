import React, { useState, useRef, useEffect, ForwardedRef } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./ModalProps";
import Card from "../Card/Card";

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { isModalShown, closeModal, className, children } = props;
    const animationTime = 300;

    const [isPortalCreated, setIsPortalCreated] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isModalShown) {
        setIsPortalCreated(isModalShown);
      } else {
        setTimeout(() => {
          setIsPortalCreated(isModalShown);
        }, animationTime);
      }
    }, [isModalShown]);

    useEffect(() => {
      if (isPortalCreated) {
        const modalElement = modalRef.current;

        const focusableElements: NodeListOf<HTMLElement> = modalElement!.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        setTimeout(() => {
          firstElement.focus({ preventScroll: true });
        }, 100);

        const handleTabKeyPress = (event: KeyboardEvent) => {
          if (event.key === "Tab") {
            if (event.shiftKey && document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        };

        const handleEscapeKeyPress = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            closeModal();
          }
        };

        modalElement!.addEventListener("keydown", handleTabKeyPress);
        modalElement!.addEventListener("keydown", handleEscapeKeyPress);

        return () => {
          modalElement!.removeEventListener("keydown", handleTabKeyPress);
          modalElement!.removeEventListener("keydown", handleEscapeKeyPress);
        };
      }
    }, [isModalShown, closeModal, isPortalCreated]);

    const backdropClasses =
      "absolute inset-0 bg-gray-600 " +
      (isModalShown ? "animate-fadeIn opacity-80 display-[inherit]" : "animate-fadeOut opacity-0 ");

    const cardClasses =
      "absolute rounded-b-none px-6 " +
      (isModalShown
        ? "animate-slideIn translate-y-0 display-[inherit] "
        : "animate-slideOut translate-y-full ") +
      className;

    return isPortalCreated ? (
      createPortal(
        <div ref={modalRef}>
          <div className={backdropClasses}></div>
          <Card ref={ref} className={cardClasses}>
            {children}
          </Card>
        </div>,
        document.querySelector(".container") as Element,
      )
    ) : (
      <></>
    );
  },
);

export default Modal;
