import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller, useFieldArray, FieldError } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { PiPlusBold } from "react-icons/pi";

import IconButton from "../../components/IconButton/IconButton";
import IngredientFormGroup from "./components/IngredientFormGroup/IngredientFormGroup";
import PreparingController from "./components/PreparingController/PreparingController";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import ChipsInput from "../../components/ChipsInput/ChipsInput";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";
import RecipePhotos from "./components/RecipePhotos/RecipePhotos";
import ToastContext from "../../components/Toast/ToastProvider";
import { TimeConverter } from "../../utils/TimeConverter";

import {
  useAddRecipeItemMutation,
  useChangeRecipeItemMutation,
  useFetchTagsQuery,
  useFetchGroupsQuery,
} from "../../store";
import { groupsApi } from "../../store/apis/groups/groupsApi";

import { Difficulty, MealCategory, Recipe, TimeUnit, Unit, RecipePhoto } from "../../models";
import { RecipeFormFields } from "./RecipeFromFields";

function RecipeFormPage() {
  const [tagsInputValue, setTagsInputValue] = useState("");
  const { showToast } = useContext(ToastContext);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [changeRecipe, changeRecipeResults] = useChangeRecipeItemMutation();
  const [addRecipe, addRecipeResults] = useAddRecipeItemMutation();

  const groupsFetchingResult = useFetchGroupsQuery();
  const groups = groupsFetchingResult.data || [];

  const tagsFetchingResult = useFetchTagsQuery(tagsInputValue);
  const tags = (tagsFetchingResult.data || []).map((tag) => {
    return tag.tag;
  });

  const isFormSaving = changeRecipeResults.isLoading || addRecipeResults.isLoading;

  let defaultValues;
  if (state) {
    const { timeInUnit, timeUnit } = TimeConverter.toTimeAndUnit(state.time);
    defaultValues = {
      ...state,
      time: {
        quantity: timeInUnit,
        unit: timeUnit,
      },
      steps: state.steps.map((step: string) => {
        return { description: step };
      }),
      photos: state.photos.map((photo: RecipePhoto) => {
        return { ...photo, state: "existing" };
      }),
    };
  } else {
    defaultValues = {
      photos: [],
      title: "",
      category: undefined,
      groups: [],
      time: {
        quantity: "" as unknown as number,
        unit: "",
      },
      portions: "" as unknown as number,
      difficulty: "",
      tags: [],
      ingredients: [{}],
      description: "",
      steps: [{}],
    };
  }

  const {
    handleSubmit,
    control,
    watch,
    reset,
    register,
    formState: { errors },
  } = useForm<RecipeFormFields>({ defaultValues, disabled: isFormSaving });

  const { fields, append, remove } = useFieldArray({
    rules: { minLength: 1 },
    control,
    name: "ingredients" as unknown as never,
  });

  const {
    fields: fieldsSteps,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    rules: { minLength: 1 },
    control,
    name: "steps" as unknown as never,
  });

  useEffect(() => {
    if (changeRecipeResults.isSuccess) {
      dispatch(groupsApi.util.invalidateTags([{ type: "Group", id: "All" }]));
      showToast("success", "Recipe updated successfully");
      navigate(`/recipes/${changeRecipeResults.data?._id}`);
    } else if (changeRecipeResults.isError) {
      showToast("error", "Updating recipe failed");
    }
  }, [changeRecipeResults, navigate, dispatch, showToast]);

  useEffect(() => {
    if (addRecipeResults.isSuccess) {
      dispatch(groupsApi.util.invalidateTags([{ type: "Group", id: "All" }]));
      showToast("success", "Recipe saved successfully");
      navigate(`/recipes/${addRecipeResults.data?._id}`);
    } else if (addRecipeResults.isError) {
      showToast("error", "Saving new recipe failed");
    }
  }, [addRecipeResults, navigate, dispatch, showToast]);

  const handleAddIngredient = () => {
    append({});
  };

  const handleAddStep = () => {
    appendStep({});
  };

  const handleDismiss = () => {
    reset(defaultValues);
  };

  const onTagsInputChange = (searchTerm: string) => {
    setTagsInputValue(searchTerm);
  };

  const onSubmit: SubmitHandler<RecipeFormFields> = (data) => {
    const time = TimeConverter.toMinutes(data.time.quantity, data.time.unit as TimeUnit);

    const newRecipe: Recipe = {
      title: data.title,
      category: data.category as MealCategory,
      groups: groups
        .filter((group) => data.groups.includes(group._id as string))
        .map((group) => group._id as string),
      time: time,
      portions: data.portions,
      difficulty: data.difficulty as Difficulty,
      tags: data.tags,
      ingredients: data.ingredients.map((ingredient) => {
        return {
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit as Unit,
        };
      }),
      description: data.description,
      steps: data.steps?.map((step) => step.description),
      photos: data.photos,
      favourite: false,
    };

    if (state) {
      newRecipe._id = state._id;
      changeRecipe(newRecipe);
    } else {
      addRecipe(newRecipe);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="bg-pm-white pb-20">
        <div>
          <Controller
            control={control}
            name="photos"
            rules={{
              validate: (value) =>
                value.filter((photo) => photo.state !== "deleted").length !== 0 ||
                "Photo is required",
            }}
            render={({ field: { value, onChange, disabled } }) => (
              <RecipePhotos photos={value} onChange={onChange} disabled={disabled} />
            )}
          />
          {errors.photos && (
            <p className="text-pm-error-base text-sm font-medium w-full text-right pr-12 pt-2">
              {errors.photos.message}
            </p>
          )}
          <IconButton
            disabled={isFormSaving}
            type="button"
            className="absolute top-2 left-2 h-14 w-14 text-white"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack className="h-14 w-14" />
          </IconButton>
        </div>
        <h1 className="mx-8 my-4 text-left">Create a recipe</h1>
        <div className="grid grid-cols-[30%_70%] mx-8 my-2 items-center">
          <label htmlFor="title" className="text-start">
            Title
          </label>

          <Input
            id="title"
            placeholder="Title of your recipe"
            className="px-4"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 50,
                message: "Maximum length of title is 50",
              },
            })}
            invalid={errors.title ? true : false}
            errors={errors.title}
          />
        </div>
        <div className="grid grid-cols-[30%_70%] mx-8 my-2 items-center">
          <label htmlFor="category" className="text-start">
            Category
          </label>

          <Controller
            control={control}
            name="category"
            rules={{ required: "Category is required" }}
            render={({ field: { onChange, value, disabled } }) => (
              <>
                <Select
                  name="category"
                  id="category"
                  options={Object.values(MealCategory).map((category) => {
                    return { value: category, label: category };
                  })}
                  placeholder="Meal category"
                  isMulti={false}
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                  invalid={errors.category ? true : false}
                  errors={errors.category}
                />
              </>
            )}
          />
        </div>
        <div className="grid grid-cols-[30%_70%] mx-8 my-2 items-center">
          <Controller
            control={control}
            name="groups"
            render={({ field: { onChange, value, disabled } }) => (
              <>
                <label htmlFor="groups" className="text-start">
                  Groups
                </label>
                <Select
                  name="groups"
                  id="groups"
                  options={groups.map((group) => {
                    return { value: group._id as string, label: group.name };
                  })}
                  placeholder="Your groups"
                  isMulti
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                  invalid={errors.groups ? true : false}
                  errors={errors.groups as FieldError | undefined}
                />
              </>
            )}
          />
        </div>
        <div className="grid grid-cols-[30%_70%] mx-8 my-2 items-center">
          <label htmlFor="time" className="text-start">
            Time
          </label>
          <div className="flex flex-nowrap gap-x-2">
            <Input
              id="time"
              placeholder="Time"
              type="number"
              className="flex grow px-4"
              {...register("time.quantity", {
                required: "Time is required",
                min: {
                  value: 0,
                  message: "Time in minutes must be greater than 0",
                },
                max: {
                  value: 999,
                  message: "Maximum number in time field is 999",
                },
              })}
              invalid={errors.time?.quantity ? true : false}
              min={0}
              max={999}
            />
            <div className="w-48">
              <Controller
                control={control}
                name="time.unit"
                rules={{
                  required: "Time unit is required",
                }}
                render={({ field: { onChange, value, disabled } }) => (
                  <Select
                    name="time"
                    id="time"
                    options={Object.values(TimeUnit).map((timeUnit) => {
                      return { value: timeUnit, label: timeUnit };
                    })}
                    placeholder="Unit"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    invalid={errors.time?.unit ? true : false}
                  />
                )}
              />
            </div>
          </div>
          <div className="w-full col-span-3 pt-0.5">
            {errors.time?.quantity && (
              <p className="text-pm-error-base text-sm font-medium w-full text-right pr-4">
                {errors.time.quantity.message}
              </p>
            )}
            {errors.time?.unit && (
              <p className="text-pm-error-base text-sm font-medium w-full text-right pr-4">
                {errors.time.unit.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-[30%_70%] mx-8 my-2 items-center">
          <label htmlFor="portions" className="text-start">
            Portions
          </label>
          <Input
            id="portions"
            placeholder="Quantity of servings"
            type="number"
            className="px-4"
            {...register("portions", {
              required: "Quantity of portions is required",
              min: {
                value: 1,
                message: "Quantity must be greater than 0",
              },
              max: {
                value: 99,
                message: "Maximum number of portions is 99",
              },
            })}
            invalid={errors.portions ? true : false}
            errors={errors.portions}
            min={1}
            max={99}
          />
        </div>
        <div className="grid grid-cols-[30%_70%] mx-8 my-2 items-center">
          <Controller
            control={control}
            name="difficulty"
            rules={{
              required: "Difficulty is required",
            }}
            render={({ field: { onChange, value, disabled } }) => (
              <>
                <label htmlFor="difficulty" className="text-start">
                  Difficulty
                </label>
                <Select
                  name="difficulty"
                  id="difficulty"
                  options={Object.values(Difficulty).map((difficulty) => {
                    return { value: difficulty, label: difficulty };
                  })}
                  placeholder="Difficulty"
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                  invalid={errors.difficulty ? true : false}
                  errors={errors.difficulty}
                />
              </>
            )}
          />
        </div>
        <div className="mx-8">
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, value, disabled } }) => (
              <ChipsInput
                id="tags"
                placeholder="Tags for your recipe"
                direction="down"
                data={tags}
                allowNew
                value={value}
                onChange={onChange}
                inputValue={tagsInputValue}
                onInputChange={onTagsInputChange}
                disabled={disabled}
                className="ml-2 max-w-[70%]"
              >
                Tags
              </ChipsInput>
            )}
          />
        </div>
        <div className="flex flex-wrap items-center mx-8 my-2">
          <div className="flex w-full items-center">
            <h3>Ingredients</h3>
            <IconButton
              primary
              raised
              disabled={isFormSaving}
              className="scale-75 ml-2"
              type="button"
              onClick={handleAddIngredient}
            >
              <PiPlusBold />
            </IconButton>
          </div>
          <div className="my-2 w-full">
            {fields.map((field, i) => {
              return (
                <IngredientFormGroup
                  watch={watch}
                  handleDelete={() => remove(i)}
                  key={field.id}
                  control={control}
                  register={register}
                  errors={errors}
                  isFormSaving={isFormSaving}
                  {...{ i, field }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col mx-8 my-2 items-start">
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value, disabled } }) => (
              <TextArea
                placeholder="Describe your recipe"
                className="flex flex-wrap mr-2 px-4 my-1 min-h-24 rounded-[20px] w-full content-start"
                value={value}
                onChange={onChange}
                disabled={disabled}
              >
                Description
              </TextArea>
            )}
          />
        </div>
        <div className="flex flex-wrap items-center mx-8 my-2">
          <div className="flex w-full items-center">
            <h3>Prepering</h3>
            <IconButton
              primary
              raised
              disabled={isFormSaving}
              className="scale-75 ml-2"
              type="button"
              onClick={handleAddStep}
            >
              <PiPlusBold />
            </IconButton>
          </div>
          <>
            {fieldsSteps.map((field, i) => {
              return (
                <PreparingController
                  handleDelete={() => removeStep(i)}
                  key={field.id}
                  control={control}
                  errors={errors}
                  {...{ i, field }}
                />
              );
            })}
          </>
        </div>
        <div className="flex justify-between my-4">
          <Button
            type="button"
            disabled={isFormSaving}
            basic
            raised
            onClick={handleDismiss}
            className="ml-8 mr-2 justify-center w-36"
          >
            Dismiss
          </Button>
          <Button
            loading={isFormSaving}
            type="submit"
            secondary
            raised
            className="mr-8 ml-2 justify-center w-36"
          >
            {state ? "Change" : "Create"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default RecipeFormPage;
