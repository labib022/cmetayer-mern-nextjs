"use client";

import { useState, useMemo } from "react";
import { CleaningBookingForm, CleaningBookingModalProps } from "./types";
import StepBookingForm from "./StepBookingForm";
import StepBookingConfirmed from "./StepBookingConfirmed";

const initialFormState: CleaningBookingForm = {
  bedrooms: 1,
  bathrooms: 1,
  serviceCategory: "Standard Clean",
  dateTime: "2026-03-15T15:00",
  frequency: "One-time (0%)",
};

const categoryOptions = [
  "Standard Clean",
  "Deep Clean",
  "Move-in / Move-out Clean",
  "Post-Renovation Clean",
];

const frequencyOptions = [
  "One-time (0%)",
  "Weekly (15% Off)",
  "Bi-weekly (10% Off)",
  "Monthly (5% Off)",
];

// Configurable Pricing Calculation Rules
const BASE_PRICE = 30;
const EXTRA_BED_PRICE = 10;
const EXTRA_BATH_PRICE = 6;

const CATEGORY_COSTS: Record<string, number> = {
  "Standard Clean": 0,
  "Deep Clean": 25,
  "Move-in / Move-out Clean": 40,
  "Post-Renovation Clean": 50,
};

const FREQUENCY_DISCOUNT_RATES: Record<string, number> = {
  "One-time (0%)": 0,
  "Weekly (15% Off)": 0.15,
  "Bi-weekly (10% Off)": 0.1,
  "Monthly (5% Off)": 0.05,
};

const TAX_RATE = 0.0565; // 5.65% tax rate ($46.00 subtotal -> $2.60 tax -> $48.60 total)

export default function CleaningBookingModal({
  isOpen,
  onClose,
}: CleaningBookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<CleaningBookingForm>(initialFormState);

  // Live Calculated Order Summary
  const summary = useMemo(() => {
    const spaceSubtotal =
      BASE_PRICE +
      (formData.bedrooms - 1) * EXTRA_BED_PRICE +
      (formData.bathrooms - 1) * EXTRA_BATH_PRICE;

    const categoryCost = CATEGORY_COSTS[formData.serviceCategory] || 0;
    const grossSubtotal = spaceSubtotal + categoryCost;

    const discountRate = FREQUENCY_DISCOUNT_RATES[formData.frequency] || 0;
    const discountAmount = grossSubtotal * discountRate;
    const subtotal = grossSubtotal - discountAmount;

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
    };
  }, [formData]);

  if (!isOpen) return null;

  const handleResetAndClose = () => {
    setFormData(initialFormState);
    setStep(1);
    onClose();
  };

  const handleBedroomChange = (delta: number) => {
    setFormData((prev) => ({
      ...prev,
      bedrooms: Math.max(1, Math.min(10, prev.bedrooms + delta)),
    }));
  };

  const handleBathroomChange = (delta: number) => {
    setFormData((prev) => ({
      ...prev,
      bathrooms: Math.max(1, Math.min(10, prev.bathrooms + delta)),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    console.log("Cleaning Booking Form Submitted:", formData);
    setStep(2);
  };

  // Format date time for confirmation screen
  const formattedScheduledVisit = () => {
    if (!formData.dateTime) return "March 15, 2026, at 3:00 PM";
    try {
      const dateObj = new Date(formData.dateTime);
      return dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return formData.dateTime;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Modal Container Card */}
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[800px] p-6 sm:p-8 relative flex flex-col gap-6 my-auto border border-black/5">
        {/* Top Close X Button */}
        <div className="flex items-center justify-between w-full border-b border-black/5 pb-4">
          <h2 className="font-semibold text-[22px] sm:text-[24px] text-[#0b1714] tracking-[-0.5px]">
            {step === 1 ? "Book a Cleaning" : "Booking Confirmed!"}
          </h2>

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

        {/* Conditionally Rendered Step Component */}
        {step === 1 && (
          <StepBookingForm
            formData={formData}
            summary={summary}
            categoryOptions={categoryOptions}
            frequencyOptions={frequencyOptions}
            onBedroomChange={handleBedroomChange}
            onBathroomChange={handleBathroomChange}
            onChange={handleInputChange}
            onBack={handleResetAndClose}
            onNext={handleNextStep}
          />
        )}

        {step === 2 && (
          <StepBookingConfirmed
            formattedScheduledVisit={formattedScheduledVisit()}
            onDone={handleResetAndClose}
          />
        )}
      </div>
    </div>
  );
}
