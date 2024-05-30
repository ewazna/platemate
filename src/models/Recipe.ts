import { TimeUnit } from "./TimeUnitEnum";
import { Difficulty } from "./DifficultyEnum";
import { Ingredient } from "./Ingredient";
import { Rate } from "./RateEnum";
import { MealCategory } from "./MealCategoryEnum";

export interface Recipe {
  id: string;
  username: string;
  title: string;
  time: number;
  timeUnit: TimeUnit;
  portions: number;
  difficulty: Difficulty;
  ingredients: Ingredient[];
  description: string;
  steps: string[];
  photos: string[];
  comments?: Comment[];
  rate: Rate;
  categories: MealCategory[];
  groups: string[];
  meal: string[];
  private: boolean;
}
