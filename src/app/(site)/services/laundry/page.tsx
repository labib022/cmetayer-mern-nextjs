import type { Metadata } from "next";
import LaundryHeroSection from "@/components/services/laundry/laundry-section/LaundryHeroSection";
import LaundryDetailSection from "@/components/services/laundry/laundry-section/LaundryDetailSection";
import LaundryYouMayAlsoLikeSection from "@/components/services/laundry/laundry-section/LaundryYouMayAlsoLikeSection";
import ClientsSection from "@/components/home/ClientsSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Laundry & Dry Cleaning Services — Easy Lift and Clean",
  description:
    "Wash & fold, ironing, and eco-friendly dry cleaning delivered right to your doorstep by Easy Lift & Clean.",
};

export default function LaundryServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <LaundryHeroSection />

      {/* Detail & Included Services Section */}
      <LaundryDetailSection />

      {/* Suggested Services Section */}
      <LaundryYouMayAlsoLikeSection />

      {/* Trusted Clients Section */}
      <ClientsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
