import { createApi } from "@reduxjs/toolkit/query/react";
import { Ingredient } from "../../../models";

import baseQueryWithAuth from "../baseQuery";

const ingredientsApi = createApi({
  reducerPath: "ingredients",
  baseQuery: baseQueryWithAuth,
  endpoints(builder) {
    return {
      fetchIngredients: builder.query<Ingredient[], string>({
        query: (searchConfig) => {
          return {
            url: "/ingredients",
            method: "GET",
            params: { searchConfig },
          };
        },
      }),
    };
  },
});

export const { useFetchIngredientsQuery } = ingredientsApi;
export { ingredientsApi };
