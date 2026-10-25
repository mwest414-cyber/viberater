// Supabase for the website. Browser side: the admin page signs in with a normal VibeRater account and calls the
// admin_* functions, which refuse anyone not in public.admins. The publishable key is public by design.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

let browser: SupabaseClient | null = null;

export function supabaseBrowser(): SupabaseClient {
  if (!url || !publishableKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }
  if (!browser) {
    browser = createClient(url, publishableKey, { auth: { persistSession: true, autoRefreshToken: true } });
  }
  return browser;
}
