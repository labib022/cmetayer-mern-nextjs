import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileContent from "@/components/profile/ProfileContent";

export const metadata: Metadata = {
    title: "My Profile — Easy Lift and Clean",
    description: "View and manage your profile with Easy Lift & Clean.",
};

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* ── Header with Navbar ── */}
            <div className="p-2 mb-12 sm:mb-16">
                <div
                    className="
            bg-[#08203c]
            rounded-[24px]
            overflow-hidden
            flex flex-col
            px-5 sm:px-10 lg:px-20
            pt-6 sm:pt-8 lg:pt-10
            pb-16 sm:pb-20 lg:pb-24
            relative
          "
                >
                    <Navbar />

                    {/* Page heading */}
                    <div className="flex flex-col items-center text-center mt-12 sm:mt-16 gap-3">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                            My Profile
                        </h1>
                        <p className="text-[#a8bfd8] text-base sm:text-lg max-w-md">
                            Manage your personal details and social links.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Profile Content (loading / logged-out / form) ── */}
            <ProfileContent />

            {/* ── Footer ── */}
            <Footer />
        </div>
    );
}