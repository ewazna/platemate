import { Control } from "react-hook-form";
import { GroupsManagerFormFields } from "../GroupsManager/GroupsManagerFormFields";

export interface GroupControllerProps {
  control: Control<GroupsManagerFormFields>;
  i: number;
  handleDelete: () => void;
}
