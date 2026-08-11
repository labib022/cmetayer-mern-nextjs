"use client";

import { LaundryBookingForm } from "./types";

interface StepContactInfoProps {
  formData: LaundryBookingForm;
  bookingError: string;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepContactInfo({
  formData,
  bookingError,
  isSubmitting,
  onChange,
  onBack,
  onSubmit,
}: StepContactInfoProps) {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      <h3 className="font-semibold text-[15px] text-[#08203c]">
        Contact Info
      </h3>

      {/* Full Name */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-[13px] text-[#08203c]">
          Full Name
        </label>
        <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2 focus-within:border-[#08203c]/40 transition-colors">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="Jane Doe"
            className="bg-transparent text-sm text-[#111] placeholder:text-[#aaa] outline-none w-full"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-[13px] text-[#08203c]">
          Email Address
        </label>
        <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2 focus-within:border-[#08203c]/40 transition-colors">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="jane@example.com"
            className="bg-transparent text-sm text-[#111] placeholder:text-[#aaa] outline-none w-full"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-[13px] text-[#08203c]">
          Phone Number
        </label>
        <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2 focus-within:border-[#08203c]/40 transition-colors">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="+1 (555) 000-0000"
            className="bg-transparent text-sm text-[#111] placeholder:text-[#aaa] outline-none w-full"
          />
        </div>
      </div>

      {/* Booking Error Banner */}
      {bookingError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3.5 py-2.5 rounded-[12px] flex items-start gap-2">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{bookingError}</span>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 bg-[#f4f5f6] hover:bg-[#e4e5e6] text-[#0b1714] font-semibold text-sm py-2.5 rounded-[20px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-[#08203c] text-white font-semibold text-sm py-2.5 rounded-[20px] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <span
                className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              />
              <span>Booking...</span>
            </>
          ) : (
            <>
              <span>Confirm Booking</span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4.5l3.5 3.5L9 11.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
