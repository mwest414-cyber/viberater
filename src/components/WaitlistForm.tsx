"use client";

import { useState, useRef, useEffect } from "react";

type State = "idle" | "loading" | "success" | "error";

const MC_POST_URL = "https://getviberater.us15.list-manage.com/subscribe/post";
const MC_U = "afd516bac6774f4d9e3c7e383";
const MC_ID = "2b1625bdda";

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

function CityInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleChange(v: string) {
    onChange(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (v.trim().length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cities?q=${encodeURIComponent(v.trim())}`);
        const data = await res.json();
        const s: string[] = data.suggestions ?? [];
        setSuggestions(s);
        setOpen(s.length > 0);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
        setOpen(false);
      }
    }, 200);
  }

  function select(city: string) {
    onChange(city);
    setSuggestions([]);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      select(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const showDropdown = open && suggestions.length > 0;

  return (
    <div ref={wrapperRef} style={{ position: "relative", flex: 1 }}>
      <input
        ref={inputRef}
        id="waitlist-city"
        type="text"
        required
        placeholder="your city"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label="Your city"
        autoComplete="off"
        style={{
          ...inputStyle,
          width: "100%",
          borderRadius: showDropdown ? "12px 12px 0 0" : 12,
          borderBottomColor: showDropdown ? "transparent" : "var(--fg-4)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--lime)";
          e.currentTarget.style.boxShadow = "0 0 0 2px rgba(215,255,58,0.2)";
          if (suggestions.length > 0) setOpen(true);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--fg-4)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      {showDropdown && (
        <ul
          role="listbox"
          aria-label="City suggestions"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            margin: 0,
            padding: 0,
            listStyle: "none",
            background: "var(--bg-elev-1)",
            border: "1px solid var(--lime)",
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            zIndex: 50,
            overflow: "hidden",
          }}
        >
          {suggestions.map((city, i) => (
            <li
              key={city}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={(e) => { e.preventDefault(); select(city); }}
              onMouseEnter={() => setActiveIndex(i)}
              style={{
                padding: "10px 16px",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: i === activeIndex ? "#0A0A0A" : "var(--fg-1)",
                background: i === activeIndex ? "var(--lime)" : "transparent",
                cursor: "pointer",
                transition: "background var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out)",
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
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

    const normalized = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setState("error");
      return;
    }

    const [firstName, ...rest] = (name ?? "").trim().split(" ");
    const lastName = rest.join(" ");

    try {
      await fetch(MC_POST_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          u: MC_U,
          id: MC_ID,
          EMAIL: normalized,
          FNAME: firstName || normalized,
          LNAME: lastName,
          CITY: city.trim(),
        }).toString(),
      });
      setState("success");
      setName("");
      setEmail("");
      setCity("");
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
          <div style={{ flex: 1 }}>
            <Input
              id="waitlist-name"
              placeholder="your name"
              value={name}
              onChange={(v) => { setName(v); setState("idle"); }}
              ariaLabel="Your name"
              autoComplete="name"
            />
          </div>
          <CityInput value={city} onChange={(v) => { setCity(v); setState("idle"); }} />
        </div>
        <Input
          id="waitlist-email"
          type="email"
          placeholder="your email"
          value={email}
          onChange={(v) => { setEmail(v); setState("idle"); }}
          hasError={state === "error"}
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
        {state === "error" && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--coral)", letterSpacing: "0.02em" }}>
            that didn&apos;t work. shake the phone, try again.
          </p>
        )}
      </div>
    </div>
  );
}
