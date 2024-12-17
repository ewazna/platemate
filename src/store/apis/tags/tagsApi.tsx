import { createApi } from "@reduxjs/toolkit/query/react";
import { Tag } from "../../../models";

import baseQueryWithAuth from "../baseQuery";

const tagsApi = createApi({
  reducerPath: "tags",
  baseQuery: baseQueryWithAuth,
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
