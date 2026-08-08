"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* ─── Slide Data ──────────────────────────────────────────────────────────── */
const slides = [
  {
    id: "moving",
    title: "Moving",
    description:
      "Full-service moving, packing, and heavy lifting for homes and offices.",
    image: "/images/hero-moving.png",
    alt: "Professional movers loading boxes into a truck",
    icon: "/icons/icon-moving.svg",
  },
  {
    id: "home-repair",
    title: "Home Repair",
    description: "Plumbing, electrical, assembly, and general home repairs.",
    image: "/images/service-repair.png",
    alt: "Handyman assembling and repairing home fixtures",
    icon: "/icons/icon-repair.svg",
  },
  {
    id: "laundry",
    title: "Laundry",
    description: "Wash & fold delivery service right to your doorstep.",
    image: "/images/service-laundry.png",
    alt: "Fresh laundry and dry cleaning delivery",
    icon: "/icons/icon-laundry.svg",
  },
  {
    id: "cleaning",
    title: "Cleaning",
    description: "Deep cleans, move-in/out, and recurring maid services.",
    image: "/images/service-cleaning.png",
    alt: "Professional cleaner vacuuming home",
    icon: "/icons/icon-cleaning.svg",
  },
];

export default function HeroImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3500); // 3.5s cycle per slide

    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[activeIndex];

  return (
    <div className="relative rounded-[24px] overflow-hidden w-full lg:w-[50%] lg:max-w-[634px] aspect-[634/580] shrink-0 hover:scale-[1.02] transition-transform duration-300 ease-in-out group shadow-2xl">
      {/* ── Keyframes for clean single-node text fade (no text overlap/ghosting) ── */}
      <style>{`
        @keyframes slideContentFadeIn {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-card-content {
          animation: slideContentFadeIn 0.35s ease-out forwards;
        }
      `}</style>

      {/* ── Background photos crossfade ── */}
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={slide.id}
            className={`
              absolute inset-0 transition-opacity duration-700 ease-in-out
              ${isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"}
            `}
          >
            {/* Background photo */}
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Subtle gradient vignette for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        );
      })}

      {/* ── Single Frosted glass overlay card (prevents text overlap) ── */}
      <div className="absolute bottom-4 right-4 z-20 w-[min(280px,calc(100%-32px))] backdrop-blur-[12px] bg-white/90 rounded-[16px] p-5 lg:p-6 shadow-xl border border-white/40">
        <div key={activeIndex} className="flex flex-col gap-3 lg:gap-4 animate-card-content">
          <div className="flex gap-[18px] items-center">
            {/* Single crisp vector SVG icon */}
            <div className="relative size-8 shrink-0 text-[#08203c]">
              <Image
                src={currentSlide.icon}
                alt=""
                fill
                className="object-contain"
                aria-hidden
              />
            </div>
            <p className="font-medium text-[28px] lg:text-[32px] leading-[1.3] tracking-[-1.248px] text-[#111] whitespace-nowrap">
              {currentSlide.title}
            </p>
          </div>
          <p className="font-normal text-[13px] lg:text-[14px] leading-[1.4] text-[#444]">
            {currentSlide.description}
          </p>
        </div>
      </div>
    </div>
  );
}
