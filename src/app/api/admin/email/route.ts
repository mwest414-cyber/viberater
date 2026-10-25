// Send an email from the admin page, from hello@getviberater.co through Resend, and log it on the report.
// The address comes from the database (admin_email_address checks the caller is an admin). A message to the
// reported person is refused if it contains the reporter's name.
import { Resend } from "resend";
import { asUser, bearer, errorCode } from "@/lib/supabase-server";

export const runtime = "nodejs";

const FROM = "viberater <hello@getviberater.co>";

type Body = { reportId?: string; to?: string; template?: string; subject?: string; body?: string };

export async function POST(req: Request) {
  const token = bearer(req);
  if (!token) return Response.json({ error: "not_signed_in" }, { status: 401 });
  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "email_not_set_up" }, { status: 500 });

  const b = (await req.json().catch(() => ({}))) as Body;
  const to = b.to === "reporter" || b.to === "reported" ? b.to : null;
  const subject = (b.subject ?? "").trim();
  const text = (b.body ?? "").trim();
  if (!b.reportId || !to || !subject || !text || subject.length > 200 || text.length > 5000) {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const db = asUser(token);
  const { data: address, error: addrErr } = await db.rpc("admin_email_address", { p_report: b.reportId, p_to: to });
  if (addrErr || !address) return Response.json({ error: errorCode(addrErr) }, { status: addrErr ? 403 : 404 });

  // Never name the reporter to the person they reported.
  if (to === "reported") {
    const { data: all, error: listErr } = await db.rpc("admin_reports", { p_status: "all" });
    if (listErr) return Response.json({ error: errorCode(listErr) }, { status: 403 });
    const report = (all as { id: string; reporter?: { display_name?: string } }[]).find((r) => r.id === b.reportId);
    const reporterName = report?.reporter?.display_name?.trim().toLowerCase();
    const haystack = `${subject}\n${text}`.toLowerCase();
    if (reporterName && reporterName.length >= 3 && haystack.includes(reporterName)) {
      return Response.json({ error: "names_reporter" }, { status: 400 });
    }
  }

  const resend = new Resend(key);
  const { error: sendErr } = await resend.emails.send({ from: FROM, to: address as string, subject, text, replyTo: "hello@getviberater.co" });
  if (sendErr) return Response.json({ error: "send_failed", detail: sendErr.message }, { status: 502 });

  const { error: logErr } = await db.rpc("admin_log_email", {
    p_report: b.reportId, p_to: to, p_template: b.template ?? "custom", p_subject: subject, p_body: text,
  });
  // The email went out even if logging failed; say so instead of pretending it didn't send.
  if (logErr) return Response.json({ ok: true, warning: "sent_but_not_logged" });
  return Response.json({ ok: true });
}
