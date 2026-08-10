export interface CleaningBookingForm {
  // Contact info (required by bookCleaning endpoint)
  name: string;
  email: string;
  phone: string;
  // Service config
  bedrooms: number;
  bathrooms: number;
  serviceCategory: string;
  dateTime: string;
  frequency: string;
}

export interface CleaningBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mirrors the real /cleaning/price API response shape
export interface CleaningOrderSummary {
  subtotal: number;
  tax: number;
  total: number;
  discount_amount: number;
}
