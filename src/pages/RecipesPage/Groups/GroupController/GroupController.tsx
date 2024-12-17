import { Controller } from "react-hook-form";
import { GroupControllerProps } from "./GroupControllerProps";
import GroupInput from "../GroupInput/GroupInput";

function GroupController({ errors, control, i, handleDelete }: GroupControllerProps) {
  return (
    <Controller
      control={control}
      name={`groups.${i}.name`}
      rules={{
        required: true,
      }}
      render={({ field: { value, onChange, onBlur } }) => (
        <GroupInput
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          handleDelete={handleDelete}
          invalid={errors.groups && errors.groups[i]?.name ? true : false}
        />
      )}
    />
  );
}
export default GroupController;
