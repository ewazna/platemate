import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { PiPlusBold } from "react-icons/pi";
import { GroupsManagerProps } from "./GroupsManagerProps";
import { GroupsManagerFormFields } from "./GroupsManagerFormFields";
import IconButton from "../../../../components/IconButton/IconButton";
import Button from "../../../../components/Button/Button";
import Card from "../../../../components/Card/Card";
import GroupController from "../GroupController/GroupController";

function GroupsManager({ showModal, closeGroupsManager, groupsApply, groups }: GroupsManagerProps) {
  const defaultValues = {
    groups,
  };

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
    groupsApply(data.groups);
  };

  const discardGroupsChanges = () => {
    reset(defaultValues);
  };

  const handleCloseGroupsManager = () => {
    closeGroupsManager();
    reset(defaultValues);
  };

  const handleAddInput = () => {
    append({ name: "" });
  };

  return (
    <>
      {createPortal(
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={
              "absolute inset-0 bg-gray-600 " +
              (showModal
                ? "animate-fadeIn opacity-80 display-[inherit]"
                : "animate-fadeOut opacity-0 hidden")
            }
          ></div>
          <Card
            className={
              "absolute top-32 rounded-b-none h-[calc(100%_-_128px)] px-6 " +
              (showModal
                ? "animate-slideIn translate-y-0 display-[inherit]"
                : "animate-slideOut translate-y-full hidden")
            }
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
                    handleDelete={() => remove(i)}
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
              <Button secondary raised type="submit">
                Apply
              </Button>
            </div>
          </Card>
        </form>,
        document.querySelector(".container") as Element,
      )}
    </>
  );
}

export default GroupsManager;
