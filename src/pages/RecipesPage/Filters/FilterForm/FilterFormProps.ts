import { FilterFormFields } from "./FilterFormFields";

export interface FilterFormProps {
  onScroll?: () => void;
  filtersApply: (filtersConfig: FilterFormFields) => void;
  closeFiltersForm: () => void;
  filterConfig: string | undefined;
  className?: string;
  fieldsContainerClasses?: string;
}
