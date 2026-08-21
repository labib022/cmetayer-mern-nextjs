import Image from "next/image";
import { getAssetUrl } from "@/lib/getAssetUrl";

const DEFAULT_MEMBERS = [
  { name: "Olivia Brooks", role: "Client Service Manager", image: "/images/team-olivia.png" },
  { name: "Emily Walker", role: "Home Repair Expert", image: "/images/team-emily.png" },
  { name: "Liam Thompson", role: "General Maintenance Technician", image: "/images/team-liam.png" },
  { name: "Aisha Rahman", role: "Home Cleaning Supervisor", image: "/images/team-aisha.png" },
];

const DEFAULT_LABEL = "Our Team";
const DEFAULT_HEADING_PART1 = "Meet the ";
const DEFAULT_HEADING_ACCENT = "Easy Lift & Clean";
const DEFAULT_HEADING_PART3 = " Team";
const DEFAULT_DESCRIPTION =
  "A dedicated team of professionals working together to deliver reliable and thoughtful home cleaning services.";

interface MemberText {
  name: string;
  role: string;
  image?: string;
}

interface TeamContent {
  label?: string;
  heading_part1?: string;
  heading_accent?: string;
  heading_part3?: string;
  description?: string;
  members?: MemberText[];
}

async function getContent(): Promise<TeamContent | null> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    const res = await fetch(`${apiBase}/cms?page_name=about_us&section_name=team`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0]?.content ?? null;
  } catch {
    return null;
  }
}

export default async function AboutTeamSection() {
  const content = await getContent();

  const label = content?.label || DEFAULT_LABEL;
  const headingPart1 = content?.heading_part1 || DEFAULT_HEADING_PART1;
  const headingAccent = content?.heading_accent || DEFAULT_HEADING_ACCENT;
  const headingPart3 = content?.heading_part3 || DEFAULT_HEADING_PART3;
  const description = content?.description || DEFAULT_DESCRIPTION;

  const memberTexts = content?.members && content.members.length === 4 ? content.members : DEFAULT_MEMBERS;
  const teamMembers = memberTexts.map((m, i) => ({
    id: `member-${i}`,
    name: m.name,
    role: m.role,
    image: m.image ? getAssetUrl(m.image) : DEFAULT_MEMBERS[i].image,
  }));

  return (
    <section className="w-full px-5 sm:px-10 lg:px-20 py-16 sm:py-20 flex flex-col gap-12 lg:gap-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 w-full">
        <div className="flex flex-col gap-4 items-start max-w-120">
          <div className="flex gap-1 items-center">
            <div className="relative size-4.5 shrink-0">
              <Image src="/icons/dot-label.svg" alt="" fill className="object-contain" sizes="18px" aria-hidden />
            </div>
            <span className="font-semibold text-[16px] leading-[1.4] text-[#08203c] whitespace-nowrap">
              {label}
            </span>
          </div>

          <h2 className="font-medium text-[clamp(32px,3vw,40px)] leading-[1.2] tracking-[-1.56px]">
            <span className="text-[#111]">{headingPart1}</span>
            <span className="text-[#08203c]">{headingAccent}</span>
            <span className="text-[#111]">{headingPart3}</span>
          </h2>
        </div>

        <p className="font-normal text-[18px] leading-[1.4] text-[#656565] max-w-120">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="group relative cursor-pointer bg-[#fafafa] hover:bg-[#08203c] rounded-[20px] p-6 pt-8 flex flex-col gap-5 items-center text-center border border-black/5 hover:border-transparent hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden"
          >
            <div className="relative h-70 sm:h-75 w-full rounded-2xl overflow-hidden transition-transform duration-300 group-hover:rotate-2 group-hover:scale-[1.02]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </div>

            <div className="flex flex-col gap-2 items-center w-full pb-2">
              <h3 className="font-medium text-[26px] sm:text-[28px] leading-[1.3] text-[#0b1714] group-hover:text-white tracking-[-0.96px] transition-colors duration-300">
                {member.name}
              </h3>
              <p className="font-normal text-[15px] sm:text-[16px] text-[#656565] group-hover:text-[#e0e0e0] transition-colors duration-300">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}