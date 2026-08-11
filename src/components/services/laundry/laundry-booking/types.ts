export interface LaundryBookingForm {
  // Step 1 — Laundry Details
  bagSize: string;
  washingItems: string[]; // multi-select — labels matching WASHING_ITEMS_MAP keys
  detergentPreference: string;
  dateTime: string;
  // Step 2 — Contact Info
  fullName: string;
  email: string;
  phone: string;
}

export interface LaundryBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
