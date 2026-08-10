import Navbar from "@/components/layout/Navbar";

export default function RepairHeroSection() {
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
        {/* Navbar */}
        <Navbar />

        {/* Hero headline & subtext */}
        <div className="flex flex-col items-center justify-center text-center gap-6 max-w-[860px] mx-auto z-10">
          <h1 className="font-medium text-[clamp(36px,5vw,56px)] leading-[1.15] text-white tracking-[-1.872px]">
            Home Repair Services
          </h1>
          <p className="font-normal text-[clamp(16px,1.5vw,18px)] leading-[1.6] text-[#e8ede4] max-w-[620px] opacity-90">
            Plumbing, electrical, assembly, and general home repairs from vetted
            professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
