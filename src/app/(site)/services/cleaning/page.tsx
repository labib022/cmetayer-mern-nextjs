import type { Metadata } from "next";
import CleaningHeroSection from "@/components/services/cleaning/cleaning-section/CleaningHeroSection";
import CleaningDetailSection from "@/components/services/cleaning/cleaning-section/CleaningDetailSection";
import CleaningYouMayAlsoLikeSection from "@/components/services/cleaning/cleaning-section/CleaningYouMayAlsoLikeSection";
import ClientsSection from "@/components/home/ClientsSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Home Cleaning Services — Easy Lift and Clean",
  description:
    "Deep cleans, move-in/out, and recurring maid services tailored to your space by Easy Lift & Clean.",
};

export default function CleaningServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <CleaningHeroSection />

      {/* Detail & Included Services Section */}
      <CleaningDetailSection />

      {/* Suggested Services Section */}
      <CleaningYouMayAlsoLikeSection />

      {/* Trusted Clients Section */}
      <ClientsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
