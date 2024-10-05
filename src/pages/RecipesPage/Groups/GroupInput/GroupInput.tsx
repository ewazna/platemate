import Input from "../../../../components/Input/Input";
import IconButton from "../../../../components/IconButton/IconButton";
import { GroupInputProps } from "./GroupInputProps";
import { RiDeleteBin7Line } from "react-icons/ri";

function GroupInput({ value, onChange, onBlur, handleDelete }: GroupInputProps) {
  return (
    <div className="flex flex-nowrap w-full my-2">
      <Input
        basic
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="text-s px-4 ml-1 mr-2"
      />
      <IconButton onClick={handleDelete}>
        {<RiDeleteBin7Line className="h-6 w-6 text-pm-grey-darker" />}
      </IconButton>
    </div>
  );
}
export default GroupInput;
