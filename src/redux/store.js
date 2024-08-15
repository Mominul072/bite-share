
import { apiService } from './api/apiService';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
    //   pagination: paginationReducer,
      [apiService.reducerPath]:apiService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiService.middleware),
  });
  