import Slider from "@mui/material/Slider";
import { RangeSliderProps } from "../RangeSlider/RangeSliderProps";
import { styled } from "@mui/material/styles";

const CustomSlider = styled(Slider)({
  color: "#FF8A00",
  height: 6,
  "& .MuiSlider-rail": {
    height: 0.2,
    opacity: 1,
    backgroundColor: "#140F1F",
  },
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    boxShadow: "0px 0px 5px 0px rgba(20, 15, 31, 0.5)",
  },
});

function RangeSlider({
  marks,
  step,
  max,
  className,
  value,
  onChange,
}: RangeSliderProps) {
  return (
    <div className={className}>
      <CustomSlider
        value={value}
        onChange={onChange}
        valueLabelDisplay="off"
        marks={marks}
        max={max}
        step={step}
      />
    </div>
  );
}
export default RangeSlider;
