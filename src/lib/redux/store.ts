import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { authApi } from "./features/auth/authApi";
import { cleaningApi } from "./features/cleaning/cleaningApi";
import { quoteApi } from "./features/quote/quoteApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [cleaningApi.reducerPath]: cleaningApi.reducer,
    [quoteApi.reducerPath]: quoteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(cleaningApi.middleware)
      .concat(quoteApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;