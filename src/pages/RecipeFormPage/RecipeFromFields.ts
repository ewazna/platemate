import { Step, RecipePhoto } from "../../models";

export interface TimeFormFields {
  quantity: number;
  unit: string;
}

export interface IngredientFormFields {
  id?: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeFormFields {
  photos: RecipePhoto[];
  title: string;
  category: string;
  groups: string[];
  time: TimeFormFields;
  portions: number;
  difficulty: string;
  tags: string[];
  ingredients: IngredientFormFields[];
  description: string;
  steps: Step[];
}
