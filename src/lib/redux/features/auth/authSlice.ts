import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: string;
  _id?: string;
  full_name?: string;
  email?: string;
  avatar?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  role?: string;
}

export interface AuthState {
  access: string | null;
  refresh: string | null;
  user: User | null;
  hydrated: boolean;
}

const initialState: AuthState = {
  access: null,
  refresh: null,
  user: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth: (state) => {
      if (typeof window !== "undefined") {
        state.access = localStorage.getItem("customer_access") || null;
        state.refresh = localStorage.getItem("customer_refresh") || null;
        const userStr = localStorage.getItem("customer_user");
        state.user = userStr ? JSON.parse(userStr) : null;
      }
      state.hydrated = true;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ access: string; refresh: string; user: User }>
    ) => {
      const { access, refresh, user } = action.payload;
      state.access = access;
      state.refresh = refresh;
      state.user = user;

      if (typeof window !== "undefined") {
        if (access) localStorage.setItem("customer_access", access);
        if (refresh) localStorage.setItem("customer_refresh", refresh);
        if (user) localStorage.setItem("customer_user", JSON.stringify(user));
      }
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.access = action.payload;
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("customer_access", action.payload);
        } else {
          localStorage.removeItem("customer_access");
        }
      }
    },
    // Profile আপডেটের পর (name/avatar/social links) user object partially update করার জন্য —
    // token ছোঁয়া হয় না, শুধু user data
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== "undefined") {
          localStorage.setItem("customer_user", JSON.stringify(state.user));
        }
      }
    },
    logout: (state) => {
      state.access = null;
      state.refresh = null;
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("customer_access");
        localStorage.removeItem("customer_refresh");
        localStorage.removeItem("customer_user");
      }
    },
  },
});

export const { hydrateAuth, setCredentials, setAccessToken, updateUser, logout } =
  authSlice.actions;

export default authSlice.reducer;