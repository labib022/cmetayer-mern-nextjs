"use client";

import Image from "next/image";
import { useState } from "react";

/* ─── FAQ Data ────────────────────────────────────────────────────────────── */
const faqData = [
  {
    id: 1,
    question:
      "What makes Easy Lift & Clean different from other service companies?",
    answer:
      'We operate on a "One Call. One Company" philosophy. Instead of juggling multiple contractors for different needs, we provide a centralized platform where you can book moving, cleaning, laundry, and home repair services all under one trusted roof.',
  },
  {
    id: 2,
    question: "Are your service professionals vetted and insured?",
    answer:
      "Yes, every member of our team undergoes rigorous background checks, professional training, and is fully insured and bonded to give you complete peace of mind.",
  },
  {
    id: 3,
    question: "Are there any hidden fees?",
    answer:
      "Never. We pride ourselves on transparent, upfront pricing. The quote you receive before booking is the exact price you pay with no surprise add-ons.",
  },
  {
    id: 4,
    question: "Can I set up a recurring schedule for cleaning or laundry?",
    answer:
      "Absolutely! We offer flexible weekly, bi-weekly, and monthly recurring plans with automatic scheduling and discounted rates for loyal clients.",
  },
  {
    id: 5,
    question: "What kind of home repairs do you handle?",
    answer:
      "Our handyman team handles general home repairs including plumbing fixes, electrical fixtures, furniture assembly, drywall repair, painting, and door hardware installation.",
  },
];

export default function FAQSection() {
  const [activeId, setActiveId] = useState<number>(1);

  const activeFaq = faqData.find((item) => item.id === activeId) || faqData[0];

  return (
    <section className="bg-white w-full px-5 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-[96px] flex flex-col gap-12 lg:gap-16 items-start">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 w-full">
        {/* Left: label + title */}
        <div className="flex flex-col gap-4 items-start max-w-[480px]">
          {/* Label */}
          <div className="flex gap-1 items-center">
            <div className="relative size-[18px] shrink-0">
              <Image
                src="/icons/dot-label.svg"
                alt=""
                fill
                className="object-contain"
                sizes="18px"
                aria-hidden
              />
            </div>
            <span className="font-semibold text-[16px] leading-[1.4] text-[#08203c] whitespace-nowrap">
              FAQs
            </span>
          </div>

          {/* Title */}
          <h2 className="font-medium text-[clamp(32px,3vw,40px)] leading-[1.2] tracking-[-1.56px]">
            <span className="text-[#111]">Need </span>
            <span className="text-[#08203c]">Help Before Booking</span>
            <span className="text-[#111]">?</span>
          </h2>
        </div>

        {/* Right: Description */}
        <p className="font-normal text-[18px] leading-[1.4] text-[#656565] max-w-[480px]">
          Find helpful answers to common questions about scheduling, services,
          and our cleaning team.
        </p>
      </div>

      {/* ── Body: Questions List (Left) + Answer & Photos (Right) ── */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full">
        {/* ── Left Column: Questions List ── */}
        <div className="flex flex-col gap-2 w-full lg:w-[50%] shrink-0">
          {faqData.map((faq) => {
            const isActive = faq.id === activeId;
            return (
              <button
                key={faq.id}
                onClick={() => setActiveId(faq.id)}
                className={`
                  w-full text-left p-6 rounded-[24px] flex items-center justify-between gap-6
                  transition-all duration-200 ease-in-out cursor-pointer
                  ${
                    isActive
                      ? "bg-[rgba(8,32,60,0.04)] shadow-sm"
                      : "bg-white hover:bg-[rgba(8,32,60,0.02)]"
                  }
                `}
              >
                <span className="font-medium text-[20px] leading-[1.4] text-[#111] tracking-[-0.78px]">
                  {faq.question}
                </span>
                <div className="shrink-0 p-1">
                  {isActive ? (
                    /* Chevron Right for Active */
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="#08203c"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    /* Chevron Down for Inactive */
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="#656565"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Right Column: Active Answer Card + Image Row ── */}
        <div className="flex flex-col gap-3 w-full lg:flex-1">
          {/* Answer Card */}
          <div className="bg-[#fafafa] rounded-[24px] p-8 flex flex-col gap-6 items-start w-full shadow-sm">
            <div className="bg-[#eceef0] px-3 py-1 rounded-[24px]">
              <span className="font-medium text-[14px] text-[#111] tracking-[-0.14px]">
                Answer
              </span>
            </div>
            <p className="font-normal text-[16px] leading-[1.4] text-[#444] transition-opacity duration-200">
              {activeFaq.answer}
            </p>
          </div>

          {/* 3 Photos Grid */}
          <div className="bg-[#fafafa] rounded-[24px] p-2 flex gap-2 items-center w-full h-[220px]">
            <div className="relative flex-1 h-full rounded-[16px] overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/images/faq-handyman.png"
                alt="Handyman on roof with drill"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 33vw, 200px"
              />
            </div>
            <div className="relative flex-1 h-full rounded-[16px] overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/images/faq-movers.png"
                alt="Movers loading truck"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 33vw, 200px"
              />
            </div>
            <div className="relative flex-1 h-full rounded-[16px] overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="/images/faq-cleaner.png"
                alt="Cleaner vacuuming sofa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 33vw, 200px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
