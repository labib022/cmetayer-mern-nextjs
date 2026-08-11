import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQuery";

// ── Label → Backend Enum Mappings ────────────────────────────────────────────
// Keep UI labels human-readable; map to exact backend enum values here.

export const BAG_SIZE_MAP: Record<string, string> = {
  "Small (1 Load / ~10-15 lbs)": "small",
  "Medium (2 Loads / ~20-25 lbs)": "medium",
  "Large (3 Loads / ~30-35 lbs)": "large",
  // "Extra Large" intentionally omitted — no backend enum value.
};

export const DETERGENT_MAP: Record<string, string> = {
  "Standard Premium Detergent": "regular",
  "Free & Clear (Hypoallergenic)": "hypoallergenic",
  "Eco-Friendly Plant-Based": "eco_friendly",
  // Only these 3 options have backend enum values — Lavender is not in the UI.
};

// ── Response Types ─────────────────────────────────────────────────────────────

export interface LaundryPriceResponse {
  /** The single estimated price returned by the backend. */
  price: number;
}

export interface LaundryBookingResponse {
  message: string;
  booking_id?: string;
  total?: number;
}

// ── API Slice ──────────────────────────────────────────────────────────────────

export const laundryApi = createApi({
  reducerPath: "laundryApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // POST /laundry/price — live price calculation
    calculateLaundryPrice: builder.mutation<
      LaundryPriceResponse,
      {
        bag_size: string;       // backend enum value
        detergent_type: string; // backend enum value
      }
    >({
      query: (data) => {
        const fd = new FormData();
        fd.append("bag_size", data.bag_size);
        fd.append("detergent_type", data.detergent_type);
        return { url: "/laundry/price", method: "POST", body: fd };
      },
    }),

    // POST /laundry/book — submit the booking
    bookLaundry: builder.mutation<
      LaundryBookingResponse,
      {
        name: string;
        email: string;
        phone: string;
        bag_size: string;           // backend enum value
        detergent_type: string;     // backend enum value
        washing_items: string[];    // raw UI label strings — backend accepts as-is
        laundry_date: string;       // ISO datetime string
      }
    >({
      query: (data) => {
        const fd = new FormData();
        fd.append("name", data.name);
        fd.append("email", data.email);
        fd.append("phone", data.phone);
        fd.append("bag_size", data.bag_size);
        fd.append("detergent_type", data.detergent_type);
        // Send each washing item as a separate FormData entry (array)
        data.washing_items.forEach((item) => fd.append("washing_items", item));
        fd.append("laundry_date", data.laundry_date);
        return { url: "/laundry/book", method: "POST", body: fd };
      },
    }),
  }),
});

export const {
  useCalculateLaundryPriceMutation,
  useBookLaundryMutation,
} = laundryApi;
