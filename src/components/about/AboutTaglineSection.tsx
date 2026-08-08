"use client";

import Image from "next/image";

export default function AboutTaglineSection() {
  const handlePlayVideo = () => {
    console.log("play video");
  };

  return (
    <section className="w-full px-5 sm:px-10 lg:px-20 py-12 sm:py-16 flex flex-col gap-10">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 w-full">
        <h2 className="font-medium text-[clamp(32px,3.5vw,44px)] leading-[1.2] text-[#0b1714] tracking-[-1.56px] max-w-[480px]">
          Trust, quality, and an awesome home!
        </h2>
        <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#656565] max-w-[500px]">
          We are a dedicated home services company delivering quality solutions
          for your home, from plumbing to deep cleaning.
        </p>
      </div>

      {/* Main Container: Image Banner + Vertical Right-side Socials */}
      <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 w-full">
        {/* Main Video Thumbnail Image with Centered Play Button */}
        <div className="relative flex-1 w-full h-[380px] sm:h-[500px] lg:h-[600px] rounded-[24px] overflow-hidden shadow-xl group">
          <Image
            src="/images/about-tagline.png"
            alt="Home cleaning team video thumbnail"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 85vw"
            priority
          />
          {/* Subtle dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />

          {/* Centered Play Video Button */}
          <button
            type="button"
            onClick={handlePlayVideo}
            aria-label="Play Video"
            className="
              absolute inset-0 m-auto size-20 sm:size-24 rounded-full
              bg-white/40 backdrop-blur-md p-3 sm:p-4
              flex items-center justify-center
              hover:scale-110 active:scale-95 transition-all duration-300
              cursor-pointer shadow-2xl group/play z-10
            "
          >
            <div className="size-full bg-white rounded-full flex items-center justify-center shadow-lg group-hover/play:bg-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="ml-1 text-[#0b1714]"
              >
                <path d="M7 4v16l13-8L7 4z" fill="currentColor" />
              </svg>
            </div>
          </button>
        </div>

        {/* Right-Side Social Links Column (Positioned OUTSIDE the image matching Figma) */}
        <div className="flex lg:flex-col items-center justify-center gap-6 lg:gap-8 shrink-0 py-2">
          {/* Rotated "Follow Us" Label */}
          <span className="font-medium text-[16px] sm:text-[18px] text-[#656565] lg:rotate-90 lg:my-6 whitespace-nowrap tracking-[-0.5px]">
            Follow Us
          </span>

          {/* Vertical Stack of Social Icons */}
          <div className="flex lg:flex-col gap-3 sm:gap-4 items-center">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="
                size-10 sm:size-11 rounded-full bg-[#f4f5f6] text-[#0b1714]
                flex items-center justify-center
                hover:bg-[#08203c] hover:text-white hover:scale-110
                transition-all duration-300 cursor-pointer shadow-sm
              "
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="
                size-10 sm:size-11 rounded-full bg-[#f4f5f6] text-[#0b1714]
                flex items-center justify-center
                hover:bg-[#08203c] hover:text-white hover:scale-110
                transition-all duration-300 cursor-pointer shadow-sm
              "
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="
                size-10 sm:size-11 rounded-full bg-[#f4f5f6] text-[#0b1714]
                flex items-center justify-center
                hover:bg-[#08203c] hover:text-white hover:scale-110
                transition-all duration-300 cursor-pointer shadow-sm
              "
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="
                size-10 sm:size-11 rounded-full bg-[#f4f5f6] text-[#0b1714]
                flex items-center justify-center
                hover:bg-[#08203c] hover:text-white hover:scale-110
                transition-all duration-300 cursor-pointer shadow-sm
              "
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
