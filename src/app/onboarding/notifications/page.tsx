"use client";

import ScreenFooter from "@/components/ScreenFooter";

export default function OnboardingNotificationsPage() {
  function requestNotifications() {
    if (typeof Notification !== "undefined") {
      Notification.requestPermission();
    }
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      {/* Sonar rings with coral center */}
      <div style={{ position: "relative", height: 420, flexShrink: 0 }}>
        {/* Outer ring — 280px, lowest opacity (fades outward from center) */}
        <div
          style={{
            position: "absolute",
            left: 55,
            top: 70,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(255, 90, 60, 0.03)",
            border: "1.5px solid rgba(255, 90, 60, 0.09)",
          }}
        />
        {/* Mid ring — 230px */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 95,
            width: 230,
            height: 230,
            borderRadius: "50%",
            background: "rgba(255, 90, 60, 0.05)",
            border: "1.5px solid rgba(255, 90, 60, 0.15)",
          }}
        />
        {/* Inner ring — 180px, highest opacity */}
        <div
          style={{
            position: "absolute",
            left: 105,
            top: 120,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(255, 90, 60, 0.08)",
            border: "1.5px solid rgba(255, 90, 60, 0.24)",
          }}
        />
        {/* Coral dot — notifications = coral */}
        <div
          style={{
            position: "absolute",
            left: 185,
            top: 200,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "var(--coral)",
          }}
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1, padding: "0 24px" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 32,
            color: "var(--fg-0)",
            margin: "0 0 16px",
            lineHeight: 1.1,
          }}
        >
          don't miss a wave.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "var(--fg-3)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          we'll ping you when someone waves at you. that's it. no spam.
        </p>
      </div>

      <ScreenFooter
        secondaryText="maybe later"
        ctaLabel="turn on notifications"
        onCta={requestNotifications}
      />
    </div>
  );
}
