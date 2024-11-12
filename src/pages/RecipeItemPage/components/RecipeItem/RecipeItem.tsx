import { useCallback, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  PiHeartStraightBold,
  PiHeartStraightFill,
  PiBookmarkSimpleFill,
  PiBookmarkSimpleBold,
  PiPlusBold,
  PiMinusBold,
  PiTimerBold,
  PiDiamondBold,
} from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { GiShare } from "react-icons/gi";
import { MdEdit, MdOutlineLunchDining, MdOutlineBreakfastDining } from "react-icons/md";
import { LuSalad, LuCupSoda, LuSoup, LuApple, LuCroissant } from "react-icons/lu";
import RecipeItemProps from "./RecipeItemProps";
import { MealCategory, Difficulty } from "../../../../models";
import { GroupsFormFields } from "../SaveToGroups/GroupsFormFields";
import { useChangeRecipeItemMutation } from "../../../../store/apis/recipes/recipesApi";
import { groupsApi, useFetchGroupsQuery } from "../../../../store/apis/groups/groupsApi";
import SaveToGroups from "../SaveToGroups/SaveToGroups";
import IngredientsList from "../IngredientsList/IngredientsList";
import PreparingList from "../PreparingList/PreparingList";
import ShareRecipe from "../ShareRecipe/ShareRecipe";
import IconButton from "../../../../components/IconButton/IconButton";
import Card from "../../../../components/Card/Card";
import ChipsList from "../../../../components/ChipsList/ChipsList";
import ToastContext from "../../../../components/Toast/ToastProvider";
import Carousel from "../../../../components/Carousel/Carousel";
import { TimeConverter } from "../../../../utils/TimeConverter";

