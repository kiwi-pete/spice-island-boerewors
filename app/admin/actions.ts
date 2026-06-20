"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin, PHOTO_BUCKET } from "@/lib/supabaseAdmin";
import { isAdmin } from "@/lib/auth";
import type { ProductRow } from "@/lib/content";
import type { Audience } from "@/lib/site";

export interface EditableConfig {
  businessName: string;
  tagline: string;
  heroBlurb: string;
  aboutParagraph: string;
  aboutUs: string;
  boereworsInfo: string;
  serveIntro: string;
  audiences: Audience[];
  whatsappNumber: string;
  instagramUrl: string;
  location: string;
}

export interface EditableProduct {
  id?: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  is_available: boolean;
}

export interface SavePayload {
  config: EditableConfig;
  products: EditableProduct[];
  deletedIds: string[];
}

type SaveResult =
  | { ok: true; products: ProductRow[] }
  | { ok: false; error: string };

/**
 * Persist the entire editor state in one call: site settings, product
 * upserts (insert when no id, update when id present), and deletions.
 * Product order is captured from the array order via sort_order.
 */
export async function saveAll(payload: SavePayload): Promise<SaveResult> {
  if (!(await isAdmin())) return { ok: false, error: "Not authorized." };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      ok: false,
      error:
        "Server is not configured yet (missing Supabase environment variables).",
    };
  }

  for (const p of payload.products) {
    if (!p.name.trim()) return { ok: false, error: "Every product needs a name." };
  }

  const c = payload.config;
  const { error: settingsErr } = await supabase
    .from("si_settings")
    .update({
      business_name: c.businessName,
      tagline: c.tagline,
      hero_blurb: c.heroBlurb,
      about_paragraph: c.aboutParagraph,
      about_us: c.aboutUs,
      boerewors_info: c.boereworsInfo,
      serve_intro: c.serveIntro,
      audiences: c.audiences,
      whatsapp_number: c.whatsappNumber,
      instagram_url: c.instagramUrl,
      location: c.location,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
  if (settingsErr) return { ok: false, error: settingsErr.message };

  if (payload.deletedIds.length > 0) {
    const { error } = await supabase
      .from("si_products")
      .delete()
      .in("id", payload.deletedIds);
    if (error) return { ok: false, error: error.message };
  }

  const rows = payload.products.map((p, i) => ({
    ...(p.id ? { id: p.id } : {}),
    name: p.name.trim(),
    description: p.description,
    price: p.price,
    image_url: p.image_url,
    is_available: p.is_available,
    sort_order: (i + 1) * 10,
  }));

  if (rows.length > 0) {
    const { error } = await supabase
      .from("si_products")
      .upsert(rows, { defaultToNull: false });
    if (error) return { ok: false, error: error.message };
  }

  revalidatePath("/", "layout");

  const { data } = await supabase
    .from("si_products")
    .select("*")
    .order("sort_order", { ascending: true });

  return { ok: true, products: (data as ProductRow[]) ?? [] };
}

type UploadResult = { ok: true; url: string } | { ok: false; error: string };

/** Upload a product photo to public storage and return its public URL. */
export async function uploadProductPhoto(
  formData: FormData
): Promise<UploadResult> {
  if (!(await isAdmin())) return { ok: false, error: "Not authorized." };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, error: "Server is not configured yet." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No file provided." };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { ok: false, error: "Image must be under 5 MB." };
  }

  const typeToExt: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  const ext = typeToExt[file.type];
  if (!ext) return { ok: false, error: "Use a JPG, PNG, or WebP image." };

  const objectName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(PHOTO_BUCKET)
    .upload(objectName, bytes, { contentType: file.type, upsert: false });
  if (error) return { ok: false, error: error.message };

  const { data } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(objectName);
  return { ok: true, url: data.publicUrl };
}
