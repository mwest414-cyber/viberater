"use client";

// Pieces shared by the admin page's sections (reports, names & photos).

export const c = {
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
export const mono: React.CSSProperties = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: c.muted, textTransform: "uppercase" };

export function when(iso: string) {
  return new Date(iso)
    .toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
    .toLowerCase();
}

export function Pill({
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

export function Fact({ k, v, warn }: { k: string; v: React.ReactNode; warn?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 8, fontSize: 13, lineHeight: "18px" }}>
      <span style={{ color: c.faint }}>{k}</span>
      <span style={{ color: warn ? c.coral : c.text }}>{v}</span>
    </div>
  );
}

