export interface RepairBookingForm {
  fullName: string;
  email: string;
  phone: string;
  serviceCategory: string;
  issueDescription: string;
  photo: File | null;
}

export interface RepairBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
