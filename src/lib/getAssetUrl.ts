// NEXT_PUBLIC_API_BASE_URL সাধারণত ".../api" দিয়ে শেষ হয়,
// কিন্তু uploaded files (avatar ইত্যাদি) serve হয় root থেকে ("/uploads/..."),
// তাই এখানে "/api" suffix বাদ দিয়ে server root বের করা হচ্ছে
export function getServerBaseUrl(): string {
    const apiBase =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    return apiBase.replace(/\/api\/?$/, "");
}

// avatar/relative path বা পুরো external URL (Google avatar) দুটোই handle করে
export function getAssetUrl(path?: string | null): string {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }
    return `${getServerBaseUrl()}${path}`;
}