import React, { ForwardedRef } from "react";

import RecipeListItem from "./RecipeListItem";
import { RecipeListProps } from "./RecipeListProps";

const RecipeList = React.forwardRef<HTMLDivElement, RecipeListProps>(
  ({ recipes, ...rest }, ref: ForwardedRef<HTMLDivElement>) => {
    const renderedRecipes = recipes.map((recipe) => {
      return <RecipeListItem recipe={recipe} key={recipe._id} />;
    });

    return (
      <div {...rest} ref={ref}>
        {renderedRecipes}
      </div>
    );
  },
);

export default RecipeList;
