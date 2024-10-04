import { ChipsListProps } from "./ChipsListProps";
import Chip from "../Chip/Chip";

function ChipsList(props: ChipsListProps) {
  const { chips, selectionType, onChange, value, className } = props;

  const handleSelect = (chip: string) => {
    if (!onChange) {
      return;
    } else {
      if (selectionType === "multi") {
        let newValue;
        if (value) {
          const index = value.indexOf(chip);
          if (index >= 0) {
            newValue = value.slice();
            newValue.splice(index, 1);
          } else {
            newValue = value.concat(chip);
          }
        } else {
          newValue = [chip];
        }
        onChange(newValue);
      } else if (selectionType === "single") {
        onChange((value || []).includes(chip) ? [] : [chip]);
      } else if (selectionType === "none") {
        return;
      }
    }
  };

  const handleDelete = (chipToDelete: string) => {
    if (props.allowDelete) {
      props.deleteChip(chipToDelete);
    }
  };

  const handleClick = (label: string) => {
    if (selectionType === "none") {
      if (props.allowDelete) {
        handleDelete(label);
      }
    } else {
      handleSelect(label);
    }
  };

  const genChips = chips.map((chip, i) => {
    return (
      <Chip
        key={i}
        label={chip}
        allowDelete={props.allowDelete || false}
        onChipClick={handleClick}
        selectionType={selectionType}
        isSelected={(value || []).includes(chip) ? true : false}
      />
    );
  });

  return <div className={className}>{genChips}</div>;
}

export default ChipsList;
