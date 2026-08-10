"use client";

import Image from "next/image";
import { useState } from "react";
import RepairBookingModal from "../repair-booking/RepairBookingModal";

const includedServices = [
  "Plumbing repairs and installations",
  "Electrical services and upgrades",
  "Carpentry and woodworking",
  "Painting and drywall repair",
  "General home maintenance",
];

export default function RepairDetailSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full px-5 sm:px-10 lg:px-20 py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-[1280px] mx-auto">
        {/* Left Column: Description & Included Services Checklist */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-medium text-[28px] sm:text-[34px] leading-[1.2] text-[#08203c] tracking-[-0.96px]">
              Description
            </h2>
            <p className="font-normal text-[16px] sm:text-[18px] leading-[1.6] text-[#444]">
              Easy Lift &amp; Clean is your buddy for all things home! Whether
              you need a quick fix or a major overhaul, our fantastic team is
              here for you. We handle everything from plumbing and electrical
              work to carpentry and beyond. Trust us to keep your home looking
              great! Plus, we offer 24/7 support for any emergencies. Experience
              hassle-free home care with us today!
            </p>
          </div>

          {/* Included Services Checklist */}
          <div className="flex flex-col gap-5 pt-2">
            <h3 className="font-semibold text-[20px] text-[#08203c]">
              Included Services
            </h3>
            <ul className="flex flex-col gap-3.5">
              {includedServices.map((service) => (
                <li key={service} className="flex items-center gap-3">
                  <div className="size-6 rounded-full bg-[#08203c] text-white flex items-center justify-center shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M13.333 4L6 11.333 2.667 8"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-[16px] sm:text-[17px] text-[#111]">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Featured Image Card with Price Tag & Book Now Button */}
        <div className="relative w-full h-[400px] sm:h-[480px] rounded-[24px] overflow-hidden shadow-2xl group border border-black/5">
          <Image
            src="/images/service-repair.png"
            alt="Home Repair and Handyman Professionals"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Bottom Floating Price & Action Badge */}
          <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/90 rounded-[20px] p-4 sm:p-5 flex items-center justify-between border border-white/60 shadow-xl z-10">
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase text-[#656565] tracking-wider">
                Start From
              </span>
              <span className="font-bold text-[24px] sm:text-[28px] text-[#08203c]">
                $65<span className="text-sm font-normal text-[#656565]">/hr</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="
                bg-[#08203c] text-white font-semibold text-[15px] sm:text-[16px]
                flex items-center gap-2 px-6 py-3 rounded-[20px]
                hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out
                shadow-md cursor-pointer
              "
            >
              <span>Book Now</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4.5l3.5 3.5L9 11.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Home Repair Booking Modal */}
      <RepairBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
