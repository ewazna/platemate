import { Recipe } from "../../../../models";

export interface RecipeTopBarProps {
  recipe: Recipe;
  readOnly: boolean;
  groupsAvailable: boolean;
  handleShareClick: () => void;
  handleGroupsVisibility: () => void;
}
