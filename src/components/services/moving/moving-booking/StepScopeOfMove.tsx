"use client";

import { MovingBookingForm } from "./types";

interface StepScopeOfMoveProps {
  formData: MovingBookingForm;
  homeSizeOptions: string[];
  heavyItemSuggestions: string[];
  customHeavyItem: string;
  onCustomHeavyItemChange: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onAddHeavyItem: (item: string) => void;
  onRemoveHeavyItem: (item: string) => void;
  onNeedsPackingChange: (needsPacking: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepScopeOfMove({
  formData,
  homeSizeOptions,
  heavyItemSuggestions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  customHeavyItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCustomHeavyItemChange,
  onChange,
  onAddHeavyItem,
  onRemoveHeavyItem,
  onNeedsPackingChange,
  onBack,
  onNext,
}: StepScopeOfMoveProps) {
  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <h3 className="font-semibold text-[17px] text-[#08203c]">
        Scope of Move
      </h3>

      {/* Home Size Dropdown */}
      <div className="flex flex-col gap-1.5">
        <label className="font-medium text-sm text-[#444]">
          Home Size
        </label>
        <div className="bg-[#111111]/[0.03] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
          <select
            name="homeSize"
            value={formData.homeSize}
            onChange={onChange}
            className="bg-transparent text-sm text-[#111] outline-none w-full cursor-pointer"
          >
            {homeSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Extra Heavy Items Tag / Chip Input */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm text-[#444]">
          Any extra heavy items?
        </label>

        {/* Chips Display */}
        <div className="flex flex-wrap gap-2 min-h-[38px] p-2 bg-[#111111]/[0.02] border border-black/5 rounded-[12px]">
          {formData.heavyItems.map((item) => (
            <span
              key={item}
              className="bg-[#08203c] text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => onRemoveHeavyItem(item)}
                className="hover:bg-white/20 rounded-full p-0.5 cursor-pointer transition-colors"
                aria-label={`Remove ${item}`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </span>
          ))}
          {formData.heavyItems.length === 0 && (
            <span className="text-xs text-[#999] py-1 px-1">
              No heavy items added yet
            </span>
          )}
        </div>

        {/* Suggestions pills */}
        <div className="flex flex-wrap gap-1.5 items-center pt-1">
          <span className="text-xs text-[#656565]">Suggestions:</span>
          {heavyItemSuggestions.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => onAddHeavyItem(sug)}
              className="text-xs bg-[#f4f5f6] hover:bg-[#08203c] text-[#0b1714] hover:text-white px-2.5 py-1 rounded-full transition-colors cursor-pointer"
            >
              + {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Do you need packing services? */}
      <div className="flex flex-col gap-2 pt-1">
        <label className="font-medium text-sm text-[#444]">
          Do you need packing services?
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onNeedsPackingChange(true)}
            className={`flex-1 py-2.5 rounded-[12px] font-medium text-sm border transition-all cursor-pointer ${formData.needsPacking === true
              ? "bg-[#08203c] text-white border-[#08203c] shadow-md"
              : "bg-[#fafafa] text-[#444] border-black/5 hover:bg-black/5"
              }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => onNeedsPackingChange(false)}
            className={`flex-1 py-2.5 rounded-[12px] font-medium text-sm border transition-all cursor-pointer ${formData.needsPacking === false
              ? "bg-[#08203c] text-white border-[#08203c] shadow-md"
              : "bg-[#fafafa] text-[#444] border-black/5 hover:bg-black/5"
              }`}
          >
            No
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={onBack}
          className="
            flex-1 bg-[#f4f5f6] hover:bg-[#e4e5e6] text-[#0b1714] font-semibold text-base py-3.5 rounded-[24px]
            hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer
          "
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="
            flex-1 bg-[#08203c] text-white font-semibold text-base py-3.5 rounded-[24px]
            flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-200 cursor-pointer shadow-md
          "
        >
          <span>Next Step</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4.5l3.5 3.5L9 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
