"use client";

import Link from "next/link";
import { useState } from "react";
import LogoMark from "./LogoMark";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: "rgba(10,10,10,0.75)",
        backdropFilter: "blur(20px) saturate(140%)",
        borderBottom: "1px solid var(--fg-4)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark size={28} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "-0.03em",
              color: "var(--fg-0)",
            }}
          >
            viberater
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7">
          {[
            { href: "/about", label: "about" },
            { href: "/faq", label: "faq" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--fg-3)",
                textDecoration: "none",
                transition: `color var(--dur-micro) var(--ease-out)`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-3)")}
            >
              {label}
            </Link>
          ))}
          <a
            href="#waitlist"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 14,
              background: "var(--lime)",
              color: "#0A0A0A",
              padding: "8px 18px",
              borderRadius: 999,
              textDecoration: "none",
              transition: `background var(--dur-micro) var(--ease-out)`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--lime-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--lime)")}
          >
            get early access
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          style={{ color: "var(--fg-3)" }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          aria-label="Mobile navigation"
          style={{ borderTop: "1px solid var(--fg-5)", background: "var(--bg-elev-1)" }}
          className="md:hidden px-6 py-5 flex flex-col gap-5"
        >
          <Link href="/about" style={{ color: "var(--fg-3)", fontSize: 15 }} onClick={() => setOpen(false)}>about</Link>
          <Link href="/faq" style={{ color: "var(--fg-3)", fontSize: 15 }} onClick={() => setOpen(false)}>faq</Link>
          <a
            href="#waitlist"
            style={{ color: "var(--lime)", fontWeight: 600, fontSize: 15 }}
            onClick={() => setOpen(false)}
          >
            get early access
          </a>
        </div>
      )}
    </header>
  );
}
