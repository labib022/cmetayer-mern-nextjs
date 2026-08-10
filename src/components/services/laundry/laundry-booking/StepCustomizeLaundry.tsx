"use client";

import { LaundryBookingForm, LaundryOrderSummary } from "./types";

interface StepCustomizeLaundryProps {
  formData: LaundryBookingForm;
  summary: LaundryOrderSummary;
  bagSizeOptions: string[];
  washTypeOptions: { label: string; subtext: string }[];
  detergentOptions: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepCustomizeLaundry({
  formData,
  summary,
  bagSizeOptions,
  washTypeOptions,
  detergentOptions,
  onChange,
  onBack,
  onNext,
}: StepCustomizeLaundryProps) {
  // Find current wash type subtext helper
  const selectedWashTypeObj = washTypeOptions.find(
    (item) => item.label === formData.washType
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
      {/* Left Column — Form Inputs (7 cols) */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        {/* Select Bag Size */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-[15px] text-[#08203c]">
            Select Bag Size
          </label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[14px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
            <select
              name="bagSize"
              value={formData.bagSize}
              onChange={onChange}
              className="bg-transparent text-sm text-[#111] outline-none w-full cursor-pointer"
            >
              {bagSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* What are we washing? */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-[15px] text-[#08203c]">
            What are we washing?
          </label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[14px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors flex flex-col gap-1">
            <select
              name="washType"
              value={formData.washType}
              onChange={onChange}
              className="bg-transparent text-sm text-[#111] outline-none w-full cursor-pointer font-medium"
            >
              {washTypeOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
            {selectedWashTypeObj && (
              <span className="text-xs text-[#656565]">
                {selectedWashTypeObj.subtext}
              </span>
            )}
          </div>
        </div>

        {/* Detergent Preferences */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-[15px] text-[#08203c]">
            Detergent Preferences
          </label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[14px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
            <select
              name="detergentPreference"
              value={formData.detergentPreference}
              onChange={onChange}
              className="bg-transparent text-sm text-[#111] outline-none w-full cursor-pointer"
            >
              {detergentOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Service Date & Time */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-[15px] text-[#08203c]">
            Service Date &amp; Time
          </label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[14px] px-3.5 py-3 flex items-center gap-3 focus-within:border-[#08203c]/40 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#08203c" strokeWidth="2" className="shrink-0">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={onChange}
              className="bg-transparent text-sm text-[#111] outline-none w-full cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Right Column — Live Order Summary Card (5 cols) */}
      <div className="lg:col-span-5 bg-[#fafafa] border border-black/5 rounded-[20px] p-5 flex flex-col gap-4 shadow-sm">
        <h3 className="font-semibold text-[17px] text-[#08203c] border-b border-black/5 pb-3">
          Order Summary
        </h3>

        <div className="flex flex-col gap-3 text-sm text-[#444]">
          {/* Wash & Fold Line Item */}
          <div className="flex justify-between items-center">
            <span>Wash &amp; Fold</span>
            <span className="font-semibold text-[#0b1714]">
              ${summary.washAndFoldBase}
            </span>
          </div>

          {/* Service Fee Line Item */}
          <div className="flex justify-between items-center">
            <span>Service Fee</span>
            <span className="font-semibold text-[#0b1714]">
              ${summary.serviceFee}
            </span>
          </div>

          {/* Taxes Line Item */}
          <div className="flex justify-between items-center text-[#656565]">
            <span>Taxes (~5.6%)</span>
            <span className="font-semibold text-[#0b1714]">
              ${summary.tax}
            </span>
          </div>
        </div>

        {/* Total Line Item */}
        <div className="border-t border-black/10 pt-4 mt-2 flex justify-between items-end">
          <span className="font-semibold text-base text-[#08203c]">Total</span>
          <span className="font-bold text-[28px] sm:text-[32px] text-[#08203c] leading-none">
            ${summary.total}
          </span>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="lg:col-span-12 flex gap-3 mt-2">
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
          onClick={onNext}
          className="
            flex-1 bg-[#08203c] text-white font-semibold text-base py-3.5 rounded-[24px]
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
    </div>
  );
}
