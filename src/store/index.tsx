import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { recipesApi } from "./apis/recipes/recipesApi";
import { groupsApi } from "./apis/groups/groupsApi";

const store = configureStore({
  reducer: {
    [recipesApi.reducerPath]: recipesApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(recipesApi.middleware).concat(groupsApi.middleware);
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
