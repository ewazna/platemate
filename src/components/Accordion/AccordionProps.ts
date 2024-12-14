import { ReactElement } from "react";

export interface AccordionProps {
  options: AccordionOption[];
  className?: string;
}

interface AccordionOption {
  heading: string;
  icon?: React.ReactNode;
  body: ReactElement;
  disabled: boolean;
}
