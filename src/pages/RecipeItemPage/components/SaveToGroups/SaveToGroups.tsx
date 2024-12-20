import { CgClose } from "react-icons/cg";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { SaveToGroupsProps } from "./SaveToGroupsProps";
import { GroupsFormFields } from "./GroupsFormFields";
import IconButton from "../../../../components/IconButton/IconButton";
import Button from "../../../../components/Button/Button";
import Listbox from "../../../../components/Listbox/Listbox";
import Modal from "../../../../components/Modal/Modal";

function SaveToGroups({
  areGroupsShown,
  recipe,
  groups,
  closeGroups,
  handleSaveToGroup,
}: SaveToGroupsProps) {
  const defaultValues = {
    groups: recipe.groups,
  };

  const { handleSubmit, control, reset } = useForm<GroupsFormFields>({
    defaultValues,
  });

  const options = groups?.map((group) => {
    return { label: group.name, value: group._id as string };
  });

  const discardChanges = () => {
    reset(defaultValues);
  };

  const onSubmit: SubmitHandler<GroupsFormFields> = (data) => {
    handleSaveToGroup(data);
  };

  const handleClose = () => {
    closeGroups();
    reset(defaultValues);
  };

  return (
    <Modal
      isModalShown={areGroupsShown}
      closeModal={closeGroups}
      className="bottom-0 min-[550px]:bottom-unset min-[550px]:w-[500px] min-[550px]:rounded-b-2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start justify-between sticky top-0">
          <h2 className="mb-3">Save to groups</h2>
          <IconButton onClick={handleClose} basic className="scale-150">
            <CgClose />
          </IconButton>
        </div>
        <Controller
          control={control}
          name="groups"
          render={({ field: { onChange, value } }) => (
            <Listbox
              value={value}
              onChange={onChange}
              options={options || []}
              selectionType="multi"
              selectionColor="bg-pm-grey-base"
              bgOptionColor="bg-pm-grey-light"
              selectionIcons={false}
              className="flex flex-wrap items-center py-2 bg-pm-grey-light px-4 rounded-xl"
            />
          )}
        />
        <div className="flex justify-between sticky bottom-4 mt-4 mb-3">
          <Button basic underlined type="button" onClick={discardChanges}>
            Discard changes
          </Button>
          <Button secondary raised type="submit" className="w-44">
            Apply
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default SaveToGroups;
