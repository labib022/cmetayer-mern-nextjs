import CTASectionClient from "./CTASectionClient";

const DEFAULT_LABEL = "Get a Quote";
const DEFAULT_HEADING_PART1 = "Looking for ";
const DEFAULT_HEADING_ACCENT = "Professional Home Management Services";
const DEFAULT_HEADING_PART3 = "?";
const DEFAULT_SUBTITLE =
  "Request a free quote today and let our team create a cleaning plan tailored to your home or property needs.";
const DEFAULT_FORM_SUBHEADING =
  "Tell us a bit about your home, and we'll guide you to the right cleaning solution.";

interface CtaContent {
  label?: string;
  heading_part1?: string;
  heading_accent?: string;
  heading_part3?: string;
  subtitle?: string;
  form_subheading?: string;
}

async function getCtaContent(): Promise<CtaContent | null> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8123/api";
    const res = await fetch(`${apiBase}/cms?page_name=home&section_name=cta`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0]?.content ?? null;
  } catch {
    return null;
  }
}

export default async function CTASection() {
  const content = await getCtaContent();

  return (
    <CTASectionClient
      label={content?.label || DEFAULT_LABEL}
      headingPart1={content?.heading_part1 || DEFAULT_HEADING_PART1}
      headingAccent={content?.heading_accent || DEFAULT_HEADING_ACCENT}
      headingPart3={content?.heading_part3 || DEFAULT_HEADING_PART3}
      subtitle={content?.subtitle || DEFAULT_SUBTITLE}
      formSubheading={content?.form_subheading || DEFAULT_FORM_SUBHEADING}
    />
  );
}