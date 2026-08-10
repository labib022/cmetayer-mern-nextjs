import type { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/reset-password/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password — Easy Lift and Clean",
  description: "Set a new password for your Easy Lift & Clean account.",
};

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#e9e9e9] px-4 py-12">
      <Suspense fallback={<div className="text-gray-500 text-sm">Loading reset form...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
