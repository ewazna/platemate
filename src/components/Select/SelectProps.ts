import { PropsWithChildren } from "react";
import { FieldError } from "react-hook-form";

export type SelectProps = PropsWithChildren<SelectSpecificProps>;

interface SelectSpecificProps {
  name?: string;
  id?: string;
  placeholder: string;
  icon?: React.ReactNode;
  isMulti?: boolean;
  error?: boolean;
  errors?: FieldError;
  value: string | string[];
  onChange: (selectedValue: string | string[] | null) => void;
  options: { value: string; label: string }[];
}
