import ServicesSectionClient from "./ServicesSectionClient";

/* ─── Fixed image/icon data (design-driven, not editable via CMS) ──────────── */
const fixedData = [
  { id: "moving-packing", image: "/images/service-moving.png", icon: "/icons/icon-moving.svg" },
  { id: "home-cleaning", image: "/images/service-cleaning.png", icon: "/icons/icon-cleaning.svg" },
  { id: "handyman-repair", image: "/images/service-repair.png", icon: "/icons/icon-repair.svg" },
  { id: "laundry-dry-cleaning", image: "/images/service-laundry.png", icon: "/icons/icon-laundry.svg" },
];

const DEFAULT_LABEL = "Our Services";
const DEFAULT_HEADING = "Comprehensive Home Services You Can Count On";
const DEFAULT_DESCRIPTION =
  "Choose a service from the list below to get an instant quote or make a reservation immediately!";
const DEFAULT_SERVICES = [
  { title: "Moving & Packing", description: "Stress-free local and long-distance moving with professional packing." },
  { title: "Home Cleaning", description: "Deep cleans, move-in/out, and recurring maid services." },
  { title: "Handyman & Repair", description: "Plumbing, electrical, assembly, and general home repairs." },
  { title: "Laundry & Dry Cleaning", description: "Wash & fold delivery service right to your doorstep." },
];

interface ServiceText {
  title: string;
  description: string;
}

interface ServicesContent {
  label?: string;
  heading?: string;
  description?: string;
  services?: ServiceText[];
}

async function getServicesContent(): Promise<ServicesContent | null> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    const res = await fetch(`${apiBase}/cms?page_name=home&section_name=services_cards`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0]?.content ?? null;
  } catch {
    return null;
  }
}

export default async function ServicesSection() {
  const content = await getServicesContent();

  const label = content?.label || DEFAULT_LABEL;
  const heading = content?.heading || DEFAULT_HEADING;
  const description = content?.description || DEFAULT_DESCRIPTION;
  const serviceTexts =
    content?.services && content.services.length === 4 ? content.services : DEFAULT_SERVICES;

  const services = fixedData.map((fixed, i) => ({
    ...fixed,
    title: serviceTexts[i].title,
    description: serviceTexts[i].description,
  }));

  return (
    <ServicesSectionClient
      label={label}
      heading={heading}
      description={description}
      services={services}
    />
  );
}