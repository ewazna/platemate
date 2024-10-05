import { Controller } from "react-hook-form";
import { GroupControllerProps } from "./GroupControllerProps";
import GroupInput from "../GroupInput/GroupInput";

function GroupController({ control, i, handleDelete }: GroupControllerProps) {
  return (
    <Controller
      control={control}
      name={`groups.${i}.name`}
      render={({ field: { value, onChange, onBlur } }) => (
        <GroupInput value={value} onChange={onChange} onBlur={onBlur} handleDelete={handleDelete} />
      )}
    />
  );
}
export default GroupController;
