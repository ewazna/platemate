import { PropsWithChildren } from "react";
import { FieldError } from "react-hook-form";

export type SelectProps = PropsWithChildren<SelectSpecificProps>;

interface SelectSpecificProps {
  value: string | string[];
  onChange: (selectedValue: string | string[] | null) => void;
  options: { value: string; label: string }[];
  name?: string;
  id?: string;
  placeholder: string;
  icon?: React.ReactNode;
  isMulti?: boolean;
  invalid?: boolean;
  errors?: FieldError;
  disabled?: boolean;
}
