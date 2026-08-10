import Image from "next/image";
import Link from "next/link";

type ServiceCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

const suggestedServices: ServiceCard[] = [
  {
    id: "cleaning",
    title: "Home Cleaning",
    description: "Deep, regular, move-in/out, and specialty home cleaning.",
    image: "/images/service-cleaning.png",
    href: "/services/cleaning",
  },
  {
    id: "moving",
    title: "Moving & Packing",
    description: "Stress-free local and long-distance moving with professional packing.",
    image: "/images/service-moving.png",
    href: "/services/moving",
  },
  {
    id: "repair",
    title: "Handyman & Repair",
    description: "Plumbing, electrical, assembly, and general home repairs.",
    image: "/images/service-repair.png",
    href: "/services/repair",
  },
];

export default function LaundryYouMayAlsoLikeSection() {
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
              Our Services
            </span>
          </div>

          <h2 className="font-medium text-[clamp(32px,3vw,40px)] leading-[1.2] text-[#08203c] tracking-[-1.56px]">
            You May Also Like
          </h2>
        </div>

        <p className="font-normal text-[16px] sm:text-[18px] leading-[1.4] text-[#656565] max-w-[480px]">
          Discover services that match your lifestyle and preferences!
        </p>
      </div>

      {/* 3 Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
        {suggestedServices.map((service) => (
          <Link
            key={service.id}
            href={service.href}
            className="
              group relative bg-[#fafafa] rounded-[24px] overflow-hidden
              border border-black/5 flex flex-col justify-between
              hover:scale-105 hover:bg-white hover:shadow-2xl
              transition-all duration-300 ease-in-out cursor-pointer h-[380px] sm:h-[420px]
            "
          >
            {/* Image */}
            <div className="relative w-full h-[240px] sm:h-[260px] overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-2">
              <h3 className="font-medium text-[22px] sm:text-[24px] text-[#0b1714] group-hover:text-[#08203c] transition-colors">
                {service.title}
              </h3>
              <p className="font-normal text-[14px] sm:text-[15px] text-[#656565] leading-[1.5]">
                {service.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
