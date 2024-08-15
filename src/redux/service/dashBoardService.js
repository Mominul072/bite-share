
import { apiService } from '../api/apiService';

export const dashBoard = apiService.injectEndpoints({
    endpoints: (builder) => ({
      getDashboard: builder.query({
        query: () => ({
          url: "/dash-board",
          method: "GET",
        }),
      }),
      }),
      })
      
      

export const{useGetDashboardQuery}= dashBoard;