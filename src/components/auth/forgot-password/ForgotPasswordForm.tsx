"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSendOtpMutation } from "@/lib/redux/features/auth/authApi";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");

  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setValidationError("Please enter a valid email address");
      return;
    }

    setValidationError("");

    try {
      await sendOtp({ email }).unwrap();
      router.push(`/verify-otp?email=${encodeURIComponent(email)}&purpose=password_reset`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setValidationError(
        err?.data?.message || err?.message || "Failed to send verification code. Please try again."
      );
    }
  };

  return (
    <div className="bg-[#fafafa] rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 items-center w-full max-w-[550px] shadow-sm border border-black/5">
      {/* Title & Description */}
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="text-[24px] font-medium tracking-[-0.039em] text-[#1f1f1f] whitespace-nowrap">
          Forgot your password?
        </h1>
        <p className="text-[15px] sm:text-[16px] font-normal text-[#595959] leading-[1.5] max-w-[420px]">
          Don&apos;t worry, we&apos;ve got you covered. Let us guide you through
          the process of regaining access to your account effortlessly. Enter your
          existed email address
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        {/* Email Address Field */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-[16px] font-semibold text-[#0b1714] leading-[1.4]">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setValidationError("");
            }}
            placeholder="Enter your email address"
            className="w-full border border-[#e8ede4] rounded-lg px-3.5 py-3 text-[14px] font-normal text-[#0b1714] placeholder:text-[#656565] leading-[1.4] outline-none focus:border-[#08203c] focus:ring-1 focus:ring-[#08203c] transition-colors bg-white"
          />
          {/* Helper Text Below Input */}
          <p className="text-[13px] text-[#656565] leading-[1.4]">
            We will send you a notification through your email address, so please ensure that your email is correct.
          </p>
        </div>

        {/* Send a Code Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full bg-[#08203c] text-white font-semibold text-[16px] leading-[1.4] py-3.5 rounded-[40px]
            hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer shadow-sm
            disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
            flex items-center justify-center gap-2
          "
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Sending Code...</span>
            </>
          ) : (
            <span>Send a Code</span>
          )}
        </button>
      </form>
    </div>
  );
}
