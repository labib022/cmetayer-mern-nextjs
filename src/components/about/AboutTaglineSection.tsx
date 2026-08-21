import AboutTaglineSectionClient from "./AboutTaglineSectionClient";
import { getAssetUrl } from "@/lib/getAssetUrl";

const DEFAULTS = {
  heading: "Trust, quality, and an awesome home!",
  description: "We are a dedicated home services company delivering quality solutions for your home, from plumbing to deep cleaning.",
  banner_image: "",
  facebook_url: "https://facebook.com",
  instagram_url: "https://instagram.com",
  twitter_url: "https://x.com",
  linkedin_url: "https://linkedin.com",
};

interface TaglineContent {
  heading?: string;
  description?: string;
  banner_image?: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
}

async function getContent(): Promise<TaglineContent | null> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    const res = await fetch(`${apiBase}/cms?page_name=about_us&section_name=tagline`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0]?.content ?? null;
  } catch {
    return null;
  }
}

export default async function AboutTaglineSection() {
  const c = { ...DEFAULTS, ...((await getContent()) || {}) };
  const bannerImageSrc = c.banner_image ? getAssetUrl(c.banner_image) : "/images/about-tagline.png";

  return (
    <AboutTaglineSectionClient
      heading={c.heading}
      description={c.description}
      bannerImage={bannerImageSrc}
      facebookUrl={c.facebook_url}
      instagramUrl={c.instagram_url}
      twitterUrl={c.twitter_url}
      linkedinUrl={c.linkedin_url}
    />
  );
}