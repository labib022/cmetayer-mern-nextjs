import HeroImageSlider from "./HeroImageSlider";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroContent {
  title_line1?: string;
  title_line2?: string;
  subtitle?: string;
  stats?: HeroStat[];
}

const DEFAULT_STATS: HeroStat[] = [
  { value: "100M", label: "Happy customers" },
  { value: "99%", label: "Client happiness" },
  { value: "100+", label: "Team members" },
];

const DEFAULT_TITLE_LINE1 = "One Call.";
const DEFAULT_TITLE_LINE2 = "One Company.";
const DEFAULT_SUBTITLE =
  "Book trusted moving, cleaning, repair, and laundry services instantly. We manage your home so you don't have to.";

async function getHeroContent(): Promise<HeroContent | null> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    const res = await fetch(`${apiBase}/cms?page_name=home&section_name=hero`, {
      next: { revalidate: 60 }, // ১ মিনিট cache — dashboard-এ সেভ করার পর ১ মিনিটের মধ্যে site-এ দেখা যাবে
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0]?.content ?? null;
  } catch {
    // CMS unreachable হলেও site যেন না ভাঙে — hardcoded default দিয়ে render হবে
    return null;
  }
}

export default async function HeroSection() {
  const content = await getHeroContent();

  const titleLine1 = content?.title_line1 || DEFAULT_TITLE_LINE1;
  const titleLine2 = content?.title_line2 || DEFAULT_TITLE_LINE2;
  const subtitle = content?.subtitle || DEFAULT_SUBTITLE;
  const stats =
    content?.stats && content.stats.length === 3 ? content.stats : DEFAULT_STATS;

  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center w-full">
      {/* ── Left: Headline + Stats ── */}
      <div className="flex flex-col justify-between flex-1 min-w-0 w-full lg:h-[580px] gap-12 lg:gap-0 pt-0 lg:pt-4">
        {/* Headline + Subtitle */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <h1 className="font-medium text-[clamp(36px,5.5vw,64px)] leading-[1.2] tracking-[-2.496px]">
            <span className="text-[#eceef0]">{titleLine1} </span>
            <span className="text-white">{titleLine2}</span>
          </h1>
          <p className="font-normal text-[clamp(16px,1.5vw,20px)] leading-[1.4] text-[#e8ede4] max-w-[540px]">
            {subtitle}
          </p>
        </div>

        {/* ── Stats row ── */}
        <div className="flex items-stretch text-[#fafafa] divide-x divide-white/20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 lg:gap-5 items-start px-5 py-4 lg:py-5 first:pl-0"
            >
              <p className="font-medium text-[clamp(28px,3.5vw,40px)] leading-[1.2] tracking-[-1.56px] whitespace-nowrap">
                {stat.value}
              </p>
              <p className="font-normal text-[clamp(14px,1.2vw,18px)] leading-[1.4] whitespace-nowrap text-[#e8ede4]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Auto-Cycling Image & Overlay Card Slider ── */}
      <HeroImageSlider />
    </section>
  );
}