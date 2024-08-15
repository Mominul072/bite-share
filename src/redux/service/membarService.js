
import { apiService } from '../api/apiService';

export const membarService = apiService.injectEndpoints({
    endpoints: (builder) => ({
      getMembar: builder.query({
        query: () => ({
          url: "/member",
          method: "GET",
        }),
      }),

      memberDropdown: builder.query({
        query: ({ id, postBody }) => ({
          url: `member/${id}`,
          method: "GET",
          
        }),
      }),
      }),
      })
      
      

export const{useGetMembarQuery,useMemberDropdownQuery}=       membarService;