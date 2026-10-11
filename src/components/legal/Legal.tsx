import type { CSSProperties, ReactNode } from "react";

import { Glow, eyebrow } from "@/components/HomeSections";
import LegalToc from "./LegalToc";

// Building blocks for the privacy and terms pages (Figma "🧪 Legal pages", approved by Mark 2026-10-10).
// The legal text itself lives in each page and is unchanged; these only set the look.

const mono: CSSProperties = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" };

export function LegalPage({
  title,
  subtitle,
  chips,
  toc,
  children,
}: {
  title: string;
  subtitle: string;
  chips: string[];
  toc: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <main id="main-content" className="flex-1">
      <section className="relative px-6 pt-36 md:pt-44 pb-24">
        <Glow style={{ top: -140, left: "75%", width: 700, height: 520, background: "radial-gradient(ellipse at center, rgba(215,255,58,0.14) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[960px] flex flex-col gap-14">
          <header className="flex flex-col gap-3.5">
            <p className="animate-fade-up" style={eyebrow}>legal</p>
            <h1
              className="animate-fade-up delay-100"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(42px, 7vw, 64px)", lineHeight: 1.02, letterSpacing: "-0.03em", color: "var(--fg-0)" }}
            >
              {title}
            </h1>
            <p className="animate-fade-up delay-200" style={{ fontSize: 18, color: "var(--fg-3)" }}>{subtitle}</p>
            <ul className="animate-fade-up delay-300 flex flex-wrap gap-2 pt-2.5">
              {chips.map((c, i) => (
                <li
                  key={c}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: i === 0 ? "var(--lime)" : "var(--fg-3)",
                    padding: "8px 14px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </header>

          <div className="grid gap-12 md:grid-cols-[240px_minmax(0,1fr)] items-start">
            <aside className="md:sticky md:top-24">
              <LegalToc items={toc} />
            </aside>
            <div className="flex flex-col gap-14 min-w-0">{children}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function Section({ id, num, title, children }: { id?: string; num?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-4" style={{ scrollMarginTop: 96 }}>
      {num ? (
        <h2 className="flex items-baseline gap-3.5">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--lime)" }}>{num}</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 30px)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--fg-0)" }}>
            {title}
          </span>
        </h2>
      ) : (
        <h2 style={{ ...mono, color: "var(--fg-3)" }}>{title}</h2>
      )}
      {children}
    </section>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, letterSpacing: "-0.01em", lineHeight: 1.3, color: "var(--fg-0)", marginTop: 8 }}>
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: 16, lineHeight: "27px", color: "#B0B0B0" }}>{children}</p>;
}

// Lime emphasis, used where the old pages had lime bold text.
export function Em({ children }: { children: ReactNode }) {
  return <strong style={{ color: "var(--lime)", fontWeight: 600 }}>{children}</strong>;
}

export function Label({ children, color = "var(--fg-3)" }: { children: ReactNode; color?: string }) {
  return <p style={{ ...mono, color }}>{children}</p>;
}

export function Notice({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="glass relative overflow-hidden rounded-[20px] py-5 pl-7 pr-6 flex flex-col gap-2">
      <span aria-hidden="true" className="absolute left-0 top-0 bottom-0" style={{ width: 3, background: "var(--coral)" }} />
      <h4 style={{ ...mono, color: "var(--coral)" }}>{label}</h4>
      {children}
    </div>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3" style={{ fontSize: 16, lineHeight: "27px", color: "#B0B0B0" }}>
          <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 3, background: "var(--lime)", flexShrink: 0, marginTop: 10.5 }} />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Card({ children, gap = 20 }: { children: ReactNode; gap?: number }) {
  return (
    <div className="glass rounded-[20px] p-6 flex flex-col" style={{ gap }}>
      {children}
    </div>
  );
}

export function Group({ label, items }: { label: string; items: ReactNode[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 style={{ ...mono, color: "var(--lime)" }}>{label}</h4>
      <Bullets items={items} />
    </div>
  );
}

export function Table({ head, rows, widths = [] }: { head: string[]; rows: ReactNode[][]; widths?: (number | undefined)[] }) {
  return (
    <div className="glass rounded-[20px] overflow-x-auto">
      <table className="w-full" style={{ borderCollapse: "collapse", minWidth: head.length > 2 ? 480 : undefined }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.04)" }}>
            {head.map((h, i) => (
              <th key={h} scope="col" style={{ ...mono, color: "var(--lime)", fontWeight: 400, textAlign: "left", padding: "14px 20px", width: widths[i] }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {row.map((cell, c) => (
                <td key={c} style={{ padding: "14px 20px", fontSize: 15, lineHeight: "24px", color: "#B0B0B0", verticalAlign: "top" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ContactCard({ title }: { title: string }) {
  const link: CSSProperties = { color: "var(--lime)", textDecoration: "none", fontSize: 16 };
  return (
    <div className="glass rounded-[20px] p-8 flex flex-col items-center gap-1.5 text-center">
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--fg-0)" }}>{title}</h3>
      <p>
        <span className="sr-only">Email: </span>
        <a href="mailto:hello@getviberater.co" style={{ ...link, fontWeight: 500 }}>hello@getviberater.co</a>
      </p>
      <p>
        <span className="sr-only">Website: </span>
        <a href="https://getviberater.co" style={link}>getviberater.co</a>
      </p>
      <p style={{ fontSize: 13, color: "var(--fg-3)" }}>We typically respond within 5 business days</p>
    </div>
  );
}

export function Closing({ line }: { line: string }) {
  return (
    <p className="text-center pt-6" style={{ fontSize: 16, lineHeight: 1.6, color: "var(--fg-3)" }}>
      <strong style={{ color: "var(--lime)", fontWeight: 600 }}>know the vibe before you come inside.</strong>
      <br />
      {line}
    </p>
  );
}
