import { Control, FieldErrors } from "react-hook-form";
import { RecipeFormFields } from "../../RecipeFromFields";

export interface PreparingControllerProps {
  errors: FieldErrors<RecipeFormFields>;
  control: Control<RecipeFormFields>;
  handleDelete: () => void;
  i: number;
}
