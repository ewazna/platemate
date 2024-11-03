import { Controller } from "react-hook-form";
import { PiTrashSimpleBold } from "react-icons/pi";
import TextArea from "../../../../components/TextArea/TextArea";
import IconButton from "../../../../components/IconButton/IconButton";
import { PreparingControllerProps } from "./PreparingControllerProps";

function PreparingController({ errors, control, i, handleDelete }: PreparingControllerProps) {
  const isInvalid = errors.steps && errors.steps[i];
  return (
    <>
      <Controller
        control={control}
        name={`steps.${i}.description`}
        rules={{ required: true }}
        render={({ field: { onChange, value, disabled } }) => (
          <div className="flex flex-nowrap w-full items-start">
            <TextArea
              placeholder="Step of prepering"
              className="mr-2 px-4 my-1 min-h-24 rounded-[20px] content-start"
              value={value}
              onChange={onChange}
              disabled={disabled}
              error={isInvalid ? true : false}
            />
            <IconButton className="mt-2 p-2" onClick={handleDelete}>
              <PiTrashSimpleBold />
            </IconButton>
          </div>
        )}
      />
      {isInvalid && (
        <p className="text-pm-error-base text-sm font-medium w-full text-right pr-14 pt-0.5">
          All preparation fields must have a description
        </p>
      )}
    </>
  );
}

export default PreparingController;
