import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../baseQuery";
import { User } from "../auth/authSlice";

export interface ProfileResponse {
    success: boolean;
    user: User;
}

export interface UpdateProfileResponse {
    success: boolean;
    message: string;
    user: User;
}

export interface UpdateProfilePayload {
    full_name?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
}

export interface UpdateAvatarResponse {
    success: boolean;
    message: string;
    avatar: string;
}

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Profile"],
    endpoints: (builder) => ({
        // GET /profile-get — protected
        getProfile: builder.query<ProfileResponse, void>({
            query: () => ({ url: "/profile-get", method: "GET" }),
            providesTags: ["Profile"],
        }),

        // PUT /profile-update — protected, form-data
        updateProfile: builder.mutation<UpdateProfileResponse, UpdateProfilePayload>({
            query: (data) => {
                const fd = new FormData();
                if (data.full_name !== undefined) fd.append("full_name", data.full_name);
                if (data.linkedin !== undefined) fd.append("linkedin", data.linkedin);
                if (data.github !== undefined) fd.append("github", data.github);
                if (data.twitter !== undefined) fd.append("twitter", data.twitter);
                return { url: "/profile-update", method: "PUT", body: fd };
            },
            invalidatesTags: ["Profile"],
        }),

        // POST /avatar-update — protected, form-data, field name "avatar"
        updateAvatar: builder.mutation<UpdateAvatarResponse, File>({
            query: (file) => {
                const fd = new FormData();
                fd.append("avatar", file);
                return { url: "/avatar-update", method: "POST", body: fd };
            },
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdateAvatarMutation,
} = profileApi;
