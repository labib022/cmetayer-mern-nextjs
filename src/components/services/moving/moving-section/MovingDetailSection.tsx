import MovingDetailSectionClient from "./MovingDetailSectionClient";
import { getAssetUrl } from "@/lib/getAssetUrl";

const DEFAULTS = {
  title: "Service Overview",
  description:
    "Our moving and packing services ensure a seamless relocation. Whether you're moving locally or nationally, our skilled team manages everything from packing to transportation. With Easy Lift & Clean, your belongings are safe with us. We use top-quality materials and techniques to protect your items. Let us handle the moving stress, so you can focus on your new home.",
  included_services: [
    "Professional packing with quality materials",
    "Careful loading and unloading",
    "Secure transportation in modern vehicles",
    "Furniture disassembly and reassembly",
    "Unpacking and setup in your new home",
  ],
  image: "",
  price_label: "Starting Rate",
  price_amount: "$75",
  price_unit: "/hr",
};

interface DetailContent {
  title?: string;
  description?: string;
  included_services?: string[];
  image?: string;
  price_label?: string;
  price_amount?: string;
  price_unit?: string;
}

async function getContent(): Promise<DetailContent | null> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    const res = await fetch(`${apiBase}/cms?page_name=moving&section_name=detail`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0]?.content ?? null;
  } catch {
    return null;
  }
}

export default async function MovingDetailSection() {
  const content = await getContent();
  const includedServices =
    content?.included_services && content.included_services.length > 0
      ? content.included_services
      : DEFAULTS.included_services;
  const imageSrc = content?.image ? getAssetUrl(content.image) : "/images/hero-moving.png";

  return (
    <MovingDetailSectionClient
      title={content?.title || DEFAULTS.title}
      description={content?.description || DEFAULTS.description}
      includedServices={includedServices}
      image={imageSrc}
      priceLabel={content?.price_label || DEFAULTS.price_label}
      priceAmount={content?.price_amount || DEFAULTS.price_amount}
      priceUnit={content?.price_unit || DEFAULTS.price_unit}
    />
  );
}