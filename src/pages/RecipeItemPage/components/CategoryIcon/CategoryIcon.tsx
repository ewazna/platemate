import { MdOutlineLunchDining, MdOutlineBreakfastDining } from "react-icons/md";
import { LuSalad, LuCupSoda, LuSoup, LuApple, LuCroissant } from "react-icons/lu";
import { MealCategory } from "../../../../models";
import { CategoryIconProps } from "./CategoryIconProps";

function CategoryIcon({ category }: CategoryIconProps) {
  let categoryIcon;

  switch (category) {
    case MealCategory.Breakfast:
      categoryIcon = (
        <MdOutlineBreakfastDining className="h-8 w-8 text-pm-orange-base md:h-5 md:w-5 md:mr-0.5" />
      );
      break;
    case MealCategory.Dessert:
      categoryIcon = (
        <LuCroissant className="h-8 w-8 text-pm-orange-base md:h-5 md:w-5 md:mr-0.5" />
      );
      break;
    case MealCategory.Dinner:
      categoryIcon = (
        <MdOutlineLunchDining className="h-8 w-8 text-pm-orange-base md:h-5 md:w-5 md:mr-0.5" />
      );
      break;
    case MealCategory.Drink:
      categoryIcon = <LuCupSoda className="h-8 w-8 text-pm-orange-base md:h-5 md:w-5 md:mr-0.5" />;
      break;
    case MealCategory.Lunch:
      categoryIcon = <LuSalad className="h-8 w-8 text-pm-orange-base md:h-5 md:w-5 md:mr-0.5" />;
      break;
    case MealCategory.Snack:
      categoryIcon = <LuApple className="h-8 w-8 text-pm-orange-base md:h-5 md:w-5 md:mr-0.5" />;
      break;
    case MealCategory.Supper:
      categoryIcon = <LuSoup className="h-8 w-8 text-pm-orange-base md:h-5 md:w-5 md:mr-0.5" />;
      break;
  }
  return <>{categoryIcon}</>;
}

export default CategoryIcon;
