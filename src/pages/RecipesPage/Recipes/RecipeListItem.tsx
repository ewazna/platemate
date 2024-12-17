import { useNavigate } from "react-router-dom";

import IconButton from "../../../components/IconButton/IconButton";
import RecipeContextMenu from "./RecipeContextMenu/RecipeContextMenu";
import { useChangeRecipeItemMutation } from "../../../store";

import { Difficulty, TimeUnit } from "../../../models";
import { RecipeListItemProps } from "./RecipeListItemProps";
import {
  PiTimerBold,
  PiDiamondBold,
  PiHeartStraightBold,
  PiHeartStraightFill,
} from "react-icons/pi";
import { useMediaQuery } from "../../../hooks/useMediaQuery/useMediaQuery";

function convertTime(time: number, longTime: number): { convertedTime: string; unit: TimeUnit } {
  let convertedTime: string;
  let unitTime: TimeUnit;

  if (time <= longTime) {
    convertedTime = time.toString();
    unitTime = TimeUnit.MIN;
  } else if (time > longTime && time <= 1440) {
    const hours = time / 60;
    if (hours - Math.floor(hours)) {
      convertedTime = `${"\u2248"} ${Math.floor(hours)}`;
    } else {
      convertedTime = Math.floor(hours).toString();
    }
    unitTime = TimeUnit.H;
  } else {
    const days = time / 60 / 24;
    if (days - Math.floor(days)) {
      convertedTime = `${"\u2248"} ${Math.floor(days)}`;
    } else {
      convertedTime = Math.floor(days).toString();
    }
    unitTime = TimeUnit.DAYS;
  }
  return { convertedTime, unit: unitTime };
}

function convertUrl(url: string, photoWidth: string): string {
  return (
    url.substring(0, url.indexOf("upload") + 7) +
    "c_auto,w_" +
    photoWidth +
    url.slice(url.indexOf("upload") + 6)
  );
}

function getDifficultyColor(difficulty: Difficulty): string {
  const difficultyColorMap = new Map([
    [Difficulty.EASY, "text-pm-green-base"],
    [Difficulty.NORMAL, "text-pm-orange-base"],
    [Difficulty.HARD, "text-red-500"],
  ]);

  return difficultyColorMap.get(difficulty) as string;
}

function getTimeColor(time: number, shortTime: number, longTime: number): string {
  let timeColor;
  if (time <= shortTime) {
    timeColor = "text-pm-green-base";
  } else if (time > shortTime && time <= longTime) {
    timeColor = "text-pm-orange-base";
  } else {
    timeColor = "text-red-500";
  }
  return timeColor;
}

function RecipeListItem({ recipe }: RecipeListItemProps) {
  const navigate = useNavigate();
  const morethan450px = useMediaQuery("(min-width:450px)");
  const [changeRecipeItem] = useChangeRecipeItemMutation();

  const photoWidth = morethan450px ? "360" : "190";
  const heartIcon = recipe.favourite ? <PiHeartStraightFill /> : <PiHeartStraightBold />;
  const shortTime = 30;
  const longTime = 60;
  const difficultyColor = getDifficultyColor(recipe.difficulty);
  const timeColor = getTimeColor(recipe.time, shortTime, longTime);
  const { convertedTime, unit } = convertTime(recipe.time, longTime);

  const difficultyClasses = `w-1/2 flex justify-start items-center text-xs ${difficultyColor} min-[450px]:w-24 min-[450px]:text-[0.9rem] min-[650px]:text-s`;
  const timeClasses = `flex justify-start items-center text-xs ${timeColor} min-[450px]:text-[0.9rem] min-[650px]:text-s`;

  const handleClick = () => {
    navigate(`/recipes/${recipe._id}`);
  };

  const handleFavourites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    changeRecipeItem({
      ...recipe,
      favourite: !recipe.favourite,
    });
  };

  return (
    <>
      <figure
        tabIndex={0}
        className="flex flex-col justify-between pb-1 relative rounded-xl bg-pm-grey-light shadow-md cursor-pointer min-h-48 min-[450px]:h-56 min-[550px]:h-64 min-[650px]:h-[312px] focus-visible:outline-2 focus-visible:outline-pm-orange-base focus-visible:shadow-none "
        onClick={handleClick}
      >
        <div>
          <IconButton
            className="absolute top-1 right-1 text-white min-[450px]:scale-125 min-[450px]:top-2 min-[450px]:right-2 min-[650px]:scale-[1.75] min-[650px]:top-4 min-[650px]:right-4 min-[650px]:p-1"
            onClick={handleFavourites}
          >
            {heartIcon}
          </IconButton>
          <img
            src={convertUrl(recipe.photos[0].url, photoWidth)}
            alt={recipe.title + " photo"}
            className="rounded-t-xl w-full h-28 object-cover min-[450px]:h-32 min-[550px]:h-40 min-[650px]:h-52 lg:h-52"
          />
          <div className="flex justify-start m-1 mx-2 min-[650px]:mt-2 min-[650px]:mx-3">
            <span className={difficultyClasses}>
              <PiDiamondBold />
              <div className="pl-1">{recipe.difficulty}</div>
            </span>
            <span className={timeClasses}>
              <PiTimerBold />
              <div className="pl-1">{`${convertedTime} ${unit}`}</div>
            </span>
          </div>
        </div>
        <div className="flex justify-between items-end ml-2 mr-1 min-[650px]:ml-3 min-[650px]:mr-2">
          <figcaption className="font-raleway font-bold text-s text-pm-black text-left line-clamp-2 min-[650px]:text-m">
            {recipe.title}
          </figcaption>
          <RecipeContextMenu recipe={recipe} />
        </div>
      </figure>
    </>
  );
}

export default RecipeListItem;
