import { PropsWithChildren } from "react";

export type ModalProps = PropsWithChildren<ModalSpecificProps>;

interface ModalSpecificProps {
  isModalShown: boolean;
  closeModal: () => void;
  className?: string;
}
