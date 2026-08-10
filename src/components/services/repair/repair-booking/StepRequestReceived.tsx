"use client";

interface StepRequestReceivedProps {
  onDone: () => void;
}

export default function StepRequestReceived({ onDone }: StepRequestReceivedProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-6 animate-in fade-in duration-300">
      {/* Checkmark Badge */}
      <div className="size-20 rounded-full bg-[#08203c] text-white flex items-center justify-center shadow-xl animate-bounce">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <div className="flex flex-col gap-2 max-w-[440px]">
        <h3 className="font-semibold text-[30px] sm:text-[34px] text-[#0b1714] tracking-[-1px]">
          Request Received!
        </h3>
        <p className="font-normal text-[15px] sm:text-[16px] text-[#656565] leading-[1.5]">
          Our team will reach out to schedule a free diagnostic assessment based on your issue.
        </p>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="
          mt-4 w-full max-w-[400px] bg-[#08203c] text-white font-semibold text-base py-3.5 rounded-[24px]
          hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md
        "
      >
        Done
      </button>
    </div>
  );
}
