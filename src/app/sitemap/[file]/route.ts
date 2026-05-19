import { NextResponse } from "next/server";
import {
  buildSitemapEntries,
  getSitemapChunkCount,
  SITEMAP_CHUNK_SIZE,
} from "@/lib/sitemap-entries";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const count = getSitemapChunkCount();
  return Array.from({ length: count }, (_, i) => ({ file: `${i}.xml` }));
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function entryToXml(entry: MetadataRoute.Sitemap[number]): string {
  const lastmod =
    entry.lastModified instanceof Date
      ? entry.lastModified.toISOString()
      : typeof entry.lastModified === "string"
        ? entry.lastModified
        : undefined;

  return [
    "  <url>",
    `    <loc>${escapeXml(entry.url)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
    entry.changeFrequency
      ? `    <changefreq>${entry.changeFrequency}</changefreq>`
      : "",
    entry.priority !== undefined
      ? `    <priority>${entry.priority}</priority>`
      : "",
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ file: string }> },
) {
  const { file } = await ctx.params;
  const match = /^(\d+)\.xml$/.exec(file);

  if (!match) {
    return new NextResponse("Not found", { status: 404 });
  }

  const id = Number(match[1]);
  const count = getSitemapChunkCount();
  if (id < 0 || id >= count) {
    return new NextResponse("Not found", { status: 404 });
  }

  const all = buildSitemapEntries();
  const start = id * SITEMAP_CHUNK_SIZE;
  const slice = all.slice(start, start + SITEMAP_CHUNK_SIZE);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${slice.map(entryToXml).join("\n")}
</urlset>
`;

  return new NextResponse(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
