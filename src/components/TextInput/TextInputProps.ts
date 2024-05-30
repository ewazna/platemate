import type { ComponentPropsWithoutRef } from "react";

export interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
  children?: string;
  basic?: boolean;
  raised?: boolean;
  icon?: React.ReactNode;
}
