import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 100 * 1024 * 1024; // 100 MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

function extFromMime(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/heic": "heic",
    "image/heif": "heif",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/webm": "webm",
  };
  return map[mime] || "bin";
}

export async function POST(request: Request) {
  try {
    const client = getSupabaseServer();
    if (!client) {
      return NextResponse.json({ success: false, error: "Storage not configured" }, { status: 500 });
    }

    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ success: false, error: "Empty file" }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, error: "File too large (max 100MB)" },
        { status: 413 }
      );
    }

    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        { success: false, error: `Unsupported type: ${file.type}` },
        { status: 415 }
      );
    }

    const ext = extFromMime(file.type);
    const stamp = Date.now();
    const rand = Math.random().toString(36).slice(2, 10);
    const path = `incoming/${stamp}-${rand}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await client.storage
      .from("lead-media")
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("[upload] supabase error", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const { data } = client.storage.from("lead-media").getPublicUrl(path);
    return NextResponse.json({ success: true, url: data.publicUrl, path });
  } catch (err) {
    console.error("[upload] error", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