function RecipeItem({ recipe }: RecipeItemProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const [servingsQty, setServingsQty] = useState(recipe.portions);
  const [areGroupsShown, setAreGroupsShown] = useState(false);
  const [isShareRecipeShown, setIsShareRecipeShown] = useState(false);
  const [isCategoryLabelShown, setIsCategoryLabelShown] = useState(false);

  const [changeRecipeItem, changeRecipeItemResults] = useChangeRecipeItemMutation();
  const groupsFetchingResult = useFetchGroupsQuery();
  const groups = groupsFetchingResult.data;
  const groupsFetchingFailed = groupsFetchingResult.error || !groups || groups.length === 0;
  const isModalShown = isShareRecipeShown || areGroupsShown;

  useEffect(() => {
    if (changeRecipeItemResults.isSuccess) {
      showToast("success", "Recipe updated successfully");
    } else if (changeRecipeItemResults.isError) {
      showToast("error", "Updating recipe failed");
    }
  }, [changeRecipeItemResults, showToast]);

  useEffect(() => {
    if (groupsFetchingResult.error) {
      showToast("error", "Fetching groups failed");
    }
  }, [groupsFetchingResult, showToast]);

  let heartIcon;
  let saveToGroupsIcon;
  let iconCategory;
  let colorDifficulty;
  let colorTime;
  const shortTime = 30;
  const longTime = 60;
  const maxServings = 99;
  const minServings = 1;

  if (recipe.favourite) {
    heartIcon = <PiHeartStraightFill className="h-14 w-14" />;
  } else {
    heartIcon = <PiHeartStraightBold className="h-14 w-14" />;
  }

  switch (recipe.category) {
    case MealCategory.Breakfast:
      iconCategory = <MdOutlineBreakfastDining className="h-8 w-8 text-pm-orange-base" />;
      break;
    case MealCategory.Dessert:
      iconCategory = <LuCroissant className="h-8 w-8 text-pm-orange-base" />;
      break;
    case MealCategory.Dinner:
      iconCategory = <MdOutlineLunchDining className="h-8 w-8 text-pm-orange-base" />;
      break;
    case MealCategory.Drink:
      iconCategory = <LuCupSoda className="h-8 w-8 text-pm-orange-base" />;
      break;
    case MealCategory.Lunch:
      iconCategory = <LuSalad className="h-8 w-8 text-pm-orange-base" />;
      break;
    case MealCategory.Snack:
      iconCategory = <LuApple className="h-8 w-8 text-pm-orange-base" />;
      break;
    case MealCategory.Supper:
      iconCategory = <LuSoup className="h-8 w-8 text-pm-orange-base" />;
      break;
  }

  switch (recipe.difficulty) {
    case Difficulty.EASY:
      colorDifficulty = "text-pm-green-base";
      break;
    case Difficulty.NORMAL:
      colorDifficulty = "text-pm-orange-base";
      break;
    case Difficulty.HARD:
      colorDifficulty = "text-red-500";
      break;
  }

  if (recipe.time <= shortTime) {
    colorTime = "text-pm-green-base";
  } else if (recipe.time > shortTime && recipe.time <= longTime) {
    colorTime = "text-pm-orange-base";
  } else {
    colorTime = "text-red-500";
  }

  if (recipe.groups.length === 0) {
    saveToGroupsIcon = <PiBookmarkSimpleBold className="w-16 h-16" />;
  } else {
    saveToGroupsIcon = <PiBookmarkSimpleFill className="w-16 h-16" />;
  }

  const approximateTime = TimeConverter.toApproximateTimeString(recipe.time);
  const classesDifficulty = `w-1/4 flex justify-start items-center mx-2 text-s ${colorDifficulty}`;
  const classesTime = `w-3/4 flex justify-start items-center mx-2 text-s ${colorTime}`;

  const handleGroupsVisibility = useCallback(
    () => setAreGroupsShown(!areGroupsShown),
    [areGroupsShown],
  );

  const handleCloseSharePortal = () => {
    setIsShareRecipeShown(false);
  };

  const handleCloseSaveToGroups = () => {
    setAreGroupsShown(false);
  };

  const handleDecrement = () => {
    if (servingsQty > minServings) {
      setServingsQty(servingsQty - 1);
    }
  };

  const handleIncrement = () => {
    if (servingsQty < maxServings) {
      setServingsQty(servingsQty + 1);
    }
  };

  const handleFavourites = () => {
    const changedRecipe = { ...recipe, favourite: !recipe.favourite };
    changeRecipeItem(changedRecipe);
  };

  const handleClickInfo = () => {
    setIsCategoryLabelShown(true);
    setTimeout(() => setIsCategoryLabelShown(false), 2000);
  };

  const handleSaveToGroup = useCallback(
    (data: GroupsFormFields) => {
      handleGroupsVisibility();
      changeRecipeItem({ ...recipe, groups: data.groups })
        .unwrap()
        .then(() => {
          dispatch(groupsApi.util.invalidateTags([{ type: "Group", id: "All" }]));
        });
    },
    [handleGroupsVisibility, changeRecipeItem, recipe, dispatch],
  );

  const handleChangeServings = (event: React.FormEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value !== "") {
      const value = parseInt((event.target as HTMLInputElement).value);
      setServingsQty(Math.min(Math.max(minServings, value), maxServings));
    } else {
      setServingsQty(minServings);
    }
  };

  return (
    <div className={isModalShown ? "h-full overflow-hidden" : "h-full"}>
      <div className="bg-pm-white pb-24">
        <Carousel photos={recipe.photos} indicators={false} />
        <IconButton
          className="absolute top-2 left-2 h-14 w-14 text-white"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack className="h-14 w-14" />
        </IconButton>
        <IconButton
          className="absolute top-2 right-4 h-14 w-14 text-white"
          onClick={handleFavourites}
        >
          {heartIcon}
        </IconButton>
        <div className="flex items-center relative bottom-8">
          <div
            className="flex items-center justify-center relative left-6 w-14 h-14 rounded-full bg-white drop-shadow-xl"
            onClick={handleClickInfo}
            onMouseOver={() => setIsCategoryLabelShown(true)}
            onMouseLeave={() => setIsCategoryLabelShown(false)}
          >
            {iconCategory}
          </div>
          {isCategoryLabelShown && (
            <div className="flex absolute left-20 bottom-12 items-center justify-center h-8 p-2 rounded-md bg-white drop-shadow-xl">
              {recipe.category}
            </div>
          )}
          <IconButton
            raised
            secondary
            className="flex items-center justify-center relative left-44 mx-1 h-12 w-12"
            onClick={() => setIsShareRecipeShown(true)}
          >
            <GiShare className="w-7 h-7 -translate-x-0.5" />
          </IconButton>
          <IconButton
            raised
            primary
            className="flex items-center justify-center relative left-44 mx-1 h-16 w-16"
            onClick={() => navigate(`/recipes/${recipe._id}/edit`, { state: recipe })}
          >
            <MdEdit className="h-10 w-10" />
          </IconButton>
        </div>
        <div className="mx-6">
          <div className="flex flex-wrap relative bottom-4">
            <div className=" w-3/4 text-left">
              <h1>{recipe.title}</h1>
            </div>
            <IconButton
              primary
              className="self-start"
              onClick={handleGroupsVisibility}
              disabled={groupsFetchingFailed ? true : false}
            >
              {saveToGroupsIcon}
            </IconButton>
          </div>
          <div className="flex">
            <span className={classesDifficulty}>
              <PiDiamondBold className="h-4 w-4 mr-1" />
              {recipe.difficulty}
            </span>
            <span className={classesTime}>
              <PiTimerBold className="h-4 w-4" />
              <span className="pl-0.5">{approximateTime}</span>
            </span>
          </div>
          <ChipsList chips={recipe.tags} selectionType="none" className="flex mt-2" />
          <p className="mx-2 my-8 leading-5 text-justify text-pm-black">{recipe.description}</p>
          <hr className="mx-6 mb-6" />
          <div className="flex flex-wrap">
            <div className="flex items-center">
              <h2>Ingredients</h2>
              <div className="flex">
                <IconButton raised primary className="p-1 ml-2 mr-1" onClick={handleDecrement}>
                  <PiMinusBold className="h-4 w-4" />
                </IconButton>
                <input
                  type="number"
                  className="w-5 mr-2 text-pm-black bg-transparent text-end focus:outline-none"
                  value={servingsQty}
                  max={maxServings}
                  min={minServings}
                  onFocus={(e) => e.target.select()}
                  onChange={handleChangeServings}
                />
                <span className="text-pm-black">servings</span>
                <IconButton raised primary className="p-1 mx-2" onClick={handleIncrement}>
                  <PiPlusBold className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
            <Card className=" my-4">
              <IngredientsList recipe={recipe} servings={servingsQty} />
            </Card>
          </div>
          <div className="flex flex-wrap">
            <h2>Prepering</h2>
            <PreparingList recipe={recipe}></PreparingList>
          </div>
        </div>
      </div>
      <SaveToGroups
        areGroupsShown={areGroupsShown}
        closeGroups={handleCloseSaveToGroups}
        handleSaveToGroup={(data) => handleSaveToGroup(data)}
        recipe={recipe}
        groups={groups || []}
      />
      <ShareRecipe
        isShareRecipeShown={isShareRecipeShown}
        closeShareRecipe={handleCloseSharePortal}
      />
    </div>
  );
}

export default RecipeItem;
