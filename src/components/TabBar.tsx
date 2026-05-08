"use client";

import Link from "next/link";

export type ActiveTab = "nearby" | "map" | "saved" | "you";

interface TabBarProps {
  active?: ActiveTab;
  hasWaveNotification?: boolean;
}

export const TAB_BAR_HEIGHT = 64;

const tabs: { id: ActiveTab; label: string; icon: string; href: string }[] = [
  { id: "nearby", label: "nearby", icon: "◎", href: "/app/nearby" },
  { id: "map",    label: "map",    icon: "◈", href: "/app/map"    },
  { id: "saved",  label: "saved",  icon: "♡", href: "/app/saved"  },
  { id: "you",    label: "you",    icon: "◉", href: "/app/you"    },
];

export default function TabBar({ active, hasWaveNotification = true }: TabBarProps) {
  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: TAB_BAR_HEIGHT,
        display: "flex",
        borderTop: "1px solid var(--fg-5)",
        background: "var(--bg)",
        zIndex: 50,
      }}
    >
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            textDecoration: "none",
            color: active === tab.id ? "var(--fg-0)" : "var(--fg-3)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            transition: "color var(--dur-micro) var(--ease-out)",
          }}
        >
          <span style={{ position: "relative", fontSize: 18, lineHeight: 1 }}>
            {tab.icon}
            {tab.id === "you" && hasWaveNotification && (
              <span
                aria-label="pending waves"
                style={{
                  position: "absolute",
                  top: 0,
                  right: -3,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--coral)",
                }}
              />
            )}
          </span>
          <span>{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}
