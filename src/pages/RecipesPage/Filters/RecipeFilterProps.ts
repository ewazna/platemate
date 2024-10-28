import { FilterFormFields } from "./FilterFormFields";

export interface RecipeFilterProps {
  filterConfig: string | undefined;
  areFiltersShown: boolean;
  closeFiltersForm: () => void;
  handleFiltersApply: (filtersConfig: FilterFormFields) => void;
}
