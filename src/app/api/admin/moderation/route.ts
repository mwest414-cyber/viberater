// Names & photos actions that need the secret key (the database checks the admin first, as the signed-in user):
//   view    sign a 2 minute link to a flagged photo in the private "moderation" bucket
//   restore copy a flagged photo back into the person's folder and make it their photo again (scan was wrong)
//   ban     admin_ban_user (out of every room, logged), then block sign-in on the auth side for 100 years
import { asUser, bearer, errorCode, withSecretKey } from "@/lib/supabase-server";

export const runtime = "nodejs";

type Body = { action?: "view" | "restore" | "ban"; flagId?: string; userId?: string };

export async function POST(req: Request) {
  const token = bearer(req);
  if (!token) return Response.json({ error: "not_signed_in" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as Body;
  const db = asUser(token);

  if (body.action === "view" || body.action === "restore") {
    if (!body.flagId) return Response.json({ error: "bad_request" }, { status: 400 });
    const { data, error } = await db.rpc("admin_flag_photo", { p_flag: body.flagId });
    const flag = (data as { user_id: string; moderation_path: string }[] | null)?.[0];
    if (error || !flag) return Response.json({ error: errorCode(error) }, { status: 403 });
    const secret = withSecretKey();

    if (body.action === "view") {
      const { data: signed, error: signErr } = await secret.storage.from("moderation").createSignedUrl(flag.moderation_path, 120);
      if (signErr || !signed) return Response.json({ error: "error" }, { status: 500 });
      return Response.json({ ok: true, url: signed.signedUrl });
    }

    const file = await secret.storage.from("moderation").download(flag.moderation_path);
    if (file.error || !file.data) return Response.json({ error: "error" }, { status: 500 });
    const newPath = `${flag.user_id}/${Date.now()}.jpg`;
    const up = await secret.storage.from("avatars").upload(newPath, await file.data.arrayBuffer(), { contentType: "image/jpeg" });
    if (up.error) return Response.json({ error: "error" }, { status: 500 });
    const { error: restoreErr } = await db.rpc("admin_flag_restore", { p_flag: body.flagId, p_new_path: newPath });
    if (restoreErr) {
      await secret.storage.from("avatars").remove([newPath]);
      return Response.json({ error: errorCode(restoreErr) }, { status: 409 });
    }
    return Response.json({ ok: true });
  }

  if (body.action === "ban") {
    if (!body.userId) return Response.json({ error: "bad_request" }, { status: 400 });
    const { data: userId, error } = await db.rpc("admin_ban_user", { p_user: body.userId, p_flag: body.flagId ?? null });
    if (error || !userId) return Response.json({ error: errorCode(error) }, { status: 403 });
    try {
      const { error: authErr } = await withSecretKey().auth.admin.updateUserById(userId as string, { ban_duration: "876000h" });
      if (authErr) throw authErr;
    } catch (e) {
      return Response.json({ ok: true, warning: "sign_in_not_blocked", detail: e instanceof Error ? e.message : String(e) });
    }
    return Response.json({ ok: true });
  }

  return Response.json({ error: "bad_request" }, { status: 400 });
}
