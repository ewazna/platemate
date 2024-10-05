import { Group } from "../../../../models";

export interface GroupsManagerProps {
  showModal: boolean;
  groups: Group[];
  closeGroupsManager: () => void;
  groupsApply: (data: Group[]) => void;
}
