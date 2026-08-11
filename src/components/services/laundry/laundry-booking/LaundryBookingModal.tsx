"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LaundryBookingForm, LaundryBookingModalProps } from "./types";
import StepCustomizeLaundry from "./StepCustomizeLaundry";
import StepContactInfo from "./StepContactInfo";
import StepBookingConfirmed from "./StepBookingConfirmed";
import {
  useCalculateLaundryPriceMutation,
  useBookLaundryMutation,
  BAG_SIZE_MAP,
  DETERGENT_MAP,
  LaundryPriceResponse,
} from "@/lib/redux/features/laundry/laundryApi";

// ── Static Config ──────────────────────────────────────────────────────────────

const bagSizeOptions = [
  { label: "Small (1 Load / ~10-15 lbs)", disabled: false },
  { label: "Medium (2 Loads / ~20-25 lbs)", disabled: false },
  { label: "Large (3 Loads / ~30-35 lbs)", disabled: false },
  { label: "Extra Large (4+ Loads / ~40+ lbs)", disabled: true }, // no backend enum
];

const washingItemOptions = [
  "Standard Clothing (Shirts, pants, socks, underwear)",
  "Delicates & Silk (Lingerie, blouses, silk items)",
  "Bedding & Linens (Sheets, duvet covers, pillowcases)",
  "Heavy Jackets & Outerwear (Coats, parkas, heavy blankets)",
];

const detergentOptions = [
  "Standard Premium Detergent",
  "Free & Clear (Hypoallergenic)",
  "Eco-Friendly Plant-Based",
];

