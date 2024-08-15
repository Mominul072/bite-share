import { apiService } from "../api/apiService";

export const marketService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getMarket: builder.query({
      query: () => ({
        url: "/market",
        method: "GET",
      }),
    }),
    createMarket: builder.mutation({
      query: ({ postBody }) => ({
        url: "/market",
        method: "POST",
        body: postBody,
      }),

      onQueryStarted(postBody, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data }) => {
            console.log(data.data.market);
            dispatch(
              apiService.util.updateQueryData(
                "getMarket",
                undefined,
                (draft) => {
                  draft.data.unshift(data.data.market);
                  return draft;
                } 
              )
            ); 
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),

    updateMarket: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `market/${id}`,
        method: "PUT",
        body: postBody,
      }),
    }),
    deleteMarket: builder.mutation({
      query: ({ id }) => ({
        url: `market/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMarketQuery,
  useCreateMarketMutation,
  useUpdateMarketMutation,
  useDeleteMarketMutation,
} = marketService;
