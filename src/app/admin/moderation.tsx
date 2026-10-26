"use client";

// Admin: names & photos (Figma "🛠 Admin", frame 1229:2, approved by Mark Oct 25).
//   * Photos the scan stopped (Amazon Rekognition, via the app's scan-avatar function). A photo stays hidden until
//     you tap it; the server route signs a 2 minute link to the file in the private "moderation" bucket.
//   * Names refused at save in the last 30 days.
//   * The banned word list that refuses names.
// All data comes from admin_* database functions (refuse anyone not in public.admins).

import { useCallback, useEffect, useState } from "react";

import { supabaseBrowser } from "@/lib/supabase";
import { c, mono, Pill, when } from "./ui";

type Person = {
  id: string;
  display_name: string;
  email: string;
  joined: string;
  banned_at: string | null;
  photos_flagged: number;
  names_refused: number;
  times_reported: number;
};
type Flag = {
  id: string;
  created_at: string;
  top_label: string | null;
  top_confidence: number | null;
  person: Person | null;
  has_photo_now: boolean;
};
type NameTry = { id: number; created_at: string; attempted: string; person: Person | null };
type Term = { term: string; match: "contains" | "word" };
type Data = { flags: Flag[]; names: NameTry[]; terms: Term[] };

const field: React.CSSProperties = {
  background: c.surface, color: c.text, border: `1px solid ${c.border}`, borderRadius: 12,
  padding: "12px 16px", fontSize: 15, fontFamily: "var(--font-body)",
};
const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderRadius: 12, background: c.surface, flexWrap: "wrap" };

const errorCopy: Record<string, string> = {
  has_new_photo: "they've already picked a new photo, so this one can't be put back",
  flag_not_found: "that one was already handled",
  user_not_found: "that account no longer exists",
  cant_ban_yourself: "you can't ban yourself",
  bad_term: "use 2 to 40 letters",
  not_allowed: "this account isn't an admin",
};
function say(code: string | undefined) {
  return (code && errorCopy[code]) || "that didn't work. try again";
}
function codeOf(e: { message?: string } | null) {
  const m = e?.message ?? "";
  return Object.keys(errorCopy).find((k) => m.includes(k));
}

async function post(token: string, body: Record<string, unknown>) {
  const res = await fetch("/api/admin/moderation", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  return (await res.json().catch(() => ({}))) as { ok?: boolean; url?: string; error?: string; warning?: string };
}

function HiddenPhoto({ flagId, token }: { flagId: string; token: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function view() {
    setBusy(true);
    const r = await post(token, { action: "view", flagId });
    setBusy(false);
    if (r.url) setSrc(r.url);
  }
  const box: React.CSSProperties = { width: 72, height: 72, borderRadius: 36, background: c.raised, overflow: "hidden", flexShrink: 0, display: "grid", placeItems: "center" };
  if (src) {
    return (
      <button type="button" onClick={() => setSrc(null)} title="hide again" style={{ ...box, border: 0, padding: 0, cursor: "pointer" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="flagged photo" width={72} height={72} style={{ objectFit: "cover", width: 72, height: 72 }} />
      </button>
    );
  }
  return (
    <button type="button" onClick={view} disabled={busy} style={{ ...box, border: 0, cursor: "pointer", color: c.muted, fontSize: 10, fontFamily: "var(--font-body)" }}>
      {busy ? "…" : "tap to view"}
    </button>
  );
}

function FlagRow({ f, token, reload }: { f: Flag; token: string; reload: () => void }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const name = f.person?.display_name ?? "deleted account";
  async function run(key: string, confirmText: string | null, fn: () => Promise<string | null>) {
    if (confirmText && !window.confirm(confirmText)) return;
    setBusy(key);
    setMsg(null);
    const problem = await fn();
    setBusy(null);
    if (problem) return setMsg(problem);
    reload();
  }
  const label = (f.top_label ?? "flagged content").toLowerCase();
  const pct = f.top_confidence != null ? ` (${Math.round(f.top_confidence)}%)` : "";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ ...row, padding: 20, borderRadius: 16, gap: 20 }}>
        <HiddenPhoto flagId={f.id} token={token} />
        <div style={{ flex: 1, minWidth: 220, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: c.text }}>{name}</span>
          <span style={{ fontSize: 14, color: c.muted }}>{f.person?.email ?? ""}</span>
          <span style={{ fontSize: 13, color: c.muted }}>
            scan flagged: {label}{pct} · {when(f.created_at)} · they were told to pick another photo
            {f.person && f.person.photos_flagged > 1 ? ` · ${f.person.photos_flagged} photos flagged so far` : ""}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Pill busy={busy === "restore"} disabled={f.has_photo_now || !f.person}
            onClick={() => run("restore", `put this photo back as ${name}'s profile photo?`, async () => {
              const r = await post(token, { action: "restore", flagId: f.id });
              return r.ok ? null : say(r.error);
            })}>
            {f.has_photo_now ? "they picked a new photo" : "photo was fine, restore"}
          </Pill>
          <Pill kind="coral" busy={busy === "ban"} disabled={!f.person || !!f.person.banned_at}
            onClick={() => run("ban", `ban ${name}? they won't be able to sign in and will disappear from every room.`, async () => {
              const r = await post(token, { action: "ban", userId: f.person!.id, flagId: f.id });
              return r.ok ? (r.warning ? "banned, but sign-in wasn't blocked. try again" : null) : say(r.error);
            })}>
            {f.person?.banned_at ? "banned" : "ban account"}
          </Pill>
          <Pill kind="lime" busy={busy === "keep"}
            onClick={() => run("keep", null, async () => {
              const { error } = await supabaseBrowser().rpc("admin_flag_keep", { p_flag: f.id });
              return error ? say(codeOf(error)) : null;
            })}>
            keep removed
          </Pill>
        </div>
      </div>
      {msg ? <span style={{ fontSize: 13, color: c.coral }}>{msg}</span> : null}
    </div>
  );
}

function NameRow({ n, token, reload }: { n: NameTry; token: string; reload: () => void }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const p = n.person;
  async function ban() {
    if (!p || !window.confirm(`ban ${p.display_name}? they won't be able to sign in and will disappear from every room.`)) return;
    setBusy(true);
    const r = await post(token, { action: "ban", userId: p.id });
    setBusy(false);
    if (!r.ok) return setMsg(say(r.error));
    reload();
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ ...row, justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 14, color: c.text }}>{p ? `${p.display_name} · ${p.email}` : "deleted account"}</span>
          <span style={{ fontSize: 13, color: c.muted }}>
            tried a name on the list · {when(n.created_at)} · tried: &ldquo;{n.attempted}&rdquo;
          </span>
        </div>
        {p ? (
          <Pill kind="coral" busy={busy} disabled={!!p.banned_at} onClick={ban}>{p.banned_at ? "banned" : "ban account"}</Pill>
        ) : null}
      </div>
      {msg ? <span style={{ fontSize: 13, color: c.coral }}>{msg}</span> : null}
    </div>
  );
}

