import { MealCategory, Difficulty } from "../../../../models";

export type FilterFormFields = {
  diets: string[];
  categories: MealCategory[];
  tags: string[];
  difficulty: Difficulty[];
  ingredients: string[];
  time: number;
};
