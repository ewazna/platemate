import type { ComponentPropsWithRef } from "react";
import { FieldError } from "react-hook-form";

export interface InputProps extends ComponentPropsWithRef<"input"> {
  children?: string;
  basic?: boolean;
  raised?: boolean;
  type?: "text" | "number" | undefined;
  error?: boolean;
  icon?: React.ReactNode;
  errors?: FieldError;
}
