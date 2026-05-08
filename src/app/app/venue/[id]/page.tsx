import Link from "next/link";
import TabBar, { TAB_BAR_HEIGHT } from "@/components/TabBar";

const mockVenues: Record<string, { name: string; category: string; neighborhood: string; vibe: string | null; vibeColor: string; dotColor: string }> = {
  devocion:  { name: "Devoción Coffee",  category: "cafe",     neighborhood: "williamsburg", vibe: "buzzing", vibeColor: "#D7FF3A", dotColor: "#D7FF3A" },
  employees: { name: "Employees Only",   category: "bar",      neighborhood: "west village", vibe: "packed",  vibeColor: "#FF9A1F", dotColor: "#FF9A1F" },
  mcnally:   { name: "McNally Jackson",  category: "bookshop", neighborhood: "williamsburg", vibe: "chill",   vibeColor: "#B8B8B3", dotColor: "#8C8C86" },
  winona:    { name: "Winona's",         category: "bar",      neighborhood: "williamsburg", vibe: "chill",   vibeColor: "#B8B8B3", dotColor: "#8C8C86" },
  mogador:   { name: "Café Mogador",     category: "cafe",     neighborhood: "east village", vibe: "steady",  vibeColor: "#D7FF3A", dotColor: "#D7FF3A" },
  strand:    { name: "The Strand",       category: "bookshop", neighborhood: "union square", vibe: null,      vibeColor: "#7A7A75", dotColor: "#2E2E2C" },
};

export default async function VenueDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;

  const fromWaves = from === "waves";
  const venue = mockVenues[id];

  const backHref = fromWaves ? "/app/waves" : "/app/nearby";
  const backLabel = fromWaves ? "← waves" : "←";

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
          href={backHref}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: fromWaves ? 14 : 20,
            color: "var(--fg-0)",
            textDecoration: "none",
            lineHeight: 1,
            padding: "8px 8px 8px 0",
          }}
        >
          {backLabel}
        </Link>
      </div>

      <main id="main-content" style={{ flex: 1, padding: "16px 20px 0" }}>
        {venue ? (
          <>
            {/* Vibe dot + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: venue.dotColor, flexShrink: 0 }} />
              <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--fg-0)" }}>
                {venue.name}
              </h1>
            </div>

            {/* Category + neighborhood */}
            <p style={{ margin: "0 0 20px 20px", fontFamily: "var(--font-display)", fontSize: 13, color: "var(--fg-3)" }}>
              {venue.category} · {venue.neighborhood}
            </p>

            {/* Current vibe */}
            <div
              style={{
                background: "var(--bg-elev-1)",
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 12,
              }}
            >
              <p style={{ margin: "0 0 4px", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                current vibe
              </p>
              <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: venue.vibe ? venue.vibeColor : "var(--fg-4)" }}>
                {venue.vibe ?? "no vibe yet"}
              </p>
            </div>

            {/* Drop a vibe CTA */}
            <Link
              href="/app/add-vibe"
              style={{
                display: "block",
                textAlign: "center",
                background: "var(--lime)",
                color: "#0A0A0A",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 17,
                borderRadius: 14,
                height: 56,
                lineHeight: "56px",
                textDecoration: "none",
              }}
            >
              drop a vibe →
            </Link>
          </>
        ) : (
          <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            venue · {id}
          </p>
        )}
      </main>

      <TabBar active={fromWaves ? undefined : "nearby"} />
    </div>
  );
}
