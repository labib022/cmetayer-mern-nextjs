"use client";

import { CleaningBookingForm } from "./types";
import { PriceResponse } from "@/lib/redux/features/cleaning/cleaningApi";

interface StepBookingFormProps {
  formData: CleaningBookingForm;
  priceData: PriceResponse | null;
  priceLoading: boolean;
  priceError: boolean;
  bookingError: string;
  isSubmitting: boolean;
  categoryOptions: string[];
  frequencyOptions: string[];
  onBedroomChange: (delta: number) => void;
  onBathroomChange: (delta: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBack: () => void;
  onNext: () => void;
}

// ── Small reusable input wrapper ───────────────────────────────────────────────
function InputField({
  label,
  id,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  required = true,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-semibold text-[13px] text-[#08203c]">
        {label}
      </label>
      <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2 focus-within:border-[#08203c]/40 transition-colors">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className="bg-transparent text-sm text-[#111] outline-none w-full placeholder:text-[#aaa]"
        />
      </div>
    </div>
  );
}

// ── Price skeleton row ─────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="flex justify-between items-center">
      <div className="h-3 w-28 bg-black/8 rounded animate-pulse" />
      <div className="h-3 w-12 bg-black/8 rounded animate-pulse" />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function StepBookingForm({
  formData,
  priceData,
  priceLoading,
  priceError,
  bookingError,
  isSubmitting,
  categoryOptions,
  frequencyOptions,
  onBedroomChange,
  onBathroomChange,
  onChange,
  onBack,
  onNext,
}: StepBookingFormProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start animate-in fade-in duration-300">
      {/* ── Left Column — Form Inputs (7 cols) ────────────────────────────── */}
      <div className="lg:col-span-7 flex flex-col gap-3">

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-[13px] text-[#08203c]">
            Contact Info
          </span>
          <InputField
            label="Full Name"
            id="cleaning-name"
            name="name"
            value={formData.name}
            placeholder="Jane Doe"
            onChange={onChange}
          />
          <InputField
            label="Email Address"
            id="cleaning-email"
            name="email"
            type="email"
            value={formData.email}
            placeholder="jane@example.com"
            onChange={onChange}
          />
          <InputField
            label="Phone Number"
            id="cleaning-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            placeholder="+1 (555) 000-0000"
            onChange={onChange}
          />
        </div>

        {/* Home Size Steppers */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-[13px] text-[#08203c]">
            Home Size
          </span>

          {/* Bedrooms */}
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2.5 flex items-center justify-between">
            <span className="font-medium text-sm text-[#444]">Bedrooms</span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onBedroomChange(-1)}
                aria-label="Decrease bedrooms"
                className="size-7 rounded-full bg-white border border-black/10 hover:bg-[#08203c] hover:text-white text-[#0b1714] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="font-semibold text-sm text-[#0b1714] w-4 text-center">
                {formData.bedrooms}
              </span>
              <button
                type="button"
                onClick={() => onBedroomChange(1)}
                aria-label="Increase bedrooms"
                className="size-7 rounded-full bg-white border border-black/10 hover:bg-[#08203c] hover:text-white text-[#0b1714] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Bathrooms */}
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2.5 flex items-center justify-between">
            <span className="font-medium text-sm text-[#444]">Bathrooms</span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onBathroomChange(-1)}
                aria-label="Decrease bathrooms"
                className="size-7 rounded-full bg-white border border-black/10 hover:bg-[#08203c] hover:text-white text-[#0b1714] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="font-semibold text-sm text-[#0b1714] w-4 text-center">
                {formData.bathrooms}
              </span>
              <button
                type="button"
                onClick={() => onBathroomChange(1)}
                aria-label="Increase bathrooms"
                className="size-7 rounded-full bg-white border border-black/10 hover:bg-[#08203c] hover:text-white text-[#0b1714] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Service Category */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="cleaning-category"
            className="font-semibold text-[13px] text-[#08203c]"
          >
            Service Category
          </label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2 focus-within:border-[#08203c]/40 transition-colors">
            <select
              id="cleaning-category"
              name="serviceCategory"
              value={formData.serviceCategory}
              onChange={onChange}
              className="bg-transparent text-sm text-[#111] outline-none w-full cursor-pointer"
            >
              {categoryOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Service Date & Time */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="cleaning-datetime"
            className="font-semibold text-[13px] text-[#08203c]"
          >
            Service Date &amp; Time
          </label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2 flex items-center gap-2.5 focus-within:border-[#08203c]/40 transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#08203c"
              strokeWidth="2"
              className="shrink-0"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <input
              id="cleaning-datetime"
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={onChange}
              className="bg-transparent text-sm text-[#111] outline-none w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Frequency */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="cleaning-frequency"
            className="font-semibold text-[13px] text-[#08203c]"
          >
            Frequency
          </label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3 py-2 focus-within:border-[#08203c]/40 transition-colors">
            <select
              id="cleaning-frequency"
              name="frequency"
              value={formData.frequency}
              onChange={onChange}
              className="bg-transparent text-sm text-[#111] outline-none w-full cursor-pointer"
            >
              {frequencyOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Right Column — Live Order Summary (5 cols) ─────────────────────── */}
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
                {formData.bedrooms} Bed, {formData.bathrooms} Bath
                {" · "}
                <span className="truncate">{formData.serviceCategory}</span>
              </span>
              <span className="font-semibold text-[13px] text-[#0b1714] shrink-0 ml-2">
                Estimated Price
              </span>
            </div>
          ) : (
            // No data yet and no error — empty placeholder rows
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

      {/* ── Booking Error Banner ───────────────────────────────────────────── */}
      {bookingError && (
        <div className="lg:col-span-12 bg-red-50 border border-red-200 text-red-700 text-sm px-3.5 py-2.5 rounded-[12px] flex items-start gap-2">
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

      {/* ── Action Buttons ─────────────────────────────────────────────────── */}
      <div className="lg:col-span-12 flex gap-3">
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
          onClick={onNext}
          disabled={isSubmitting || priceLoading}
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
