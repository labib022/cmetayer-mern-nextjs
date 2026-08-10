"use client";

import { useState, useMemo } from "react";
import { LaundryBookingForm, LaundryBookingModalProps } from "./types";
import StepCustomizeLaundry from "./StepCustomizeLaundry";
import StepContactInfo from "./StepContactInfo";
import StepBookingConfirmed from "./StepBookingConfirmed";

const initialFormState: LaundryBookingForm = {
  bagSize: "Small (1 Load / ~10-15 lbs)",
  washType: "Standard Clothing (Shirts, pants, socks, underwear)",
  detergentPreference: "Standard Premium Detergent",
  dateTime: "2026-03-15T15:00",
  fullName: "",
  email: "",
  phone: "",
};

const bagSizeOptions = [
  "Small (1 Load / ~10-15 lbs)",
  "Medium (2 Loads / ~20-25 lbs)",
  "Large (3 Loads / ~30-35 lbs)",
  "Extra Large (4+ Loads / ~40+ lbs)",
];

const washTypeOptions = [
  {
    label: "Standard Clothing (Shirts, pants, socks, underwear)",
    subtext: "Shirts, pants, socks, underwear",
  },
  {
    label: "Delicates & Silk (Lingerie, blouses, silk items)",
    subtext: "Lingerie, blouses, silk items requiring gentle cycle",
  },
  {
    label: "Bedding & Linens (Sheets, duvet covers, pillowcases)",
    subtext: "Sheets, duvet covers, pillowcases, bath towels",
  },
  {
    label: "Heavy Jackets & Outerwear (Coats, parkas, heavy blankets)",
    subtext: "Winter coats, parkas, heavy blankets",
  },
];

const detergentOptions = [
  "Standard Premium Detergent",
  "Free & Clear (Hypoallergenic)",
  "Eco-Friendly Plant-Based",
  "Lavender Scented Premium",
];

// Configurable Laundry Pricing Rules
const BAG_SIZE_PRICES: Record<string, number> = {
  "Small (1 Load / ~10-15 lbs)": 35.0,
  "Medium (2 Loads / ~20-25 lbs)": 50.0,
  "Large (3 Loads / ~30-35 lbs)": 65.0,
  "Extra Large (4+ Loads / ~40+ lbs)": 80.0,
};

const WASH_TYPE_SURCHARGES: Record<string, number> = {
  "Standard Clothing (Shirts, pants, socks, underwear)": 0,
  "Delicates & Silk (Lingerie, blouses, silk items)": 10.0,
  "Bedding & Linens (Sheets, duvet covers, pillowcases)": 8.0,
  "Heavy Jackets & Outerwear (Coats, parkas, heavy blankets)": 15.0,
};

const SERVICE_FEE = 4.99;
const TAX_RATE = 0.0565; // ~5.65% tax rate

export default function LaundryBookingModal({
  isOpen,
  onClose,
}: LaundryBookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<LaundryBookingForm>(initialFormState);
  const [validationError, setValidationError] = useState<string>("");

  // Live Calculated Order Summary
  const summary = useMemo(() => {
    const basePrice = BAG_SIZE_PRICES[formData.bagSize] || 35.0;
    const washSurcharge = WASH_TYPE_SURCHARGES[formData.washType] || 0;
    const washAndFoldBase = basePrice + washSurcharge;

    const subtotal = washAndFoldBase + SERVICE_FEE;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return {
      washAndFoldBase: washAndFoldBase.toFixed(2),
      serviceFee: SERVICE_FEE.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    };
  }, [formData]);

  if (!isOpen) return null;

  const handleResetAndClose = () => {
    setFormData(initialFormState);
    setStep(1);
    setValidationError("");
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  // Step 2 Validation (Contact Info)
  const validateStep2 = (): boolean => {
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

  const handleNextFromStep1 = () => {
    setStep(2);
  };

  const handleSubmitFromStep2 = () => {
    if (validateStep2()) {
      console.log("Laundry Booking Form Submitted:", formData);
      setStep(3);
    }
  };

  const handleBack = () => {
    setValidationError("");
    if (step > 1) setStep(step - 1);
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Modal Container Card */}
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[800px] max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative flex flex-col gap-6 border border-black/5">
        {/* Top Header: Title, Step Counter, Close X Button */}
        <div className="flex items-center justify-between w-full border-b border-black/5 pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-[20px] sm:text-[22px] text-[#0b1714] tracking-[-0.5px]">
              {step === 1
                ? "Build Your Laundry Order"
                : step === 2
                ? "Build Your Laundry Order"
                : "Booking Confirmed!"}
            </h2>
            {step <= 2 && (
              <span className="text-xs font-semibold text-[#656565] uppercase tracking-wider">
                Step {step} of 2
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

        {/* Progress Bar (Steps 1 & 2) */}
        {step <= 2 && (
          <div className="w-full bg-[#f4f5f6] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#08203c] h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${(step / 2) * 100}%` }}
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

        {/* Conditionally Rendered Step Component */}
        {step === 1 && (
          <StepCustomizeLaundry
            formData={formData}
            summary={summary}
            bagSizeOptions={bagSizeOptions}
            washTypeOptions={washTypeOptions}
            detergentOptions={detergentOptions}
            onChange={handleInputChange}
            onBack={handleResetAndClose}
            onNext={handleNextFromStep1}
          />
        )}

        {step === 2 && (
          <StepContactInfo
            formData={formData}
            onChange={handleInputChange}
            onBack={handleBack}
            onSubmit={handleSubmitFromStep2}
          />
        )}

        {step === 3 && (
          <StepBookingConfirmed
            formattedScheduledVisit={formattedScheduledVisit()}
            onDone={handleResetAndClose}
          />
        )}
      </div>
    </div>
  );
}
