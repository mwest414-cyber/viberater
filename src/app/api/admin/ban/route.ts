// Ban the reported person. The database part (admin_ban: marked banned, out of every room, logged) runs as the
// admin, so is_admin() applies. Then the secret key blocks sign-in on the auth side for 100 years.
import { asUser, bearer, errorCode, withSecretKey } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const token = bearer(req);
  if (!token) return Response.json({ error: "not_signed_in" }, { status: 401 });
  const { reportId } = (await req.json().catch(() => ({}))) as { reportId?: string };
  if (!reportId) return Response.json({ error: "bad_request" }, { status: 400 });

  const { data: userId, error } = await asUser(token).rpc("admin_ban", { p_report: reportId });
  if (error || !userId) return Response.json({ error: errorCode(error) }, { status: 403 });

  try {
    const { error: authErr } = await withSecretKey().auth.admin.updateUserById(userId as string, { ban_duration: "876000h" });
    if (authErr) throw authErr;
  } catch (e) {
    // They're already out of every room; only the sign-in block failed.
    return Response.json({ ok: true, warning: "sign_in_not_blocked", detail: e instanceof Error ? e.message : String(e) });
  }
  return Response.json({ ok: true });
}
