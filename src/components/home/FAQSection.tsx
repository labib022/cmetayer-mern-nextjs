import FAQSectionClient from "./FAQSectionClient";
import { getAssetUrl } from "@/lib/getAssetUrl";

const DEFAULT_PHOTOS = [
  "/images/faq-handyman.png",
  "/images/faq-movers.png",
  "/images/faq-cleaner.png",
];

const DEFAULT_LABEL = "FAQs";
const DEFAULT_HEADING_PART1 = "Need ";
const DEFAULT_HEADING_PART2 = "Help Before Booking";
const DEFAULT_HEADING_PART3 = "?";
const DEFAULT_DESCRIPTION =
  "Find helpful answers to common questions about scheduling, services, and our cleaning team.";

interface FaqHeaderContent {
  label?: string;
  heading_part1?: string;
  heading_part2?: string;
  heading_part3?: string;
  description?: string;
  photos?: { image?: string }[];
}

interface RawFaq {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

async function getFaqHeaderContent(): Promise<FaqHeaderContent | null> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    const res = await fetch(`${apiBase}/cms?page_name=home&section_name=faq_header`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0]?.content ?? null;
  } catch {
    return null;
  }
}

async function getRealFaqs(): Promise<RawFaq[]> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    const res = await fetch(`${apiBase}/faqs`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
}

export default async function FAQSection() {
  const [headerContent, rawFaqs] = await Promise.all([getFaqHeaderContent(), getRealFaqs()]);

  const label = headerContent?.label || DEFAULT_LABEL;
  const headingPart1 = headerContent?.heading_part1 || DEFAULT_HEADING_PART1;
  const headingPart2 = headerContent?.heading_part2 || DEFAULT_HEADING_PART2;
  const headingPart3 = headerContent?.heading_part3 || DEFAULT_HEADING_PART3;
  const description = headerContent?.description || DEFAULT_DESCRIPTION;

  const photos =
    headerContent?.photos && headerContent.photos.length === 3
      ? headerContent.photos.map((p, i) => (p.image ? getAssetUrl(p.image) : DEFAULT_PHOTOS[i]))
      : DEFAULT_PHOTOS;

  const faqs = rawFaqs.map((f) => ({ id: f._id, question: f.question, answer: f.answer }));

 
  const finalFaqs =
    faqs.length > 0
      ? faqs
      : [
          {
            id: "fallback-1",
            question: "What makes Easy Lift & Clean different from other service companies?",
            answer:
              'We operate on a "One Call. One Company" philosophy. Instead of juggling multiple contractors for different needs, we provide a centralized platform where you can book moving, cleaning, laundry, and home repair services all under one trusted roof.',
          },
        ];

  return (
    <FAQSectionClient
      label={label}
      headingPart1={headingPart1}
      headingPart2={headingPart2}
      headingPart3={headingPart3}
      description={description}
      faqs={finalFaqs}
      photos={photos}
    />
  );
}