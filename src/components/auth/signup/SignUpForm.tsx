"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUpMutation } from "@/lib/redux/features/auth/authApi";

interface SignUpFormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

export default function SignUpForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignUpFormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [signUp, { isLoading }] = useSignUpMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setValidationError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setValidationError("Please enter your Full Name");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setValidationError("Please enter a valid Email Address");
      return;
    }
    if (!formData.password) {
      setValidationError("Please enter a Password");
      return;
    }
    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }
    if (!formData.agreedToTerms) {
      setValidationError("You must agree to the Privacy Policy and Terms and Conditions");
      return;
    }

    setValidationError("");

    try {
      await signUp({
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        privacy_and_terms_accepted: formData.agreedToTerms,
      }).unwrap();

      router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}&purpose=signup`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setValidationError(
        err?.data?.message || err?.message || "Registration failed. Please try again."
      );
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  return (
    <div className="bg-[#fafafa] rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 items-center w-full max-w-[550px] shadow-sm border border-black/5">
      {/* Title */}
      <div className="flex flex-col gap-1 items-center text-center">
        <h1 className="text-[24px] font-medium tracking-[-0.039em] text-[#1f1f1f] whitespace-nowrap">
          Sign up for an account
        </h1>
        <p className="text-[16px] font-normal text-[#595959] leading-[1.4] max-w-[367px]">
          Sign up now for your account!
        </p>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="w-full bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-[12px] flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{validationError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {/* Full Name Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="fullName" className="text-[16px] font-semibold text-[#0b1714] leading-[1.4]">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border border-[#e8ede4] rounded-lg px-3 py-3 text-[14px] font-normal text-[#0b1714] placeholder:text-[#656565] leading-[1.4] outline-none focus:border-[#08203c] focus:ring-1 focus:ring-[#08203c] transition-colors bg-white"
          />
        </div>

        {/* Email Address Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="email" className="text-[16px] font-semibold text-[#0b1714] leading-[1.4]">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full border border-[#e8ede4] rounded-lg px-3 py-3 text-[14px] font-normal text-[#0b1714] placeholder:text-[#656565] leading-[1.4] outline-none focus:border-[#08203c] focus:ring-1 focus:ring-[#08203c] transition-colors bg-white"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="password" className="text-[16px] font-semibold text-[#0b1714] leading-[1.4]">
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-[#e8ede4] rounded-lg px-3 py-3 pr-10 text-[14px] font-normal text-[#0b1714] placeholder:text-[#656565] leading-[1.4] outline-none focus:border-[#08203c] focus:ring-1 focus:ring-[#08203c] transition-colors bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#656565] hover:text-[#0b1714] transition-colors"
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="confirmPassword" className="text-[16px] font-semibold text-[#0b1714] leading-[1.4]">
            Confirm Password
          </label>
          <div className="relative w-full">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full border border-[#e8ede4] rounded-lg px-3 py-3 pr-10 text-[14px] font-normal text-[#0b1714] placeholder:text-[#656565] leading-[1.4] outline-none focus:border-[#08203c] focus:ring-1 focus:ring-[#08203c] transition-colors bg-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#656565] hover:text-[#0b1714] transition-colors"
            >
              {showConfirmPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Checkbox: Terms & Privacy */}
        <div className="flex gap-2.5 items-start mt-1">
          <input
            id="agreedToTerms"
            name="agreedToTerms"
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="mt-1 size-4 rounded border-gray-300 text-[#08203c] focus:ring-[#08203c] cursor-pointer"
          />
          <label htmlFor="agreedToTerms" className="text-sm text-[#8c8c8c] leading-[1.4] cursor-pointer">
            By creating an account, you agreeing to our{" "}
            <Link href="/privacy-policy" className="text-[#1f1f1f] font-medium hover:underline">
              Privacy Policy
            </Link>
            , and{" "}
            <Link href="/terms-of-service" className="text-[#1f1f1f] font-medium hover:underline">
              Terms and Condition
            </Link>
          </label>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            mt-2 w-full bg-[#08203c] text-white font-semibold text-[16px] leading-[1.4] py-3.5 rounded-[40px]
            hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer shadow-sm
            disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2
          "
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </button>
      </form>

      {/* Already had an account? Sign in */}
      <p className="text-[14px] text-[#8c8c8c] leading-[20px] text-center">
        Already had an account?{" "}
        <Link href="/login" className="text-[#1f1f1f] font-medium hover:underline">
          Sign in
        </Link>
      </p>

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
        onClick={handleGoogleSignIn}
        className="
          w-full bg-[#0b1714] text-white font-medium text-[16px] leading-[24px] py-[10px] px-4 rounded-[40px]
          flex items-center justify-center gap-3 border border-[#0b1714]
          hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
          <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
          <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
          <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
        </svg>
        <span>Sign In With Google</span>
      </button>
    </div>
  );
}
