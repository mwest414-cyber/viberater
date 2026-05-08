import Link from "next/link";
import TabBar, { TAB_BAR_HEIGHT } from "@/components/TabBar";

const mockVibes = [
  { venue: "Devoción Coffee",  vibe: "buzzing", vibeColor: "#D7FF3A", time: "2h ago"  },
  { venue: "McNally Jackson",  vibe: "chill",   vibeColor: "#B8B8B3", time: "yesterday" },
  { venue: "Employees Only",   vibe: "packed",  vibeColor: "#FF9A1F", time: "3d ago"  },
];

export default async function OtherUserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
      {/* Header */}
      <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", flexShrink: 0 }}>
        <Link
          href="/app/waves"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            color: "var(--fg-0)",
            textDecoration: "none",
            lineHeight: 1,
            padding: "8px 8px 8px 0",
            marginRight: 4,
          }}
        >
          ←
        </Link>
      </div>

      <main id="main-content" style={{ flex: 1, padding: "16px 20px 0", display: "flex", flexDirection: "column" }}>
        {/* Avatar + wave button */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "var(--bg-elev-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 28,
              color: "var(--fg-0)",
              flexShrink: 0,
            }}
          >
            {id[0]?.toLowerCase() ?? "?"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--fg-0)" }}>
              {id}
            </p>
            <button
              style={{
                height: 34,
                padding: "0 18px",
                borderRadius: 999,
                background: "var(--lime)",
                border: "none",
                color: "#0A0A0A",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              wave →
            </button>
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
            marginBottom: 20,
          }}
        >
          <div>
            <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--fg-0)" }}>
              23
            </p>
            <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              vibes
            </p>
          </div>
          <div style={{ width: 1, background: "var(--fg-5)" }} />
          <div>
            <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--fg-0)" }}>
              8
            </p>
            <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              venues
            </p>
          </div>
        </div>

        {/* Recent vibes */}
        <p style={{ margin: "0 0 8px", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          recent vibes
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {mockVibes.map((v) => (
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
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--fg-0)" }}>
                  {v.venue}
                </p>
                <p style={{ margin: "2px 0 0", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, color: v.vibeColor }}>
                  {v.vibe}
                </p>
              </div>
              <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-4)" }}>
                {v.time}
              </p>
            </div>
          ))}
        </div>
      </main>

      <TabBar active="you" />
    </div>
  );
}
