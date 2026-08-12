"use client";

import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { updateUser } from "@/lib/redux/features/auth/authSlice";
import {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdateAvatarMutation,
} from "@/lib/redux/features/profile/profileApi";
import { getAssetUrl } from "@/lib/getAssetUrl";

function LoadingSkeleton() {
    return (
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-10 flex flex-col items-center gap-6">
            <div className="size-24 rounded-full bg-[#f4f5f6] animate-pulse" />
            <div className="w-full flex flex-col gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-14 rounded-[14px] bg-[#f4f5f6] animate-pulse" />
                ))}
            </div>
        </div>
    );
}

function LoggedOutState() {
    return (
        <section className="flex flex-col items-center justify-center text-center px-6 py-20 gap-6">
            <div className="size-20 rounded-full bg-[#f0f4f8] flex items-center justify-center shrink-0">
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#08203c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            </div>

            <div className="flex flex-col gap-2 max-w-sm">
                <h2 className="text-xl font-semibold text-[#0b1714]">
                    Log in to view your profile
                </h2>
                <p className="text-[#6b7280] text-base leading-relaxed">
                    Sign in to your account to view and edit your profile details.
                </p>
            </div>

            <a
                href="/login"
                className="inline-flex items-center gap-2 bg-[#08203c] text-white font-semibold text-sm px-6 py-3 rounded-[40px] hover:bg-[#0a2a4e] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out shadow-sm"
            >
                Log In
            </a>
        </section>
    );
}

export default function ProfileContent() {
    const { access, hydrated } = useAppSelector((state) => state.auth);

    if (!hydrated) return <LoadingSkeleton />;
    if (!access) return <LoggedOutState />;

    return <ProfileForm />;
}

function ProfileForm() {
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, isLoading, isError, refetch } = useGetProfileQuery();
    const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
    const [updateAvatar, { isLoading: isUploadingAvatar }] = useUpdateAvatarMutation();

    const [fullName, setFullName] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [twitter, setTwitter] = useState("");
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
        null
    );

    // Backend থেকে profile আসার পর form fields-এ populate করা হচ্ছে
    useEffect(() => {
        if (data?.user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFullName(data.user.full_name || "");
            setLinkedin(data.user.linkedin || "");
            setGithub(data.user.github || "");
            setTwitter(data.user.twitter || "");
        }
    }, [data]);

    if (isLoading) return <LoadingSkeleton />;

    if (isError || !data?.user) {
        return (
            <section className="flex flex-col items-center justify-center text-center px-6 py-20 gap-4">
                <p className="text-red-600 text-sm font-medium">
                    Couldn&apos;t load your profile. Please try again.
                </p>
                <button
                    type="button"
                    onClick={refetch}
                    className="inline-flex items-center gap-2 bg-[#08203c] text-white font-semibold text-sm px-6 py-2.5 rounded-[40px] hover:bg-[#0a2a4e] transition-all duration-200 cursor-pointer"
                >
                    Retry
                </button>
            </section>
        );
    }

    const user = data.user;
    const initial =
        fullName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U";

    const handleAvatarClick = () => {
        if (isUploadingAvatar) return;
        fileInputRef.current?.click();
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFeedback(null);
        try {
            const res = await updateAvatar(file).unwrap();
            dispatch(updateUser({ avatar: res.avatar }));
            setFeedback({ type: "success", text: "Profile photo updated." });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setFeedback({
                type: "error",
                text: err?.data?.message || "Couldn't update photo. Try a smaller image.",
            });
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleSave = async () => {
        if (!fullName.trim()) {
            setFeedback({ type: "error", text: "Full name can't be empty." });
            return;
        }

        setFeedback(null);
        try {
            const res = await updateProfile({
                full_name: fullName,
                linkedin,
                github,
                twitter,
            }).unwrap();

            dispatch(
                updateUser({
                    full_name: res.user.full_name,
                    linkedin: res.user.linkedin,
                    github: res.user.github,
                    twitter: res.user.twitter,
                })
            );
            setFeedback({ type: "success", text: "Profile updated successfully." });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setFeedback({
                type: "error",
                text: err?.data?.message || "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <section className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-10 flex flex-col gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-3">
                <div className="relative">
                    {user.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={getAssetUrl(user.avatar)}
                            alt={fullName || "Profile avatar"}
                            className="size-24 rounded-full object-cover border-4 border-[#f0f4f8]"
                        />
                    ) : (
                        <div className="size-24 rounded-full bg-[#08203c] text-white font-bold text-3xl flex items-center justify-center border-4 border-[#f0f4f8]">
                            {initial}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleAvatarClick}
                        disabled={isUploadingAvatar}
                        aria-label="Change profile photo"
                        className="absolute bottom-0 right-0 size-8 rounded-full bg-[#08203c] text-white flex items-center justify-center border-2 border-white hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-60"
                    >
                        {isUploadingAvatar ? (
                            <svg
                                className="animate-spin"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeOpacity="0.25"
                                />
                                <path
                                    d="M22 12a10 10 0 0 0-10-10"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            </svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            </svg>
                        )}
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                </div>
                <p className="text-xs text-[#6b7280]">PNG or JPG, up to 50MB</p>
            </div>

            {/* Feedback Banner */}
            {feedback && (
                <div
                    className={`text-sm px-4 py-2.5 rounded-[12px] flex items-center gap-2 ${feedback.type === "success"
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                        : "bg-red-50 border border-red-200 text-red-700"
                        }`}
                >
                    <span>{feedback.text}</span>
                </div>
            )}

            {/* Form Fields */}
            <div className="flex flex-col gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                    <label className="font-medium text-sm text-[#444]">Full Name</label>
                    <div className="bg-[#111111]/[0.03] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Your full name"
                            className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full"
                        />
                    </div>
                </div>

                {/* Email (read-only) */}
                <div className="flex flex-col gap-1.5">
                    <label className="font-medium text-sm text-[#444]">Email Address</label>
                    <div className="bg-[#f4f5f6] border border-black/5 rounded-[12px] px-3.5 py-3">
                        <span className="text-sm text-[#6b7280]">{user.email}</span>
                    </div>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="font-medium text-sm text-[#444]">LinkedIn</label>
                        <div className="bg-[#111111]/[0.03] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
                            <input
                                type="text"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                placeholder="linkedin.com/in/..."
                                className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-medium text-sm text-[#444]">GitHub</label>
                        <div className="bg-[#111111]/[0.03] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
                            <input
                                type="text"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                placeholder="github.com/..."
                                className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-medium text-sm text-[#444]">Twitter / X</label>
                        <div className="bg-[#111111]/[0.03] border border-black/5 rounded-[12px] px-3.5 py-3 focus-within:border-[#08203c]/40 transition-colors">
                            <input
                                type="text"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                placeholder="x.com/..."
                                className="bg-transparent text-sm text-[#111] placeholder:text-[#999] outline-none w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="
            mt-2 w-full sm:w-auto sm:self-end bg-[#08203c] text-white font-semibold text-base px-8 py-3.5 rounded-[24px]
            flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-200 cursor-pointer shadow-md
            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
          "
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </section>
    );
}