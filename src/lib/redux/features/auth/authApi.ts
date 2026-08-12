import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Sign Up
    signUp: builder.mutation({
      query: (data: {
        full_name: string;
        email: string;
        password: string;
        confirm_password: string;
        privacy_and_terms_accepted: boolean;
      }) => {
        const fd = new FormData();
        fd.append("full_name", data.full_name);
        fd.append("email", data.email);
        fd.append("password", data.password);
        fd.append("confirm_password", data.confirm_password);
        fd.append("privacy_and_terms_accepted", String(data.privacy_and_terms_accepted));
        return { url: "/signup", method: "POST", body: fd };
      },
    }),

    // Verify OTP — response now includes reset_token when purpose is password_reset
    verifyOtp: builder.mutation<
      { success: boolean; message: string; reset_token?: string },
      { email: string; otp: string; purpose?: string }
    >({
      query: (data) => {
        const fd = new FormData();
        fd.append("email", data.email);
        fd.append("otp", data.otp);
        fd.append("purpose", data.purpose || "signup");
        return { url: "/verify-otp", method: "POST", body: fd };
      },
    }),

    // Sign In
    signIn: builder.mutation({
      query: (data: { email: string; password: string }) => {
        const fd = new FormData();
        fd.append("email", data.email);
        fd.append("password", data.password);
        return { url: "/signin", method: "POST", body: fd };
      },
    }),

    // Send OTP (Password Reset)
    sendOtp: builder.mutation({
      query: (data: { email: string; purpose?: string }) => {
        const fd = new FormData();
        fd.append("email", data.email);
        fd.append("purpose", data.purpose || "password_reset");
        return { url: "/send-otp", method: "POST", body: fd };
      },
    }),

    // Resend OTP
    resendOtp: builder.mutation({
      query: (data: { email: string; purpose?: string }) => {
        const fd = new FormData();
        fd.append("email", data.email);
        fd.append("purpose", data.purpose || "signup");
        return { url: "/resend-otp", method: "POST", body: fd };
      },
    }),

    // Reset Password — now requires reset_token from verifyOtp response
    resetPassword: builder.mutation({
      query: (data: {
        email: string;
        new_password: string;
        confirm_password: string;
        reset_token: string;
      }) => {
        const fd = new FormData();
        fd.append("email", data.email);
        fd.append("new_password", data.new_password);
        fd.append("confirm_password", data.confirm_password);
        fd.append("reset_token", data.reset_token);
        return { url: "/reset-password", method: "POST", body: fd };
      },
    }),

    // Sign Out
    signOut: builder.mutation<void, void>({
      query: () => ({ url: "/signout", method: "POST" }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useVerifyOtpMutation,
  useSignInMutation,
  useSendOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useSignOutMutation,
} = authApi;