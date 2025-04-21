import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";

const BASE_URL = "https://fakestoreapi.com";

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (!token) {
      headers.set("Authorization", "");
      return headers;
    }

    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const apiBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
};
