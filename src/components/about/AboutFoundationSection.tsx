import Image from "next/image";
import { getAssetUrl } from "@/lib/getAssetUrl";

const DEFAULTS = {
  card_title: "Our Foundation",
  card_description: "A mission-driven cleaning company focused on trust, reliability, and care for every home we serve.",
  based_in: "Canada & USA",
  founded: "2017",
  working_hours: "Monday – Saturday, 08.00 AM – 06.00 PM",
  center_image: "",
  vision_title: "Our Vision",
  vision_description: "To redefine home care through exceptional service, innovative technology, and genuine care.",
  mission_title: "Our Mission",
  mission_description: "To deliver consistent, high-quality cleaning and home services that improve our clients' daily lives while upholding environmental responsibility.",
};

interface FoundationContent {
  card_title?: string;
  card_description?: string;
  based_in?: string;
  founded?: string;
  working_hours?: string;
  center_image?: string;
  vision_title?: string;
  vision_description?: string;
  mission_title?: string;
  mission_description?: string;
}

async function getContent(): Promise<FoundationContent | null> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    const res = await fetch(`${apiBase}/cms?page_name=about_us&section_name=foundation`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0]?.content ?? null;
  } catch {
    return null;
  }
}

export default async function AboutFoundationSection() {
  const c = { ...DEFAULTS, ...((await getContent()) || {}) };
  const centerImageSrc = c.center_image ? getAssetUrl(c.center_image) : "/images/about-foundation.png";

  return (
    <section className="w-full px-5 sm:px-10 lg:px-20 py-12 sm:py-16">
      <div className="bg-[#fafafa] rounded-3xl p-6 sm:p-10 lg:p-12 flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="bg-white rounded-[20px] p-6 sm:p-8 flex flex-col justify-between gap-8 border border-black/5 shadow-sm hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-[22px] sm:text-[24px] text-[#0e1109] capitalize tracking-[-0.5px]">
                {c.card_title}
              </h2>
              <p className="font-normal text-[15px] sm:text-[16px] leading-[1.6] text-[#677489]">
                {c.card_description}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#fafafa] rounded-xl p-4 flex flex-col gap-1">
                  <span className="text-[13px] text-[#677489] font-normal">Based In</span>
                  <span className="text-[16px] text-[#0e1109] font-semibold">{c.based_in}</span>
                </div>
                <div className="bg-[#fafafa] rounded-xl p-4 flex flex-col gap-1">
                  <span className="text-[13px] text-[#677489] font-normal">Founded</span>
                  <span className="text-[16px] text-[#0e1109] font-semibold">{c.founded}</span>
                </div>
              </div>

              <div className="bg-[#fafafa] rounded-xl p-4 flex flex-col gap-1">
                <span className="text-[13px] text-[#677489] font-normal">Working Hours</span>
                <span className="text-[15px] sm:text-[16px] text-[#0e1109] font-semibold">{c.working_hours}</span>
              </div>
            </div>
          </div>

          <div className="relative h-90 lg:h-auto rounded-[20px] overflow-hidden shadow-sm group">
            <Image
              src={centerImageSrc}
              alt="Easy Lift & Clean foundation work"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>

          <div className="flex flex-col gap-6 justify-between">
            <div className="bg-white rounded-[20px] p-6 sm:p-8 flex flex-col gap-3 flex-1 border border-black/5 shadow-sm hover:scale-[1.02] transition-transform duration-300">
              <h3 className="font-semibold text-[20px] sm:text-[22px] text-[#0e1109] capitalize">
                {c.vision_title}
              </h3>
              <p className="font-normal text-[15px] sm:text-[16px] leading-[1.6] text-[#677489]">
                {c.vision_description}
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-6 sm:p-8 flex flex-col gap-3 flex-1 border border-black/5 shadow-sm hover:scale-[1.02] transition-transform duration-300">
              <h3 className="font-semibold text-[20px] sm:text-[22px] text-[#0e1109] capitalize">
                {c.mission_title}
              </h3>
              <p className="font-normal text-[15px] sm:text-[16px] leading-[1.6] text-[#677489]">
                {c.mission_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}