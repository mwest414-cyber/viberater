"use client";

import Link from "next/link";
import TabBar, { TAB_BAR_HEIGHT } from "@/components/TabBar";

type ViewState = "has-venues" | "no-vibes" | "no-venues";

// ── In production these come from the API ────────────────────────────────
const viewState: ViewState = "has-venues";

interface Venue {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  vibe: string;
  vibeColor: string;
  dotColor: string;
}

const venues: Venue[] = [
  { id: "devocion",  name: "Devoción Coffee",  category: "cafe", neighborhood: "williamsburg", vibe: "buzzing", vibeColor: "#D7FF3A", dotColor: "#D7FF3A" },
  { id: "employees", name: "Employees Only",   category: "bar",  neighborhood: "west village", vibe: "packed",  vibeColor: "#FF9A1F", dotColor: "#FF9A1F" },
  { id: "mcnally",   name: "McNally Jackson",  category: "cafe", neighborhood: "williamsburg", vibe: "chill",   vibeColor: "#B8B8B3", dotColor: "#8C8C86" },
];

// ── Sub-components ────────────────────────────────────────────────────────
function ScreenHeader({ showLive = true }: { showLive?: boolean }) {
  return (
    <div style={{ background: "var(--bg-elev-1)", padding: "0 24px", height: 56, display: "flex", alignItems: "center", flexShrink: 0 }}>
      <p style={{ flex: 1, margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--fg-0)" }}>
        near you · williamsburg
      </p>
      {showLive && (
        <span style={{ background: "var(--coral)", color: "var(--fg-0)", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 12, borderRadius: 12, padding: "6px 10px", display: "flex", alignItems: "center", gap: 4 }}>
          ● live
        </span>
      )}
    </div>
  );
}

function SearchAndFilters() {
  return (
    <div style={{ padding: "12px 24px 0", flexShrink: 0 }}>
      <div style={{ background: "var(--bg-elev-2)", borderRadius: 12, height: 44, display: "flex", alignItems: "center", padding: "0 16px", marginBottom: 12 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--fg-3)" }}>search venues...</span>
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12 }}>
        {["all vibes", "buzzing", "chill", "packed", "quiet", "steady", "social", "dancy"].map((f, i) => (
          <span
            key={f}
            style={{
              background: i === 0 ? "var(--lime)" : "var(--bg-elev-2)",
              color: i === 0 ? "#0A0A0A" : "var(--fg-2)",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 12,
              borderRadius: 16,
              padding: "8px 14px",
              whiteSpace: "nowrap",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Link
      href={`/app/venue/${venue.id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div style={{ background: "var(--bg-elev-1)", borderRadius: 16, padding: "16px 16px 16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: venue.dotColor, flexShrink: 0 }} />
          <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--fg-0)" }}>
            {venue.name}
          </p>
        </div>
        <p style={{ margin: "0 0 6px 16px", fontFamily: "var(--font-display)", fontSize: 12, color: "var(--fg-3)" }}>
          {venue.category} · {venue.neighborhood}
        </p>
        <p style={{ margin: "0 0 0 16px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: venue.vibeColor }}>
          {venue.vibe}
        </p>
      </div>
    </Link>
  );
}

function SonarRings({ color = "lime", centerDot = false }: { color?: "lime" | "coral"; centerDot?: boolean }) {
  const c = color === "coral"
    ? { fill: ["rgba(255,90,60,0.03)", "rgba(255,90,60,0.05)", "rgba(255,90,60,0.08)"], stroke: ["rgba(255,90,60,0.09)", "rgba(255,90,60,0.15)", "rgba(255,90,60,0.24)"] }
    : { fill: ["rgba(215,255,58,0.03)", "rgba(215,255,58,0.05)", "rgba(215,255,58,0.08)"], stroke: ["rgba(215,255,58,0.09)", "rgba(215,255,58,0.15)", "rgba(215,255,58,0.24)"] };
  return (
    <div style={{ position: "relative", width: 280, height: 280, flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: 0,  borderRadius: "50%", background: c.fill[0], border: `1.5px solid ${c.stroke[0]}` }} />
      <div style={{ position: "absolute", inset: 25, borderRadius: "50%", background: c.fill[1], border: `1.5px solid ${c.stroke[1]}` }} />
      <div style={{ position: "absolute", inset: 50, borderRadius: "50%", background: c.fill[2], border: `1.5px solid ${c.stroke[2]}` }} />
      {color === "lime" && !centerDot && (
        <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "var(--lime)", lineHeight: 1 }}>
          ◎
        </span>
      )}
      {centerDot && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 16, height: 16, borderRadius: "50%", background: "var(--coral)" }} />
      )}
    </div>
  );
}

function EmptyState({ headingText, subText, ctaLabel, ctaHref }: {
  headingText: string;
  subText: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const isNoVenues = headingText === "unmapped territory.";
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px 24px" }}>
      <SonarRings color={isNoVenues ? "coral" : "lime"} centerDot={isNoVenues} />
      <div style={{ alignSelf: "flex-start", marginTop: 32 }}>
        <h2 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "var(--fg-0)" }}>
          {headingText}
        </h2>
        <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 15, color: "var(--fg-3)", lineHeight: 1.5 }}>
          {subText}
        </p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function NearbyPage() {
  const hasVenues = viewState === "has-venues";

  const emptyProps = viewState === "no-vibes"
    ? { headingText: "quiet out there.", subText: "be the first to drop a vibe.", ctaLabel: "drop a vibe →", ctaHref: "/app/add-vibe" }
    : { headingText: "unmapped territory.", subText: "this block hasn't been mapped yet.", ctaLabel: "add a venue", ctaHref: "/app/add-venue" };

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
      <ScreenHeader showLive={hasVenues || viewState === "no-vibes"} />
      <SearchAndFilters />

      {hasVenues ? (
        <main
          id="main-content"
          style={{ flex: 1, padding: "0 24px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", paddingTop: 8 }}
        >
          {venues.map((v) => <VenueCard key={v.id} venue={v} />)}
        </main>
      ) : (
        <EmptyState {...emptyProps} />
      )}

      {/* CTA above tab bar */}
      <div style={{ padding: "0 24px 16px", flexShrink: 0 }}>
        {hasVenues ? (
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
        ) : (
          <Link
            href={emptyProps.ctaHref}
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
            {emptyProps.ctaLabel}
          </Link>
        )}
      </div>

      <TabBar active={viewState === "has-venues" ? "nearby" : "map"} />
    </div>
  );
}
