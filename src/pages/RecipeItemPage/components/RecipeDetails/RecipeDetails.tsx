import React, { ForwardedRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiShare } from "react-icons/gi";
import {
  PiBookmarkSimpleBold,
  PiBookmarkSimpleFill,
  PiDiamondBold,
  PiTimerBold,
} from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { Difficulty } from "../../../../models";
import { TimeConverter } from "../../../../utils/TimeConverter";
import { RecipeDetailsProps } from "./RecipeDetailsProps";
import ChipsList from "../../../../components/ChipsList/ChipsList";
import IconButton from "../../../../components/IconButton/IconButton";
import CategoryIcon from "../CategoryIcon/CategoryIcon";

const RecipeDetails = React.forwardRef<HTMLDivElement, RecipeDetailsProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { recipe, readOnly, groupsAvailable, handleShareClick, handleGroupsVisibility } = props;

    const navigate = useNavigate();
    const [isCategoryLabelShown, setIsCategoryLabelShown] = useState(false);

    const saveToGroupsIcon =
      recipe.groups.length === 0 ? (
        <PiBookmarkSimpleBold className="w-16 h-16" />
      ) : (
        <PiBookmarkSimpleFill className="w-16 h-16" />
      );

    let colorDifficulty;
    let colorTime;
    const shortTime = 30;
    const longTime = 60;
    const labelVisibleTimeout = 2000;

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

    const approximateTime = TimeConverter.toApproximateTimeString(recipe.time);
    const difficultyClasses = `w-fit flex justify-start items-center mx-2 text-s ${colorDifficulty}`;
    const timeClasses = `w-fit flex justify-start items-center mx-2 text-s ${colorTime}`;
    const editButtonClasses =
      "flex items-center justify-center mx-1 h-16 w-16 " + (readOnly ? "hidden" : "");
    const groupsButtonClasses = "w-20 h-20 md:hidden " + (readOnly ? "hidden" : "");

    const handleClickInfo = () => {
      setIsCategoryLabelShown(true);
      setTimeout(() => setIsCategoryLabelShown(false), labelVisibleTimeout);
    };

    const handleEditClick = () => {
      navigate(`/recipes/${recipe._id}/edit`, { state: recipe });
    };

    return (
      <div ref={ref}>
        <div className="flex relative bottom-6 w-full h-fit items-center md:hidden">
          <div
            className="flex relative top-0 left-0 items-center justify-center w-14 h-14 rounded-full bg-white drop-shadow-xl"
            onClick={handleClickInfo}
            onMouseOver={() => setIsCategoryLabelShown(true)}
            onMouseLeave={() => setIsCategoryLabelShown(false)}
          >
            <CategoryIcon category={recipe.category} />
          </div>
          {isCategoryLabelShown && (
            <div className="flex absolute left-16 bottom-12 items-center justify-center h-8 p-2 rounded-md bg-white drop-shadow-xl ">
              {recipe.category}
            </div>
          )}
          <div className="flex absolute top-0 right-0">
            <IconButton
              raised
              secondary
              className="flex items-center justify-center mx-1 h-12 w-12"
              onClick={handleShareClick}
            >
              <GiShare className="w-7 h-7 -translate-x-0.5" />
            </IconButton>
            <IconButton raised primary className={editButtonClasses} onClick={handleEditClick}>
              <MdEdit className="h-10 w-10" />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-nowrap justify-between md:static">
          <div className="text-left py-2">
            <h1>{recipe.title}</h1>
          </div>
          <IconButton
            primary
            className={groupsButtonClasses}
            onClick={handleGroupsVisibility}
            disabled={groupsAvailable}
          >
            {saveToGroupsIcon}
          </IconButton>
        </div>
        <div className="flex my-1 md:my-4">
          <span className={difficultyClasses}>
            <PiDiamondBold className="h-4 w-4 mr-1" />
            {recipe.difficulty}
          </span>
          <span className={timeClasses}>
            <PiTimerBold className="h-4 w-4" />
            <span className="pl-0.5">{approximateTime}</span>
          </span>
          <span className="hidden md:w-fit md:flex md:justify-start md:items-center md:mx-2 md:text-s">
            <CategoryIcon category={recipe.category} />
            <span className="pl-0.5"> {recipe.category}</span>
          </span>
        </div>
        <ChipsList chips={recipe.tags} selectionType="none" className="flex flex-wrap mt-2" />
        <p className="mx-2 my-8 leading-5 text-justify text-pm-black">{recipe.description}</p>
        <hr className="mx-6 pb-4" />
      </div>
    );
  },
);

export default RecipeDetails;
