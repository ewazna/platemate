import { Recipe } from "../../../../models";

export interface RecipeDetailsProps {
  recipe: Recipe;
  readOnly: boolean;
  groupsAvailable: boolean;
  handleShareClick: () => void;
  handleGroupsVisibility: () => void;
}
