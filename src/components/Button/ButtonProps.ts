import type { ComponentPropsWithoutRef } from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  primary?: boolean;
  secondary?: boolean;
  basic?: boolean;
  error?: boolean;
  raised?: boolean;
  underlined?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
