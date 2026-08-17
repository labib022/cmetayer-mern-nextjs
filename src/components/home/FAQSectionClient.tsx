"use client";

import Image from "next/image";
import { useState } from "react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionClientProps {
  label: string;
  headingPart1: string;
  headingPart2: string;
  headingPart3: string;
  description: string;
  faqs: FaqItem[];
  photos: string[];
}

export default function FAQSectionClient({
  label,
  headingPart1,
  headingPart2,
  headingPart3,
  description,
  faqs,
  photos,
}: FAQSectionClientProps) {
  const [activeId, setActiveId] = useState<string>(faqs[0]?.id || "");

  const activeFaq = faqs.find((item) => item.id === activeId) || faqs[0];

  if (!activeFaq) {
    return null; 
  }

  return (
    <section className="bg-white w-full px-5 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-[96px] flex flex-col gap-12 lg:gap-16 items-start">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 w-full">
        <div className="flex flex-col gap-4 items-start max-w-[480px]">
          <div className="flex gap-1 items-center">
            <div className="relative size-[18px] shrink-0">
              <Image src="/icons/dot-label.svg" alt="" fill className="object-contain" sizes="18px" aria-hidden />
            </div>
            <span className="font-semibold text-[16px] leading-[1.4] text-[#08203c] whitespace-nowrap">
              {label}
            </span>
          </div>

          <h2 className="font-medium text-[clamp(32px,3vw,40px)] leading-[1.2] tracking-[-1.56px]">
            <span className="text-[#111]">{headingPart1}</span>
            <span className="text-[#08203c]">{headingPart2}</span>
            <span className="text-[#111]">{headingPart3}</span>
          </h2>
        </div>

        <p className="font-normal text-[18px] leading-[1.4] text-[#656565] max-w-[480px]">{description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start w-full">
        <div className="flex flex-col gap-2 w-full lg:w-[50%] shrink-0">
          {faqs.map((faq) => {
            const isActive = faq.id === activeId;
            return (
              <button
                key={faq.id}
                onClick={() => setActiveId(faq.id)}
                className={`
                  w-full text-left p-6 rounded-[24px] flex items-center justify-between gap-6
                  transition-all duration-200 ease-in-out cursor-pointer
                  ${isActive ? "bg-[rgba(8,32,60,0.04)] shadow-sm" : "bg-white hover:bg-[rgba(8,32,60,0.02)]"}
                `}
              >
                <span className="font-medium text-[20px] leading-[1.4] text-[#111] tracking-[-0.78px]">
                  {faq.question}
                </span>
                <div className="shrink-0 p-1">
                  {isActive ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="#08203c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="#656565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 w-full lg:flex-1">
          <div className="bg-[#fafafa] rounded-[24px] p-8 flex flex-col gap-6 items-start w-full shadow-sm">
            <div className="bg-[#eceef0] px-3 py-1 rounded-[24px]">
              <span className="font-medium text-[14px] text-[#111] tracking-[-0.14px]">Answer</span>
            </div>
            <p className="font-normal text-[16px] leading-[1.4] text-[#444] transition-opacity duration-200">
              {activeFaq.answer}
            </p>
          </div>

          <div className="bg-[#fafafa] rounded-[24px] p-2 flex gap-2 items-center w-full h-[220px]">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="relative flex-1 h-full rounded-[16px] overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              >
                <Image src={photo} alt="" fill className="object-cover" sizes="(max-width: 1024px) 33vw, 200px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}