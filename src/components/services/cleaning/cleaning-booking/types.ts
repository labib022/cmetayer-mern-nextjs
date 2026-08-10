export interface CleaningBookingForm {
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

export interface CleaningOrderSummary {
  subtotal: string;
  tax: string;
  total: string;
  discountAmount: string;
}