const initialFormState: LaundryBookingForm = {
  bagSize: "Small (1 Load / ~10-15 lbs)",
  washingItems: ["Standard Clothing (Shirts, pants, socks, underwear)"],
  detergentPreference: "Standard Premium Detergent",
  dateTime: "",
  fullName: "",
  email: "",
  phone: "",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function LaundryBookingModal({
  isOpen,
  onClose,
}: LaundryBookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<LaundryBookingForm>(initialFormState);

  // Price state — driven by the live API call
  const [priceData, setPriceData] = useState<LaundryPriceResponse | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState(false);

  // Booking error shown inline in the form
  const [bookingError, setBookingError] = useState("");

  // Validation error for contact step
  const [validationError, setValidationError] = useState("");

  // Total to display on the confirmation screen
  const [confirmedTotal, setConfirmedTotal] = useState("");

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [calculateLaundryPrice] = useCalculateLaundryPriceMutation();
  const [bookLaundry, { isLoading: isBookingLoading }] = useBookLaundryMutation();

  // ── Debounced Price Fetch ──────────────────────────────────────────────────
  const fetchPrice = useCallback(
    async (data: LaundryBookingForm) => {
      const bagSizeKey = BAG_SIZE_MAP[data.bagSize];
      const detergentKey = DETERGENT_MAP[data.detergentPreference];
      // Don't fetch price if bag size is disabled/unmapped
      if (!bagSizeKey || !detergentKey) return;

      setPriceLoading(true);
      setPriceError(false);
      try {
        const result = await calculateLaundryPrice({
          bag_size: bagSizeKey,
          detergent_type: detergentKey,
        }).unwrap();
        setPriceData(result);
      } catch {
        setPriceError(true);
        setPriceData(null);
      } finally {
        setPriceLoading(false);
      }
    },
    [calculateLaundryPrice]
  );

  // Re-run price fetch (debounced 400ms) whenever pricing inputs change
  useEffect(() => {
    if (!isOpen) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchPrice(formData);
    }, 400);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.bagSize, formData.detergentPreference, isOpen]);

  if (!isOpen) return null;

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleResetAndClose = () => {
    setFormData(initialFormState);
    setStep(1);
    setBookingError("");
    setValidationError("");
    setPriceData(null);
    setPriceError(false);
    setConfirmedTotal("");
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookingError("");
    setValidationError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Multi-select toggle for washing items
  const handleWashingItemToggle = (label: string) => {
    setFormData((prev) => {
      const already = prev.washingItems.includes(label);
      return {
        ...prev,
        washingItems: already
          ? prev.washingItems.filter((l) => l !== label)
          : [...prev.washingItems, label],
      };
    });
  };

  const handleNextFromStep1 = () => {
    if (formData.washingItems.length === 0) {
      setValidationError("Please select at least one item type to wash.");
      return;
    }
    setValidationError("");
    setStep(2);
  };

  // Step 2 validation
  const validateStep2 = (): boolean => {
    if (!formData.fullName.trim()) {
      setValidationError("Please enter your Full Name.");
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setValidationError("Please enter a valid Email Address.");
      return false;
    }
    if (!formData.phone.trim()) {
      setValidationError("Please enter your Phone Number.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmitFromStep2 = async () => {
    if (!validateStep2()) return;

    setBookingError("");
    const bagSizeKey = BAG_SIZE_MAP[formData.bagSize];
    const detergentKey = DETERGENT_MAP[formData.detergentPreference];

    try {
      const result = await bookLaundry({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        bag_size: bagSizeKey,
        detergent_type: detergentKey,
        washing_items: formData.washingItems, // raw labels — backend accepts as-is
        laundry_date: formData.dateTime,
      }).unwrap();

      // Prefer total from booking response; fall back to cached price
      const total =
        result.total != null
          ? `$${result.total.toFixed(2)}`
          : priceData
          ? `$${priceData.price.toFixed(2)}`
          : "";
      setConfirmedTotal(total);
      setStep(3);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setBookingError(
        err?.data?.message ||
          err?.message ||
          "Booking failed. Please check your details and try again."
      );
    }
  };

  const handleBack = () => {
    setBookingError("");
    setValidationError("");
    if (step > 1) setStep(step - 1);
  };

  // ── Date Formatter for Confirmation Screen ─────────────────────────────────
  const formattedScheduledVisit = (): string => {
    if (!formData.dateTime) return "Date not specified";
    try {
      return new Date(formData.dateTime).toLocaleDateString("en-US", {
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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Modal Container Card */}
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[800px] max-h-[90vh] overflow-y-auto p-5 sm:p-6 relative flex flex-col gap-4 border border-black/5">
        {/* Header */}
        <div className="flex items-center justify-between w-full border-b border-black/5 pb-3">
          <div className="flex flex-col gap-0.5">
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Progress Bar (Steps 1 & 2) */}
        {step <= 2 && (
          <div className="w-full bg-[#f4f5f6] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#08203c] h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        )}

        {/* Validation Error Banner */}
        {validationError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3.5 py-2.5 rounded-[12px] flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{validationError}</span>
          </div>
        )}

        {/* Step 1 — Laundry Customization */}
        {step === 1 && (
          <StepCustomizeLaundry
            formData={formData}
            bagSizeOptions={bagSizeOptions}
            washingItemOptions={washingItemOptions}
            detergentOptions={detergentOptions}
            priceData={priceData}
            priceLoading={priceLoading}
            priceError={priceError}
            onChange={handleInputChange}
            onWashingItemToggle={handleWashingItemToggle}
            onBack={handleResetAndClose}
            onNext={handleNextFromStep1}
          />
        )}

        {/* Step 2 — Contact Info */}
        {step === 2 && (
          <StepContactInfo
            formData={formData}
            bookingError={bookingError}
            isSubmitting={isBookingLoading}
            onChange={handleInputChange}
            onBack={handleBack}
            onSubmit={handleSubmitFromStep2}
          />
        )}

        {/* Step 3 — Confirmed */}
        {step === 3 && (
          <StepBookingConfirmed
            formattedScheduledVisit={formattedScheduledVisit()}
            confirmedTotal={confirmedTotal}
            onDone={handleResetAndClose}
          />
        )}
      </div>
    </div>
  );
}
