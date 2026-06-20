import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the SERVICE-ROLE key.
 *
 * The service-role key bypasses Row Level Security, so this client must NEVER be
 * imported into client components. All Spice Island tables (public.si_*) have RLS
 * enabled with no public policies, so they are only reachable through this client.
 *
 * Returns null when env vars are missing, allowing callers to fall back to the
 * static defaults in lib/site.ts (e.g. before the owner has supplied the key).
 */
let cached: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    cached = null;
    return cached;
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export const PHOTO_BUCKET = "spice-island-photos";
