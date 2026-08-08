"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="w-full p-2">
      {/* ── Dark Navy Outer Container ── */}
      <div
        className="
          bg-[#08203c] rounded-[24px] overflow-hidden
          flex flex-col gap-12 lg:gap-16
          pt-12 sm:pt-14 px-2 pb-2
        "
      >
        {/* ── Top Section: Newsletter + Nav Links ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 px-6 sm:px-12 w-full">
          {/* Left Column: Newsletter + Logo */}
          <div className="flex flex-col gap-6 max-w-[440px] w-full items-start">
            <div className="flex flex-col gap-3 w-full">
              {/* Row: "Stay Updated with" text + inline Logo right after it */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-bold text-[20px] sm:text-[22px] text-white tracking-[-0.78px] whitespace-nowrap">
                  Stay Updated with
                </span>
                <Link
                  href="/"
                  className="
                    relative inline-flex shrink-0
                    w-[133px] h-[55px] cursor-pointer
                    hover:opacity-80 transition-opacity duration-200 ease-in-out
                  "
                  style={{ width: "133px", height: "55px", aspectRatio: "133/55" }}
                >
                  <Image
                    src="/images/logo-elc.png"
                    alt="Easy Lift and Clean"
                    width={133}
                    height={55}
                    className="object-contain object-left w-full h-full"
                    priority
                  />
                </Link>
              </div>

              {/* Description text below */}
              <p className="font-bold text-[16px] text-[#e0e0e0] leading-[1.4]">
                Get cleaning tips, special offers, and updates delivered to your
                inbox.
              </p>
            </div>

            {/* Email Subscribe Input */}
            <form
              onSubmit={handleSubscribe}
              className="
                bg-white/16 backdrop-blur-md rounded-[32px]
                flex items-center justify-between pl-6 pr-1 py-1 w-full max-w-[360px]
                border border-white/10 focus-within:border-white/40 transition-colors
              "
            >
              <input
                type="email"
                placeholder={subscribed ? "Thanks for subscribing! ✓" : "Enter Your Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                required
                className="bg-transparent text-white placeholder:text-white/50 text-[16px] outline-none w-full pr-2"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="
                  bg-white text-[#08203c] p-3 rounded-full size-10
                  flex items-center justify-center shrink-0
                  hover:scale-[1.05] active:scale-[0.95]
                  transition-all duration-200 cursor-pointer
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
                    d="M3 8h10M9 4.5l3.5 3.5L9 11.5"
                    stroke="#08203c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Nav Links Columns */}
          <div className="flex gap-16 sm:gap-24 items-start">
            {/* Quick Links */}
            <div className="flex flex-col gap-4 text-white">
              <p className="font-bold text-[16px] tracking-[-0.16px]">
                Quick Links
              </p>
              <div className="flex flex-col gap-3 font-medium text-[16px] text-[#e0e0e0]">
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4 text-white">
              <p className="font-bold text-[16px] tracking-[-0.16px]">
                Legal
              </p>
              <div className="flex flex-col gap-3 font-medium text-[16px] text-[#e0e0e0]">
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Section: White Card with Location & Contact Details ── */}
        <div
          className="
            bg-white rounded-[20px] p-6 sm:p-10 lg:p-12
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full
          "
        >
          {/* Location */}
          <div className="flex flex-col gap-3 items-start">
            <p className="font-bold text-[16px] text-[#444]">Our Location</p>
            <p className="font-medium text-[18px] sm:text-[20px] leading-[1.4] text-[#111] tracking-[-0.78px]">
              120 King Street West, Suite 1400, Toronto, Ontario, Canada
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-3 items-start">
            <p className="font-bold text-[16px] text-[#444]">Email</p>
            <a
              href="mailto:hello@cleanzy.ca"
              className="font-medium text-[18px] sm:text-[20px] text-[#111] hover:text-[#08203c] tracking-[-0.78px] transition-colors"
            >
              hello@cleanzy.ca
            </a>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-3 items-start">
            <p className="font-bold text-[16px] text-[#444]">Phone</p>
            <a
              href="tel:+14165550198"
              className="font-medium text-[18px] sm:text-[20px] text-[#111] hover:text-[#08203c] tracking-[-0.78px] transition-colors"
            >
              +1 (416) 555-0198
            </a>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-3 items-start">
            <p className="font-bold text-[16px] text-[#444]">Social Media</p>
            <div className="flex flex-wrap gap-2 items-center">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  bg-[rgba(17,17,17,0.08)] px-4 py-1.5 rounded-[24px]
                  font-medium text-[16px] text-[#111] tracking-[-0.4px]
                  hover:bg-[#08203c] hover:text-white
                  hover:scale-[1.05] active:scale-[0.98]
                  transition-all duration-200
                "
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  bg-[rgba(17,17,17,0.08)] px-4 py-1.5 rounded-[24px]
                  font-medium text-[16px] text-[#111] tracking-[-0.4px]
                  hover:bg-[#08203c] hover:text-white
                  hover:scale-[1.05] active:scale-[0.98]
                  transition-all duration-200
                "
              >
                LinkedIn
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  bg-[rgba(17,17,17,0.08)] px-4 py-1.5 rounded-[24px]
                  font-medium text-[16px] text-[#111] tracking-[-0.4px]
                  hover:bg-[#08203c] hover:text-white
                  hover:scale-[1.05] active:scale-[0.98]
                  transition-all duration-200
                "
              >
                X
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
