import { NextResponse } from "next/server";
import { SITE, getSitemapChunkCount } from "@/lib/sitemap-entries";

export const dynamic = "force-static";

export function GET() {
  const now = new Date().toISOString();
  const count = getSitemapChunkCount();
  const chunks = Array.from({ length: count }, (_, i) => i);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunks
  .map(
    (id) => `  <sitemap>
    <loc>${SITE}/sitemap/${id}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>
`;

  return new NextResponse(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
