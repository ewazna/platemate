import { useEffect, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { PiPlusBold } from "react-icons/pi";
import { GroupsManagerProps } from "./GroupsManagerProps";
import { GroupsManagerFormFields } from "./GroupsManagerFormFields";
import { Group } from "../../../../models";
import IconButton from "../../../../components/IconButton/IconButton";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import GroupDialog from "../GroupDialog/GroupDialog";
import GroupController from "../GroupController/GroupController";

function GroupsManager({
  isGroupsManagerShown,
  closeGroupsManager,
  groupsApply,
  groups,
}: GroupsManagerProps) {
  const defaultValues = {
    groups,
  };
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  const [isDialogShown, setIsDialogShown] = useState(false);

  const { handleSubmit, control, reset } = useForm<GroupsManagerFormFields>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "groups",
  });

  useEffect(() => {
    reset({ groups: groups });
  }, [groups, reset]);

  const onSubmit: SubmitHandler<GroupsManagerFormFields> = (data) => {
    if (shouldShowDialog) {
      setIsDialogShown(true);
      return;
    }
    groupsApply(data.groups, false);
  };

  const onConfirmedSubmit = (deleteRecipes: boolean) => {
    return (data: GroupsManagerFormFields) => {
      groupsApply(data.groups, deleteRecipes);
    };
  };

  const discardGroupsChanges = () => {
    reset(defaultValues);
    setShouldShowDialog(false);
  };

  const handleCloseGroupsManager = () => {
    closeGroupsManager();
    reset(defaultValues);
  };

  const handleAddInput = () => {
    append({ name: "", state: "empty" });
  };

  const handleDelete = (field: Group, i: number) => {
    remove(i);
    if (field.state === "used") {
      setShouldShowDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogShown(!isDialogShown);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal
          isModalShown={isGroupsManagerShown}
          closeModal={closeGroupsManager}
          className="top-32 h-[calc(100%_-_128px)]"
        >
          <div className="flex items-start justify-between sticky top-0">
            <h1 className="mb-3">Groups</h1>
            <IconButton onClick={handleCloseGroupsManager} basic className="scale-150">
              <CgClose />
            </IconButton>
          </div>
          <div className="flex flex-nowrap items-center">
            <span className="text-s mx-2">Add new group</span>
            <IconButton primary raised className="p-1" type="button" onClick={handleAddInput}>
              <PiPlusBold className="h-4 w-4" />
            </IconButton>
          </div>
          <div className="h-[calc(100%_-_136px)] overflow-auto pb-4">
            {fields.map((field, i) => {
              return (
                <GroupController
                  handleDelete={() => handleDelete(field, i)}
                  key={field.id}
                  {...{ control, i, field }}
                />
              );
            })}
          </div>
          <div className="flex justify-between my-4 sticky bottom-4">
            <Button basic underlined type="button" onClick={discardGroupsChanges}>
              Discard changes
            </Button>
            <Button secondary raised type="submit" className="w-44">
              Apply
            </Button>
          </div>
        </Modal>
      </form>
      <GroupDialog
        isDialogShown={isDialogShown}
        closeDialog={handleCloseDialog}
        handleKeepRecipes={handleSubmit(onConfirmedSubmit(false))}
        handleDeleteRecipes={handleSubmit(onConfirmedSubmit(true))}
      />
    </>
  );
}

export default GroupsManager;
