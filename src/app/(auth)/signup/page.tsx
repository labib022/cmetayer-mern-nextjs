import type { Metadata } from "next";
import SignUpForm from "@/components/auth/signup/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up — Easy Lift and Clean",
  description: "Sign up now for your account with Easy Lift & Clean.",
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#e9e9e9] px-4 py-12">
      <SignUpForm />
    </main>
  );
}
