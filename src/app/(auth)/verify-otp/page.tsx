import type { Metadata } from "next";
import { Suspense } from "react";
import VerifyOtpForm from "@/components/auth/verify-otp/VerifyOtpForm";

export const metadata: Metadata = {
  title: "Verify OTP — Easy Lift and Clean",
  description: "Verify your one-time code to recover your account.",
};

export default function VerifyOtpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#e9e9e9] px-4 py-12">
      <Suspense fallback={<div className="text-gray-500 text-sm">Loading verification...</div>}>
        <VerifyOtpForm />
      </Suspense>
    </main>
  );
}
