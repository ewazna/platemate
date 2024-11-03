import { PiTrashSimpleBold } from "react-icons/pi";
import { Controller } from "react-hook-form";
import { IngredientFormGroupProps } from "./IngredientFormGroupProps";
import Input from "../../../../components/Input/Input";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import Select from "../../../../components/Select/Select";
import IconButton from "../../../../components/IconButton/IconButton";
import { Unit } from "../../../../models";

import { useFetchIngredientsQuery } from "../../../../store";

function IngredientFormGroup({
  errors,
  control,
  register,
  watch,
  isFormSaving,
  i,
  handleDelete,
}: IngredientFormGroupProps) {
  const ingredientsFetchingResult = useFetchIngredientsQuery(watch(`ingredients.${i}.name`));
  const ingredients = ingredientsFetchingResult.data?.map((ingredient) => {
    return ingredient.name;
  });

  return (
    <div className="mb-4">
      <div className="grid grid-cols-[1fr_1fr_110px_32px] gap-1">
        <div className="col-span-3 relative">
          <Controller
            control={control}
            name={`ingredients.${i}.name`}
            rules={{ required: true }}
            render={({ field: { onChange, value, disabled } }) => (
              <SearchInput
                direction="down"
                searchData={ingredients}
                placeholder="Name"
                className="px-4 w-full"
                value={value}
                onChange={onChange}
                disabled={disabled}
                watch={watch}
                invalid={errors.ingredients && errors.ingredients[i]?.name ? true : false}
              />
            )}
          />
        </div>

        <IconButton
          className="m-0 px-0 w-8 h-8 justify-center"
          onClick={handleDelete}
          disabled={isFormSaving}
        >
          <PiTrashSimpleBold />
        </IconButton>

        <div className="col-span-2">
          <Input
            type="number"
            placeholder="Qty"
            className="px-4 w-full"
            {...register(`ingredients.${i}.quantity`, {
              required: true,
              min: 0,
            })}
            invalid={errors.ingredients && errors.ingredients[i]?.quantity ? true : false}
          />
        </div>

        <div>
          <Controller
            control={control}
            name={`ingredients.${i}.unit`}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value, disabled } }) => (
              <Select
                placeholder="Unit"
                options={Object.values(Unit).map((unit) => {
                  return { value: unit, label: unit };
                })}
                value={value}
                onChange={onChange}
                disabled={disabled}
                invalid={errors.ingredients && errors.ingredients[i]?.unit ? true : false}
              ></Select>
            )}
          />
        </div>
      </div>
      {errors.ingredients && errors.ingredients[i] && (
        <p className="text-pm-error-base text-sm font-medium w-full text-right pr-14 pt-0.5">
          All fields in ingredient are required
        </p>
      )}
    </div>
  );
}

export default IngredientFormGroup;