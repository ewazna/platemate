import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Ingredient } from "../../../models";

const ingredientsApi = createApi({
  reducerPath: "ingredients",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
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
