"use client";

import { useEffect, useState } from "react";

// Contents list for the privacy and terms pages. Highlights the section currently being read.
// Without IntersectionObserver it is still a plain list of links.
export default function LegalToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // a section counts as "current" once its top passes just under the floating header
      { rootMargin: "-100px 0px -65% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="contents" className="glass rounded-[20px] p-5">
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-3)", paddingBottom: 8 }}>
        contents
      </p>
      <ol className="flex flex-col">
        {items.map((item, i) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className="flex gap-2.5 py-1.5"
                style={{ textDecoration: "none" }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: "20px", color: on ? "var(--lime)" : "var(--fg-3)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 14, lineHeight: "20px", fontWeight: on ? 500 : 400, color: on ? "var(--fg-0)" : "var(--fg-3)" }}>
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
