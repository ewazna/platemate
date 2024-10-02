import { Recipe } from "../../../models";

export interface RecipeListProps {
  className: string;
  recipes: Recipe[];
  onScroll: () => void;
}
