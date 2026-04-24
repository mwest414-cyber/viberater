import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--fg-5)", marginTop: "auto" }}>
      <div
        className="mx-auto max-w-5xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--fg-3)" }}
      >
        <p>© {new Date().getFullYear()} viberater</p>
        <nav className="flex gap-6">
          <Link href="/about" style={{ color: "var(--fg-3)" }} className="hover:text-fg-1 transition-colors">about</Link>
          <Link href="/faq" style={{ color: "var(--fg-3)" }} className="hover:text-fg-1 transition-colors">faq</Link>
          <a href="mailto:hello@getviberater.co" style={{ color: "var(--fg-3)" }} className="hover:text-fg-1 transition-colors">contact</a>
          <Link href="/privacy" style={{ color: "var(--fg-3)" }} className="hover:text-fg-1 transition-colors">privacy</Link>
          <Link href="/terms" style={{ color: "var(--fg-3)" }} className="hover:text-fg-1 transition-colors">terms</Link>
        </nav>
      </div>
    </footer>
  );
}
