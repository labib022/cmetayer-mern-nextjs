export interface LaundryBookingForm {
  bagSize: string;
  washType: string;
  detergentPreference: string;
  dateTime: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface LaundryBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface LaundryOrderSummary {
  washAndFoldBase: string;
  serviceFee: string;
  tax: string;
  total: string;
}
