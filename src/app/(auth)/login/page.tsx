import type { Metadata } from "next";
import LoginForm from "@/components/auth/login/LoginForm";

export const metadata: Metadata = {
  title: "Login — Easy Lift and Clean",
  description: "Sign in to your Easy Lift & Clean account.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#e9e9e9] px-4 py-12">
      <LoginForm />
    </main>
  );
}
