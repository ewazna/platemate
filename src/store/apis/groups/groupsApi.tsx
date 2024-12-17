import { createApi } from "@reduxjs/toolkit/query/react";
import { Group } from "../../../models";
import { GroupsMutationParams } from "./GroupsMutationParams";

import baseQueryWithAuth from "../baseQuery";

const groupsApi = createApi({
  reducerPath: "groups",
  baseQuery: baseQueryWithAuth,
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
      changeGroups: builder.mutation<Group[], GroupsMutationParams>({
        invalidatesTags: (result: Group[] | undefined) => {
          return result ? [{ type: "Group" as const, id: "All" }] : [];
        },
        query: (body) => {
          return {
            url: "/groups",
            method: "PUT",
            body,
          };
        },
      }),
    };
  },
});

export const { useFetchGroupsQuery, useChangeGroupsMutation } = groupsApi;
export { groupsApi };
