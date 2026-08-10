import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQuery";

// ── Label → Backend Enum Mappings ────────────────────────────────────────────
// Keep UI labels human-readable; map to exact backend enum values here.

export const SERVICE_CATEGORY_MAP: Record<string, string> = {
  "Standard Clean": "standard",
  "Deep Clean": "deep",
  "Move-in / Move-out Clean": "move_in_out",
};

export const FREQUENCY_MAP: Record<string, string> = {
  "One-time (0%)": "one_time",
  "Weekly (15% Off)": "weekly",
  "Bi-weekly (10% Off)": "biweekly",
  "Monthly (5% Off)": "monthly",
};

// ── Response Types ─────────────────────────────────────────────────────────────

export interface PriceResponse {
  subtotal: number;
  tax: number;
  total: number;
  discount_amount: number;
}

export interface BookingResponse {
  message: string;
  booking_id?: string;
  total?: number;
}

// ── API Slice ──────────────────────────────────────────────────────────────────

export const cleaningApi = createApi({
  reducerPath: "cleaningApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // POST /cleaning/price — live price calculation
    calculatePrice: builder.mutation<
      PriceResponse,
      {
        bedrooms: number;
        bathrooms: number;
        services_category: string; // backend enum value
        frequency: string;         // backend enum value
      }
    >({
      query: (data) => {
        const fd = new FormData();
        fd.append("bedrooms", String(data.bedrooms));
        fd.append("bathrooms", String(data.bathrooms));
        fd.append("services_category", data.services_category);
        fd.append("frequency", data.frequency);
        return { url: "/cleaning/price", method: "POST", body: fd };
      },
    }),

    // POST /cleaning/book — submit the booking
    bookCleaning: builder.mutation<
      BookingResponse,
      {
        name: string;
        email: string;
        phone: string;
        bedrooms: number;
        bathrooms: number;
        services_category: string; // backend enum value
        frequency: string;         // backend enum value
        cleaning_date: string;     // ISO datetime string
      }
    >({
      query: (data) => {
        const fd = new FormData();
        fd.append("name", data.name);
        fd.append("email", data.email);
        fd.append("phone", data.phone);
        fd.append("bedrooms", String(data.bedrooms));
        fd.append("bathrooms", String(data.bathrooms));
        fd.append("services_category", data.services_category);
        fd.append("frequency", data.frequency);
        fd.append("cleaning_date", data.cleaning_date);
        return { url: "/cleaning/book", method: "POST", body: fd };
      },
    }),
  }),
});

export const { useCalculatePriceMutation, useBookCleaningMutation } = cleaningApi;
