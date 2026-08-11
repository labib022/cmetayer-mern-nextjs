"use client";

import { useRef } from "react";
import { RepairBookingForm } from "./types";

interface StepRequestQuoteProps {
  formData: RepairBookingForm;
  categoryOptions: string[];
  isSubmitting?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onPhotoChange: (file: File | null) => void;
  onSubmit: () => void;
}

export default function StepRequestQuote({
  formData,
  categoryOptions,
  isSubmitting = false,
  onChange,
  onPhotoChange,
  onSubmit,
}: StepRequestQuoteProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDropzoneClick = () => {
    if (isSubmitting) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onPhotoChange(files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-300">
      {/* Full Name & Email Row (Grid on sm+) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-medium text-sm text-[#08203c]">Full Name</label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
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
          <label className="font-medium text-sm text-[#08203c]">Email Address</label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
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
      </div>

      {/* Phone Number & Service Category Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone Number */}
        <div className="flex flex-col gap-1.5">
          <label className="font-medium text-sm text-[#08203c]">Phone Number</label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="+880********"
              className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full"
            />
          </div>
        </div>

        {/* Service Category */}
        <div className="flex flex-col gap-1.5">
          <label className="font-medium text-sm text-[#08203c]">Service Category</label>
          <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
            <select
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
      </div>

      {/* Describe the Issue */}
      <div className="flex flex-col gap-1.5">
        <label className="font-medium text-sm text-[#08203c]">Describe the Issue</label>
        <div className="bg-[#fafafa] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
          <textarea
            name="issueDescription"
            rows={3}
            value={formData.issueDescription}
            onChange={onChange}
            placeholder="E.g., The sink in the master bathroom is leaking from the P-trap..."
            className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full resize-none"
          />
        </div>
      </div>

      {/* Upload Photo (Optional) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="font-medium text-sm text-[#08203c]">Upload Photo</label>
          <span className="text-xs text-[#656565] font-normal">(Optional)</span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          onClick={handleFileDropzoneClick}
          className="
            border-2 border-dashed border-black/15 hover:border-[#08203c] rounded-[16px]
            p-4 text-center cursor-pointer transition-colors bg-[#fafafa] hover:bg-black/[0.02]
            flex flex-col items-center justify-center gap-2 group
          "
        >
          {formData.photo ? (
            <div className="flex items-center justify-between w-full px-2">
              <span className="text-xs font-medium text-[#08203c] truncate max-w-[280px]">
                📎 {formData.photo.name}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPhotoChange(null);
                }}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <div className="size-10 rounded-full bg-[#08203c]/5 group-hover:bg-[#08203c]/10 text-[#08203c] flex items-center justify-center transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xs font-semibold text-[#08203c]">
                  Click to upload or drag &amp; drop
                </span>
                <span className="text-[11px] text-[#656565]">
                  PNG, JPG up to 5MB
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="
          mt-2 w-full bg-[#08203c] text-white font-semibold text-base py-3.5 rounded-[24px]
          flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]
          transition-all duration-200 cursor-pointer shadow-md
          disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
        "
      >
        <span>{isSubmitting ? "Submitting..." : "Submit Request"}</span>
        {!isSubmitting && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4.5l3.5 3.5L9 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}