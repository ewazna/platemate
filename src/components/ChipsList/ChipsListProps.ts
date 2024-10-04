interface ChipsListOptionalProps {
  className: string;
  chips: string[];
  selectionType: "single" | "multi" | "none";
  value?: string[];
  onChange?: (selectedChips: string[]) => void;
}

export type ChipsListProps = ChipsListOptionalProps &
  (
    | {
        allowDelete: true;
        deleteChip: (chip: string) => void;
      }
    | {
        allowDelete?: false;
      }
  );
