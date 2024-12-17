import React, { ForwardedRef, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FilterFormFields } from "./FilterFormFields";
import { useMediaQuery } from "../../../../hooks/useMediaQuery/useMediaQuery";
import { useFetchIngredientsQuery, useFetchTagsQuery } from "../../../../store";
import { Difficulty, MealCategory } from "../../../../models";
import { FilterFormProps } from "./FilterFormProps";
import ChipsList from "../../../../components/ChipsList/ChipsList";
import ChipsInput from "../../../../components/ChipsInput/ChipsInput";
import RangeSlider from "../../../../components/RangeSlider/RangeSlider";
import Button from "../../../../components/Button/Button";
import ExpansionPanel from "../../../../components/ExpansionPanel/ExpansionPanel";

const FilterForm = React.forwardRef<HTMLDivElement, FilterFormProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      onScroll,
      filtersApply,
      filterConfig,
      closeFiltersForm,
      className,
      fieldsContainerClasses,
    } = props;
    const [tagsInputValue, setTagsInputValue] = useState("");
    const [ingredientsInputValue, setIngredientsInputValue] = useState("");
    const isDesktop = useMediaQuery("(min-width: 768px)");

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

    const onSubmit: SubmitHandler<FilterFormFields> = (data) => {
      if (!isDesktop) {
        closeFiltersForm();
      }
      filtersApply(data);
    };

    const ingredientsFetchingResult = useFetchIngredientsQuery(ingredientsInputValue);
    const ingredients = (ingredientsFetchingResult.data || []).map((ingredient) => {
      return ingredient.name;
    });

    const tagsFetchingResult = useFetchTagsQuery(tagsInputValue);
    const tags = (tagsFetchingResult.data || []).map((tag) => {
      return tag.tag;
    });

    const timeMarks = [
      { value: 0, label: "10 min" },
      { value: 1, label: "30 min" },
      { value: 2, label: "45 min" },
      { value: 3, label: "1h" },
      { value: 4, label: "more" },
    ];

    const diets = ["vegan", "gluten free", "vegetarian", "sugar free"];

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
      <form className={className} onSubmit={handleSubmit(onSubmit)}>
        <div ref={ref} onScroll={onScroll} className={fieldsContainerClasses}>
          <ExpansionPanel
            className="mb-6 md:mb-3 md:text-sm min-[900px]:text-s"
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
            className="mb-6 md:mb-3 md:text-sm min-[900px]:text-s"
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
            className="mb-6 md:mb-3 md:text-sm min-[900px]:text-s"
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
            className="mb-6 md:mb-3 md:text-sm min-[900px]:text-s"
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
            className="mb-6 relative md:mb-3 md:text-sm min-[900px]:text-s"
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
            className="my-6 md:mb-6 md:mt-0 md:text-sm min-[900px]:text-s"
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
        <div className="w-[calc(100%_-_48px)] flex justify-between my-2 fixed bottom-4 md:w-full md:sticky md:bottom-2 md:my-4 md:mb-2 md:mx-1 md:items-center md:text-sm min-[900px]:text-s">
          <Button basic underlined type="button" className="py-0 px-1" onClick={clearFilters}>
            Clear all
          </Button>
          <Button secondary raised type="submit" className="w-44 md:w-24 md:h-8 md:mx-4">
            Apply
          </Button>
        </div>
      </form>
    );
  },
);

export default FilterForm;
