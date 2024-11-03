import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tag } from "../../../models";

const tagsApi = createApi({
  reducerPath: "tags",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints(builder) {
    return {
      fetchTags: builder.query<Tag[], string>({
        query: (searchConfig) => {
          return {
            url: "/tags",
            method: "GET",
            params: { searchConfig },
          };
        },
      }),
      addTags: builder.mutation<Tag[], string[]>({
        query: (tags) => {
          return {
            url: "/tags",
            method: "PUT",
            body: { tags },
          };
        },
      }),
    };
  },
});

export const { useFetchTagsQuery, useAddTagsMutation } = tagsApi;
export { tagsApi };
