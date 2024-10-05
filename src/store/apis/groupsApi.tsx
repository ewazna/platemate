import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Group } from "../../models";

const groupsApi = createApi({
  reducerPath: "groups",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Group"],
  endpoints(builder) {
    return {
      fetchGroups: builder.query<Group[], void>({
        providesTags: (result: Group[] | undefined) => {
          return result
            ? [
                ...result.map((group) => ({
                  type: "Group" as const,
                  id: group._id,
                })),
                { type: "Group", id: "All" },
              ]
            : [{ type: "Group", id: "All" }];
        },
        query: () => {
          return {
            url: "/groups",
            method: "GET",
          };
        },
      }),
      changeGroups: builder.mutation<Group[], Group[]>({
        invalidatesTags: (result: Group[] | undefined) => {
          return result ? [{ type: "Group" as const, id: "All" }] : [];
        },
        query: (groups) => {
          return {
            url: "/groups",
            method: "PUT",
            body: { groups },
          };
        },
      }),
    };
  },
});

export const { useFetchGroupsQuery, useChangeGroupsMutation } = groupsApi;
export { groupsApi };
