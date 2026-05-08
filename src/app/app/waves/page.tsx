"use client";

import { useState } from "react";
import Link from "next/link";
import TabBar, { TAB_BAR_HEIGHT } from "@/components/TabBar";

type ViewState = "active" | "ghost" | "no-vibe";
type LiveState = "live" | "ghost-mode";
type WaveStatus = "waved-at-you" | "can-wave" | "waved";

interface Person {
  id: string;
  initial: string;
  name: string;
  status: WaveStatus;
}

const initialPeople: Person[] = [
  { id: "alex",   initial: "a", name: "alex",   status: "waved-at-you" },
  { id: "j",      initial: "j", name: "j.",      status: "can-wave"     },
  { id: "morgan", initial: "m", name: "morgan",  status: "waved"        },
  { id: "sam",    initial: "s", name: "sam",     status: "can-wave"     },
  { id: "riley",  initial: "r", name: "riley",   status: "can-wave"     },
];

function PersonCard({ person, onWave }: { person: Person; onWave: (id: string) => void }) {
  return (
    <div
      style={{
        background: person.status === "waved-at-you" ? "var(--bg-elev-2)" : "var(--bg-elev-1)",
        border: person.status === "waved-at-you" ? "1px solid rgba(215,255,58,0.35)" : "1px solid transparent",
        borderRadius: 16,
        height: 68,
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "var(--bg-elev-2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 16,
          color: "var(--fg-0)",
          flexShrink: 0,
        }}
      >
        {person.initial}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, color: "var(--fg-0)" }}>
          {person.name}
        </p>
        {person.status === "waved-at-you" && (
          <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 11, color: "var(--fg-3)" }}>
            waved at you
          </p>
        )}
      </div>

      {person.status === "waved-at-you" && (
        <button
          onClick={() => onWave(person.id)}
          style={{
            height: 32,
            padding: "0 16px",
            borderRadius: 999,
            background: "var(--lime)",
            border: "none",
            color: "#0A0A0A",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          wave back
        </button>
      )}

      {person.status === "can-wave" && (
        <button
          onClick={() => onWave(person.id)}
          style={{
            height: 32,
            padding: "0 16px",
            borderRadius: 999,
            background: "var(--bg-elev-2)",
            border: "1px solid var(--fg-4)",
            color: "var(--fg-2)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          wave
        </button>
      )}

      {person.status === "waved" && (
        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--fg-3)", flexShrink: 0 }}>
          waved
        </span>
      )}
    </div>
  );
}

function GhostCard({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      style={{
        background: "var(--bg-elev-1)",
        borderRadius: 16,
        height: 68,
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        gap: 12,
        opacity,
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--bg-elev-2)", flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ width: 72, height: 10, borderRadius: 4, background: "var(--fg-5)" }} />
        <div style={{ width: 110, height: 8, borderRadius: 4, background: "var(--fg-5)" }} />
      </div>
      <div style={{ width: 60, height: 28, borderRadius: 999, background: "var(--bg-elev-2)", border: "1px solid var(--fg-5)", flexShrink: 0 }} />
    </div>
  );
}

export default function WavesPage() {
  // In production this derives from check-in status + vibe state
  const viewState = "active" as ViewState;

  const [people, setPeople] = useState<Person[]>(initialPeople);
  const [liveState, setLiveState] = useState<LiveState>("live");

  function handleWave(id: string) {
    setPeople((prev) => prev.map((p) => (p.id === id ? { ...p, status: "waved" } : p)));
  }

  const incoming = people.filter((p) => p.status === "waved-at-you");
  const hereNow  = people.filter((p) => p.status !== "waved-at-you");

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
      {/* Venue header — shown in active + ghost states */}
      {viewState !== "no-vibe" && (
        <div
          style={{
            background: "var(--bg-elev-1)",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--lime)", flexShrink: 0 }} />
          <div>
            <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--fg-0)" }}>
              Devocion Coffee
            </p>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg-3)" }}>
              here now ·{" "}
              {viewState === "ghost"
                ? "you are a ghost"
                : liveState === "live"
                ? <span style={{ color: "var(--lime)" }}>you are live</span>
                : "you are public"}
            </p>
          </div>
        </div>
      )}

      {/* ── Active state ─────────────────────────────────────── */}
      {viewState === "active" && (
        <main
          id="main-content"
          style={{
            flex: 1,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            overflowY: "auto",
          }}
        >
          {incoming.length > 0 && (
            <>
              <p style={{ margin: "0 0 4px", fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-3)" }}>
                incoming wave
              </p>
              {incoming.map((p) => (
                <PersonCard key={p.id} person={p} onWave={handleWave} />
              ))}
              <p style={{ margin: "8px 0 4px", fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-3)" }}>
                here now
              </p>
            </>
          )}
          {incoming.length === 0 && (
            <p style={{ margin: "0 0 4px", fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-3)" }}>
              here now
            </p>
          )}
          {hereNow.map((p) => (
            <PersonCard key={p.id} person={p} onWave={handleWave} />
          ))}

          {/* Live / go-ghost strip */}
          {liveState === "live" && (
            <div
              style={{
                background: "var(--bg-elev-1)",
                border: "1px solid rgba(215,255,58,0.2)",
                borderRadius: 16,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 4,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--lime)" }}>
                  you're live.
                </p>
                <p style={{ margin: "2px 0 0", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg-2)" }}>
                  people can see you and send waves
                </p>
              </div>
              <button
                onClick={() => setLiveState("ghost-mode")}
                style={{
                  height: 32,
                  padding: "0 14px",
                  borderRadius: 999,
                  background: "var(--bg-elev-2)",
                  border: "1px solid var(--fg-4)",
                  color: "var(--fg-2)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: 12,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                go ghost
              </button>
            </div>
          )}
        </main>
      )}

      {/* ── Ghost + No Vibe states ────────────────────────────── */}
      {(viewState === "ghost" || viewState === "no-vibe") && (
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {/* Blurred background cards */}
          <div
            style={{
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              filter: "blur(4px)",
              pointerEvents: "none",
            }}
          >
            <GhostCard opacity={1.0} />
            <GhostCard opacity={0.75} />
            <GhostCard opacity={0.55} />
            <GhostCard opacity={0.35} />
          </div>

          {/* Fade + CTA overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 15%, rgba(10,10,10,0.94) 42%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "0 24px 40px",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 28,
                color: "var(--fg-0)",
                margin: "0 0 8px",
              }}
            >
              {viewState === "ghost" ? "you're a ghost." : "waves are live."}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--fg-2)",
                margin: "0 0 28px",
                lineHeight: 1.5,
              }}
            >
              {viewState === "ghost"
                ? "people are here. they just can't see you."
                : "drop a vibe to unlock who's here."}
            </p>
            <Link
              href={viewState === "no-vibe" ? "/app/add-vibe" : "#"}
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
              {viewState === "ghost" ? "go public" : "drop a vibe"}
            </Link>
          </div>
        </div>
      )}

      <TabBar hasWaveNotification={incoming.length > 0} />
    </div>
  );
}
