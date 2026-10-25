"use client";

// Admin: reports (Figma "🛠 Admin (proposal)", frame 1210:3, approved by Mark Oct 25).
// Sign in with a VibeRater account. Everything on this page comes from admin_* database functions, which refuse
// anyone not in public.admins, so a regular account that finds this URL sees "not an admin" and nothing else.
// Each report is a ticket: act on it (photo, name, ban; or a place's status), email either side, then close it.

import type { Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useMemo, useState } from "react";

import { supabaseBrowser } from "@/lib/supabase";
import { fill, templateLabel, templatesFor, type Recipient, type Template } from "./templates";

type Person = {
  id: string;
  display_name: string;
  email: string;
  avatar_url: string | null;
  joined: string;
  banned_at: string | null;
  reports_filed: number;
  times_reported: number;
  reported_by_people: number;
  blocked_by: number;
  vibes: number;
};
type Venue = { id: string; name: string; status: string; address: string | null; neighborhood: string | null };
type HistoryItem = { action: string; at: string; detail: Record<string, string> };
type Report = {
  id: string;
  created_at: string;
  status: "open" | "closed";
  closed_at: string | null;
  target_type: "user" | "venue";
  reason: string;
  notes: string | null;
  reporter: Person | null;
  reported: Person | null;
  venue: Venue | null;
  place: string | null;
  history: HistoryItem[];
};

const c = {
  bg: "var(--bg)",
  surface: "var(--bg-elev-1)",
  raised: "var(--bg-elev-2)",
  text: "var(--fg-0)",
  muted: "var(--fg-2)",
  faint: "var(--fg-4)",
  border: "#2A2A2A",
  lime: "var(--lime)",
  coral: "var(--coral)",
};
const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: c.muted, textTransform: "uppercase" };

function when(iso: string) {
  return new Date(iso)
    .toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
    .toLowerCase();
}

function Pill({
  children, onClick, kind = "plain", disabled, busy,
}: { children: React.ReactNode; onClick?: () => void; kind?: "plain" | "lime" | "coral" | "selected"; disabled?: boolean; busy?: boolean }) {
  const styles: Record<string, React.CSSProperties> = {
    plain: { background: c.raised, color: c.text, border: `1px solid ${c.raised}` },
    lime: { background: c.lime, color: "#0A0A0A", border: `1px solid ${c.lime}` },
    coral: { background: "transparent", color: c.coral, border: `1px solid ${c.coral}` },
    selected: { background: c.text, color: "#0A0A0A", border: `1px solid ${c.text}` },
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || busy}
      style={{
        ...styles[kind], borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: disabled || busy ? "default" : "pointer",
        opacity: disabled ? 0.4 : busy ? 0.6 : 1, fontFamily: "var(--font-body)",
      }}>
      {busy ? "…" : children}
    </button>
  );
}

function Avatar({ path, name }: { path: string | null; name: string }) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    if (path) {
      supabaseBrowser().storage.from("avatars").createSignedUrl(path, 3600).then(({ data }) => {
        if (alive) setSrc(data?.signedUrl ?? null);
      });
    }
    return () => { alive = false; };
  }, [path]);
  const initials = name.split(/\s+/).map((w) => w[0] ?? "").join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ width: 48, height: 48, borderRadius: 24, background: c.raised, overflow: "hidden", display: "grid", placeItems: "center", flexShrink: 0 }}>
      {path && src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" width={48} height={48} style={{ objectFit: "cover", width: 48, height: 48 }} />
      ) : (
        <span style={{ fontFamily: "var(--font-display)", color: c.muted, fontSize: 16 }}>{initials}</span>
      )}
    </div>
  );
}

function Fact({ k, v, warn }: { k: string; v: React.ReactNode; warn?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 8, fontSize: 13, lineHeight: "18px" }}>
      <span style={{ color: c.faint }}>{k}</span>
      <span style={{ color: warn ? c.coral : c.text }}>{v}</span>
    </div>
  );
}

