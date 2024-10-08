import type { ComponentPropsWithoutRef } from "react";

export interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  children?: string;
  basic?: boolean;
  raised?: boolean;
  icon?: React.ReactNode;
  value: string;
  error?: boolean;
}
