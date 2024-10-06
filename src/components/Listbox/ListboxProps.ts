export interface ListboxProps {
  options: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  selectionType: "single" | "multi";
  selectionColor: string;
  bgOptionColor: string;
  selectionIcons: boolean;
  value: string[];
  className?: string;
  onChange: (newValue: string[]) => void;
}