function PersonBlock({ label, p, reported }: { label: string; p: Person; reported?: boolean }) {
  const repeat = p.reported_by_people >= 2;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
      <span style={mono}>{label}</span>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Avatar path={p.avatar_url} name={p.display_name} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, lineHeight: "24px", color: c.text }}>
            {p.display_name}
            {p.banned_at ? <span style={{ color: c.coral, fontSize: 13, marginLeft: 8 }}>banned</span> : null}
          </div>
          <div style={{ fontSize: 13, color: c.muted, overflow: "hidden", textOverflow: "ellipsis" }}>{p.email}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Fact k="joined" v={new Date(p.joined).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toLowerCase()} />
        {reported ? null : <Fact k="reports filed" v={p.reports_filed} />}
        <Fact k="times reported" v={reported && p.times_reported > 0 ? `${p.times_reported} (${p.reported_by_people} ${p.reported_by_people === 1 ? "person" : "people"})` : p.times_reported} warn={reported && repeat} />
        {reported ? <Fact k="blocked by" v={`${p.blocked_by} ${p.blocked_by === 1 ? "person" : "people"}`} warn={p.blocked_by >= 3} /> : null}
        {reported ? <Fact k="vibes" v={p.vibes} /> : null}
      </div>
    </div>
  );
}

// The labels the app shows for each reason (src/hooks/use-report.ts in the app).
const reasonPill: Record<string, string> = {
  harassment: "harassment", impersonation: "impersonation", spam: "spam or fake account", other: "other",
  closed: "permanently closed", wrong_info: "wrong info", inappropriate: "inappropriate",
};

const historyText: Record<string, (d: Record<string, string>) => string> = {
  remove_photo: () => "photo removed",
  reset_name: (d) => `name reset${d.from ? ` (was ${d.from})` : ""}`,
  ban: () => "account banned",
  venue_closed: () => "place marked closed",
  venue_hidden: () => "place hidden",
  email: (d) => `${d.template === "ban" ? "ban notice" : d.template} email sent to the ${d.to === "reporter" ? "person who reported" : "reported person"}`,
  close: () => "ticket closed",
  reopen: () => "ticket reopened",
};

// Everything a search can match on one ticket, lowercased: both people (name, email, id), the place, the note,
// the reason and the ticket id.
function searchText(r: Report) {
  const person = (p: Person | null) => (p ? [p.display_name, p.email, p.id] : []);
  return [
    ...person(r.reporter), ...person(r.reported),
    r.venue?.name, r.venue?.address, r.venue?.neighborhood, r.place,
    r.notes, r.reason, reasonPill[r.reason], r.id,
  ].filter(Boolean).join(" ").toLowerCase();
}

const searchField: React.CSSProperties = {
  background: c.surface, color: c.text, border: `1px solid ${c.border}`, borderRadius: 12,
  padding: "12px 16px", fontSize: 15, fontFamily: "var(--font-body)",
};

