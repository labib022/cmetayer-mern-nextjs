"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const displayEmail = emailParam || "wiko@example.com";

  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(239); // 03:59 timer

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer effect
  useEffect(() => {
    if (timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSeconds]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (index: number, value: string) => {
    // Only accept numeric single character
    const sanitized = value.replace(/[^0-9]/g, "");
    if (!sanitized) {
      // Cleared input
      const newDigits = [...digits];
      newDigits[index] = "";
      setDigits(newDigits);
      setValidationError("");
      return;
    }

    // Handle single digit input or pasted string
    if (sanitized.length === 1) {
      const newDigits = [...digits];
      newDigits[index] = sanitized;
      setDigits(newDigits);
      setValidationError("");

      // Auto-advance focus to next input
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (sanitized.length === 6) {
      // Full paste
      const pasted = sanitized.split("");
      setDigits(pasted);
      setValidationError("");
      inputRefs.current[5]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timerSeconds > 0) return;
    console.log("Resend OTP code clicked for email:", displayEmail);
    setTimerSeconds(239);
    setValidationError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = digits.join("");
    if (otpCode.length < 6 || digits.some((d) => d === "")) {
      setValidationError("Please enter the complete 6-digit verification code");
      return;
    }

    setValidationError("");
    setIsSubmitting(true);

    console.log("OTP code verified:", otpCode, "for email:", displayEmail);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/reset-password?email=${encodeURIComponent(displayEmail)}`);
    }, 500);
  };

  return (
    <div className="bg-[#fafafa] rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 items-center w-full max-w-[550px] shadow-sm border border-black/5">
      {/* Title & Description */}
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="text-[24px] font-medium tracking-[-0.039em] text-[#1f1f1f] whitespace-nowrap">
          Enter the Code We’ve Sent
        </h1>
        <p className="text-[15px] sm:text-[16px] font-normal text-[#595959] leading-[1.5] max-w-[420px]">
          We have sent you the code to your email account (
          <span className="font-semibold text-[#0b1714]">{displayEmail}</span>
          ), please enter the code below.
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center">
        {/* 6 Digit Input Boxes */}
        <div className="flex gap-2 sm:gap-3 justify-center w-full max-w-[460px]">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleInputChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="
                w-12 h-14 sm:w-16 sm:h-18 text-center text-2xl sm:text-3xl font-medium text-[#1f1f1f]
                bg-[#f5f5f5] border border-[#08203c] rounded-[10px] outline-none
                focus:border-[#08203c] focus:ring-2 focus:ring-[#08203c]/20 transition-all
              "
            />
          ))}
        </div>

        {/* Resend Code Subtext */}
        <div className="text-center text-sm text-[#595959]">
          Didn’t get the code? click{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={timerSeconds > 0}
            className={`font-semibold underline transition-colors ${
              timerSeconds > 0
                ? "text-[#656565] cursor-not-allowed no-underline"
                : "text-[#08203c] hover:text-[#0b1714] cursor-pointer"
            }`}
          >
            Send Again
          </button>
          {timerSeconds > 0 && (
            <span>
              {" "}after <span className="font-semibold text-[#079455]">{formatTimer(timerSeconds)}</span>
            </span>
          )}
        </div>

        {/* Confirm Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full bg-[#08203c] text-white font-semibold text-[16px] leading-[1.4] py-3.5 rounded-[40px]
            hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer shadow-sm
            disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
            flex items-center justify-center gap-2
          "
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Verifying...</span>
            </>
          ) : (
            <span>Confirm</span>
          )}
        </button>
      </form>
    </div>
  );
}
