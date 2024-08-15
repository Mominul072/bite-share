import { apiService } from "../../api/apiService";

export const authService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (postBody) => ({
        url: "auth/signup",
        method: "POST",
        body: postBody,
      }),
    }),

    login: builder.mutation({
      query: (postBody) => ({
        url: "/auth/login",
        method: "POST",
        body: postBody,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authService;

