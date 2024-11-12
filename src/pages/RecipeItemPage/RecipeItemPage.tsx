import { useContext } from "react";
import { useParams } from "react-router-dom";

import { useFetchRecipeItemQuery } from "../../store";
import Spinner from "../../components/Spinner/Spinner";
import RecipeItem from "./components/RecipeItem/RecipeItem";
import ToastContext from "../../components/Toast/ToastProvider";

function RecipeItemPage() {
  const { recipeId } = useParams();
  const { showToast } = useContext(ToastContext);

  const result = useFetchRecipeItemQuery(recipeId as string);

  if (result.isFetching) {
    return (
      <div className="bg-pm-white flex flex-wrap">
        <img
          src="/images/new_photo.jpg"
          alt="new photo"
          className="w-full h-64 object-cover drop-shadow-xl blur-sm"
        />
        <div className="absolute top-0 left-0 w-full h-64 bg-pm-grey-darker bg-opacity-60"></div>
        <Spinner color="white" className="absolute top-[96px] left-[calc(50%_-_32px)] w-16 h-16" />
      </div>
    );
  } else if (result.error) {
    showToast("error", "Fetching recipe failed");
  } else {
    const recipe = result.data!;
    return <RecipeItem recipe={recipe} />;
  }
}

export default RecipeItemPage;
