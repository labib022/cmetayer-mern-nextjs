import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQuery";

// ── Response Type ─────────────────────────────────────────────────────────────

export interface QuoteResponse {
    success: boolean;
    message: string;
    data?: {
        _id: string;
        service: "moving" | "repair";
        [key: string]: unknown;
    };
}

// ── Request Payload Types ─────────────────────────────────────────────────────

export interface MovingQuotePayload {
    service: "moving";
    name: string;
    email: string;
    phone: string;
    pickup_address: string;
    dropoff_address: string;
    move_date: string; // yyyy-mm-dd (from <input type="date">)
    home_size: string;
    heavy_items: string[];
    needs_packing: boolean;
}

export interface RepairQuotePayload {
    service: "repair";
    name: string;
    email: string;
    phone: string;
    service_category: string;
    issue_description: string;
    photo?: File | null;
}

// ── API Slice ──────────────────────────────────────────────────────────────────

export const quoteApi = createApi({
    reducerPath: "quoteApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        // POST /cms — shared endpoint for both Moving and Repair quote requests
        submitQuote: builder.mutation<
            QuoteResponse,
            MovingQuotePayload | RepairQuotePayload
        >({
            query: (data) => {
                const fd = new FormData();
                fd.append("service", data.service);
                fd.append("name", data.name);
                fd.append("email", data.email);
                fd.append("phone", data.phone);

                if (data.service === "moving") {
                    fd.append("pickup_address", data.pickup_address);
                    fd.append("dropoff_address", data.dropoff_address);
                    fd.append("move_date", data.move_date);
                    fd.append("home_size", data.home_size);
                    data.heavy_items.forEach((item) => fd.append("heavy_items", item));
                    fd.append("needs_packing", String(data.needs_packing));
                }

                if (data.service === "repair") {
                    fd.append("service_category", data.service_category);
                    fd.append("issue_description", data.issue_description);
                    if (data.photo) {
                        fd.append("image", data.photo);
                    }
                }

                return { url: "/cms", method: "POST", body: fd };
            },
        }),
    }),
});

export const { useSubmitQuoteMutation } = quoteApi;