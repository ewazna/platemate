interface ChipsListOptionalProps {
  chips: string[];
  selectionType: "single" | "multi" | "none";
  value: string[];
  clear: boolean;
  onChange: (selectedChips: string[]) => void;
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
