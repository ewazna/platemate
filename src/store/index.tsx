import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { groupsApi } from "./apis/groupsApi";

const store = configureStore({
  reducer: {
    [groupsApi.reducerPath]: groupsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(groupsApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store };
export { useFetchGroupsQuery, useChangeGroupsMutation } from "./apis/groupsApi";
