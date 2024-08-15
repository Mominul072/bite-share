import { apiService } from "../api/apiService";

export const summarryService = apiService.injectEndpoints({
    endpoints: (builder) => ({
      getSummarry: builder.query({
        query: () => ({
          url: "/summary",
          method: "GET",
        }),
      }),
      }),
      })
      
      

export const{useGetSummarryQuery}=summarryService;