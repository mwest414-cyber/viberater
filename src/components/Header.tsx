"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoMark from "./LogoMark";

const NAV = [
  { href: "/about", label: "about" },
  { href: "/faq", label: "faq" },
  { href: "/blog", label: "blog" },
];

// Pulsing lime dot shown next to a tapped menu link while its page is still loading.
function PendingDot() {
  const { pending } = useLinkStatus();
  return <span aria-hidden="true" className={`nav-pending ${pending ? "is-pending" : ""}`} />;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  // The menu remembers the page it was opened on, so it closes by itself once the new page is showing.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const close = () => setOpenedOn(null);

  // Load the menu pages in the background right away. On desktop the links are on screen and
  // Next does this itself; on phones the links only exist once the menu opens, which was too late.
  useEffect(() => {
    NAV.forEach(({ href }) => router.prefetch(href));
  }, [router]);

  return (
    <header className="site-header fixed top-3 inset-x-0 z-50 px-3 md:px-6">
      <div
        className={`glass glass-float mx-auto max-w-[860px] ${open ? "rounded-3xl" : "rounded-[28px]"}`}
        // darker than the other glass: large headlines scroll under it. The open menu is near solid so links stay readable
        style={{ background: open ? "rgba(10, 10, 10, 0.97)" : "rgba(10, 10, 10, 0.72)" }}
      >
      <div className="pl-5 pr-3 flex items-center justify-between h-14">
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
          {NAV.map(({ href, label }) => (
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
          <Link
            href="/#waitlist"
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
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setOpenedOn(open ? null : pathname)}
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
        <nav
          id="mobile-nav"
          aria-label="mobile navigation"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          className="md:hidden px-6 py-5 flex flex-col gap-5"
        >
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="mobile-nav-link flex items-center gap-2.5"
              style={{ color: "var(--fg-3)", fontSize: 15 }}
              // stays open until the new page shows (see openedOn); tapping the page you're on just closes it
              onClick={() => {
                if (href === pathname) close();
              }}
            >
              {label}
              <PendingDot />
            </Link>
          ))}
          <Link
            href="/#waitlist"
            style={{ color: "var(--lime)", fontWeight: 600, fontSize: 15 }}
            onClick={close}
          >
            get early access
          </Link>
        </nav>
      )}
      </div>
    </header>
  );
}
