"use client";

import { MovingBookingForm } from "./types";

interface StepContactInfoProps {
  formData: MovingBookingForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepContactInfo({
  formData,
  onChange,
  onBack,
  onSubmit,
}: StepContactInfoProps) {
  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <h3 className="font-semibold text-[17px] text-[#08203c]">
        Contact Info
      </h3>

      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label className="font-medium text-sm text-[#444]">
          Full Name
        </label>
        <div className="bg-[#111111]/[0.03] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="Enter your full name"
            className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-1.5">
        <label className="font-medium text-sm text-[#444]">
          Email Address
        </label>
        <div className="bg-[#111111]/[0.03] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Enter your email address"
            className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-1.5">
        <label className="font-medium text-sm text-[#444]">
          Phone Number
        </label>
        <div className="bg-[#111111]/[0.03] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="(555) 019-2834"
            className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={onBack}
          className="
            flex-1 bg-[#f4f5f6] hover:bg-[#e4e5e6] text-[#0b1714] font-semibold text-base py-3.5 rounded-[24px]
            hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer
          "
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="
            flex-1 bg-[#08203c] text-white font-semibold text-base py-3.5 rounded-[24px]
            flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-200 cursor-pointer shadow-md
          "
        >
          <span>Submit Request</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4.5l3.5 3.5L9 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
