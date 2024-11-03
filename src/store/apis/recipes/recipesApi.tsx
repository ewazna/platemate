import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recipe, RecipePhoto } from "../../../models";
import { RecipesFetchOptions } from "./RecipesFetchOptions";
import { transformRecipeFetchOptions } from "../../../pages/RecipesPage/utils";

function addPhotosToFormData(photos: RecipePhoto[], formData: FormData): void {
  const addedPhotos: File[] = [];
  const deletedPhotos: string[] = [];
  for (const photo of photos) {
    if (photo.state === "added") {
      addedPhotos.push(photo.file!);
    }
    if (photo.state === "deleted") {
      deletedPhotos.push(photo.filename);
    }
  }
  for (const photo of addedPhotos) {
    formData.append("addedPhotos", photo);
  }
  for (const photo of deletedPhotos) {
    formData.append("deletedPhotos", photo);
  }
}

function recipeToFormData(recipe: Recipe): FormData {
  const formData = new FormData();
  Object.entries(recipe).forEach(([key, value]) => {
    switch (key) {
      case "tags":
      case "steps":
      case "groups":
        for (const item of value) {
          formData.append(key, item);
        }
        break;
      case "ingredients":
        for (const item of value) {
          formData.append(key, JSON.stringify(item));
        }
        break;
      case "photos":
        addPhotosToFormData(recipe.photos, formData);
        break;
      default:
        formData.set(key, value);
    }
  });
  return formData;
}

const recipesApi = createApi({
  reducerPath: "recipes",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Recipe", "Group"],
  endpoints(builder) {
    return {
      fetchRecipes: builder.query<Recipe[], RecipesFetchOptions>({
        providesTags: (result: Recipe[] | undefined) => {
          return result
            ? [
                ...result.map((recipe) => ({
                  type: "Recipe" as const,
                  id: recipe._id as string,
                })),
                { type: "Recipe", id: "All" },
              ]
            : [{ type: "Recipe", id: "All" }];
        },
        query: (fetchOptions) => {
          return {
            url: "/recipes",
            method: "GET",
            params: transformRecipeFetchOptions(fetchOptions),
          };
        },
      }),
      fetchRecipeItem: builder.query<Recipe, string>({
        providesTags: (result: Recipe | undefined) => {
          return result
            ? [{ type: "Recipe" as const, id: result._id as string }]
            : [{ type: "Recipe", id: "CurrentRecipe" }];
        },
        query: (id) => {
          return {
            url: `/recipes/${id}`,
            method: "GET",
          };
        },
      }),
      addRecipeItem: builder.mutation<Recipe, Recipe>({
        invalidatesTags: (result: Recipe | undefined) => {
          return result ? [{ type: "Recipe" as const, id: "All" }] : [];
        },
        query: (recipe) => {
          return {
            url: "/recipes",
            method: "POST",
            body: recipeToFormData(recipe),
            formData: true,
          };
        },
      }),
      changeRecipeItem: builder.mutation<Recipe, Recipe>({
        invalidatesTags: (result: Recipe | undefined) => {
          return result ? [{ type: "Recipe", id: result._id }] : [];
        },
        query: (recipe) => {
          return {
            url: `/recipes/${recipe._id}`,
            method: "PUT",
            body: recipeToFormData(recipe),
            formData: true,
          };
        },
      }),
      removeRecipeItem: builder.mutation<Recipe, Recipe>({
        invalidatesTags: (result: Recipe | undefined) => {
          return result ? [{ type: "Recipe" as const, id: "All" }] : [];
        },
        query: (recipe) => {
          return {
            url: `/recipes/${recipe._id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchRecipesQuery,
  useFetchRecipeItemQuery,
  useAddRecipeItemMutation,
  useChangeRecipeItemMutation,
  useRemoveRecipeItemMutation,
} = recipesApi;
export { recipesApi };
