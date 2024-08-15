import { apiService } from "../api/apiService";

export const mealService = apiService.injectEndpoints({
    endpoints: (builder) => ({
      getMeal: builder.query({
        query: () => ({
          url: "/meal",
          method: "GET",
        }),
      }),
     activeMealList: builder.query({
        query: () => ({
          url: "/meal",
          method: "GET",
          
        }),
      }),
      createMeal: builder.mutation({
        query: ({postBody}) => ({
          url: "/meal",
          method: "POST",
          body: postBody,
        }),
      }),
      updateMeal: builder.mutation({
        query: ({ id, postBody }) => ({
          url: `meal/${id}`,
          method: "PUT",
          body: postBody,
        }),
      }),
      deleteMeal: builder.mutation({
        query: ({ id }) => ({
          url: `meal/${id}`,
          method: "DELETE",
        }),
        }),
      }),
      })
      
      

export const{
  useGetMealQuery,
  useCreateMealMutation,
  useUpdateMealMutation,
  useDeleteMealMutation,
  useActiveMealListQuery}=mealService;