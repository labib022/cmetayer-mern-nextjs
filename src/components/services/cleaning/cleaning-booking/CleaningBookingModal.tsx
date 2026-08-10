"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CleaningBookingForm, CleaningBookingModalProps } from "./types";
import StepBookingForm from "./StepBookingForm";
import StepBookingConfirmed from "./StepBookingConfirmed";
import {
  useCalculatePriceMutation,
  useBookCleaningMutation,
  SERVICE_CATEGORY_MAP,
  FREQUENCY_MAP,
  PriceResponse,
} from "@/lib/redux/features/cleaning/cleaningApi";

// ── Static Config ──────────────────────────────────────────────────────────────
// Only include categories that have a backend enum mapping.
export const categoryOptions = [
  "Standard Clean",
  "Deep Clean",
  "Move-in / Move-out Clean",
];

export const frequencyOptions = [
  "One-time (0%)",
  "Weekly (15% Off)",
  "Bi-weekly (10% Off)",
  "Monthly (5% Off)",
];

const initialFormState: CleaningBookingForm = {
  name: "",
  email: "",
  phone: "",
  bedrooms: 1,
  bathrooms: 1,
  serviceCategory: "Standard Clean",
  dateTime: "",
  frequency: "One-time (0%)",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function CleaningBookingModal({
  isOpen,
  onClose,
}: CleaningBookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<CleaningBookingForm>(initialFormState);

  // Price state — driven by the live API call
  const [priceData, setPriceData] = useState<PriceResponse | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState(false);

  // Booking error shown inline in the form
  const [bookingError, setBookingError] = useState("");

  // Total to display on the confirmation screen (from booking response or price cache)
  const [confirmedTotal, setConfirmedTotal] = useState("");

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [calculatePrice] = useCalculatePriceMutation();
  const [bookCleaning, { isLoading: isBookingLoading }] = useBookCleaningMutation();

  // ── Debounced Price Fetch ──────────────────────────────────────────────────
  const fetchPrice = useCallback(
    async (data: CleaningBookingForm) => {
      const categoryKey = SERVICE_CATEGORY_MAP[data.serviceCategory];
      const frequencyKey = FREQUENCY_MAP[data.frequency];
      if (!categoryKey || !frequencyKey) return;

      setPriceLoading(true);
      setPriceError(false);
      try {
        const result = await calculatePrice({
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          services_category: categoryKey,
          frequency: frequencyKey,
        }).unwrap();
        setPriceData(result);
      } catch {
        setPriceError(true);
        setPriceData(null);
      } finally {
        setPriceLoading(false);
      }
    },
    [calculatePrice]
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
  }, [
    formData.bedrooms,
    formData.bathrooms,
    formData.serviceCategory,
    formData.frequency,
    isOpen,
  ]);

  if (!isOpen) return null;

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleResetAndClose = () => {
    setFormData(initialFormState);
    setStep(1);
    setBookingError("");
    setPriceData(null);
    setPriceError(false);
    setConfirmedTotal("");
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
    setBookingError(""); // clear error on any input change
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = async () => {
    setBookingError("");

    const categoryKey = SERVICE_CATEGORY_MAP[formData.serviceCategory];
    const frequencyKey = FREQUENCY_MAP[formData.frequency];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    try {
      const result = await bookCleaning({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        services_category: categoryKey,
        frequency: frequencyKey,
        cleaning_date: formData.dateTime,
      }).unwrap();

      // Prefer the total returned by the booking response, fall back to the
      // cached price-check result if the booking endpoint doesn't return one.
      const total =
        result.total != null
          ? `$${result.total.toFixed(2)}`
          : priceData
          ? `$${priceData.price.toFixed(2)}`
          : "";
      setConfirmedTotal(total);
      setStep(2);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setBookingError(
        err?.data?.message ||
          err?.message ||
          "Booking failed. Please check your details and try again."
      );
    }
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
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[800px] max-h-[95vh] overflow-y-auto p-5 sm:p-6 relative flex flex-col gap-4 border border-black/5">
        {/* Header */}
        <div className="flex items-center justify-between w-full border-b border-black/5 pb-3">
          <h2 className="font-semibold text-[20px] sm:text-[22px] text-[#0b1714] tracking-[-0.5px]">
            {step === 1 ? "Book a Cleaning" : "Booking Confirmed!"}
          </h2>
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

        {/* Step 1 — Booking Form */}
        {step === 1 && (
          <StepBookingForm
            formData={formData}
            priceData={priceData}
            priceLoading={priceLoading}
            priceError={priceError}
            bookingError={bookingError}
            isSubmitting={isBookingLoading}
            categoryOptions={categoryOptions}
            frequencyOptions={frequencyOptions}
            onBedroomChange={handleBedroomChange}
            onBathroomChange={handleBathroomChange}
            onChange={handleInputChange}
            onBack={handleResetAndClose}
            onNext={handleNextStep}
          />
        )}

        {/* Step 2 — Confirmation */}
        {step === 2 && (
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
