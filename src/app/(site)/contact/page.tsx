import type { Metadata } from "next";
import ContactHeroSection from "@/components/contact/ContactHeroSection";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactInfoMapSection from "@/components/contact/ContactInfoMapSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact Us — Easy Lift and Clean",
  description:
    "Get in touch with Easy Lift & Clean for instant quotes, service inquiries, and dedicated home management solutions.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <ContactHeroSection />

      {/* Form Section */}
      <ContactFormSection />

      {/* Contact Info Cards & Map Banner */}
      <ContactInfoMapSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
