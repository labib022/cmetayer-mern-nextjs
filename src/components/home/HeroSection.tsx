import HeroImageSlider from "./HeroImageSlider";

const stats = [
  { value: "100M", label: "Happy customers" },
  { value: "99%", label: "Client happiness" },
  { value: "100+", label: "Team members" },
];

export default function HeroSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center w-full">
      {/* ── Left: Headline + Stats ── */}
      <div className="flex flex-col justify-between flex-1 min-w-0 w-full lg:h-[580px] gap-12 lg:gap-0 pt-0 lg:pt-4">
        {/* Headline + Subtitle */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <h1 className="font-medium text-[clamp(36px,5.5vw,64px)] leading-[1.2] tracking-[-2.496px]">
            <span className="text-[#eceef0]">One Call. </span>
            <span className="text-white">One Company.</span>
          </h1>
          <p className="font-normal text-[clamp(16px,1.5vw,20px)] leading-[1.4] text-[#e8ede4] max-w-[540px]">
            Book trusted moving, cleaning, repair, and laundry services
            instantly. We manage your home so you don&apos;t have to.
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

