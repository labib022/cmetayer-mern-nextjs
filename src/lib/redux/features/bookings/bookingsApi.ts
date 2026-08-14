import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQuery";

export interface BookingItem {
    id: string;
    type: "cleaning" | "laundry" | "moving_quote" | "repair_quote" | string;
    status: string;
    date: string | null;
    price: number | null;
    summary: string;
    createdAt: string;
}

export interface MyBookingsResponse {
    success: boolean;
    total: number;
    bookings: BookingItem[];
}

export const bookingsApi = createApi({
    reducerPath: "bookingsApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Bookings"],
    endpoints: (builder) => ({
        // GET /my-bookings — protected, requires Authorization header (baseQueryWithReauth handles this)
        getMyBookings: builder.query<MyBookingsResponse, void>({
            query: () => ({ url: "/my-bookings", method: "GET" }),
            providesTags: ["Bookings"],
        }),
    }),
});

export const { useGetMyBookingsQuery } = bookingsApi;