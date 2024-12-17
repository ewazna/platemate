import { FilterFormFields } from "../FilterForm/FilterFormFields";

export interface RecipeFilterSideMenuProps {
  filterConfig: string | undefined;
  areFiltersShown: boolean;
  closeFiltersForm: () => void;
  showFiltersForm: () => void;
  handleFiltersApply: (filtersConfig: FilterFormFields) => void;
  className?: string;
}
