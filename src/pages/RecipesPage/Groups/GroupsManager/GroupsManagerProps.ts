import { Group } from "../../../../models";

export interface GroupsManagerProps {
  isGroupsManagerShown: boolean;
  closeGroupsManager: () => void;
  groups: Group[];
  groupsApply: (data: Group[], deleteRecipes: boolean) => void;
}
