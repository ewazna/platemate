import { PiTrashSimpleBold, PiHeartStraightBold, PiHeartStraightFill } from "react-icons/pi";
import ContextMenu from "../../../../components/ContextMenu/ContextMenu";
import Button from "../../../../components/Button/Button";
import {
  useChangeRecipeItemMutation,
  useRemoveRecipeItemMutation,
} from "../../../../store/apis/recipes/recipesApi";
import { RecipeContextMenuProps } from "./RecipeContextMenuProps";

function RecipeContextMenu({ recipe, className }: RecipeContextMenuProps) {
  const [removeRecipeItem] = useRemoveRecipeItemMutation();
  const [changeRecipeItem] = useChangeRecipeItemMutation();

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeRecipeItem(recipe);
  };

  const handleAddToFavs = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    changeRecipeItem({
      ...recipe,
      favourite: !recipe.favourite,
    });
  };

  let heartIcon;
  if (recipe.favourite) {
    heartIcon = <PiHeartStraightFill className="text-pm-orange-base mr-2" />;
  } else {
    heartIcon = <PiHeartStraightBold className="text-pm-orange-base mr-2" />;
  }

  return (
    <ContextMenu id={"menu-" + recipe._id} className={`w-40 + ${className}`}>
      <Button
        type="button"
        className="normal-case px-3 w-36 h-8 my-1 drop-shadow-none bg-pm-grey-light justify-start text-start"
        onClick={handleAddToFavs}
      >
        {heartIcon}
        {recipe.favourite ? "Unmark Favs" : "Mark Favs"}
      </Button>
      <Button
        type="button"
        className="normal-case px-3 w-36 h-8 my-1 drop-shadow-none bg-pm-grey-light justify-start"
        onClick={handleRemove}
      >
        <PiTrashSimpleBold className="text-pm-orange-base mr-2" /> Remove
      </Button>
    </ContextMenu>
  );
}

export default RecipeContextMenu;
