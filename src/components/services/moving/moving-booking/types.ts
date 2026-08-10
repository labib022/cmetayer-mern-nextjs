export interface MovingBookingForm {
  pickupAddress: string;
  dropoffAddress: string;
  moveDate: string;
  homeSize: string;
  heavyItems: string[];
  needsPacking: boolean | null;
  fullName: string;
  email: string;
  phone: string;
}

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
