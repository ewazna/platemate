import { ComponentPropsWithRef } from "react";

export interface OutsideAlerterProps extends ComponentPropsWithRef<"div"> {
  handleOutsideClick: () => void;
}
