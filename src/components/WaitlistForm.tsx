"use client";

import { useState } from "react";

type State = "idle" | "loading" | "success" | "error" | "duplicate";

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 12,
  background: "var(--bg-elev-1)",
  border: "1px solid var(--fg-4)",
  color: "var(--fg-0)",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  outline: "none",
  transition: "border-color var(--dur-micro) var(--ease-out)",
};

function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  hasError,
  ariaLabel,
  ariaDescribedby,
  autoComplete,
}: {
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
  ariaLabel: string;
  ariaDescribedby?: string;
  autoComplete?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      required
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-invalid={hasError ? "true" : undefined}
      autoComplete={autoComplete}
      style={{
        ...inputStyle,
        borderColor: hasError ? "var(--coral)" : "var(--fg-4)",
      }}
      onFocus={(e) => {
        if (!hasError) {
          e.currentTarget.style.borderColor = "var(--lime)";
          e.currentTarget.style.boxShadow = "0 0 0 2px rgba(215,255,58,0.2)";
        }
      }}
      onBlur={(e) => {
        if (!hasError) {
          e.currentTarget.style.borderColor = "var(--fg-4)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    />
  );
}

export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, city }),
      });
      if (res.status === 409) {
        setState("duplicate");
      } else if (!res.ok) {
        setState("error");
      } else {
        setState("success");
        setName("");
        setEmail("");
        setCity("");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-center gap-3 text-center">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: "rgba(215,255,58,0.12)",
            border: "1px solid rgba(215,255,58,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D7FF3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--fg-0)" }}>
          you&apos;re on the list.
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg-3)" }}>
          we&apos;ll reach out before anyone else gets in.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
        <div className="flex gap-2">
          <Input
            id="waitlist-name"
            placeholder="your name"
            value={name}
            onChange={(v) => { setName(v); setState("idle"); }}
            ariaLabel="Your name"
            autoComplete="name"
          />
          <Input
            id="waitlist-city"
            placeholder="your city"
            value={city}
            onChange={(v) => { setCity(v); setState("idle"); }}
            ariaLabel="Your city"
            autoComplete="address-level2"
          />
        </div>
        <Input
          id="waitlist-email"
          type="email"
          placeholder="your email"
          value={email}
          onChange={(v) => { setEmail(v); setState("idle"); }}
          hasError={state === "error" || state === "duplicate"}
          ariaLabel="Your email address"
          ariaDescribedby="waitlist-status"
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          aria-disabled={state === "loading"}
          style={{
            padding: "12px 22px",
            borderRadius: 999,
            background: state === "loading" ? "var(--lime-press)" : "var(--lime)",
            color: "#0A0A0A",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 15,
            border: "none",
            cursor: state === "loading" ? "not-allowed" : "pointer",
            transition: "background var(--dur-micro) var(--ease-out)",
          }}
          onMouseEnter={(e) => { if (state !== "loading") e.currentTarget.style.background = "var(--lime-hover)"; }}
          onMouseLeave={(e) => { if (state !== "loading") e.currentTarget.style.background = "var(--lime)"; }}
        >
          {state === "loading" ? "joining…" : "join the list"}
        </button>
      </form>

      <div id="waitlist-status" role="status" aria-live="polite" aria-atomic="true">
        {state === "duplicate" && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#FFB84D", letterSpacing: "0.02em" }}>
            already on the list. we&apos;ll see you there.
          </p>
        )}
        {state === "error" && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--coral)", letterSpacing: "0.02em" }}>
            that didn&apos;t work. shake the phone, try again.
          </p>
        )}
      </div>
    </div>
  );
}
