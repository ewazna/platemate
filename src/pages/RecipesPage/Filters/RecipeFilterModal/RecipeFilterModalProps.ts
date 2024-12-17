import { FilterFormFields } from "../FilterForm/FilterFormFields";

export interface RecipeFilterModalProps {
  filterConfig: string | undefined;
  areFiltersShown: boolean;
  closeFiltersForm: () => void;
  showFiltersForm: () => void;
  handleFiltersApply: (filtersConfig: FilterFormFields) => void;
}
