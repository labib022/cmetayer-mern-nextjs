import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/forgot-password/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password — Easy Lift and Clean",
  description: "Recover access to your Easy Lift & Clean account.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#e9e9e9] px-4 py-12">
      <ForgotPasswordForm />
    </main>
  );
}
