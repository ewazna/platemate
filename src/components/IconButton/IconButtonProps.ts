import type { ComponentPropsWithRef } from "react";

export interface IconButtonProps extends ComponentPropsWithRef<"button"> {
  primary?: boolean;
  secondary?: boolean;
  basic?: boolean;
  error?: boolean;
  raised?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
