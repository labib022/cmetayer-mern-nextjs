import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { authApi } from "./features/auth/authApi";
import { cleaningApi } from "./features/cleaning/cleaningApi";
import { quoteApi } from "./features/quote/quoteApi";
import { bookingsApi } from "./features/bookings/bookingsApi";
import { profileApi } from "./features/profile/profileApi";
import { contactApi } from "./features/contact/contactApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [cleaningApi.reducerPath]: cleaningApi.reducer,
    [quoteApi.reducerPath]: quoteApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(cleaningApi.middleware)
      .concat(quoteApi.middleware)
      .concat(bookingsApi.middleware)
      .concat(profileApi.middleware)
      .concat(contactApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;