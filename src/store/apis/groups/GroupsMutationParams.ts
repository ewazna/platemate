import { Group } from "../../../models";

export interface GroupsMutationParams {
  groups: Group[];
  deleteRecipes: boolean;
}
