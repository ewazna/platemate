import { Control, FieldErrors } from "react-hook-form";
import { GroupsManagerFormFields } from "../GroupsManager/GroupsManagerFormFields";

export interface GroupControllerProps {
  errors: FieldErrors<GroupsManagerFormFields>;
  control: Control<GroupsManagerFormFields>;
  i: number;
  handleDelete: () => void;
}
