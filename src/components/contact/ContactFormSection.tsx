"use client";

import Image from "next/image";
import { useState } from "react";

export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  message: string;
}

const serviceOptions = [
  "Moving Services",
  "Home Repair & Maintenance",
  "Laundry & Dry Cleaning",
  "Deep Home Cleaning",
];

export default function ContactFormSection() {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    phone: "",
    serviceNeeded: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
  };

  return (
    <section className="w-full px-5 sm:px-10 lg:px-20 py-12 sm:py-16 flex flex-col gap-12 lg:gap-16 items-center">
      {/* Header + Subtitle */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 w-full max-w-[1280px]">
        <div className="flex flex-col gap-4 items-start max-w-[500px]">
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
              Get in Touch
            </span>
          </div>

          <h2 className="font-medium text-[clamp(32px,3.5vw,44px)] leading-[1.2] text-[#08203c] tracking-[-1.56px]">
            Let&apos;s Discuss Your Home Management Needs
          </h2>
        </div>

        <p className="font-normal text-[16px] sm:text-[18px] leading-[1.5] text-[#656565] max-w-[540px]">
          We&apos;re here to help! Whether you have a question, need a quote, or
          want to schedule a service, just reach out to our friendly team.
        </p>
      </div>

      {/* Form Container with Accent Background Card */}
      <div className="relative w-full max-w-[680px]">
        {/* Accent rotated backdrop shadow card */}
        <div className="absolute inset-0 bg-[#eceef0] rounded-[24px] rotate-2 transform pointer-events-none" />

        {/* Main White Form Container */}
        <form
          onSubmit={handleSubmit}
          className="
            relative bg-white rounded-[24px] p-6 sm:p-10
            shadow-[0px_8px_24px_0px_rgba(3,62,72,0.08)]
            flex flex-col gap-6 w-full border border-black/5 z-10
          "
        >
          <p className="font-normal text-[16px] sm:text-[18px] leading-[1.4] text-[#444]">
            Tell us a bit about your home, and we&apos;ll guide you to the right
            cleaning solution.
          </p>

          <div className="flex flex-col gap-4 w-full">
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {/* Name */}
              <div className="bg-[#111111]/[0.02] border border-black/5 rounded-[12px] p-4 flex flex-col gap-1 focus-within:border-[#08203c]/40 transition-colors">
                <label className="font-semibold text-[14px] sm:text-[15px] text-[#444]">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="bg-transparent text-[15px] text-[#111] placeholder:text-[#999] outline-none w-full"
                />
              </div>

              {/* Email */}
              <div className="bg-[#111111]/[0.02] border border-black/5 rounded-[12px] p-4 flex flex-col gap-1 focus-within:border-[#08203c]/40 transition-colors">
                <label className="font-semibold text-[14px] sm:text-[15px] text-[#444]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="bg-transparent text-[15px] text-[#111] placeholder:text-[#999] outline-none w-full"
                />
              </div>
            </div>

            {/* Row 2: Phone + Service Needed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {/* Phone */}
              <div className="bg-[#111111]/[0.02] border border-black/5 rounded-[12px] p-4 flex flex-col gap-1 focus-within:border-[#08203c]/40 transition-colors">
                <label className="font-semibold text-[14px] sm:text-[15px] text-[#444]">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="bg-transparent text-[15px] text-[#111] placeholder:text-[#999] outline-none w-full"
                />
              </div>

              {/* Service Needed */}
              <div className="bg-[#111111]/[0.02] border border-black/5 rounded-[12px] p-4 flex flex-col gap-1 focus-within:border-[#08203c]/40 transition-colors">
                <label className="font-semibold text-[14px] sm:text-[15px] text-[#444]">
                  Service Needed
                </label>
                <select
                  name="serviceNeeded"
                  value={formData.serviceNeeded}
                  onChange={handleChange}
                  className="bg-transparent text-[15px] text-[#111] placeholder:text-[#999] outline-none w-full cursor-pointer"
                >
                  <option value="" disabled>
                    Select a Service
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Message */}
            <div className="bg-[#111111]/[0.02] border border-black/5 rounded-[12px] p-4 flex flex-col gap-1 focus-within:border-[#08203c]/40 transition-colors">
              <label className="font-semibold text-[14px] sm:text-[15px] text-[#444]">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell Us about Your Specific Requests"
                className="bg-transparent text-[15px] text-[#111] placeholder:text-[#999] outline-none w-full resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="
              self-start bg-[#08203c] text-white font-semibold text-[16px]
              flex items-center justify-between pl-6 pr-2 py-2.5 rounded-[24px]
              hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out
              cursor-pointer shadow-md mt-2
            "
          >
            <span className="mr-4 whitespace-nowrap">Get a Free Quote</span>
            <div className="bg-white flex items-center justify-center p-2 rounded-full size-[34px] shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4.5l3.5 3.5L9 11.5"
                  stroke="#08203c"
                  strokeWidth="2"
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
