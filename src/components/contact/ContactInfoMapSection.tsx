import Image from "next/image";

type ContactItem = {
  id: string;
  title: string;
  detail: string;
  renderIcon: () => React.ReactNode;
};

const contactDetails: ContactItem[] = [
  {
    id: "phone",
    title: "Phone Number",
    detail: "+1 (416) 555-0198",
    renderIcon: () => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: "email",
    title: "Email",
    detail: "hello@cleanzyservices.ca",
    renderIcon: () => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: "address",
    title: "Address",
    detail: "120 King Street West, Suite 1400, Toronto, ON",
    renderIcon: () => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "hours",
    title: "Opening Hours",
    detail: "Monday – Friday: 8am – 8pm",
    renderIcon: () => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function ContactInfoMapSection() {
  return (
    <section className="w-full px-5 sm:px-10 lg:px-20 py-16 sm:py-20 flex flex-col gap-12 lg:gap-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 w-full">
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
            <span className="font-semibold text-[16px] leading-[1.4] text-[#033e48] whitespace-nowrap">
              Contact Info
            </span>
          </div>

          <h2 className="font-medium text-[clamp(32px,3vw,40px)] leading-[1.2] tracking-[-0.76px]">
            <span className="text-[#033e48]">Connect </span>
            <span className="text-[#111]">with Our Team</span>
          </h2>
        </div>

        <p className="font-normal text-[16px] sm:text-[18px] leading-[1.4] text-[#444] max-w-[480px]">
          Reach out to EASY LIFT AND CLEAN through our official contact details
          for quick assistance.
        </p>
      </div>

      {/* 4 Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {contactDetails.map((item) => (
          <div
            key={item.id}
            className="
              bg-[#fafafa] rounded-[20px] p-6 sm:p-8
              flex flex-col gap-5 items-start justify-center
              hover:scale-105 hover:bg-white hover:shadow-xl
              transition-all duration-300 ease-in-out
              cursor-pointer border border-black/5
            "
          >
            {/* Dark Navy Circle Icon Container matching Figma */}
            <div className="size-12 rounded-full bg-[#08203c] text-white flex items-center justify-center shrink-0 shadow-md">
              {item.renderIcon()}
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <h3 className="font-medium text-[22px] sm:text-[24px] leading-[1.3] text-[#0b1714] tracking-[-0.936px]">
                {item.title}
              </h3>
              <p className="font-normal text-[15px] sm:text-[16px] leading-[1.4] text-[#656565] break-words">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Map Location Banner */}
      <div className="relative w-full h-[360px] sm:h-[480px] rounded-[24px] overflow-hidden shadow-xl group flex items-center justify-center">
        <Image
          src="/images/contact-map.png"
          alt="Map Location"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Floating Open Map Location Button */}
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative bg-[#08203c] text-white font-semibold text-[16px]
            flex items-center justify-between pl-6 pr-2 py-2.5 rounded-[24px]
            hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out
            cursor-pointer shadow-2xl z-10 border border-white/20
          "
        >
          <span className="mr-4 whitespace-nowrap">Open Map Location</span>
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
        </a>
      </div>
    </section>
  );
}
