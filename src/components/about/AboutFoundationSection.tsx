import Image from "next/image";

export default function AboutFoundationSection() {
  return (
    <section className="w-full px-5 sm:px-10 lg:px-20 py-12 sm:py-16">
      <div className="bg-[#fafafa] rounded-[24px] p-6 sm:p-10 lg:p-12 flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Our Foundation */}
          <div className="bg-white rounded-[20px] p-6 sm:p-8 flex flex-col justify-between gap-8 border border-black/5 shadow-sm hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-[22px] sm:text-[24px] text-[#0e1109] capitalize tracking-[-0.5px]">
                Our Foundation
              </h2>
              <p className="font-normal text-[15px] sm:text-[16px] leading-[1.6] text-[#677489]">
                A mission-driven cleaning company focused on trust, reliability,
                and care for every home we serve.
              </p>
            </div>

            {/* Quick Facts Grid */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#fafafa] rounded-[12px] p-4 flex flex-col gap-1">
                  <span className="text-[13px] text-[#677489] font-normal">
                    Based In
                  </span>
                  <span className="text-[16px] text-[#0e1109] font-semibold">
                    Canada &amp; USA
                  </span>
                </div>
                <div className="bg-[#fafafa] rounded-[12px] p-4 flex flex-col gap-1">
                  <span className="text-[13px] text-[#677489] font-normal">
                    Founded
                  </span>
                  <span className="text-[16px] text-[#0e1109] font-semibold">
                    2017
                  </span>
                </div>
              </div>

              <div className="bg-[#fafafa] rounded-[12px] p-4 flex flex-col gap-1">
                <span className="text-[13px] text-[#677489] font-normal">
                  Working Hours
                </span>
                <span className="text-[15px] sm:text-[16px] text-[#0e1109] font-semibold">
                  Monday – Saturday, 08.00 AM – 06.00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Center Photo */}
          <div className="relative h-[360px] lg:h-auto rounded-[20px] overflow-hidden shadow-sm group">
            <Image
              src="/images/about-foundation.png"
              alt="Easy Lift & Clean foundation work"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>

          {/* Card 3: Vision & Mission */}
          <div className="flex flex-col gap-6 justify-between">
            {/* Vision */}
            <div className="bg-white rounded-[20px] p-6 sm:p-8 flex flex-col gap-3 flex-1 border border-black/5 shadow-sm hover:scale-[1.02] transition-transform duration-300">
              <h3 className="font-semibold text-[20px] sm:text-[22px] text-[#0e1109] capitalize">
                Our Vision
              </h3>
              <p className="font-normal text-[15px] sm:text-[16px] leading-[1.6] text-[#677489]">
                To redefine home care through exceptional service, innovative
                technology, and genuine care.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-[20px] p-6 sm:p-8 flex flex-col gap-3 flex-1 border border-black/5 shadow-sm hover:scale-[1.02] transition-transform duration-300">
              <h3 className="font-semibold text-[20px] sm:text-[22px] text-[#0e1109] capitalize">
                Our Mission
              </h3>
              <p className="font-normal text-[15px] sm:text-[16px] leading-[1.6] text-[#677489]">
                To deliver consistent, high-quality cleaning and home services
                that improve our clients&apos; daily lives while upholding
                environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
