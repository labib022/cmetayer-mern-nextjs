"use client";

import Image from "next/image";
import { useState } from "react";

/* ─── Client Cards Data ────────────────────────────────────────────────────── */
type StatCard = {
  type: "stat";
  id: string;
  logo: string;
  clientName: string;
  statNumber: string;
  title: string;
  description: string;
};

type PhotoCard = {
  type: "photo";
  id: string;
  image: string;
  alt: string;
};

type CardItem = StatCard | PhotoCard;

const clientCards: CardItem[] = [
  {
    type: "stat",
    id: "serenity-hills",
    logo: "/icons/client-logo-2.svg",
    clientName: "Serenity Hills Residence",
    statNumber: "3+",
    title: "Years of Ongoing Service",
    description: "Weekly maintenance cleaning for a multi-story family home.",
  },
  {
    type: "photo",
    id: "client-photo-1",
    image: "/images/client-1.png",
    alt: "Client portrait in suit",
  },
  {
    type: "stat",
    id: "greenview-apt",
    logo: "/icons/client-logo-3.svg",
    clientName: "Greenview Apartment",
    statNumber: "85+",
    title: "Move-Out Cleans Completed",
    description: "Fast, detailed turnover cleaning for rental unit transitions.",
  },
  {
    type: "photo",
    id: "client-photo-2",
    image: "/images/client-2.png",
    alt: "Property owner portrait",
  },
  {
    type: "stat",
    id: "urbanstay",
    logo: "/icons/client-logo-1.svg",
    clientName: "UrbanStay Short-Term Rentals",
    statNumber: "200+",
    title: "Guest Turnovers Managed",
    description:
      "Reliable Airbnb cleaning ensuring consistent five-star readiness.",
  },
];

export default function ClientsSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Speed calculation: 3.5 seconds per card item * total card items count
  const durationSeconds = clientCards.length * 3.5; // 17.5s total loop time

  // Duplicate cards for seamless 360 infinite loop
  const doubleCards = [...clientCards, ...clientCards];

  return (
    <section className="bg-white w-full py-16 sm:py-20 lg:py-[96px] flex flex-col gap-12 lg:gap-16 items-start overflow-hidden select-none">
      {/* ── Keyframes inline for portable performance ── */}
      <style>{`
        @keyframes marqueeLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-ltr {
          animation: marqueeLeftToRight ${durationSeconds}s linear infinite;
        }
      `}</style>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 w-full px-5 sm:px-10 lg:px-20">
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
              Clients
            </span>
          </div>

          {/* Title */}
          <h2 className="font-medium text-[clamp(32px,3vw,40px)] leading-[1.2] tracking-[-1.56px]">
            <span className="text-[#08203c]">Trusted by </span>
            <span className="text-[#111]">Home and Property Owners</span>
          </h2>
        </div>

        {/* Right: Description & Press-and-Hold Indicator */}
        <div className="flex flex-col items-start sm:items-end gap-3 max-w-[384px]">
          <p className="font-normal text-[18px] leading-[1.4] text-[#656565]">
            From family homes to rentals, clients choose for reliable,
            professional cleaning.
          </p>

        </div>
      </div>

      {/* ── Infinite Auto-Scrolling Carousel Track (Press and Hold to Pause) ── */}
      <div
        onPointerDown={() => setIsPaused(true)}
        onPointerUp={() => setIsPaused(false)}
        onPointerLeave={() => setIsPaused(false)}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        title="Press and hold to pause scrolling"
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none py-6"
      >
        <div
          className="flex gap-6 w-max animate-marquee-ltr"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {doubleCards.map((card, idx) => {
            if (card.type === "photo") {
              return (
                <div
                  key={`${card.id}-${idx}`}
                  className="
                    shrink-0 w-[300px] sm:w-[340px] lg:w-[360px] h-[420px]
                    relative rounded-[16px] overflow-hidden shadow-sm
                    hover:scale-105 hover:rotate-3 hover:shadow-2xl
                    transition-all duration-300 ease-in-out group
                  "
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 300px, 360px"
                  />
                </div>
              );
            }

            /* Stat card with dynamic hover transition to dark navy + scale-105 + rotate-3 tilt */
            return (
              <div
                key={`${card.id}-${idx}`}
                className="
                  shrink-0 w-[300px] sm:w-[340px] lg:w-[360px] h-[420px]
                  bg-[rgba(8,32,60,0.08)] hover:bg-[#08203c]
                  rounded-[24px] p-6
                  flex flex-col justify-between items-start
                  hover:scale-105 hover:rotate-3 hover:shadow-2xl
                  transition-all duration-300 ease-in-out group
                "
              >
                {/* Header: Logo & Client Name */}
                <div className="flex flex-col gap-3 items-start w-full">
                  <div className="relative h-6 w-10">
                    <Image
                      src={card.logo}
                      alt={card.clientName}
                      fill
                      className="object-contain object-left transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                    />
                  </div>
                  <p className="font-medium text-[16px] leading-[24px] text-[#111] group-hover:text-white tracking-[-0.16px] transition-colors duration-300">
                    {card.clientName}
                  </p>
                </div>

                {/* Body: Stat & Info */}
                <div className="flex flex-col gap-6 items-start w-full">
                  {/* Big Stat Number */}
                  <p className="font-medium text-[48px] leading-[1.1] text-[#08203c] group-hover:text-white tracking-[-0.96px] transition-colors duration-300">
                    {card.statNumber}
                  </p>

                  {/* Dashed Line */}
                  <div
                    className="w-full h-px transition-all duration-300 opacity-20 group-hover:opacity-40"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, currentColor 0, currentColor 4px, transparent 4px, transparent 8px)",
                    }}
                  />

                  {/* Title & Description */}
                  <div className="flex flex-col gap-2 items-start w-full">
                    <h3 className="font-medium text-[24px] leading-[1.4] text-[#111] group-hover:text-white tracking-[-0.24px] transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="font-normal text-[16px] leading-[1.4] text-[#444] group-hover:text-[#e0e0e0] tracking-[-0.16px] transition-colors duration-300">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
