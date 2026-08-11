"use client";

import { LaundryBookingForm } from "./types";
import { LaundryPriceResponse } from "@/lib/redux/features/laundry/laundryApi";

interface StepCustomizeLaundryProps {
  formData: LaundryBookingForm;
  bagSizeOptions: { label: string; disabled: boolean }[];
  washingItemOptions: string[];
  detergentOptions: string[];
  priceData: LaundryPriceResponse | null;
  priceLoading: boolean;
  priceError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onWashingItemToggle: (label: string) => void;
  onBack: () => void;
  onNext: () => void;
}

// ── Price skeleton ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="flex justify-between items-center">
      <div className="h-3 w-28 bg-black/8 rounded animate-pulse" />
      <div className="h-3 w-12 bg-black/8 rounded animate-pulse" />
    </div>
  );
}

export default function StepCustomizeLaundry({
  formData,
  bagSizeOptions,
  washingItemOptions,
  detergentOptions,
  priceData,
  priceLoading,
  priceError,
  onChange,
  onWashingItemToggle,
  onBack,
  onNext,
}: StepCustomizeLaundryProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start animate-in fade-in duration-300">
      {/* Left Column — Form Inputs (7 cols) */}
      <div className="lg:col-span-7 flex flex-col gap-3">

        {/* Select Bag Size */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-[13px] text-[#08203c]">
            Select Bag Size
          </label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2 focus-within:border-[#08203c]/40 transition-colors">
            <select
              name="bagSize"
              value={formData.bagSize}
              onChange={onChange}
              className="bg-transparent text-sm text-[#111] outline-none w-full cursor-pointer"
            >
              {bagSizeOptions.map(({ label, disabled }) => (
                <option key={label} value={label} disabled={disabled}>
                  {label}{disabled ? " (not available)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* What are we washing? — multi-select checkboxes */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-[13px] text-[#08203c]">
            What are we washing?
          </label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2.5 flex flex-col gap-2">
            {washingItemOptions.map((label) => {
              const checked = formData.washingItems.includes(label);
              return (
                <label
                  key={label}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <span
                    onClick={() => onWashingItemToggle(label)}
                    className={`
                      size-4 rounded border flex items-center justify-center shrink-0 transition-colors cursor-pointer
                      ${checked
                        ? "bg-[#08203c] border-[#08203c]"
                        : "bg-white border-black/20 group-hover:border-[#08203c]/50"
                      }
                    `}
                  >
                    {checked && (
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span
                    onClick={() => onWashingItemToggle(label)}
                    className="text-sm text-[#111] leading-snug select-none"
                  >
                    {label}
                  </span>
                </label>
              );
            })}
          </div>
          {formData.washingItems.length === 0 && (
            <p className="text-xs text-amber-600 mt-0.5">
              Please select at least one item type.
            </p>
          )}
        </div>

        {/* Detergent Preferences */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-[13px] text-[#08203c]">
            Detergent Preference
          </label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2 focus-within:border-[#08203c]/40 transition-colors">
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
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-[13px] text-[#08203c]">
            Service Date &amp; Time
          </label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2 flex items-center gap-2.5 focus-within:border-[#08203c]/40 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#08203c" strokeWidth="2" className="shrink-0">
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

      {/* Right Column — Live Order Summary (5 cols) */}
      <div className="lg:col-span-5 bg-[#fafafa] border border-black/5 rounded-[18px] p-3.5 flex flex-col gap-2.5 shadow-sm">
        <h3 className="font-semibold text-[15px] text-[#08203c] border-b border-black/5 pb-2.5 flex items-center gap-2">
          Order Summary
          {priceLoading && (
            <span className="size-3 border-2 border-[#08203c]/30 border-t-[#08203c] rounded-full animate-spin" />
          )}
        </h3>

        {/* Price Error */}
        {priceError && !priceLoading && (
          <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-[8px] px-2.5 py-1.5">
            Price unavailable — please try again or adjust your selection.
          </p>
        )}

        <div className="flex flex-col gap-2 text-sm text-[#444]">
          {priceLoading ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : priceData != null ? (
            <div className="flex justify-between items-start gap-2">
              <span className="leading-snug text-[13px]">
                {formData.bagSize}
                {formData.washingItems.length > 0 && (
                  <> &middot; {formData.washingItems.length} item type{formData.washingItems.length > 1 ? "s" : ""}</>
                )}
              </span>
              <span className="font-semibold text-[13px] text-[#0b1714] shrink-0 ml-2">
                Estimated Price
              </span>
            </div>
          ) : (
            <>
              <SkeletonRow />
              <SkeletonRow />
            </>
          )}
        </div>

        {/* Total */}
        <div className="border-t border-black/10 pt-3 mt-1 flex justify-between items-end">
          <span className="font-semibold text-sm text-[#08203c]">Total</span>
          {priceLoading ? (
            <div className="h-7 w-20 bg-black/8 rounded animate-pulse" />
          ) : priceData != null ? (
            <span className="font-bold text-[24px] text-[#08203c] leading-none">
              {`$${priceData.price.toFixed(2)}`}
            </span>
          ) : (
            <span className="text-sm text-[#999]">Calculating...</span>
          )}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="lg:col-span-12 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-[#f4f5f6] hover:bg-[#e4e5e6] text-[#0b1714] font-semibold text-sm py-2.5 rounded-[20px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={priceLoading}
          className="flex-1 bg-[#08203c] text-white font-semibold text-sm py-2.5 rounded-[20px] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <span>Next Step</span>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4.5l3.5 3.5L9 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
