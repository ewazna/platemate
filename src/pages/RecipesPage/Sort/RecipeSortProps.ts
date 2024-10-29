import { RefObject } from "react";

export interface RecipeSortProps {
  trigger: RefObject<HTMLElement>;
  isSortFormShown: boolean;
  sortConfig: string;
  closeSortForm: () => void;
  handleSortApply: (sortConfig: string) => void;
}
