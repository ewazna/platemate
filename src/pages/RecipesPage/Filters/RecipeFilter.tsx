import { useEffect, useRef, useCallback, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useFetchTagsQuery, useFetchIngredientsQuery } from "../../../store";
import { CgClose } from "react-icons/cg";

import IconButton from "../../../components/IconButton/IconButton";
import ExpansionPanel from "../../../components/ExpansionPanel/ExpansionPanel";
import Button from "../../../components/Button/Button";
import RangeSlider from "../../../components/RangeSlider/RangeSlider";
import ChipsList from "../../../components/ChipsList/ChipsList";
import Modal from "../../../components/Modal/Modal";
import ChipsInput from "../../../components/ChipsInput/ChipsInput";

import type { RecipeFilterProps } from "./RecipeFilterProps";
import { FilterFormFields } from "./FilterFormFields";
import { Difficulty, MealCategory } from "../../../models";

function RecipeFilter({
  filterConfig,
  areFiltersShown,
  closeFiltersForm,
  handleFiltersApply,
}: RecipeFilterProps) {
  const [mask, setMask] = useState("");
  const [scrollTop, setScrollTop] = useState<number | undefined>(0);
  const [tagsInputValue, setTagsInputValue] = useState("");
  const [ingredientsInputValue, setIngredientsInputValue] = useState("");

  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { dirtyFields },
  } = useForm<FilterFormFields>({
    defaultValues: {
      diets: [],
      categories: [],
      tags: [],
      difficulty: [],
      ingredients: [],
      time: 4,
    },
  });

  useEffect(() => {
    if (filterConfig) {
      const parsedFilterConfig: FilterFormFields = JSON.parse(filterConfig);
      setValue("diets", parsedFilterConfig.diets, { shouldDirty: true });
      setValue("categories", parsedFilterConfig.categories, { shouldDirty: true });
      setValue("tags", parsedFilterConfig.tags, { shouldDirty: true });
      setValue("difficulty", parsedFilterConfig.difficulty, { shouldDirty: true });
      setValue("ingredients", parsedFilterConfig.ingredients, { shouldDirty: true });
      setValue("time", parsedFilterConfig.time, { shouldDirty: true });
    }
  }, [filterConfig, setValue]);

  const timeMarks = [
    { value: 0, label: "10 min" },
    { value: 1, label: "30 min" },
    { value: 2, label: "45 min" },
    { value: 3, label: "1h" },
    { value: 4, label: "more" },
  ];

  const diets = ["vegan", "gluten free", "vegetarian", "sugar free"];
  const onlyBottomMask =
    "[mask-image:linear-gradient(to_bottom,white_calc(100%_-_32px),transparent_100%)]";
  const topToBottomMask =
    "[mask-image:linear-gradient(to_bottom,transparent_0%,white_32px,white_calc(100%_-_32px),transparent_100%)]";

  const elementScroll = useRef<HTMLDivElement>(null);
  const div = elementScroll?.current;

  useEffect(() => {
    if (scrollTop === undefined) {
      return;
    } else if (scrollTop === 0) {
      setMask(onlyBottomMask);
    } else {
      setMask(topToBottomMask);
    }
  }, [scrollTop]);

  const ingredientsFetchingResult = useFetchIngredientsQuery(ingredientsInputValue);
  const ingredients = (ingredientsFetchingResult.data || []).map((ingredient) => {
    return ingredient.name;
  });

  const tagsFetchingResult = useFetchTagsQuery(tagsInputValue);
  const tags = (tagsFetchingResult.data || []).map((tag) => {
    return tag.tag;
  });

  const handleScroll = useCallback(() => {
    setScrollTop(div?.scrollTop);
  }, [div]);

  const onSubmit: SubmitHandler<FilterFormFields> = (data) => {
    closeFiltersForm();
    handleFiltersApply(data);
  };

  const clearFilters = () => {
    reset();
  };

  const onTagsInputChange = (searchTerm: string) => {
    setTagsInputValue(searchTerm);
  };

  const onIngredientsInputChange = (searchTerm: string) => {
    setIngredientsInputValue(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        isModalShown={areFiltersShown}
        closeModal={closeFiltersForm}
        className="top-32 h-[calc(100%_-_128px)]"
      >
        <div className="flex items-start justify-between sticky top-0">
          <h1 className="mb-3">Filters</h1>
          <IconButton onClick={() => closeFiltersForm()} basic className="scale-150">
            <CgClose />
          </IconButton>
        </div>
        <div
          ref={elementScroll}
          onScroll={handleScroll}
          className={"h-[calc(100%_-_136px)] overflow-auto mb-2 " + mask}
        >
          <ExpansionPanel
            className="mb-6"
            title="Diet"
            isExpanded={dirtyFields.diets ? true : false}
          >
            <Controller
              control={control}
              name="diets"
              render={({ field: { onChange, value } }) => (
                <ChipsList
                  onChange={onChange}
                  value={value}
                  chips={diets}
                  selectionType="multi"
                  className="flex flex-wrap"
                />
              )}
            />
          </ExpansionPanel>
          <ExpansionPanel
            className="mb-6"
            title="Categories"
            isExpanded={dirtyFields.categories ? true : false}
          >
            <Controller
              control={control}
              name="categories"
              render={({ field: { onChange, value } }) => (
                <ChipsList
                  onChange={onChange}
                  value={value}
                  chips={Object.values(MealCategory)}
                  selectionType="multi"
                  className="flex flex-wrap"
                />
              )}
            />
          </ExpansionPanel>
          <ExpansionPanel
            className="mb-6"
            title="Tags"
            isExpanded={dirtyFields.tags ? true : false}
          >
            <div className="px-1">
              <Controller
                control={control}
                name="tags"
                render={({ field: { onChange, value } }) => (
                  <ChipsInput
                    id="tags"
                    allowNew={false}
                    onChange={onChange}
                    value={value}
                    data={tags}
                    inputValue={tagsInputValue}
                    onInputChange={onTagsInputChange}
                    placeholder="Search tags"
                    className="w-full"
                  />
                )}
              />
            </div>
          </ExpansionPanel>
          <ExpansionPanel
            className="mb-6"
            title="Difficulty"
            isExpanded={dirtyFields.difficulty ? true : false}
          >
            <Controller
              control={control}
              name="difficulty"
              render={({ field: { onChange, value } }) => (
                <ChipsList
                  onChange={onChange}
                  value={value}
                  chips={Object.values(Difficulty)}
                  selectionType="multi"
                  className="flex flex-wrap"
                />
              )}
            />
          </ExpansionPanel>
          <ExpansionPanel
            className="mb-6 relative"
            title="Time"
            isExpanded={dirtyFields.time ? true : false}
          >
            <p className="absolute top-0 left-20 text-pm-black">
              {watch("time") === 4
                ? `> 1h`
                : `${"\u2264"} ${timeMarks[watch("time") as number].label}`}
            </p>
            <Controller
              control={control}
              name="time"
              render={({ field: { onChange, value } }) => (
                <RangeSlider
                  onChange={onChange}
                  value={value}
                  marks={timeMarks}
                  step={null}
                  max={4}
                  className="px-8"
                />
              )}
            />
          </ExpansionPanel>
          <ExpansionPanel
            className="my-6"
            title="Ingredients"
            isExpanded={dirtyFields.ingredients ? true : false}
          >
            <div className="px-1">
              <Controller
                control={control}
                name="ingredients"
                render={({ field: { onChange, value } }) => (
                  <ChipsInput
                    id="ingredients"
                    onChange={onChange}
                    value={value}
                    allowNew={false}
                    direction="up"
                    data={ingredients}
                    inputValue={ingredientsInputValue}
                    onInputChange={onIngredientsInputChange}
                    placeholder="Search ingredients"
                    className=" w-full"
                  />
                )}
              />
            </div>
          </ExpansionPanel>
        </div>
        <div className="flex justify-between my-4 sticky bottom-0">
          <Button basic underlined type="button" onClick={clearFilters}>
            Clear all
          </Button>
          <Button secondary raised type="submit" className="w-44">
            Apply
          </Button>
        </div>
      </Modal>
    </form>
  );
}

export default RecipeFilter;
