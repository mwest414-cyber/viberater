"use client";

import Link from "next/link";
import { useState } from "react";
import TabBar, { TAB_BAR_HEIGHT } from "@/components/TabBar";

function ToggleRow({
  label,
  sublabel,
  defaultOn = false,
}: {
  label: string;
  sublabel?: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);

  return (
    <button
      onClick={() => setOn((v) => !v)}
      style={{
        width: "100%",
        background: "var(--bg-elev-1)",
        border: "none",
        borderRadius: 14,
        padding: "16px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--fg-0)" }}>
          {label}
        </p>
        {sublabel && (
          <p style={{ margin: "2px 0 0", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg-3)", lineHeight: 1.4 }}>
            {sublabel}
          </p>
        )}
      </div>
      <div
        style={{
          width: 44,
          height: 26,
          borderRadius: 999,
          background: on ? "var(--lime)" : "var(--bg-elev-2)",
          border: on ? "none" : "1px solid var(--fg-4)",
          position: "relative",
          flexShrink: 0,
          transition: "background 0.15s",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: on ? 3 : 2,
            left: on ? 20 : 2,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: on ? "#0A0A0A" : "var(--fg-3)",
            transition: "left 0.15s",
          }}
        />
      </div>
    </button>
  );
}

export default function SettingsPrivacyPage() {
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
      <div style={{ padding: "20px 20px 8px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <Link
          href="/app/you"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            color: "var(--fg-0)",
            textDecoration: "none",
            lineHeight: 1,
            padding: "8px 8px 8px 0",
          }}
        >
          ←
        </Link>
        <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--fg-0)" }}>
          privacy
        </h1>
      </div>

      <main
        id="main-content"
        style={{ flex: 1, padding: "12px 20px", display: "flex", flexDirection: "column", gap: 10 }}
      >
        <ToggleRow
          label="public profile"
          sublabel="others can see your vibe history"
          defaultOn={true}
        />
        <ToggleRow
          label="ghost mode"
          sublabel="check in silently — waves disabled"
          defaultOn={false}
        />

        {/* Danger zone */}
        <div style={{ marginTop: 16 }}>
          <button
            style={{
              width: "100%",
              background: "none",
              border: "1px solid rgba(255, 90, 60, 0.3)",
              borderRadius: 14,
              padding: "16px 16px",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--coral)" }}>
              delete account
            </p>
            <p style={{ margin: "2px 0 0", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--fg-3)" }}>
              permanently remove your data
            </p>
          </button>
        </div>
      </main>

      <TabBar active="you" />
    </div>
  );
}
