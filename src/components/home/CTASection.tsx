"use client";

import Image from "next/image";
import { useState } from "react";

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-white w-full px-5 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-[96px] flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
      {/* ── Left Column: Header + Info ── */}
      <div className="flex flex-col gap-6 items-start flex-1 min-w-0">
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
            Get a Quote
          </span>
        </div>

        {/* Title */}
        <h2 className="font-medium text-[clamp(28px,2.8vw,32px)] leading-[1.3] tracking-[-1.248px] max-w-[486px]">
          <span className="text-[#111]">Looking for </span>
          <span className="text-[#08203c]">
            Professional Home Management Services
          </span>
          <span className="text-[#111]">?</span>
        </h2>

        {/* Subtitle */}
        <p className="font-normal text-[18px] leading-[1.4] text-[#656565] max-w-[480px]">
          Request a free quote today and let our team create a cleaning plan
          tailored to your home or property needs.
        </p>
      </div>

      {/* ── Right Column: Form with Layered Background ── */}
      <div className="relative w-full lg:w-[640px] shrink-0">
        {/* Decorative tilted background card */}
        <div
          className="
            absolute inset-0 bg-[#eceef0] rounded-[24px]
            rotate-2 scale-[1.01] transform-gpu pointer-events-none hidden sm:block
          "
        />

        {/* Main White Form Container */}
        <form
          onSubmit={handleSubmit}
          className="
            relative z-10 bg-white rounded-[24px] p-6 sm:p-8
            flex flex-col gap-6 items-start w-full
            shadow-[0px_8px_24px_rgba(3,62,72,0.08)] border border-[#eceef0]/60
          "
        >
          {/* Subheading */}
          <p className="font-normal text-[18px] leading-[1.4] text-[#444]">
            Tell us a bit about your home, and we’ll guide you to the right
            cleaning solution.
          </p>

          {/* Input Fields Grid */}
          <div className="flex flex-col gap-3 w-full">
            {/* Row 1: Name & Email */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Name */}
              <div className="flex-1 bg-[rgba(17,17,17,0.02)] p-4 rounded-[8px] flex flex-col gap-1 border border-transparent focus-within:border-[#08203c]/20 focus-within:bg-white transition-colors">
                <label className="font-semibold text-[14px] text-[#444]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-transparent text-[14px] text-[#111] placeholder:text-[#999] outline-none font-normal"
                />
              </div>

              {/* Email */}
              <div className="flex-1 bg-[rgba(17,17,17,0.02)] p-4 rounded-[8px] flex flex-col gap-1 border border-transparent focus-within:border-[#08203c]/20 focus-within:bg-white transition-colors">
                <label className="font-semibold text-[14px] text-[#444]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-transparent text-[14px] text-[#111] placeholder:text-[#999] outline-none font-normal"
                />
              </div>
            </div>

            {/* Row 2: Phone & Service Needed */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Phone */}
              <div className="flex-1 bg-[rgba(17,17,17,0.02)] p-4 rounded-[8px] flex flex-col gap-1 border border-transparent focus-within:border-[#08203c]/20 focus-within:bg-white transition-colors">
                <label className="font-semibold text-[14px] text-[#444]">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-transparent text-[14px] text-[#111] placeholder:text-[#999] outline-none font-normal"
                />
              </div>

              {/* Service Needed */}
              <div className="flex-1 bg-[rgba(17,17,17,0.02)] p-4 rounded-[8px] flex flex-col gap-1 border border-transparent focus-within:border-[#08203c]/20 focus-within:bg-white transition-colors relative">
                <label className="font-semibold text-[14px] text-[#444]">
                  Service Needed
                </label>
                <select
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="bg-transparent text-[14px] text-[#111] placeholder:text-[#999] outline-none font-normal appearance-none cursor-pointer pr-6"
                >
                  <option value="" disabled>
                    Select a Service
                  </option>
                  <option value="moving">Moving & Packing</option>
                  <option value="cleaning">Home Cleaning</option>
                  <option value="handyman">Handyman & Repair</option>
                  <option value="laundry">Laundry & Dry Cleaning</option>
                </select>
                {/* Arrow down icon */}
                <div className="absolute right-4 bottom-4 pointer-events-none">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="#999"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Row 3: Message Textarea */}
            <div className="bg-[rgba(17,17,17,0.02)] p-4 rounded-[8px] flex flex-col gap-1 border border-transparent focus-within:border-[#08203c]/20 focus-within:bg-white transition-colors">
              <label className="font-semibold text-[14px] text-[#444]">
                Message
              </label>
              <textarea
                rows={3}
                placeholder="Tell Us about Your Specific Requests"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="bg-transparent text-[14px] text-[#111] placeholder:text-[#999] outline-none font-normal resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="
              bg-[#08203c] text-white font-semibold text-[16px]
              flex items-center gap-3 pl-6 pr-2 py-2 rounded-[24px]
              hover:scale-[1.03] active:scale-[0.98]
              transition-all duration-200 ease-in-out cursor-pointer
            "
          >
            <span>
              {submitted ? "Quote Request Sent! ✓" : "Get a Free Quote"}
            </span>
            <div className="bg-white flex items-center justify-center p-2 rounded-full size-[34px] shrink-0">
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
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </form>
      </div>
    </section>
  );
}
