import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import ValuesSection from "@/components/home/ValuesSection";
import ClientsSection from "@/components/home/ClientsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Easy Lift and Clean — Home Services Made Easy",
  description:
    "Book trusted moving, cleaning, repair, and laundry services instantly. We manage your home so you don't have to.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero — dark navy framed card, matches Figma 8px outer gap */}
      <div className="p-2 mb-16 sm:mb-24">
        <div
          className="
            bg-[#08203c]
            rounded-[24px]
            overflow-hidden
            flex flex-col
            gap-10 lg:gap-20
            px-5 sm:px-10 lg:px-20
            pt-6 sm:pt-8 lg:pt-10
            pb-10 sm:pb-16 lg:pb-20
          "
        >
          <Navbar />
          <HeroSection />
        </div>
      </div>

      {/* Values grid — "Why Choose Easy Lift & Clean" — Figma node 5038-7866 */}
      <ValuesSection />

      {/* Services photo cards carousel — Figma node 4511-7918 */}
      <ServicesSection />

      {/* Clients section — "Trusted by Home and Property Owners" — Figma node 4511-7938 */}
      <ClientsSection />

      {/* FAQ section — "Need Help Before Booking?" — Figma node 4511-7968 */}
      <FAQSection />

      {/* CTA Quote section — "Looking for Professional Home Management Services?" — Figma node 4511-7990 */}
      <CTASection />

      {/* Footer section — Figma node 4511-8021 */}
      <Footer />
    </div>
  );
}
