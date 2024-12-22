import { Difficulty } from "./DifficultyEnum";
import { Ingredient } from "./Ingredient";
import { Rate } from "./RateEnum";
import { MealCategory } from "./MealCategoryEnum";
import { RecipePhoto } from "./RecipePhoto";

export interface Recipe {
  userId?: string;
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
  photos: RecipePhoto[];
  comments?: Comment[];
  rate?: Rate;
  favourite: boolean;
}
