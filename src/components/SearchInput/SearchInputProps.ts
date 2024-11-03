import { FieldError, UseFormWatch } from "react-hook-form";
import { RecipeFormFields } from "../../pages/RecipeFormPage/RecipeFromFields";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  searchData: string[] | undefined;
  basic?: boolean;
  raised?: boolean;
  invalid?: boolean;
  icon?: React.ReactNode;
  iconPlacement?: "left" | "right";
  errors?: FieldError;
  id?: string;
  disabled?: boolean;
  direction?: "up" | "down";
  placeholder?: string;
  className?: string;
  watch?: UseFormWatch<RecipeFormFields>;
}
