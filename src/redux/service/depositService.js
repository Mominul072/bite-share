import { apiService } from "../api/apiService";

export const depositService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getDeposit: builder.query({
      query: () => ({
        url: "/deposit",
        method: "GET",
      }),
    }),
    createDeposit: builder.mutation({
      query: ({postBody}) => ({
        url: "/deposit",
        method: "POST",
        body: postBody,
      }),
    }),
    updateDeposit: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `deposit/${id}`,
        method: "PUT",
        body: postBody,
      }),
    }),
    deleteDeposit: builder.mutation({
      query: ({ id }) => ({
        url: `deposit/${id}`,
        method: "DELETE",
      }),
      }),

  }),
});

export const { 
  useGetDepositQuery,
  useCreateDepositMutation,
  useUpdateDepositMutation,
  useDeleteDepositMutation } = depositService;
