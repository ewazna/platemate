import ContextMenu from "../../../../components/ContextMenu/ContextMenu";
import Button from "../../../../components/Button/Button";
import {
  useChangeRecipeItemMutation,
  useRemoveRecipeItemMutation,
} from "../../../../store/apis/recipesApi";
import { PiTrashSimpleBold, PiHeartStraightBold, PiHeartStraightFill } from "react-icons/pi";
import { RecipeContextMenuProps } from "./RecipeContextMenuProps";

function RecipeContextMenu({ recipe }: RecipeContextMenuProps) {
  const [removeRecipeItem] = useRemoveRecipeItemMutation();
  const [changeRecipeItem] = useChangeRecipeItemMutation();

  const handleRemove = () => {
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
    heartIcon = <PiHeartStraightFill className="text-pm-orange-base mr-3" />;
  } else {
    heartIcon = <PiHeartStraightBold className="text-pm-orange-base mr-2" />;
  }

  return (
    <ContextMenu id={"menu-" + recipe._id} className="w-40">
      <Button
        type="button"
        className="normal-case px-4 drop-shadow-none bg-pm-grey-light text-start"
        onClick={handleAddToFavs}
      >
        {heartIcon}
        {recipe.favourite ? " Remove from Favs" : " Add to Favs"}
      </Button>
      <Button
        type="button"
        className="normal-case px-4 h-10 drop-shadow-none bg-pm-grey-light"
        onClick={handleRemove}
      >
        <PiTrashSimpleBold className="text-pm-orange-base mr-2" /> Remove
      </Button>
    </ContextMenu>
  );
}

export default RecipeContextMenu;
