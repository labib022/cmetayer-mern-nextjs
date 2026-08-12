"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/lib/redux/features/auth/authApi";

interface ResetPasswordFormState {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const resetTokenParam = searchParams.get("reset_token") || "";

  const [formData, setFormData] = useState<ResetPasswordFormState>({
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.newPassword) {
      setValidationError("Please enter a new password");
      return;
    }
    if (formData.newPassword.length < 6) {
      setValidationError("New password must be at least 6 characters");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }
    if (!emailParam) {
      setValidationError("Missing email address. Please request a new password reset OTP.");
      return;
    }
    if (!resetTokenParam) {
      setValidationError(
        "Your reset session is missing or expired. Please verify your OTP again."
      );
      return;
    }

    setValidationError("");

    try {
      await resetPassword({
        email: emailParam,
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword,
        reset_token: resetTokenParam,
      }).unwrap();

      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setValidationError(
        err?.data?.message || err?.message || "Failed to reset password. Please try again."
      );
    }
  };

  return (
    <div className="bg-[#fafafa] rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 items-center w-full max-w-[550px] shadow-sm border border-black/5">
      {/* Title & Description */}
      <div className="flex flex-col gap-1 items-center text-center">
        <h1 className="text-[24px] font-medium tracking-[-0.039em] text-[#1f1f1f] whitespace-nowrap">
          Reset your password
        </h1>
        <p className="text-[16px] font-normal text-[#595959] leading-[1.4] max-w-[367px]">
          One more step to get your account back, let&apos;s reset your password!
        </p>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="w-full bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-[12px] flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{validationError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {/* New Password Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="newPassword" className="text-[16px] font-semibold text-[#0b1714] leading-[1.4]">
            New Password
          </label>
          <div className="relative w-full">
            <input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              className="w-full border border-[#e8ede4] rounded-lg px-3 py-3 pr-10 text-[14px] font-normal text-[#0b1714] placeholder:text-[#656565] leading-[1.4] outline-none focus:border-[#08203c] focus:ring-1 focus:ring-[#08203c] transition-colors bg-white"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              aria-label={showNewPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#656565] hover:text-[#0b1714] transition-colors"
            >
              {showNewPassword ? (
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

        {/* Confirm New Password Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="confirmPassword" className="text-[16px] font-semibold text-[#0b1714] leading-[1.4]">
            Confirm New Password
          </label>
          <div className="relative w-full">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
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

        {/* Reset Password Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            mt-2 w-full bg-[#08203c] text-white font-semibold text-[16px] leading-[1.4] py-3.5 rounded-[40px]
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
              <span>Resetting Password...</span>
            </>
          ) : (
            <span>Reset Password</span>
          )}
        </button>
      </form>
    </div>
  );
}