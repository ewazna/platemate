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
import Card from "../../components/Card/Card";
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
    append({ name: "", quantity: "", unit: "" });
  };

  const handleAddStep = () => {
    appendStep({ description: "" });
  };

  const handleDiscard = () => {
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
    <div className="relative h-screen">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="w-full bg-pm-white pb-20 md:translate-y-36 md:max-w-[1024px] md:place-self-center md:drop-shadow-2xl md:pb-8">
          <div className="md:mb-14">
            <Controller
              control={control}
              name="photos"
              rules={{
                validate: (value) =>
                  value.filter((photo) => photo.state !== "deleted").length !== 0 ||
                  "Photo is required",
              }}
              render={({ field: { value, onChange, disabled } }) => (
                <RecipePhotos photos={[...value]} onChange={onChange} disabled={disabled} />
              )}
            />
            {errors.photos && (
              <p className="text-pm-error-base text-sm font-medium w-full text-right pr-12 pt-2 md:pr-32">
                {errors.photos.message}
              </p>
            )}
            <IconButton
              disabled={isFormSaving}
              type="button"
              className="absolute top-2 left-2 h-14 w-14 text-white md:hidden"
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack className="h-14 w-14" />
            </IconButton>
          </div>
          <h1 className="mx-8 my-4 text-left md:hidden">
            {state ? "Edit a recipe" : "Create a recipe"}
          </h1>
          <div className="grid grid-cols-[30%_70%] mx-8 my-2 items-center md:my-4 md:mx-28 md:grid-cols-[15%_85%]">
            <label htmlFor="title" className="text-start">
              Title
            </label>

            <Input
              id="title"
              placeholder="Title of your recipe"
              disabled={isFormSaving}
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
          <div className="md:grid md:grid-cols-[15%_85%] md:mx-28 md:my-4  md:items-baseline">
            <label htmlFor="category" className="hidden text-start md:flex">
              Category
            </label>
            <div className="md:grid md:grid-cols-[2fr_1fr_2fr] md:gap-2 md:items-baseline">
              <div className="grid grid-cols-[30%_70%] mx-8 my-2 items-center md:grid-cols-1 md:m-0">
                <label htmlFor="category" className="text-start md:hidden">
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
              <div className="grid grid-cols-[30%_70%] mx-8 my-2 items-center md:m-0 md:col-span-2 md:grid-cols-[1fr_2fr]">
                <label htmlFor="groups" className="text-start md:pl-6">
                  Groups
                </label>
                <Controller
                  control={control}
                  name="groups"
                  render={({ field: { onChange, value, disabled } }) => (
                    <>
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
            </div>
          </div>
          <div className="md:grid md:grid-cols-[15%_85%] md:mx-28 md:my-4 md:items-baseline">
            <label htmlFor="category" className="hidden text-start md:flex">
              Difficulty
            </label>
            <div className="md:grid md:grid-cols-[2fr_1fr_2fr] md:gap-2 md:items-baseline">
              <div className="grid grid-cols-[30%_70%] mx-8 my-2 items-center md:grid-cols-1 md:m-0">
                <label htmlFor="difficulty" className="text-start md:hidden">
                  Difficulty
                </label>
                <Controller
                  control={control}
                  name="difficulty"
                  rules={{
                    required: "Difficulty is required",
                  }}
                  render={({ field: { onChange, value, disabled } }) => (
                    <>
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
              <div className="grid grid-cols-[30%_70%] mx-8 my-2 items-center md:m-0 md:col-span-2 md:grid-cols-[1fr_2fr] md:gap-x-2">
                <label htmlFor="portions" className="text-start md:pl-6">
                  Portions
                </label>
                <Input
                  id="portions"
                  placeholder="Quantity of servings"
                  type="number"
                  disabled={isFormSaving}
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
            </div>
          </div>
          <div className="grid grid-cols-[30%_70%] mx-8 my-2 items-center md:grid-cols-[15%_85%] md:mx-28 md:my-4">
            <label htmlFor="time" className="text-start">
              Time
            </label>
            <div className="flex flex-nowrap gap-x-2  md:grid md:grid-cols-[2fr_1fr_2fr]">
              <div className="w-full md:col-span-2">
                <Input
                  id="time"
                  placeholder="Time"
                  type="number"
                  disabled={isFormSaving}
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
              </div>
              <div className="w-48 md:w-auto">
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
          <div className="mx-8 md:my-4 md:mx-28">
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
                  className="ml-2 max-w-[70%] md:max-w-[85%]"
                >
                  Tags
                </ChipsInput>
              )}
            />
          </div>
          <div className="flex flex-wrap items-center mx-8 my-2 md:my-4 md:mx-28 md:grid-cols-[15%_85%]">
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
          <div className="flex flex-col mx-8 my-2 items-start md:my-4 md:mx-28">
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value, disabled } }) => (
                <TextArea
                  placeholder="Describe your recipe"
                  className="flex flex-wrap mr-2 px-4 my-1 rounded-[20px] w-full min-h-[132px] content-start line-clamp-5 focus-visible:line-clamp-none"
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                >
                  Description
                </TextArea>
              )}
            />
          </div>
          <div className="flex flex-wrap items-center mx-8 my-2 md:my-4 md:mx-28">
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
          <div className="flex justify-between my-4 md:justify-end md:mx-28 md:mt-8">
            <Button
              type="button"
              disabled={isFormSaving}
              basic
              raised
              onClick={handleDiscard}
              className="ml-8 mr-2 justify-center w-36 md:w-44"
            >
              Discard
            </Button>
            <Button
              loading={isFormSaving}
              type="submit"
              secondary
              raised
              className="mr-8 ml-2 justify-center w-36 md:w-44"
            >
              {state ? "Change" : "Create"}
            </Button>
          </div>
        </div>
        <Card className="hidden md:w-full md:h-20 md:fixed md:top-16 md:bg-pm-white md:rounded-none md:flex md:items-center md:drop-shadow-[0_-2px_6px_rgba(0,0,0,0.3)]">
          <IconButton
            disabled={isFormSaving}
            type="button"
            className="h-14 w-14 mr-1 text-pm-black"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack className="h-14 w-14" />
          </IconButton>
          <h1 className="my-4 text-left">{state ? "Edit recipe" : "Create recipe"}</h1>
        </Card>
      </form>
    </div>
  );
}

export default RecipeFormPage;
