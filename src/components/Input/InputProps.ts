import { FieldError, UseFormWatch } from "react-hook-form";
import { RecipeFormFields } from "../../pages/RecipeFormPage/RecipeFromFields";
import { ComponentPropsWithoutRef } from "react";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  basic?: boolean;
  raised?: boolean;
  type?: "text" | "number" | undefined;
  error?: boolean;
  icon?: React.ReactNode;
  iconPlacement?: "left" | "right";
  errors?: FieldError;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  watch?: UseFormWatch<RecipeFormFields>;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
