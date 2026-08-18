import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQuery";

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  purpose: string; // mapped from the "Service Needed" dropdown
  message: string;
}

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // POST /contact-us — unauthenticated, general contact/quote-interest form
    submitContact: builder.mutation<ContactResponse, ContactPayload>({
      query: (data) => {
        const fd = new FormData();
        fd.append("name", data.name);
        fd.append("email", data.email);
        fd.append("purpose", data.purpose);
        // backend model-এ phone field নেই, তাই message-এর শুরুতে যোগ করা হচ্ছে
        const fullMessage = data.phone
          ? `Phone: ${data.phone}\n\n${data.message}`
          : data.message;
        fd.append("message", fullMessage);
        return { url: "/contact-us", method: "POST", body: fd };
      },
    }),
  }),
});

export const { useSubmitContactMutation } = contactApi;