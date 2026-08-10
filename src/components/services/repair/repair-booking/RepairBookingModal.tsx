"use client";

import { useState } from "react";
import { RepairBookingForm, RepairBookingModalProps } from "./types";
import StepRequestQuote from "./StepRequestQuote";
import StepRequestReceived from "./StepRequestReceived";

const categoryOptions = [
  "Plumbing Repairs & Installations",
  "Electrical Services & Upgrades",
  "Carpentry & Woodworking",
  "Painting & Drywall Repair",
  "General Home Maintenance",
  "Appliance Repair",
];

const initialFormState: RepairBookingForm = {
  fullName: "",
  email: "",
  phone: "",
  serviceCategory: "Plumbing Repairs & Installations",
  issueDescription: "",
  photo: null,
};

export default function RepairBookingModal({
  isOpen,
  onClose,
}: RepairBookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<RepairBookingForm>(initialFormState);
  const [validationError, setValidationError] = useState<string>("");

  if (!isOpen) return null;

  const handleResetAndClose = () => {
    setFormData(initialFormState);
    setStep(1);
    setValidationError("");
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
  };

  const handlePhotoChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, photo: file }));
  };

  // Validation
  const validateForm = (): boolean => {
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
    if (!formData.serviceCategory.trim()) {
      setValidationError("Please select a Service Category");
      return false;
    }
    if (!formData.issueDescription.trim()) {
      setValidationError("Please describe the issue");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Home Repair Booking Form Submitted:", {
        ...formData,
        photo: formData.photo ? formData.photo.name : null,
      });
      setStep(2);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Modal Container Card */}
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[620px] max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative flex flex-col gap-5 border border-black/5">
        {/* Top Close X Button */}
        <div className="flex items-center justify-between w-full border-b border-black/5 pb-4">
          <h2 className="font-semibold text-[20px] sm:text-[22px] text-[#0b1714] tracking-[-0.5px]">
            {step === 1 ? "Request a Repair Quote" : "Request Received!"}
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
          <StepRequestQuote
            formData={formData}
            categoryOptions={categoryOptions}
            onChange={handleInputChange}
            onPhotoChange={handlePhotoChange}
            onSubmit={handleSubmit}
          />
        )}

        {step === 2 && (
          <StepRequestReceived onDone={handleResetAndClose} />
        )}
      </div>
    </div>
  );
}
