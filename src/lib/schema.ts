import { PHONE, EMAIL, RATING, REVIEW_COUNT, TESTIMONIALS } from "@/data/content";

const SITE_URL = "https://www.theroadsidehelper.com";
const BUSINESS_NAME = "The Roadside Helper";

// ============================================================
// LocalBusiness / AutomotiveBusiness schema for the org
// ============================================================
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    legalName: BUSINESS_NAME,
    description: "24/7 nationwide roadside assistance. Jump-starts, flat tire changes, lockouts, fuel delivery, towing, and winch-outs. Flat $100/hr, 1-hour minimum, no membership.",
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    priceRange: "$100/hr",
    openingHours: "Mo-Su 00:00-23:59",
    areaServed: { "@type": "Country", name: "United States" },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressRegion: "Nationwide",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "39.8283",
      longitude: "-98.5795",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING,
      reviewCount: REVIEW_COUNT.replace("+", ""),
      bestRating: "5",
      worstRating: "1",
    },
    review: TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
      reviewBody: t.text,
      datePublished: "2026-01-01",
    })),
    sameAs: [],
  };
}

// ============================================================
// Service schema for individual service pages
// ============================================================
export function serviceSchema(args: { name: string; description: string; slug: string; subtitle: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: args.name,
    provider: { "@id": `${SITE_URL}/#business` },
    name: args.name,
    description: args.description,
    url: `${SITE_URL}/services/${args.slug}`,
    areaServed: { "@type": "Country", name: "United States" },
    offers: {
      "@type": "Offer",
      price: "100",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "100",
        priceCurrency: "USD",
        unitText: "hour",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "hour" },
      },
      availability: "https://schema.org/InStock",
      eligibleRegion: { "@type": "Country", name: "United States" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING,
      reviewCount: REVIEW_COUNT.replace("+", ""),
      bestRating: "5",
    },
  };
}

// ============================================================
// FAQPage schema for FAQ pages
// ============================================================
export function faqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// ============================================================
// BlogPosting schema for blog posts
// ============================================================
export function blogPostSchema(args: { slug: string; title: string; excerpt: string; date: string; content: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: args.title,
    description: args.excerpt,
    url: `${SITE_URL}/blog/${args.slug}`,
    datePublished: args.date,
    dateModified: args.date,
    author: { "@type": "Organization", name: BUSINESS_NAME, "@id": `${SITE_URL}/#business` },
    publisher: { "@id": `${SITE_URL}/#business` },
    articleBody: args.content.join(" "),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${args.slug}` },
  };
}

// ============================================================
// BreadcrumbList schema
// ============================================================
export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// ============================================================
// JSON-LD script tag helper
// ============================================================
export function jsonLd(schema: object): string {
  return JSON.stringify(schema);
}
