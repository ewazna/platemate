import { ReactElement } from "react";

export interface DialogProps {
  isDialogShown: boolean;
  closeDialog: () => void;
  message: string;
  title: string;
  buttons: ReactElement;
}
