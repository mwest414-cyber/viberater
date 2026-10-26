// Supabase for the website's server routes (never imported by a page).
//   asUser(token): acts as the signed-in admin, so the database's is_admin() check applies to every call.
//   withSecretKey(): full access, for the two things the database can't do itself: blocking sign-in (auth) and
//   deleting a photo file (storage). Only used after an admin_* call has already succeeded as the user.
import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
const secretKey = process.env.SUPABASE_SECRET_KEY ?? "";

export function asUser(token: string) {
  return createClient(url, publishableKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function withSecretKey() {
  if (!secretKey) throw new Error("SUPABASE_SECRET_KEY is not set");
  return createClient(url, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

// The signed-in user's access token from "Authorization: Bearer ...", or null.
export function bearer(req: Request): string | null {
  const h = req.headers.get("authorization") ?? "";
  return h.toLowerCase().startsWith("bearer ") ? h.slice(7).trim() || null : null;
}

// Supabase/Postgres error message to a short code the page can show.
export function errorCode(e: unknown): string {
  const m = e && typeof e === "object" && "message" in e ? String((e as { message: unknown }).message) : String(e);
  for (const code of ["not_allowed", "report_not_found", "bad_recipient", "cant_ban_yourself", "bad_status", "flag_not_found", "has_new_photo", "user_not_found", "bad_photo"]) {
    if (m.includes(code)) return code;
  }
  return "error";
}
