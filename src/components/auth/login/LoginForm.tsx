"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "@/lib/redux/features/auth/authApi";
import { setCredentials } from "@/lib/redux/features/auth/authSlice";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [signIn, { isLoading }] = useSignInMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await signIn({ email, password }).unwrap();
      dispatch(
        setCredentials({
          access: res.access,
          refresh: res.refresh,
          user: res.user,
        })
      );
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(
        err?.data?.message || err?.message || "Failed to sign in. Please try again."
      );
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  return (
    <div className="bg-[#fafafa] rounded-[32px] p-8 flex flex-col gap-8 items-center w-full max-w-[550px] shadow-sm border border-black/5">
      {/* Title */}
      <div className="flex flex-col gap-1 items-center text-center">
        <h1 className="text-[24px] font-medium tracking-[-0.039em] text-[#1f1f1f] whitespace-nowrap">
          Welcome Back!
        </h1>
        <p className="text-[16px] font-normal text-[#595959] leading-[1.4] max-w-[367px]">
          Been a while! Ready to dive back in? Let&apos;s get you signed in
          and back to business!
        </p>
      </div>

      {/* Error Message Banner */}
      {errorMessage && (
        <div className="w-full bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-[12px] flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {/* Email Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="email"
            className="text-[16px] font-semibold text-[#0b1714] leading-[1.4]"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage("");
            }}
            placeholder="Enter your email address"
            required
            className="w-full border border-[#e8ede4] rounded-lg px-3 py-3 text-[14px] font-normal text-[#0b1714] placeholder:text-[#656565] leading-[1.4] outline-none focus:border-[#08203c] focus:ring-1 focus:ring-[#08203c] transition-colors bg-white"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="password"
            className="text-[16px] font-semibold text-[#0b1714] leading-[1.4]"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
              placeholder="Enter your password"
              required
              className="w-full border border-[#e8ede4] rounded-lg px-3 py-3 pr-10 text-[14px] font-normal text-[#0b1714] placeholder:text-[#656565] leading-[1.4] outline-none focus:border-[#08203c] focus:ring-1 focus:ring-[#08203c] transition-colors bg-white"
            />
            {/* Eye toggle */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#656565] hover:text-[#0b1714] transition-colors"
            >
              {showPassword ? (
                /* Eye-off icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                /* Eye icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-[13px] text-[#08203c] hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          id="sign-in-button"
          disabled={isLoading}
          className="w-full bg-[#08203c] hover:bg-[#0a2a4e] active:bg-[#061828] text-white font-semibold text-[16px] leading-[1.4] py-4 rounded-[40px] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign in</span>
          )}
        </button>
      </form>

      {/* Or divider */}
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 h-px bg-[#e8ede4]" />
        <span className="text-[16px] text-[#8c8c8c] font-normal leading-[24px] shrink-0">
          or
        </span>
        <div className="flex-1 h-px bg-[#e8ede4]" />
      </div>

      {/* Sign In With Google Button */}
      <button
        type="button"
        id="google-sign-in-button"
        onClick={handleGoogleSignIn}
        className="w-full bg-[#0b1714] text-white font-medium text-[16px] leading-[24px] py-[10px] px-4 rounded-[40px] flex items-center justify-center gap-3 border border-[#0b1714] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
          />
          <path
            fill="#FF3D00"
            d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
          />
        </svg>
        Sign In With Google
      </button>

      {/* Sign up link */}
      <p className="text-[14px] text-[#8c8c8c] leading-[20px]">
        Doesn&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-[#1f1f1f] font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
