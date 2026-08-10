"use client";

import { MovingBookingForm } from "./types";

interface StepLocationTimingProps {
  formData: MovingBookingForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
}

export default function StepLocationTiming({
  formData,
  onChange,
  onNext,
}: StepLocationTimingProps) {
  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <h3 className="font-semibold text-[17px] text-[#08203c]">
        Location &amp; Timing
      </h3>

      {/* Pick-up Address */}
      <div className="flex flex-col gap-1.5">
        <label className="font-medium text-sm text-[#444]">
          Pick-up Address
        </label>
        <div className="bg-[#111111]/[0.03] border border-black/5 rounded-[12px] px-3.5 py-3 flex items-center gap-3 focus-within:border-[#08203c]/40 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#08203c" strokeWidth="2" className="shrink-0">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            type="text"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={onChange}
            placeholder="123 Main St, City, Province"
            className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full"
          />
        </div>
      </div>

      {/* Drop-off Address */}
      <div className="flex flex-col gap-1.5">
        <label className="font-medium text-sm text-[#444]">
          Drop-off Address
        </label>
        <div className="bg-[#111111]/[0.03] border border-black/5 rounded-[12px] px-3.5 py-3 flex items-center gap-3 focus-within:border-[#08203c]/40 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#08203c" strokeWidth="2" className="shrink-0">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            type="text"
            name="dropoffAddress"
            value={formData.dropoffAddress}
            onChange={onChange}
            placeholder="456 New Ave, City, Province"
            className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full"
          />
        </div>
      </div>

      {/* Expected Move Date */}
      <div className="flex flex-col gap-1.5">
        <label className="font-medium text-sm text-[#444]">
          Expected Move Date
        </label>
        <div className="bg-[#111111]/[0.03] border border-black/5 rounded-[12px] px-3.5 py-3 flex items-center gap-3 focus-within:border-[#08203c]/40 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#08203c" strokeWidth="2" className="shrink-0">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <input
            type="date"
            name="moveDate"
            value={formData.moveDate}
            onChange={onChange}
            className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full cursor-pointer"
          />
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={onNext}
        className="
          mt-4 w-full bg-[#08203c] text-white font-semibold text-base py-3.5 px-6 rounded-[24px]
          flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]
          transition-all duration-200 cursor-pointer shadow-md
        "
      >
        <span>Next Step</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4.5l3.5 3.5L9 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
