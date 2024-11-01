import { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { RecipeFormFields } from "../../RecipeFromFields";

export interface IngredientFormGroupProps {
  watch: UseFormWatch<RecipeFormFields>;
  errors: FieldErrors<RecipeFormFields>;
  control: Control<RecipeFormFields>;
  register: UseFormRegister<RecipeFormFields>;
  handleDelete: () => void;
  i: number;
}
