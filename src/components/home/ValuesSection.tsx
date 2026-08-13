import Image from "next/image";

/* ─── Fixed icon data (design-driven, not editable via CMS) ────────────────── */
const iconData = [
  {
    id: "attention-to-detail",
    icon1: "/icons/icon-detail-1.svg",
    icon2: "/icons/icon-detail-2.svg",
  },
  {
    id: "reliable-professionals",
    icon1: "/icons/icon-professionals-1.svg",
    icon2: "/icons/icon-professionals-2.svg",
  },
  {
    id: "safe-eco-friendly",
    icon1: "/icons/icon-eco-1.svg",
    icon2: "/icons/icon-eco-2.svg",
  },
  {
    id: "customer-first",
    icon1: "/icons/icon-customer-1.svg",
    icon2: "/icons/icon-customer-2.svg",
  },
];

const DEFAULT_LABEL = "Our Values";
const DEFAULT_HEADING_LINE1 = "Why Choose";
const DEFAULT_HEADING_LINE2 = "EASY LIFT & CLEAN";
const DEFAULT_DESCRIPTION =
  "Our values guide how we work, clean, and care for every home we serve.";
const DEFAULT_VALUES = [
  {
    title: "Attention to Detail",
    description: "We clean thoroughly, focusing on the small details that make a big difference.",
  },
  {
    title: "Reliable Professionals",
    description: "Our trained cleaners arrive on time and treat every home with care.",
  },
  {
    title: "Safe & Eco-Friendly",
    description: "We use safe cleaning products that are gentle on your family and the environment.",
  },
  {
    title: "Customer-First Service",
    description: "Your comfort and satisfaction are always our top priority.",
  },
];

interface ValueText {
  title: string;
  description: string;
}

interface ValuesContent {
  label?: string;
  heading_line1?: string;
  heading_line2?: string;
  description?: string;
  values?: ValueText[];
}

async function getValuesContent(): Promise<ValuesContent | null> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    const res = await fetch(`${apiBase}/cms?page_name=home&section_name=values`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0]?.content ?? null;
  } catch {
    return null;
  }
}

/* ─── Icon Box ─────────────────────────────────────────────────────────────── */
function ValueIcon({ icon1, icon2, title }: { icon1: string; icon2: string; title: string }) {
  return (
    <div className="bg-[#f3f6f6] border border-[#e1eae8] flex items-center p-4 rounded-[32px] shrink-0 hover:scale-[1.08] transition-transform duration-200 ease-in-out">
      <div className="relative size-7 overflow-hidden">
        <Image src={icon1} alt="" fill className="object-contain" aria-hidden sizes="28px" />
        <Image src={icon2} alt={title} fill className="object-contain" sizes="28px" />
      </div>
    </div>
  );
}

/* ─── Value Card ───────────────────────────────────────────────────────────── */
function ValueCard({ icon1, icon2, title, description }: { icon1: string; icon2: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-12 items-start min-w-0 flex-1">
      <ValueIcon icon1={icon1} icon2={icon2} title={title} />
      <div className="flex flex-col gap-2 items-start w-full">
        <h3 className="font-medium text-[24px] leading-[1.4] tracking-[-0.936px] text-[#111] w-full">
          {title}
        </h3>
        <p className="font-normal text-[16px] leading-[1.4] text-[#656565] w-full">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─── Dashed divider ───────────────────────────────────────────────────────── */
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
export default async function ValuesSection() {
  const content = await getValuesContent();

  const label = content?.label || DEFAULT_LABEL;
  const headingLine1 = content?.heading_line1 || DEFAULT_HEADING_LINE1;
  const headingLine2 = content?.heading_line2 || DEFAULT_HEADING_LINE2;
  const description = content?.description || DEFAULT_DESCRIPTION;
  const valueTexts = content?.values && content.values.length === 4 ? content.values : DEFAULT_VALUES;

  // icon data (fixed) + editable text merged by index
  const mergedValues = iconData.map((icon, i) => ({
    ...icon,
    title: valueTexts[i].title,
    description: valueTexts[i].description,
  }));

  const [topLeft, topRight, bottomLeft, bottomRight] = mergedValues;

  return (
    <section className="bg-white w-full px-5 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-[120px] flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
      {/* ── Left: heading block ── */}
      <div className="flex flex-col gap-6 items-start lg:w-[480px] shrink-0">
        <div className="flex gap-1 items-center">
          <div className="relative size-[18px] shrink-0">
            <Image src="/icons/dot-label.svg" alt="" fill className="object-contain" sizes="18px" aria-hidden />
          </div>
          <span className="font-semibold text-[16px] leading-[1.4] text-[#08203c] whitespace-nowrap">
            {label}
          </span>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h2 className="font-medium text-[clamp(32px,3vw,40px)] leading-[1.2] tracking-[-1.56px] whitespace-pre-wrap">
            <span className="text-[#0b1714]">{headingLine1}</span>
            <br />
            <span className="text-[#08203c]">{headingLine2}</span>
          </h2>
          <p className="font-normal text-[18px] leading-[1.4] text-[#656565]">{description}</p>
        </div>
      </div>

      {/* ── Right: 2×2 values grid ── */}
      <div className="flex flex-col gap-2 items-start flex-1 min-w-0 w-full">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-12 items-start w-full pb-10">
          <ValueCard {...topLeft} />
          <DashedDivider vertical />
          <ValueCard {...topRight} />
        </div>

        <DashedDivider />

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-12 items-start w-full pt-10">
          <ValueCard {...bottomLeft} />
          <DashedDivider vertical />
          <ValueCard {...bottomRight} />
        </div>
      </div>
    </section>
  );
}