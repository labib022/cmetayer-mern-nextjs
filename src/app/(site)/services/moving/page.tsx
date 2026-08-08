import type { Metadata } from "next";
import MovingHeroSection from "@/components/services/moving/MovingHeroSection";
import MovingDetailSection from "@/components/services/moving/MovingDetailSection";
import YouMayAlsoLikeSection from "@/components/services/moving/YouMayAlsoLikeSection";
import ClientsSection from "@/components/home/ClientsSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Moving & Packing Services — Easy Lift and Clean",
  description:
    "Seamless local and national relocation with expert packing, loading, secure transport, and setup by Easy Lift & Clean.",
};

export default function MovingServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <MovingHeroSection />

      {/* Detail & Included Services Section */}
      <MovingDetailSection />

      {/* Suggested Services Section */}
      <YouMayAlsoLikeSection />

      {/* Trusted Clients Section */}
      <ClientsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
