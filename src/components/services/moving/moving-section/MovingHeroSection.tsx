import Navbar from "@/components/layout/Navbar";

const DEFAULT_HEADING = "Moving & Packing Services";
const DEFAULT_DESCRIPTION =
  "Easygoing moving, whether it's around the block or across the country, with expert packing to help you out.";

interface HeroContent {
  heading?: string;
  description?: string;
}

async function getContent(): Promise<HeroContent | null> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    const res = await fetch(`${apiBase}/cms?page_name=moving&section_name=hero`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0]?.content ?? null;
  } catch {
    return null;
  }
}

export default async function MovingHeroSection() {
  const content = await getContent();
  const heading = content?.heading || DEFAULT_HEADING;
  const description = content?.description || DEFAULT_DESCRIPTION;

  return (
    <div className="p-2 mb-12 sm:mb-16">
      <div
        className="
          bg-[#08203c]
          rounded-[24px]
          overflow-hidden
          flex flex-col
          gap-12 sm:gap-16 lg:gap-20
          px-5 sm:px-10 lg:px-20
          pt-6 sm:pt-8 lg:pt-10
          pb-16 sm:pb-20 lg:pb-24
          relative
        "
      >
        <Navbar />

        <div className="flex flex-col items-center justify-center text-center gap-6 max-w-[860px] mx-auto z-10">
          <h1 className="font-medium text-[clamp(36px,5vw,56px)] leading-[1.15] text-white tracking-[-1.872px]">
            {heading}
          </h1>
          <p className="font-normal text-[clamp(16px,1.5vw,18px)] leading-[1.6] text-[#e8ede4] max-w-[640px] opacity-90">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}