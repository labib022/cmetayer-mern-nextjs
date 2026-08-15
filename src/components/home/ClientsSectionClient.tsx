"use client";

import Image from "next/image";
import { useState } from "react";

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

interface ClientsSectionClientProps {
    label: string;
    headingPart1: string;
    headingPart2: string;
    description: string;
    cards: CardItem[];
}

export default function ClientsSectionClient({
    label,
    headingPart1,
    headingPart2,
    description,
    cards,
}: ClientsSectionClientProps) {
    const [isPaused, setIsPaused] = useState(false);

    const durationSeconds = cards.length * 3.5;
    const doubleCards = [...cards, ...cards];

    return (
        <section className="bg-white w-full py-16 sm:py-20 lg:py-[96px] flex flex-col gap-12 lg:gap-16 items-start overflow-hidden select-none">
            <style>{`
        @keyframes marqueeLeftToRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-ltr {
          animation: marqueeLeftToRight ${durationSeconds}s linear infinite;
        }
      `}</style>

            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 w-full px-5 sm:px-10 lg:px-20">
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
                        <span className="text-[#08203c]">{headingPart1}</span>
                        <span className="text-[#111]">{headingPart2}</span>
                    </h2>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-3 max-w-[384px]">
                    <p className="font-normal text-[18px] leading-[1.4] text-[#656565]">{description}</p>
                </div>
            </div>

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
                    style={{ animationPlayState: isPaused ? "paused" : "running" }}
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

                                <div className="flex flex-col gap-6 items-start w-full">
                                    <p className="font-medium text-[48px] leading-[1.1] text-[#08203c] group-hover:text-white tracking-[-0.96px] transition-colors duration-300">
                                        {card.statNumber}
                                    </p>

                                    <div
                                        className="w-full h-px transition-all duration-300 opacity-20 group-hover:opacity-40"
                                        style={{
                                            backgroundImage:
                                                "repeating-linear-gradient(to right, currentColor 0, currentColor 4px, transparent 4px, transparent 8px)",
                                        }}
                                    />

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