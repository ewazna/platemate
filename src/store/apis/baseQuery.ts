import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../firebase";

const baseQueryWithAuth = async (args: FetchArgs, api: BaseQueryApi, extraOptions: object) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: "/api",
  });

  const user = auth.currentUser;
  const idToken = user ? await user.getIdToken() : null;
  const headers = idToken ? { ...args.headers, Authorization: `Bearer ${idToken}` } : args.headers;

  const updatedArgs = { ...args, headers };

  return rawBaseQuery(updatedArgs, api, extraOptions);
};

export default baseQueryWithAuth;
