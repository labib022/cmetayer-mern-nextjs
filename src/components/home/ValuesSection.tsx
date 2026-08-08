import Image from "next/image";

/* ─── Data ────────────────────────────────────────────────────────────────── */
const values = [
  {
    id: "attention-to-detail",
    title: "Attention to Detail",
    description:
      "We clean thoroughly, focusing on the small details that make a big difference.",
    icon1: "/icons/icon-detail-1.svg",
    icon2: "/icons/icon-detail-2.svg",
    // Figma inset positions for the two SVG layers inside the 28×28 icon box
    inset1: "15.63%",
    inset2: "12.5%",
  },
  {
    id: "reliable-professionals",
    title: "Reliable Professionals",
    description:
      "Our trained cleaners arrive on time and treat every home with care.",
    icon1: "/icons/icon-professionals-1.svg",
    icon2: "/icons/icon-professionals-2.svg",
    inset1: "46.21% 12.5% 18.75% 12.5%",
    inset2: "9.38% 9.38% 15.63% 9.38%",
  },
  {
    id: "safe-eco-friendly",
    title: "Safe & Eco-Friendly",
    description:
      "We use safe cleaning products that are gentle on your family and the environment.",
    icon1: "/icons/icon-eco-1.svg",
    icon2: "/icons/icon-eco-2.svg",
    inset1: "9.38% 9.37% 18.75% 9.38%",
    inset2: "6.26% 6.26% 6.25% 6.26%",
  },
  {
    id: "customer-first",
    title: "Customer-First Service",
    description: "Your comfort and satisfaction are always our top priority.",
    icon1: "/icons/icon-customer-1.svg",
    icon2: "/icons/icon-customer-2.svg",
    inset1: "50% 12.5% 21.88% 12.5%",
    inset2: "9.36% 9.37% 3.12% 9.38%",
  },
];

/* ─── Icon Box ─────────────────────────────────────────────────────────────── */
function ValueIcon({
  icon1,
  icon2,
  title,
}: {
  icon1: string;
  icon2: string;
  title: string;
}) {
  return (
    <div className="bg-[#f3f6f6] border border-[#e1eae8] flex items-center p-4 rounded-[32px] shrink-0 hover:scale-[1.08] transition-transform duration-200 ease-in-out">
      {/* 28×28 icon container with two overlapping SVG layers */}
      <div className="relative size-7 overflow-hidden">
        <Image
          src={icon1}
          alt=""
          fill
          className="object-contain"
          aria-hidden
          sizes="28px"
        />
        <Image
          src={icon2}
          alt={title}
          fill
          className="object-contain"
          sizes="28px"
        />
      </div>
    </div>
  );
}

/* ─── Value Card ───────────────────────────────────────────────────────────── */
function ValueCard({ value }: { value: (typeof values)[0] }) {
  return (
    <div className="flex flex-col gap-12 items-start min-w-0 flex-1">
      <ValueIcon icon1={value.icon1} icon2={value.icon2} title={value.title} />
      <div className="flex flex-col gap-2 items-start w-full">
        <h3 className="font-medium text-[24px] leading-[1.4] tracking-[-0.936px] text-[#111] w-full">
          {value.title}
        </h3>
        <p className="font-normal text-[16px] leading-[1.4] text-[#656565] w-full">
          {value.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Dashed divider (matches Figma dashed SVG lines) ─────────────────────── */
function DashedDivider({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <div className="hidden lg:block self-stretch w-px shrink-0">
        <div
          className="h-full w-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, #e1eae8 0, #e1eae8 6px, transparent 6px, transparent 12px)",
          }}
        />
      </div>
    );
  }
  return (
    <div
      className="w-full h-px shrink-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, #e1eae8 0, #e1eae8 6px, transparent 6px, transparent 12px)",
      }}
    />
  );
}

/* ─── Section ──────────────────────────────────────────────────────────────── */
export default function ValuesSection() {
  const [topLeft, topRight, bottomLeft, bottomRight] = values;

  return (
    <section className="bg-white w-full px-5 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-[120px] flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
      {/* ── Left: heading block ── */}
      <div className="flex flex-col gap-6 items-start lg:w-[480px] shrink-0">
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
            Our Values
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-4 w-full">
          <h2 className="font-medium text-[clamp(32px,3vw,40px)] leading-[1.2] tracking-[-1.56px] whitespace-pre-wrap">
            <span className="text-[#111]">Why </span>
            <span className="text-[#0b1714]">Choose</span>
            <br />
            <span className="text-[#08203c]">EASY LIFT &amp; CLEAN</span>
          </h2>
          <p className="font-normal text-[18px] leading-[1.4] text-[#656565]">
            Our values guide how we work, clean, and care for every home we
            serve.
          </p>
        </div>
      </div>

      {/* ── Right: 2×2 values grid ── */}
      <div className="flex flex-col gap-2 items-start flex-1 min-w-0 w-full">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-12 items-start w-full pb-10">
          <ValueCard value={topLeft} />
          <DashedDivider vertical />
          <ValueCard value={topRight} />
        </div>

        {/* Horizontal divider */}
        <DashedDivider />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-12 items-start w-full pt-10">
          <ValueCard value={bottomLeft} />
          <DashedDivider vertical />
          <ValueCard value={bottomRight} />
        </div>
      </div>
    </section>
  );
}
