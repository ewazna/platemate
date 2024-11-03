import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recipesApi } from "./apis/recipes/recipesApi";
import { groupsApi } from "./apis/groups/groupsApi";
import { tagsApi } from "./apis/tags/tagsApi";
import { ingredientsApi } from "./apis/ingredients/ingredientsApi";

const store = configureStore({
  reducer: {
    [recipesApi.reducerPath]: recipesApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(recipesApi.middleware)
      .concat(groupsApi.middleware)
      .concat(tagsApi.middleware)
      .concat(ingredientsApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store };
export {
  useFetchRecipesQuery,
  useFetchRecipeItemQuery,
  useAddRecipeItemMutation,
  useChangeRecipeItemMutation,
} from "./apis/recipes/recipesApi";
export { useFetchGroupsQuery, useChangeGroupsMutation } from "./apis/groups/groupsApi";
export { useFetchTagsQuery, useAddTagsMutation } from "./apis/tags/tagsApi";
export { useFetchIngredientsQuery } from "./apis/ingredients/ingredientsApi";
