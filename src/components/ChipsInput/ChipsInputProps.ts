export interface ChipsInputProps {
  id: string;
  className: string;
  children?: string;
  placeholder: string;
  direction?: "up" | "down";
  value: string[];
  disabled?: boolean;
  data: string[];
  inputValue: string;
  allowNew: boolean;
  onChange: (chips: string[]) => void;
  onInputChange: (inputValue: string) => void;
}
