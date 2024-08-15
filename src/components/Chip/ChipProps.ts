import { ComponentPropsWithoutRef } from "react";

export interface ChipProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
  primary?: boolean;
  secondary?: boolean;
  error?: boolean;
  basic?: boolean;
  isSelected?: boolean;
  allowDelete?: boolean;
  selectionType: "single" | "multi" | "none";
  onChipClick: (label: string) => void;
}
