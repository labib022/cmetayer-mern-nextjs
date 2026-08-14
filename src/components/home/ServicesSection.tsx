import ServicesSectionClient from "./ServicesSectionClient";
import { getAssetUrl } from "@/lib/getAssetUrl";

/* ─── Fixed image/icon data (design-driven default data) ───────────────────── */

const fixedData = [
  {
    id: "moving-packing",
    image: "/images/service-moving.png",
    icon: "/icons/icon-moving.svg",
  },
  {
    id: "home-cleaning",
    image: "/images/service-cleaning.png",
    icon: "/icons/icon-cleaning.svg",
  },
  {
    id: "handyman-repair",
    image: "/images/service-repair.png",
    icon: "/icons/icon-repair.svg",
  },
  {
    id: "laundry-dry-cleaning",
    image: "/images/service-laundry.png",
    icon: "/icons/icon-laundry.svg",
  },
];

/* ─── Default Content ─────────────────────────────────────────────────────── */

const DEFAULT_LABEL = "Our Services";

const DEFAULT_HEADING =
  "Comprehensive Home Services You Can Count On";

const DEFAULT_DESCRIPTION =
  "Choose a service from the list below to get an instant quote or make a reservation immediately!";

const DEFAULT_SERVICES = [
  {
    title: "Moving & Packing",
    description:
      "Stress-free local and long-distance moving with professional packing.",
  },
  {
    title: "Home Cleaning",
    description:
      "Deep cleans, move-in/out, and recurring maid services.",
  },
  {
    title: "Handyman & Repair",
    description:
      "Plumbing, electrical, assembly, and general home repairs.",
  },
  {
    title: "Laundry & Dry Cleaning",
    description:
      "Wash & fold delivery service right to your doorstep.",
  },
];

/* ─── Service Types ───────────────────────────────────────────────────────── */

interface ServiceText {
  title: string;
  description: string;

  // Optional CMS uploaded assets
  image?: string;
  icon?: string;
}

interface ServicesContent {
  label?: string;
  heading?: string;
  description?: string;
  services?: ServiceText[];
}

/* ─── Get CMS Content ──────────────────────────────────────────────────────── */

async function getServicesContent(): Promise<ServicesContent | null> {
  try {
    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://localhost:8123/api";

    const res = await fetch(
      `${apiBase}/cms?page_name=home&section_name=services_cards`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return null;

    const json = await res.json();

    return json?.data?.[0]?.content ?? null;
  } catch {
    return null;
  }
}

/* ─── Services Section ────────────────────────────────────────────────────── */

export default async function ServicesSection() {
  const content = await getServicesContent();

  const label = content?.label || DEFAULT_LABEL;

  const heading = content?.heading || DEFAULT_HEADING;

  const description =
    content?.description || DEFAULT_DESCRIPTION;

  /*
   * CMS থেকে exactly 4টা service পাওয়া গেলে CMS data ব্যবহার হবে।
   * না হলে DEFAULT_SERVICES ব্যবহার হবে।
   */
  const serviceTexts: ServiceText[] =
    content?.services && content.services.length === 4
      ? content.services
      : DEFAULT_SERVICES;

  /*
   * Fixed design data
   * +
   * CMS editable title/description
   * +
   * Optional custom image/icon
   *
   * Custom image/icon থাকলে সেটি ব্যবহার হবে।
   * না থাকলে fixed/default asset ব্যবহার হবে।
   */
  const services = fixedData.map((fixed, i) => {
    const service = serviceTexts[i];

    return {
      id: fixed.id,

      // Custom CMS image থাকলে সেটা দেখাবে,
      // না থাকলে fixed/default image দেখাবে।
      image: service.image
        ? getAssetUrl(service.image)
        : fixed.image,

      // Custom CMS icon থাকলে সেটা দেখাবে,
      // না থাকলে fixed/default icon দেখাবে।
      icon: service.icon
        ? getAssetUrl(service.icon)
        : fixed.icon,

      // CMS text
      title: service.title,
      description: service.description,
    };
  });

  return (
    <ServicesSectionClient
      label={label}
      heading={heading}
      description={description}
      services={services}
    />
  );
}