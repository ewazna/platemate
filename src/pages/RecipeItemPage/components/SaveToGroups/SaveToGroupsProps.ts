import { Recipe, Group } from "../../../../models";
import { GroupsFormFields } from "./GroupsFormFields";

export interface SaveToGroupsProps {
  areGroupsShown: boolean;
  recipe: Recipe;
  groups: Group[];
  closeGroups: () => void;
  handleSaveToGroup: (data: GroupsFormFields) => void;
}
