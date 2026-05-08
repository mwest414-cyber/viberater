"use client";

import { ReactNode } from "react";

interface ScreenFooterProps {
  secondaryText?: string;
  ctaLabel?: string;
  onCta?: () => void;
  children?: ReactNode;
}

export default function ScreenFooter({
  secondaryText,
  ctaLabel,
  onCta,
  children,
}: ScreenFooterProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "0 24px 24px",
      }}
    >
      {secondaryText && (
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--fg-3)",
            textAlign: "center",
          }}
        >
          {secondaryText}
        </p>
      )}

      <button
        onClick={onCta}
        disabled={!ctaLabel}
        style={{
          width: "100%",
          height: 56,
          borderRadius: 999,
          background: ctaLabel ? "var(--lime)" : "var(--bg-elev-1)",
          border: ctaLabel ? "none" : "1px solid var(--fg-4)",
          color: ctaLabel ? "#0A0A0A" : "var(--fg-3)",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: 15,
          cursor: ctaLabel ? "pointer" : "default",
          transition: "background var(--dur-micro) var(--ease-out)",
        }}
        onMouseEnter={(e) => {
          if (ctaLabel) e.currentTarget.style.background = "var(--lime-hover)";
        }}
        onMouseLeave={(e) => {
          if (ctaLabel) e.currentTarget.style.background = "var(--lime)";
        }}
      >
        {ctaLabel ?? "[cta placeholder]"}
      </button>

      {children}
    </div>
  );
}
