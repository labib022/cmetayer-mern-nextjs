import type { Metadata } from "next";
import RepairHeroSection from "@/components/services/repair/repair-section/RepairHeroSection";
import RepairDetailSection from "@/components/services/repair/repair-section/RepairDetailSection";
import RepairYouMayAlsoLikeSection from "@/components/services/repair/repair-section/RepairYouMayAlsoLikeSection";
import ClientsSection from "@/components/home/ClientsSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Home Repair Services — Easy Lift and Clean",
  description:
    "Plumbing, electrical, assembly, and general home repairs from vetted professionals at Easy Lift & Clean.",
};

export default function HomeRepairServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <RepairHeroSection />

      {/* Detail & Included Services Section */}
      <RepairDetailSection />

      {/* Suggested Services Section */}
      <RepairYouMayAlsoLikeSection />

      {/* Trusted Clients Section */}
      <ClientsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
