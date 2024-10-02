import { Difficulty } from "./DifficultyEnum";
import { Ingredient } from "./Ingredient";
import { Rate } from "./RateEnum";
import { MealCategory } from "./MealCategoryEnum";

export interface Recipe {
  _id?: string;
  creationDate?: string;
  title: string;
  category: MealCategory;
  groups: string[];
  time: number;
  portions: number;
  difficulty: Difficulty;
  tags: string[];
  ingredients: Ingredient[];
  description: string;
  steps: string[];
  photos: { filename: string; url: string }[];
  comments?: Comment[];
  rate?: Rate;
  favourite: boolean;
}
