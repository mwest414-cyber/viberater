"use client";

import { useState } from "react";
import Link from "next/link";
import TabBar, { TAB_BAR_HEIGHT } from "@/components/TabBar";

interface SavedVenue {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  vibe: string | null;
  vibeColor: string;
  dotColor: string;
}

const initialSaved: SavedVenue[] = [
  { id: "devocion",  name: "Devoción Coffee",   category: "cafe",      neighborhood: "williamsburg",  vibe: "buzzing", vibeColor: "#D7FF3A", dotColor: "#D7FF3A" },
  { id: "winona",    name: "Winona's",           category: "bar",       neighborhood: "williamsburg",  vibe: "chill",   vibeColor: "#B8B8B3", dotColor: "#8C8C86" },
  { id: "mogador",   name: "Café Mogador",       category: "cafe",      neighborhood: "east village",  vibe: "steady",  vibeColor: "#D7FF3A", dotColor: "#D7FF3A" },
  { id: "employees", name: "Employees Only",     category: "bar",       neighborhood: "west village",  vibe: "packed",  vibeColor: "#FF9A1F", dotColor: "#FF9A1F" },
  { id: "strand",    name: "The Strand",         category: "bookshop",  neighborhood: "union square",  vibe: null,      vibeColor: "#7A7A75", dotColor: "#2E2E2C" },
];

function SavedCard({ venue, onUnsave }: { venue: SavedVenue; onUnsave: (id: string) => void }) {
  return (
    <div
      style={{
        background: "var(--bg-elev-1)",
        borderRadius: 16,
        padding: "16px 16px 16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Link href={`/app/venue/${venue.id}`} style={{ textDecoration: "none", flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: venue.dotColor, flexShrink: 0 }} />
          <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--fg-0)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {venue.name}
          </p>
        </div>
        <p style={{ margin: "0 0 6px 16px", fontFamily: "var(--font-display)", fontSize: 12, color: "var(--fg-3)" }}>
          {venue.category} · {venue.neighborhood}
        </p>
        <p style={{ margin: "0 0 0 16px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: venue.vibe ? venue.vibeColor : "var(--fg-4)" }}>
          {venue.vibe ?? "no vibe yet"}
        </p>
      </Link>

      <button
        aria-label={`unsave ${venue.name}`}
        onClick={() => onUnsave(venue.id)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 8,
          flexShrink: 0,
          fontFamily: "var(--font-display)",
          fontSize: 20,
          color: "var(--coral)",
          lineHeight: 1,
        }}
      >
        ♥
      </button>
    </div>
  );
}

export default function SavedPage() {
  const [saved, setSaved] = useState<SavedVenue[]>(initialSaved);

  function handleUnsave(id: string) {
    setSaved((prev) => prev.filter((v) => v.id !== id));
  }

  if (saved.length === 0) {
    return (
      <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)", paddingBottom: TAB_BAR_HEIGHT }}>
        <main
          id="main-content"
          style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontSize: 72, color: "var(--fg-5)", lineHeight: 1, marginBottom: 32, display: "block" }}>
            ♡
          </span>
          <div style={{ alignSelf: "flex-start", width: "100%" }}>
            <h1 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "var(--fg-0)" }}>
              nothing saved yet.
            </h1>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 15, color: "var(--fg-3)", lineHeight: 1.5 }}>
              find somewhere worth saving.
            </p>
          </div>
        </main>
        <div style={{ padding: "0 24px 16px" }}>
          <Link href="/app/nearby" style={{ display: "block", textAlign: "center", background: "var(--lime)", color: "#0A0A0A", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, borderRadius: 14, height: 56, lineHeight: "56px", textDecoration: "none" }}>
            explore nearby
          </Link>
        </div>
        <TabBar active="saved" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--bg)", paddingBottom: TAB_BAR_HEIGHT }}>
      {/* Header */}
      <div style={{ padding: "24px 24px 16px", flexShrink: 0 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--fg-0)" }}>
          saved
        </h1>
        <p style={{ margin: "2px 0 0", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {saved.length} {saved.length === 1 ? "spot" : "spots"}
        </p>
      </div>

      {/* List */}
      <main
        id="main-content"
        style={{ flex: 1, padding: "0 24px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}
      >
        {saved.map((v) => (
          <SavedCard key={v.id} venue={v} onUnsave={handleUnsave} />
        ))}
      </main>

      <TabBar active="saved" />
    </div>
  );
}
