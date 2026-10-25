// Remove the reported person's photo: admin_remove_photo clears it (the app stops showing it) and returns the old
// file path, then the secret key deletes the file from storage.
import { asUser, bearer, errorCode, withSecretKey } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const token = bearer(req);
  if (!token) return Response.json({ error: "not_signed_in" }, { status: 401 });
  const { reportId } = (await req.json().catch(() => ({}))) as { reportId?: string };
  if (!reportId) return Response.json({ error: "bad_request" }, { status: 400 });

  const { data: path, error } = await asUser(token).rpc("admin_remove_photo", { p_report: reportId });
  if (error) return Response.json({ error: errorCode(error) }, { status: 403 });
  if (!path) return Response.json({ ok: true, note: "no_photo" });

  try {
    const { error: delErr } = await withSecretKey().storage.from("avatars").remove([path as string]);
    if (delErr) throw delErr;
  } catch (e) {
    return Response.json({ ok: true, warning: "file_not_deleted", detail: e instanceof Error ? e.message : String(e) });
  }
  return Response.json({ ok: true });
}
