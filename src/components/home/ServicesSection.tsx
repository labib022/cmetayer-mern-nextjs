"use client";

import Image from "next/image";
import { useRef } from "react";

/* ─── Data ────────────────────────────────────────────────────────────────── */
const services = [
  {
    id: "moving-packing",
    title: "Moving & Packing",
    description:
      "Stress-free local and long-distance moving with professional packing.",
    image: "/images/service-moving.png",
    icon: "/icons/icon-moving.svg",
  },
  {
    id: "home-cleaning",
    title: "Home Cleaning",
    description: "Deep cleans, move-in/out, and recurring maid services.",
    image: "/images/service-cleaning.png",
    icon: "/icons/icon-cleaning.svg",
  },
  {
    id: "handyman-repair",
    title: "Handyman & Repair",
    description: "Plumbing, electrical, assembly, and general home repairs.",
    image: "/images/service-repair.png",
    icon: "/icons/icon-repair.svg",
  },
  {
    id: "laundry-dry-cleaning",
    title: "Laundry & Dry Cleaning",
    description: "Wash & fold delivery service right to your doorstep.",
    image: "/images/service-laundry.png",
    icon: "/icons/icon-laundry.svg",
  },
];

/* ─── Service Card ─────────────────────────────────────────────────────────── */
function ServiceCard({
  service,
}: {
  service: (typeof services)[0];
}) {
  return (
    <div
      className="
        relative flex flex-col justify-end
        min-w-[280px] sm:min-w-[320px] lg:min-w-0 lg:flex-1
        h-[450px] rounded-[16px] overflow-hidden p-3 shrink-0
        hover:scale-[1.02] transition-transform duration-300 ease-in-out
        cursor-pointer group
      "
    >
      {/* Background photo */}
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 25vw"
      />

      {/* Gradient fade at the bottom for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,32,60,0.75)] via-[rgba(8,32,60,0.2)] to-transparent pointer-events-none" />

      {/* Frosted glass description overlay */}
      <div
        className="
          relative z-10
          backdrop-blur-[12px] bg-[rgba(8,32,60,0.4)]
          flex flex-col gap-2 items-start leading-[1.4]
          p-4 rounded-[8px] w-full
        "
      >
        {/* Title row with exact matching SVG icon */}
        <div className="flex gap-3 items-center w-full">
          <div className="relative size-7 shrink-0">
            <Image
              src={service.icon}
              alt=""
              fill
              className="object-contain brightness-0 invert"
              aria-hidden
            />
          </div>
          <h3 className="font-medium text-[22px] sm:text-[24px] text-white tracking-[-0.936px]">
            {service.title}
          </h3>
        </div>

        <p className="font-normal text-[16px] text-[#eceef0] w-full">
          {service.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────────────────────── */
export default function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 24
      : 320;
    scrollRef.current.scrollBy({
      left: dir === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white w-full px-5 sm:px-10 lg:px-20 pb-16 sm:pb-20 lg:pb-[112px] flex flex-col gap-12 lg:gap-20 items-start">
      {/* ── Header row ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 w-full">
        {/* Left: label + title */}
        <div className="flex flex-col gap-4 shrink-0">
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
              Our Services
            </span>
          </div>

          {/* Title */}
          <h2 className="font-semibold text-[clamp(24px,2.5vw,32px)] leading-[1.3] tracking-[-1.248px] text-[#0b1714] max-w-[471px]">
            Comprehensive Home Services You Can Count On
          </h2>
        </div>

        {/* Right: description + navigation arrows */}
        <div className="flex flex-col gap-6 items-start sm:items-end shrink-0">
          <p className="font-normal text-[18px] leading-[1.4] text-[#656565] opacity-80 sm:max-w-[530px] sm:text-right">
            Choose a service from the list below to get an instant quote or
            make a reservation immediately!
          </p>

          {/* Prev / Next arrows */}
          <div className="flex gap-[14px] items-center">
            {/* Previous — light grey */}
            <button
              id="services-prev-btn"
              onClick={() => scroll("prev")}
              aria-label="Previous service"
              className="
                flex items-center justify-center size-10 rounded-full
                bg-[#e9e9e9] hover:bg-[#d8d8d8]
                hover:scale-[1.03] active:scale-[0.98]
                transition-all duration-200 ease-in-out
              "
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M10 3L5 8l5 5"
                  stroke="#0b1714"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Next — dark navy */}
            <button
              id="services-next-btn"
              onClick={() => scroll("next")}
              aria-label="Next service"
              className="
                flex items-center justify-center size-10 rounded-full
                bg-[#08203c] hover:bg-[#0a2a4e]
                hover:scale-[1.03] active:scale-[0.98]
                transition-all duration-200 ease-in-out
              "
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 3l5 5-5 5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Cards row (scrollable on mobile, full row on desktop) ── */}
      <div
        ref={scrollRef}
        className="
          flex gap-6 w-full overflow-x-auto
          scroll-smooth snap-x snap-mandatory
          pb-2 -mb-2
          scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        "
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="snap-start lg:flex-1 lg:min-w-0 shrink-0"
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}
