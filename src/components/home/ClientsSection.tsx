import ClientsSectionClient from "./ClientsSectionClient";
import { getAssetUrl } from "@/lib/getAssetUrl";

/* ─── Fixed card shape (design-driven: type & order not editable) ──────────── */
const fixedStatMeta = [
  { id: "serenity-hills", defaultLogo: "/icons/client-logo-2.svg" },
  { id: "greenview-apt", defaultLogo: "/icons/client-logo-3.svg" },
  { id: "urbanstay", defaultLogo: "/icons/client-logo-1.svg" },
];
const fixedPhotoMeta = [
  { id: "client-photo-1", defaultImage: "/images/client-1.png", alt: "Client portrait in suit" },
  { id: "client-photo-2", defaultImage: "/images/client-2.png", alt: "Property owner portrait" },
];

const DEFAULT_LABEL = "Clients";
const DEFAULT_HEADING_PART1 = "Trusted by ";
const DEFAULT_HEADING_PART2 = "Home and Property Owners";
const DEFAULT_DESCRIPTION =
  "From family homes to rentals, clients choose for reliable, professional cleaning.";
interface StatText {
  clientName: string;
  statNumber: string;
  title: string;
  description: string;
  logo?: string;
}

const DEFAULT_STATS: StatText[] = [
  { clientName: "Serenity Hills Residence", statNumber: "3+", title: "Years of Ongoing Service", description: "Weekly maintenance cleaning for a multi-story family home." },
  { clientName: "Greenview Apartment", statNumber: "85+", title: "Move-Out Cleans Completed", description: "Fast, detailed turnover cleaning for rental unit transitions." },
  { clientName: "UrbanStay Short-Term Rentals", statNumber: "200+", title: "Guest Turnovers Managed", description: "Reliable Airbnb cleaning ensuring consistent five-star readiness." },
];

interface StatText {
  clientName: string;
  statNumber: string;
  title: string;
  description: string;
  logo?: string;
}
interface PhotoText {
  image?: string;
}
interface ClientsContent {
  label?: string;
  heading_part1?: string;
  heading_part2?: string;
  description?: string;
  stats?: StatText[];
  photos?: PhotoText[];
}

async function getClientsContent(): Promise<ClientsContent | null> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    const res = await fetch(`${apiBase}/cms?page_name=home&section_name=clients`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0]?.content ?? null;
  } catch {
    return null;
  }
}

export default async function ClientsSection() {
  const content = await getClientsContent();

  const label = content?.label || DEFAULT_LABEL;
  const headingPart1 = content?.heading_part1 || DEFAULT_HEADING_PART1;
  const headingPart2 = content?.heading_part2 || DEFAULT_HEADING_PART2;
  const description = content?.description || DEFAULT_DESCRIPTION;
  const statTexts = content?.stats && content.stats.length === 3 ? content.stats : DEFAULT_STATS;
  const photoTexts = content?.photos && content.photos.length === 2 ? content.photos : [{}, {}];

  const stats = fixedStatMeta.map((meta, i) => ({
    type: "stat" as const,
    id: meta.id,
    logo: statTexts[i].logo ? getAssetUrl(statTexts[i].logo!) : meta.defaultLogo,
    clientName: statTexts[i].clientName,
    statNumber: statTexts[i].statNumber,
    title: statTexts[i].title,
    description: statTexts[i].description,
  }));

  const photos = fixedPhotoMeta.map((meta, i) => ({
    type: "photo" as const,
    id: meta.id,
    image: photoTexts[i]?.image ? getAssetUrl(photoTexts[i].image!) : meta.defaultImage,
    alt: meta.alt,
  }));

  // Fixed interleave order: stat, photo, stat, photo, stat
  const cards = [stats[0], photos[0], stats[1], photos[1], stats[2]];

  return (
    <ClientsSectionClient
      label={label}
      headingPart1={headingPart1}
      headingPart2={headingPart2}
      description={description}
      cards={cards}
    />
  );
}