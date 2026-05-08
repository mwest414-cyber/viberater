import Link from "next/link";
import TabBar, { TAB_BAR_HEIGHT } from "@/components/TabBar";

const recentVibes = [
  { venue: "Devoción Coffee", vibe: "buzzing", dotColor: "#D7FF3A", time: "2h ago"    },
  { venue: "McNally Jackson",  vibe: "chill",   dotColor: "#8C8C86", time: "yesterday" },
  { venue: "Employees Only",   vibe: "packed",  dotColor: "#FF9A1F", time: "3 days ago" },
];

export default function YouPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        paddingBottom: TAB_BAR_HEIGHT,
      }}
    >
      <main id="main-content" style={{ flex: 1, padding: "20px 20px 0", overflowY: "auto" }}>
        {/* Page title */}
        <h1 style={{ margin: "0 0 20px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--fg-0)" }}>
          you
        </h1>

        {/* Avatar + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "var(--bg-elev-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 20,
              color: "var(--fg-0)",
              flexShrink: 0,
            }}
          >
            m
          </div>
          <div>
            <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--fg-0)" }}>
              mark
            </p>
            <p style={{ margin: "2px 0 0", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--fg-3)" }}>
              williamsburg, new york
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            background: "var(--bg-elev-1)",
            borderRadius: 14,
            padding: "14px 16px",
            display: "flex",
            gap: 24,
            marginBottom: 24,
          }}
        >
          {[{ n: 47, label: "vibes" }, { n: 12, label: "venues" }, { n: 8, label: "days" }].map(({ n, label }, i) => (
            <div key={label} style={{ display: "flex", gap: 24 }}>
              {i > 0 && <div style={{ width: 1, background: "var(--fg-5)" }} />}
              <div>
                <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--fg-0)" }}>
                  {n}
                </p>
                <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent vibes */}
        <p style={{ margin: "0 0 8px", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          recent vibes
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {recentVibes.map((v) => (
            <div
              key={v.venue}
              style={{
                background: "var(--bg-elev-1)",
                borderRadius: 14,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: v.dotColor, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--fg-0)" }}>
                  {v.venue}
                </p>
                <p style={{ margin: "2px 0 0", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg-3)" }}>
                  {v.vibe}
                </p>
              </div>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-4)" }}>
                {v.time}
              </p>
            </div>
          ))}
        </div>

        {/* Settings */}
        <p style={{ margin: "0 0 8px", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          settings
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link
            href="/app/you/settings/notifications"
            style={{
              display: "block",
              background: "var(--bg-elev-1)",
              borderRadius: 14,
              padding: "16px",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 15,
              color: "var(--fg-0)",
              textDecoration: "none",
            }}
          >
            notifications
          </Link>
          <Link
            href="/app/you/settings/privacy"
            style={{
              display: "block",
              background: "var(--bg-elev-1)",
              borderRadius: 14,
              padding: "16px",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 15,
              color: "var(--fg-0)",
              textDecoration: "none",
            }}
          >
            privacy
          </Link>
          <button
            style={{
              width: "100%",
              background: "var(--bg-elev-1)",
              border: "none",
              borderRadius: 14,
              padding: "16px",
              textAlign: "left",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 15,
              color: "var(--coral)",
              cursor: "pointer",
            }}
          >
            sign out
          </button>
        </div>
      </main>

      <TabBar active="you" />
    </div>
  );
}
