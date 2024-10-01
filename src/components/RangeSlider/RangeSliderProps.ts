export interface RangeSliderProps {
  marks: { value: number; label: string }[];
  step: number | null;
  max: number;
  className: string;
  value: number | number[];
  onChange: (event: Event, value: number | number[]) => void;
}
