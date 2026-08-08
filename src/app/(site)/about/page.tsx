import type { Metadata } from "next";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutFoundationSection from "@/components/about/AboutFoundationSection";
import AboutTaglineSection from "@/components/about/AboutTaglineSection";
import AboutTeamSection from "@/components/about/AboutTeamSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Us — Easy Lift and Clean",
  description:
    "Learn about Easy Lift & Clean, our foundation, values, and the dedicated team providing trusted home moving, cleaning, repair, and laundry services.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section with Navbar */}
      <AboutHeroSection />

      {/* Our Foundation / Vision & Mission */}
      <AboutFoundationSection />

      {/* Tagline & photo banner */}
      <AboutTaglineSection />

      {/* Team section */}
      <AboutTeamSection />

      {/* FAQ section */}
      <FAQSection />

      {/* Footer section */}
      <Footer />
    </div>
  );
}
