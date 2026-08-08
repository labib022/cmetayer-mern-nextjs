import Image from "next/image";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    id: "olivia-brooks",
    name: "Olivia Brooks",
    role: "Client Service Manager",
    image: "/images/team-olivia.png",
  },
  {
    id: "emily-walker",
    name: "Emily Walker",
    role: "Home Repair Expert",
    image: "/images/team-emily.png",
  },
  {
    id: "liam-thompson",
    name: "Liam Thompson",
    role: "General Maintenance Technician",
    image: "/images/team-liam.png",
  },
  {
    id: "aisha-rahman",
    name: "Aisha Rahman",
    role: "Home Cleaning Supervisor",
    image: "/images/team-aisha.png",
  },
];

export default function AboutTeamSection() {
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
            <span className="font-semibold text-[16px] leading-[1.4] text-[#08203c] whitespace-nowrap">
              Our Team
            </span>
          </div>

          {/* Title */}
          <h2 className="font-medium text-[clamp(32px,3vw,40px)] leading-[1.2] tracking-[-1.56px]">
            <span className="text-[#111]">Meet the </span>
            <span className="text-[#08203c]">Easy Lift &amp; Clean</span>
            <span className="text-[#111]"> Team</span>
          </h2>
        </div>

        <p className="font-normal text-[18px] leading-[1.4] text-[#656565] max-w-[480px]">
          A dedicated team of professionals working together to deliver reliable
          and thoughtful home cleaning services.
        </p>
      </div>

      {/* Team Cards Grid with Interactive Navy Hover State */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="
              group relative cursor-pointer
              bg-[#fafafa] hover:bg-[#08203c]
              rounded-[20px] p-6 pt-8
              flex flex-col gap-5 items-center text-center
              border border-black/5 hover:border-transparent
              hover:scale-105 hover:shadow-2xl
              transition-all duration-300 ease-in-out
              overflow-hidden
            "
          >
            {/* Image Container with Inset Tilt Effect on Hover */}
            <div className="relative h-[280px] sm:h-[300px] w-full rounded-[16px] overflow-hidden transition-transform duration-300 group-hover:rotate-2 group-hover:scale-[1.02]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </div>

            {/* Content Text: Switches to White on Navy Hover */}
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
