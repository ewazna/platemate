import { ComponentPropsWithRef } from "react";
import { RefObject } from "react";

export interface OutsideAlerterProps extends ComponentPropsWithRef<"div"> {
  handleOutsideClick: () => void;
  triggerRef?: RefObject<HTMLElement>;
}
