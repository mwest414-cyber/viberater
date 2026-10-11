import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--fg-5)", marginTop: "auto" }}>
      <div
        className="mx-auto max-w-5xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--fg-3)" }}
      >
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
          <p>© {new Date().getFullYear()} viberater</p>
          <nav aria-label="legal" className="flex gap-6">
            <Link href="/privacy" className="footer-link">privacy</Link>
            <Link href="/terms" className="footer-link">terms</Link>
          </nav>
        </div>
        <nav aria-label="footer" className="flex items-center gap-6">
          <Link href="/about" className="footer-link">about</Link>
          <Link href="/faq" className="footer-link">faq</Link>
          <Link href="/blog" className="footer-link">blog</Link>
          <a href="mailto:hello@getviberater.co" className="footer-link">contact</a>
          <a
            href="https://www.instagram.com/viberater_app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="viberater on Instagram"
            style={{ display: "inline-flex", alignItems: "center" }}
            className="footer-link"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
}