function Words({ terms, reload }: { terms: Term[]; reload: () => void }) {
  const [word, setWord] = useState("");
  const [match, setMatch] = useState<"contains" | "word">("contains");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  async function add() {
    if (!word.trim() || busy) return;
    setBusy(true);
    setMsg(null);
    const { error } = await supabaseBrowser().rpc("admin_add_term", { p_term: word, p_match: match });
    setBusy(false);
    if (error) return setMsg(say(codeOf(error)));
    setWord("");
    reload();
  }
  async function remove(t: string) {
    if (!window.confirm(`take "${t}" off the list?`)) return;
    const { error } = await supabaseBrowser().rpc("admin_remove_term", { p_term: t });
    if (error) return setMsg(say(codeOf(error)));
    reload();
  }
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={mono}>banned words · names containing any of these are refused</span>
      <form onSubmit={(e) => { e.preventDefault(); add(); }} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input aria-label="add a word" placeholder="add a word" value={word} onChange={(e) => setWord(e.target.value)} style={{ ...field, flex: "1 1 260px" }} />
        <select aria-label="how it matches" value={match} onChange={(e) => setMatch(e.target.value as "contains" | "word")} style={{ ...field, cursor: "pointer" }}>
          <option value="contains">anywhere in a name</option>
          <option value="word">whole word only</option>
        </select>
        <Pill kind="lime" busy={busy} onClick={add}>add</Pill>
      </form>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {terms.map((t) => (
          <Pill key={t.term} onClick={() => remove(t.term)}>
            {t.term}{t.match === "word" ? " (whole word)" : ""}  ×
          </Pill>
        ))}
      </div>
      {msg ? <span style={{ fontSize: 13, color: c.coral }}>{msg}</span> : null}
      <span style={{ fontSize: 13, color: c.muted, lineHeight: "18px" }}>
        matches ignore capitals, spaces and symbols, and read look-alike numbers as letters, so &ldquo;A.d m-1 n&rdquo; counts as
        admin. use &ldquo;whole word only&rdquo; for short words that hide inside ordinary names (hancock, essex, therapist).
      </span>
    </section>
  );
}

export function Moderation({ token, onCount }: { token: string; onCount: (n: number) => void }) {
  const [data, setData] = useState<Data | { error: string } | null>(null);
  const [refresh, setRefresh] = useState(0);
  const reload = useCallback(() => setRefresh((n) => n + 1), []);

  useEffect(() => {
    let alive = true;
    supabaseBrowser().rpc("admin_moderation").then(({ data: d, error }) => {
      if (!alive) return;
      if (error) return setData({ error: say(codeOf(error)) });
      const loaded = d as Data;
      setData(loaded);
      onCount(loaded.flags.length);
    });
    return () => { alive = false; };
  }, [refresh, onCount]);

  if (!data) return <p style={{ color: c.muted }}>loading…</p>;
  if ("error" in data) return <p style={{ color: c.coral }}>{data.error}</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={mono}>photos the scan stopped</span>
        {data.flags.length === 0 ? (
          <p style={{ color: c.muted, margin: 0 }}>nothing waiting. nice</p>
        ) : (
          data.flags.map((f) => <FlagRow key={f.id} f={f} token={token} reload={reload} />)
        )}
      </section>
      <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={mono}>names stopped at save · last 30 days</span>
        {data.names.length === 0 ? (
          <p style={{ color: c.muted, margin: 0 }}>none</p>
        ) : (
          data.names.map((n) => <NameRow key={n.id} n={n} token={token} reload={reload} />)
        )}
      </section>
      <Words terms={data.terms} reload={reload} />
      <span style={{ fontSize: 12, color: c.faint }}>
        photo scanning uses Amazon Rekognition content moderation. nothing on this page shows a photo until you tap it.
      </span>
    </div>
  );
}
