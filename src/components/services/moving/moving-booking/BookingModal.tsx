"use client";

import { useState } from "react";
import { MovingBookingForm, BookingModalProps } from "./types";
import StepLocationTiming from "./StepLocationTiming";
import StepScopeOfMove from "./StepScopeOfMove";
import StepContactInfo from "./StepContactInfo";
import StepThankYou from "./StepThankYou";

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
  const handleAddHeavyItem = (item: string) => {
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
  const handleRemoveHeavyItem = (itemToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      heavyItems: prev.heavyItems.filter((item) => item !== itemToRemove),
    }));
  };

  const handleNeedsPackingChange = (needsPacking: boolean) => {
    setFormData((prev) => ({ ...prev, needsPacking }));
    setValidationError("");
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

  const handleNextFromStep1 = () => {
    if (validateStep1()) setStep(2);
  };

  const handleNextFromStep2 = () => {
    if (validateStep2()) setStep(3);
  };

  const handleSubmitFromStep3 = () => {
    if (validateStep3()) {
      console.log("Moving Booking Form Submitted:", formData);
      setStep(4);
    }
  };

  const handleBack = () => {
    setValidationError("");
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Modal Shell Container */}
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[560px] max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative flex flex-col gap-6 border border-black/5">
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

        {/* Conditionally Rendered Step Component */}
        {step === 1 && (
          <StepLocationTiming
            formData={formData}
            onChange={handleInputChange}
            onNext={handleNextFromStep1}
          />
        )}

        {step === 2 && (
          <StepScopeOfMove
            formData={formData}
            homeSizeOptions={homeSizeOptions}
            heavyItemSuggestions={heavyItemSuggestions}
            customHeavyItem={customHeavyItem}
            onCustomHeavyItemChange={setCustomHeavyItem}
            onChange={handleInputChange}
            onAddHeavyItem={handleAddHeavyItem}
            onRemoveHeavyItem={handleRemoveHeavyItem}
            onNeedsPackingChange={handleNeedsPackingChange}
            onBack={handleBack}
            onNext={handleNextFromStep2}
          />
        )}

        {step === 3 && (
          <StepContactInfo
            formData={formData}
            onChange={handleInputChange}
            onBack={handleBack}
            onSubmit={handleSubmitFromStep3}
          />
        )}

        {step === 4 && (
          <StepThankYou onDone={handleResetAndClose} />
        )}
      </div>
    </div>
  );
}
