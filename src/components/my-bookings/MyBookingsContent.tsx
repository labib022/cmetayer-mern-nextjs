"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { useGetMyBookingsQuery, BookingItem } from "@/lib/redux/features/bookings/bookingsApi";

const TYPE_LABELS: Record<string, string> = {
    cleaning: "Cleaning",
    laundry: "Laundry",
    moving_quote: "Moving (Quote)",
    repair_quote: "Repair (Quote)",
};

const STATUS_STYLES: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    contacted: "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    closed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
};

function formatDate(dateStr: string | null): string {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function formatPrice(price: number | null): string {
    if (price === null || price === undefined) return "—";
    return `$${price.toFixed(2)}`;
}

function BookingCard({ booking }: { booking: BookingItem }) {
    const typeLabel = TYPE_LABELS[booking.type] || booking.type;
    const statusStyle =
        STATUS_STYLES[booking.status] || "bg-gray-50 text-gray-700 border-gray-200";

    return (
        <div className="border border-black/5 rounded-[16px] p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 hover:shadow-sm transition-shadow bg-white">
            <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#08203c] bg-[#08203c]/5 px-2.5 py-1 rounded-full">
                        {typeLabel}
                    </span>
                    <span
                        className={`text-xs font-semibold capitalize px-2.5 py-1 rounded-full border ${statusStyle}`}
                    >
                        {booking.status}
                    </span>
                </div>
                <p className="text-sm text-[#0b1714] font-medium truncate">
                    {booking.summary}
                </p>
                <p className="text-xs text-[#6b7280]">
                    Requested on {formatDate(booking.createdAt)}
                    {booking.date ? ` · Scheduled for ${formatDate(booking.date)}` : ""}
                </p>
            </div>

            {booking.price !== null && (
                <div className="text-right shrink-0">
                    <span className="text-lg font-bold text-[#08203c]">
                        {formatPrice(booking.price)}
                    </span>
                </div>
            )}
        </div>
    );
}

function EmptyState() {
    return (
        <section className="flex flex-col items-center justify-center text-center px-6 py-20 gap-6">
            <div className="size-20 rounded-full bg-[#f0f4f8] flex items-center justify-center shrink-0">
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#08203c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            </div>

            <div className="flex flex-col gap-2 max-w-sm">
                <h2 className="text-xl font-semibold text-[#0b1714]">No bookings yet</h2>
                <p className="text-[#6b7280] text-base leading-relaxed">
                    Your bookings will appear here once you schedule a service.
                </p>
            </div>

            <a
                href="/services/moving"
                className="inline-flex items-center gap-2 bg-[#08203c] text-white font-semibold text-sm px-6 py-3 rounded-[40px] hover:bg-[#0a2a4e] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out shadow-sm"
            >
                Browse Services
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                        d="M3 8h10M9 4.5l3.5 3.5L9 11.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </a>
        </section>
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            </div>

            <div className="flex flex-col gap-2 max-w-sm">
                <h2 className="text-xl font-semibold text-[#0b1714]">
                    Log in to see your bookings
                </h2>
                <p className="text-[#6b7280] text-base leading-relaxed">
                    Sign in to your account to view and manage all your scheduled
                    services.
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

function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <section className="flex flex-col items-center justify-center text-center px-6 py-20 gap-4">
            <p className="text-red-600 text-sm font-medium">
                Couldn&apos;t load your bookings. Please try again.
            </p>
            <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 bg-[#08203c] text-white font-semibold text-sm px-6 py-2.5 rounded-[40px] hover:bg-[#0a2a4e] transition-all duration-200 cursor-pointer"
            >
                Retry
            </button>
        </section>
    );
}

function LoadingSkeleton() {
    return (
        <div className="flex flex-col gap-4 px-6 py-10 max-w-3xl mx-auto w-full">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="h-24 rounded-[16px] bg-[#f4f5f6] animate-pulse"
                />
            ))}
        </div>
    );
}

export default function MyBookingsContent() {
    const { access, hydrated } = useAppSelector((state) => state.auth);

    // Auth state localStorage থেকে hydrate না হওয়া পর্যন্ত skeleton দেখাই,
    // নাহলে refresh-এ এক মুহূর্তের জন্য "logged out" state flash করবে
    if (!hydrated) {
        return <LoadingSkeleton />;
    }

    if (!access) {
        return <LoggedOutState />;
    }

    return <BookingsList />;
}

function BookingsList() {
    const { data, isLoading, isError, refetch } = useGetMyBookingsQuery();

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (isError) {
        return <ErrorState onRetry={refetch} />;
    }

    const bookings = data?.bookings ?? [];

    if (bookings.length === 0) {
        return <EmptyState />;
    }

    return (
        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto w-full flex flex-col gap-4">
            <p className="text-sm text-[#6b7280] font-medium px-1">
                {data?.total} booking{data?.total === 1 ? "" : "s"}
            </p>
            {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
            ))}
        </section>
    );
}