export interface ChipsInputProps {
  id: string;
  className: string;
  children: string;
  placeholder: string;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}
