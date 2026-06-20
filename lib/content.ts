import "server-only";
import { getSupabaseAdmin } from "./supabaseAdmin";
import {
  defaultSiteConfig,
  defaultProducts,
  type SiteConfig,
  type Product,
  type Audience,
} from "./site";

/** Shape of a row in public.si_settings. */
interface SettingsRow {
  business_name: string;
  tagline: string;
  hero_blurb: string;
  about_paragraph: string;
  about_us: string;
  boerewors_info: string;
  serve_intro: string;
  audiences: Audience[] | null;
  whatsapp_number: string;
  instagram_url: string;
  location: string;
}

/** Shape of a row in public.si_products. */
export interface ProductRow {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  is_available: boolean;
  sort_order: number;
}

function rowToConfig(row: SettingsRow): SiteConfig {
  return {
    businessName: row.business_name,
    tagline: row.tagline,
    heroBlurb: row.hero_blurb,
    aboutParagraph: row.about_paragraph,
    aboutUs: row.about_us,
    boereworsInfo: row.boerewors_info,
    serveIntro: row.serve_intro,
    audiences: Array.isArray(row.audiences) ? row.audiences : [],
    whatsappNumber: row.whatsapp_number,
    instagramUrl: row.instagram_url,
    location: row.location,
  };
}

function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description || undefined,
    price: row.price || undefined,
    image: row.image_url || undefined,
  };
}

/**
 * Content for the PUBLIC site: site config + only the available products.
 * Falls back to the static defaults in lib/site.ts if the DB is unset/unreachable.
 */
export async function getSiteContent(): Promise<{
  config: SiteConfig;
  products: Product[];
}> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { config: defaultSiteConfig, products: defaultProducts };
  }

  try {
    const [settingsRes, productsRes] = await Promise.all([
      supabase.from("si_settings").select("*").eq("id", 1).single(),
      supabase
        .from("si_products")
        .select("*")
        .eq("is_available", true)
        .order("sort_order", { ascending: true }),
    ]);

    const config = settingsRes.data
      ? rowToConfig(settingsRes.data as SettingsRow)
      : defaultSiteConfig;

    const products =
      productsRes.data && productsRes.data.length > 0
        ? (productsRes.data as ProductRow[]).map(rowToProduct)
        : defaultProducts;

    return { config, products };
  } catch {
    return { config: defaultSiteConfig, products: defaultProducts };
  }
}

/**
 * Content for the ADMIN editor: site config + ALL products (including
 * unavailable / "coming soon" ones), as raw rows for full editing.
 */
export async function getAdminContent(): Promise<{
  config: SiteConfig;
  products: ProductRow[];
}> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { config: defaultSiteConfig, products: [] };
  }

  const [settingsRes, productsRes] = await Promise.all([
    supabase.from("si_settings").select("*").eq("id", 1).single(),
    supabase
      .from("si_products")
      .select("*")
      .order("sort_order", { ascending: true }),
  ]);

  const config = settingsRes.data
    ? rowToConfig(settingsRes.data as SettingsRow)
    : defaultSiteConfig;

  return { config, products: (productsRes.data as ProductRow[]) ?? [] };
}
