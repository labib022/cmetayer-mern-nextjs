"use client";

import { useState } from "react";

export interface MovingBookingForm {
  pickupAddress: string;
  dropoffAddress: string;
  moveDate: string;
  homeSize: string;
  heavyItems: string[];
  needsPacking: boolean | null;
  fullName: string;
  email: string;
  phone: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormState: MovingBookingForm = {
  pickupAddress: "",
  dropoffAddress: "",
  moveDate: "",
  homeSize: "2 Bedroom Home",
  heavyItems: ["Piano"],
  needsPacking: true,
  fullName: "",
  email: "",
  phone: "",
};

const homeSizeOptions = [
  "Studio / 1 Bedroom",
  "2 Bedroom Home",
  "3-4 Bedroom Home",
  "5+ Bedroom / House",
  "Commercial / Office",
];

const heavyItemSuggestions = [
  "Piano",
  "Pool Table",
  "Safe / Vault",
  "Heavy Appliance",
  "Marble Top Table",
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<MovingBookingForm>(initialFormState);
  const [customHeavyItem, setCustomHeavyItem] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  if (!isOpen) return null;

  const handleResetAndClose = () => {
    setFormData(initialFormState);
    setStep(1);
    setValidationError("");
    setCustomHeavyItem("");
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  // Add heavy item chip
  const addHeavyItem = (item: string) => {
    const trimmed = item.trim();
    if (trimmed && !formData.heavyItems.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        heavyItems: [...prev.heavyItems, trimmed],
      }));
    }
    setCustomHeavyItem("");
  };

  // Remove heavy item chip
  const removeHeavyItem = (itemToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      heavyItems: prev.heavyItems.filter((item) => item !== itemToRemove),
    }));
  };

  // Step 1 Validation
  const validateStep1 = (): boolean => {
    if (!formData.pickupAddress.trim()) {
      setValidationError("Please enter a Pick-up Address");
      return false;
    }
    if (!formData.dropoffAddress.trim()) {
      setValidationError("Please enter a Drop-off Address");
      return false;
    }
    if (!formData.moveDate.trim()) {
      setValidationError("Please select your Expected Move Date");
      return false;
    }
    setValidationError("");
    return true;
  };

  // Step 2 Validation
  const validateStep2 = (): boolean => {
    if (!formData.homeSize) {
      setValidationError("Please select your Home Size");
      return false;
    }
    if (formData.needsPacking === null) {
      setValidationError("Please select whether you need packing services");
      return false;
    }
    setValidationError("");
    return true;
  };

  // Step 3 Validation
  const validateStep3 = (): boolean => {
    if (!formData.fullName.trim()) {
      setValidationError("Please enter your Full Name");
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setValidationError("Please enter a valid Email Address");
      return false;
    }
    if (!formData.phone.trim()) {
      setValidationError("Please enter your Phone Number");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      if (validateStep3()) {
        console.log("Moving Booking Form Submitted:", formData);
        setStep(4);
      }
    }
  };

  const handleBack = () => {
    setValidationError("");
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[560px] p-6 sm:p-8 relative flex flex-col gap-6 my-auto border border-black/5">
        {/* Top Header: Title, Step Counter, Close X Button */}
        <div className="flex items-center justify-between w-full border-b border-black/5 pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-[20px] sm:text-[22px] text-[#0b1714] tracking-[-0.5px]">
              Build Your Moving Project
            </h2>
            {step <= 3 && (
              <span className="text-xs font-semibold text-[#656565] uppercase tracking-wider">
                Step {step} of 3
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close modal"
            className="size-9 rounded-full bg-[#fafafa] hover:bg-[#08203c] text-[#0b1714] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Progress Bar (Steps 1 to 3) */}
        {step <= 3 && (
          <div className="w-full bg-[#f4f5f6] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#08203c] h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Validation Error Banner */}
        {validationError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-[12px] flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{validationError}</span>
          </div>
        )}

        {/* ── STEP 1: Location & Timing ── */}
        {step === 1 && (
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full cursor-pointer"
                />
              </div>
            </div>

            {/* Step 1 Action Button */}
            <button
              type="button"
              onClick={handleNext}
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
        )}

        {/* ── STEP 2: Scope of Move ── */}
        {step === 2 && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <h3 className="font-semibold text-[17px] text-[#08203c]">
              Scope of Move
            </h3>

            {/* Home Size Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="font-medium text-sm text-[#444]">
                Home Size
              </label>
              <div className="bg-[#111111]/[0.03] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
                <select
                  name="homeSize"
                  value={formData.homeSize}
                  onChange={handleInputChange}
                  className="bg-transparent text-sm text-[#111] outline-none w-full cursor-pointer"
                >
                  {homeSizeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Extra Heavy Items Tag / Chip Input */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm text-[#444]">
                Any extra heavy items?
              </label>

              {/* Chips Display */}
              <div className="flex flex-wrap gap-2 min-h-[38px] p-2 bg-[#111111]/[0.02] border border-black/5 rounded-[12px]">
                {formData.heavyItems.map((item) => (
                  <span
                    key={item}
                    className="bg-[#08203c] text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeHeavyItem(item)}
                      className="hover:bg-white/20 rounded-full p-0.5 cursor-pointer transition-colors"
                      aria-label={`Remove ${item}`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </span>
                ))}
                {formData.heavyItems.length === 0 && (
                  <span className="text-xs text-[#999] py-1 px-1">
                    No heavy items added yet
                  </span>
                )}
              </div>

              {/* Suggestions pills */}
              <div className="flex flex-wrap gap-1.5 items-center pt-1">
                <span className="text-xs text-[#656565]">Suggestions:</span>
                {heavyItemSuggestions.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => addHeavyItem(sug)}
                    className="text-xs bg-[#f4f5f6] hover:bg-[#08203c] text-[#0b1714] hover:text-white px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Do you need packing services? */}
            <div className="flex flex-col gap-2 pt-1">
              <label className="font-medium text-sm text-[#444]">
                Do you need packing services?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, needsPacking: true }))}
                  className={`flex-1 py-2.5 rounded-[12px] font-medium text-sm border transition-all cursor-pointer ${
                    formData.needsPacking === true
                      ? "bg-[#08203c] text-white border-[#08203c] shadow-md"
                      : "bg-[#fafafa] text-[#444] border-black/5 hover:bg-black/5"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, needsPacking: false }))}
                  className={`flex-1 py-2.5 rounded-[12px] font-medium text-sm border transition-all cursor-pointer ${
                    formData.needsPacking === false
                      ? "bg-[#08203c] text-white border-[#08203c] shadow-md"
                      : "bg-[#fafafa] text-[#444] border-black/5 hover:bg-black/5"
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Step 2 Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={handleBack}
                className="
                  flex-1 bg-[#f4f5f6] hover:bg-[#e4e5e6] text-[#0b1714] font-semibold text-base py-3.5 rounded-[24px]
                  hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer
                "
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
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
        )}

        {/* ── STEP 3: Contact Info ── */}
        {step === 3 && (
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  placeholder="(555) 019-2834"
                  className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full"
                />
              </div>
            </div>

            {/* Step 3 Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={handleBack}
                className="
                  flex-1 bg-[#f4f5f6] hover:bg-[#e4e5e6] text-[#0b1714] font-semibold text-base py-3.5 rounded-[24px]
                  hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer
                "
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
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
        )}

        {/* ── STEP 4: Thank you! Confirmation Screen ── */}
        {step === 4 && (
          <div className="flex flex-col items-center justify-center text-center gap-6 py-6 animate-in fade-in duration-300">
            {/* Checkmark Badge */}
            <div className="size-20 rounded-full bg-[#08203c] text-white flex items-center justify-center shadow-xl animate-bounce">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <div className="flex flex-col gap-2 max-w-[420px]">
              <h3 className="font-semibold text-[30px] sm:text-[34px] text-[#0b1714] tracking-[-1px]">
                Thank you!
              </h3>
              <p className="font-normal text-[15px] sm:text-[16px] text-[#656565] leading-[1.5]">
                Our moving specialists will review your details and contact you
                within 24 hours with a custom quote.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="
                mt-4 w-full bg-[#08203c] text-white font-semibold text-base py-3.5 px-6 rounded-[24px]
                hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md
              "
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
