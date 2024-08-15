import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const getBearerToken = () => {
  return localStorage.getItem("token");
};
const baseQuary = fetchBaseQuery({
  baseUrl: "https://be-mms-with-role-permission-nest.vercel.app",
  prepareHeaders: (headers) => {
    const token = getBearerToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    }
  },
});
export const apiService = createApi({
  baseQuery: baseQuary,
  endpoints: () => ({}),
});
