import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "My Bookings — Easy Lift and Clean",
  description:
    "View and manage your service bookings with Easy Lift & Clean.",
};

export default function MyBookingsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Header with Navbar ── */}
      <div className="p-2 mb-12 sm:mb-16">
        <div
          className="
            bg-[#08203c]
            rounded-[24px]
            overflow-hidden
            flex flex-col
            px-5 sm:px-10 lg:px-20
            pt-6 sm:pt-8 lg:pt-10
            pb-16 sm:pb-20 lg:pb-24
            relative
          "
        >
          <Navbar />

          {/* Page heading */}
          <div className="flex flex-col items-center text-center mt-12 sm:mt-16 gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              My Bookings
            </h1>
            <p className="text-[#a8bfd8] text-base sm:text-lg max-w-md">
              All your scheduled services, in one place.
            </p>
          </div>
        </div>
      </div>

      {/* ── Empty State ── */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 gap-6">
        {/* Calendar icon */}
        <div className="size-20 rounded-full bg-[#f0f4f8] flex items-center justify-center shrink-0">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#08203c"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>

        <div className="flex flex-col gap-2 max-w-sm">
          <h2 className="text-xl font-semibold text-[#0b1714]">
            No bookings yet
          </h2>
          <p className="text-[#6b7280] text-base leading-relaxed">
            Your bookings will appear here soon. Once you schedule a service,
            you&apos;ll be able to track and manage everything from this page.
          </p>
        </div>

        <a
          href="/services/moving"
          className="inline-flex items-center gap-2 bg-[#08203c] text-white font-semibold text-sm px-6 py-3 rounded-[40px] hover:bg-[#0a2a4e] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out shadow-sm"
        >
          Browse Services
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4.5l3.5 3.5L9 11.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
