import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./ModalProps";

function Modal({ isModalShown, closeModal, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalShown) {
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
  }, [isModalShown, closeModal]);

  return isModalShown ? (
    createPortal(
      <div ref={modalRef}>{children}</div>,
      document.querySelector(".container") as Element,
    )
  ) : (
    <></>
  );
}

export default Modal;