function EmailBox({ r, token, onSent }: { r: Report; token: string; onSent: () => void }) {
  const [to, setTo] = useState<Recipient | null>(null);
  const [template, setTemplate] = useState<Template>("thanks");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [state, setState] = useState<{ busy: boolean; msg: string | null; bad?: boolean }>({ busy: false, msg: null });

  function pick(nextTo: Recipient, t: Template) {
    const name = (nextTo === "reporter" ? r.reporter?.display_name : r.reported?.display_name) ?? "";
    const filled = fill(t, { name, reason: r.reason });
    setTo(nextTo); setTemplate(t); setSubject(filled.subject); setBody(filled.body); setState({ busy: false, msg: null });
  }

  async function send() {
    if (!to) return;
    setState({ busy: true, msg: null });
    const res = await fetch("/api/admin/email", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ reportId: r.id, to, template, subject, body }),
    });
    const j = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; warning?: string; detail?: string };
    if (!res.ok || !j.ok) {
      const why = j.error === "names_reporter" ? "this message names the person who reported. take their name out." : `couldn't send (${j.error ?? res.status}${j.detail ? `: ${j.detail}` : ""})`;
      setState({ busy: false, msg: why, bad: true });
      return;
    }
    setState({ busy: false, msg: j.warning === "sent_but_not_logged" ? "sent, but it didn't save to the history" : "sent" });
    setTo(null);
    onSent();
  }

  const canEmailReported = r.target_type === "user" && !!r.reported;
  if (!to) {
    return (
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <span style={mono}>email</span>
        {r.reporter ? <Pill onClick={() => pick("reporter", "thanks")}>email {r.reporter.display_name} (reporter)</Pill> : null}
        {canEmailReported ? <Pill onClick={() => pick("reported", "warning")}>email {r.reported!.display_name} (reported)</Pill> : null}
        {state.msg ? <span style={{ fontSize: 13, color: state.bad ? c.coral : c.lime }}>{state.msg}</span> : null}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: 16, borderRadius: 12, background: c.bg, border: `1px solid ${c.border}` }}>
      <span style={mono}>email</span>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: c.faint }}>to</span>
        {r.reporter ? <Pill kind={to === "reporter" ? "selected" : "plain"} onClick={() => pick("reporter", "thanks")}>{r.reporter.display_name} (reporter)</Pill> : null}
        {canEmailReported ? <Pill kind={to === "reported" ? "selected" : "plain"} onClick={() => pick("reported", "warning")}>{r.reported!.display_name} (reported)</Pill> : null}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: c.faint }}>template</span>
        {templatesFor[to].map((t) => (
          <Pill key={t} kind={template === t ? "selected" : "plain"} onClick={() => pick(to, t)}>{templateLabel[t]}</Pill>
        ))}
      </div>
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        maxLength={200}
        aria-label="subject"
        style={{ background: c.surface, color: c.text, border: `1px solid ${c.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, fontFamily: "var(--font-body)" }}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={5000}
        rows={6}
        aria-label="message"
        style={{ background: c.surface, color: c.text, border: `1px solid ${c.border}`, borderRadius: 10, padding: 14, fontSize: 14, lineHeight: "20px", fontFamily: "var(--font-body)", resize: "vertical" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: c.faint }}>from hello@getviberater.co · never names the person who reported</span>
        <div style={{ display: "flex", gap: 8 }}>
          <Pill onClick={() => setTo(null)}>cancel</Pill>
          <Pill kind="selected" onClick={send} busy={state.busy} disabled={!subject.trim() || !body.trim()}>send email</Pill>
        </div>
      </div>
      {state.msg ? <span style={{ fontSize: 13, color: state.bad ? c.coral : c.lime }}>{state.msg}</span> : null}
    </div>
  );
}

function ReportCard({ r, token, reload }: { r: Report; token: string; reload: () => void }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const open = r.status === "open";
  const db = supabaseBrowser();
  const done = (a: string) => r.history.some((h) => h.action === a);

  async function act(name: string, confirmText: string | null, run: () => Promise<string | null>) {
    if (confirmText && !window.confirm(confirmText)) return;
    setBusy(name); setMsg(null);
    try {
      const warning = await run();
      setMsg(warning);
      reload();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  }
  async function route(path: string) {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ reportId: r.id }),
    });
    const j = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; warning?: string; detail?: string };
    if (!res.ok || !j.ok) throw new Error(`didn't work (${j.error ?? res.status})`);
    return j.warning ? `done, but: ${j.warning.replaceAll("_", " ")}${j.detail ? ` (${j.detail})` : ""}` : null;
  }
  async function rpc(fn: string, args: Record<string, unknown>) {
    const { error } = await db.rpc(fn, args);
    if (error) throw new Error(`didn't work (${error.message})`);
    return null;
  }

  const name = r.reported?.display_name ?? "them";
  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 20, padding: 24, borderRadius: 16, background: c.surface, border: "1px solid #1F1F1F" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ border: `1px solid ${c.coral}`, color: c.coral, borderRadius: 999, padding: "6px 14px", fontSize: 13, fontWeight: 600 }}>{reasonPill[r.reason] ?? r.reason.replaceAll("_", " ")}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: c.muted }}>
          {when(r.created_at)}
          {r.place ? ` · at ${r.place}` : ""}
          {!open && r.closed_at ? ` · closed ${when(r.closed_at)}` : ""}
        </span>
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
        {r.reporter ? <PersonBlock label="reported by" p={r.reporter} /> : <span style={{ color: c.faint }}>reporter deleted their account</span>}
        <span style={{ fontFamily: "var(--font-display)", fontSize: 24, color: c.faint, paddingTop: 28 }}>→</span>
        {r.target_type === "user" ? (
          r.reported ? <PersonBlock label="reported" p={r.reported} reported /> : <span style={{ color: c.faint }}>account deleted</span>
        ) : r.venue ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={mono}>reported place</span>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, color: c.text }}>{r.venue.name}</div>
            <Fact k="where" v={[r.venue.address, r.venue.neighborhood].filter(Boolean).join(", ") || "unknown"} />
            <Fact k="status" v={r.venue.status} warn={r.venue.status !== "live"} />
          </div>
        ) : (
          <span style={{ color: c.faint }}>place no longer exists</span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: 16, borderRadius: 12, background: c.bg }}>
        <span style={mono}>their note</span>
        <span style={{ fontSize: 14, lineHeight: "20px", color: r.notes ? c.text : c.faint, whiteSpace: "pre-wrap" }}>{r.notes || "no note"}</span>
      </div>

      {open ? <EmailBox r={r} token={token} onSent={reload} /> : null}

      {r.history.length ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={mono}>history</span>
          {r.history.map((h, i) => (
            <span key={i} style={{ fontSize: 13, color: c.muted }}>
              {when(h.at)} · {(historyText[h.action] ?? (() => h.action))(h.detail ?? {})}
            </span>
          ))}
        </div>
      ) : null}

      {open ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {r.target_type === "user" && r.reported ? (
              <>
                <Pill busy={busy === "photo"} disabled={!r.reported.avatar_url}
                  onClick={() => act("photo", `remove ${name}'s photo?`, () => route("/api/admin/remove-photo"))}>
                  remove photo
                </Pill>
                <Pill busy={busy === "name"} disabled={done("reset_name")}
                  onClick={() => act("name", `reset ${name}'s name to "viberater user"? they can pick a new one right away.`, () => rpc("admin_reset_name", { p_report: r.id }))}>
                  reset name
                </Pill>
                <Pill kind="coral" busy={busy === "ban"} disabled={!!r.reported.banned_at}
                  onClick={() => act("ban", `ban ${name}? they won't be able to sign in and will disappear from every room. their vibes stay up without their name.\n\nsend the ban notice email first: once banned they can't open the app.`, () => route("/api/admin/ban"))}>
                  {r.reported.banned_at ? "banned" : "ban account"}
                </Pill>
              </>
            ) : null}
            {r.target_type === "venue" && r.venue ? (
              <>
                <Pill busy={busy === "closed"} disabled={r.venue.status === "closed"}
                  onClick={() => act("closed", `mark ${r.venue!.name} as permanently closed?`, () => rpc("admin_set_venue_status", { p_report: r.id, p_status: "closed" }))}>
                  mark as closed
                </Pill>
                <Pill kind="coral" busy={busy === "hidden"} disabled={r.venue.status === "blocked"}
                  onClick={() => act("hidden", `hide ${r.venue!.name} from the app?`, () => rpc("admin_set_venue_status", { p_report: r.id, p_status: "blocked" }))}>
                  hide place
                </Pill>
              </>
            ) : null}
          </div>
          <Pill kind="lime" busy={busy === "close"} onClick={() => act("close", null, () => rpc("admin_close_report", { p_report: r.id }))}>
            close ticket
          </Pill>
        </div>
      ) : null}
      {!open ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Pill busy={busy === "reopen"} onClick={() => act("reopen", "reopen this ticket? it moves back to open so you can email or act on it again.", () => rpc("admin_reopen_report", { p_report: r.id }))}>
            reopen ticket
          </Pill>
        </div>
      ) : null}
      {msg ? <span style={{ fontSize: 13, color: c.coral }}>{msg}</span> : null}
    </article>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const { error } = await supabaseBrowser().auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr("that didn't work. check your email and password");
  }
  const field: React.CSSProperties = { background: c.surface, color: c.text, border: `1px solid ${c.border}`, borderRadius: 12, padding: "14px 16px", fontSize: 15, fontFamily: "var(--font-body)" };
  return (
    <form onSubmit={submit} style={{ maxWidth: 380, display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ color: c.muted, fontSize: 15, marginBottom: 8 }}>sign in with your viberater account</p>
      <input type="email" autoComplete="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} style={field} required />
      <input type="password" autoComplete="current-password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} style={field} required />
      <button type="submit" disabled={busy} style={{ background: c.lime, color: "#0A0A0A", border: 0, borderRadius: 999, padding: "14px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
        {busy ? "signing in…" : "sign in"}
      </button>
      {err ? <span style={{ color: c.coral, fontSize: 13 }}>{err}</span> : null}
    </form>
  );
}

// Supabase settings come from Vercel; without them the page can only say so.
const configured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

type Loaded = { status: "open" | "closed" | "all"; reports: Report[]; openCount: number } | { error: string };

async function fetchReports(status: "open" | "closed" | "all"): Promise<Loaded> {
  const db = supabaseBrowser();
  const [{ data, error }, { data: openData }] = await Promise.all([
    db.rpc("admin_reports", { p_status: status }),
    db.rpc("admin_reports", { p_status: "open" }),
  ]);
  if (error) return { error: error.message };
  return { status, reports: (data ?? []) as Report[], openCount: ((openData ?? []) as Report[]).length };
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [admin, setAdmin] = useState<{ userId: string; value: boolean } | null>(null);
  const [status, setStatus] = useState<"open" | "closed" | "all">("open");
  const [query, setQuery] = useState("");
  const [reason, setReason] = useState("any");
  const [kind, setKind] = useState<"all" | "user" | "venue">("all");
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [refresh, setRefresh] = useState(0);
  const reload = useCallback(() => setRefresh((n) => n + 1), []);

  // Who is signed in (state only changes in the callbacks).
  useEffect(() => {
    if (!configured) return;
    const db = supabaseBrowser();
    db.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = db.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Whether that account is an admin, remembered per account.
  const userId = session?.user.id ?? null;
  useEffect(() => {
    if (!userId) return;
    let alive = true;
    supabaseBrowser().rpc("is_admin").then(({ data }) => {
      if (alive) setAdmin({ userId, value: data === true });
    });
    return () => { alive = false; };
  }, [userId]);
  const isAdmin = admin && admin.userId === userId ? admin.value : null;

  // The reports for the chosen tab; refetched after every action.
  useEffect(() => {
    if (!isAdmin) return;
    let alive = true;
    fetchReports(status).then((res) => {
      if (alive) setLoaded(res);
    });
    return () => { alive = false; };
  }, [isAdmin, status, refresh]);

  const error = !configured ? "the admin page isn't set up yet (missing Supabase settings on Vercel)" : loaded && "error" in loaded ? loaded.error : null;
  const current = loaded && "reports" in loaded && loaded.status === status ? loaded : null;
  const openCount = loaded && "openCount" in loaded ? loaded.openCount : null;
  const shown = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return (current?.reports ?? []).filter((r) => {
      if (kind !== "all" && r.target_type !== kind) return false;
      if (reason !== "any" && r.reason !== reason) return false;
      if (!words.length) return true;
      const hay = searchText(r);
      return words.every((w) => hay.includes(w));
    });
  }, [current, kind, reason, query]);
  const filtering = query.trim() !== "" || reason !== "any" || kind !== "all";
  const signOut = () => supabaseBrowser().auth.signOut();

  return (
    <main id="main-content" style={{ paddingTop: 96, background: c.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 64px", display: "flex", flexDirection: "column", gap: 28 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
          <div>
            <span style={mono}>admin · only visible to admins</span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, lineHeight: "48px", fontWeight: 700, color: c.text, margin: 0 }}>reports</h1>
          </div>
          {session ? (
            <span style={{ fontSize: 13, color: c.muted }}>
              {session.user.email} · <button type="button" onClick={signOut} style={{ background: "none", border: 0, color: c.muted, textDecoration: "underline", cursor: "pointer", fontSize: 13 }}>sign out</button>
            </span>
          ) : null}
        </header>

        {error ? <p style={{ color: c.coral }}>{error}</p> : null}
        {!configured || session === undefined ? null : !session ? (
          <SignIn />
        ) : isAdmin === null ? (
          <p style={{ color: c.muted }}>checking…</p>
        ) : !isAdmin ? (
          <p style={{ color: c.muted }}>this account isn&apos;t an admin.</p>
        ) : (
          <>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Pill kind={status === "open" ? "lime" : "plain"} onClick={() => setStatus("open")}>open{openCount !== null ? ` · ${openCount}` : ""}</Pill>
              <Pill kind={status === "closed" ? "lime" : "plain"} onClick={() => setStatus("closed")}>handled</Pill>
              <Pill kind={status === "all" ? "lime" : "plain"} onClick={() => setStatus("all")}>all tickets</Pill>
              <span style={{ width: 12 }} />
              <Pill kind={kind === "all" ? "selected" : "plain"} onClick={() => setKind("all")}>all</Pill>
              <Pill kind={kind === "user" ? "selected" : "plain"} onClick={() => setKind("user")}>people</Pill>
              <Pill kind={kind === "venue" ? "selected" : "plain"} onClick={() => setKind("venue")}>places</Pill>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input
                type="search"
                aria-label="search tickets"
                placeholder="search name, email, note or place"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ ...searchField, flex: "1 1 320px" }}
              />
              <select aria-label="reason" value={reason} onChange={(e) => setReason(e.target.value)} style={{ ...searchField, flex: "0 0 auto", cursor: "pointer" }}>
                <option value="any">any reason</option>
                {Object.entries(reasonPill).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              {filtering ? (
                <Pill onClick={() => { setQuery(""); setReason("any"); setKind("all"); }}>clear</Pill>
              ) : null}
            </div>
            {current === null ? (
              <p style={{ color: c.muted }}>loading…</p>
            ) : shown.length === 0 ? (
              <p style={{ color: c.muted }}>
                {current.reports.length && filtering ? "no tickets match" : status === "open" ? "nothing to review. nice" : status === "closed" ? "nothing handled yet" : "no tickets yet"}
              </p>
            ) : (
              shown.map((r) => <ReportCard key={r.id} r={r} token={session.access_token} reload={reload} />)
            )}
          </>
        )}
      </div>
    </main>
  );
}
