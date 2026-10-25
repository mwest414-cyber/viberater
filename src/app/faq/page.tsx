import type { Metadata } from "next";
import { shareMeta } from "@/lib/shareMeta";

import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import JsonLd from "@/components/JsonLd";
import ScrollReveals from "@/components/ScrollReveals";
import { Glow, eyebrow, sectionTitle } from "@/components/HomeSections";

// Layout and copy from Figma "🧪 FAQ page" (approved by Mark 2026-10-10).

const title = "viberater faq: how it works, which places, when it launches";
const description =
  "answers to common questions about viberater: what a vibe is, which places it covers, who can see you, where it starts, whether it's free, and how to get early access.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/faq" },
  ...shareMeta({ title, description, path: "/faq" }),
};

type Faq = { q: string; a: string };

const GROUPS: { id: string; title: string; items: Faq[] }[] = [
  {
    id: "basics",
    title: "the basics",
    items: [
      {
        q: "what is viberater?",
        a: "viberater shows you what a place feels like right now, before you walk in. people inside share the energy and a few vibe tags. you get the read.",
      },
      {
        q: "what's a vibe?",
        a: "one energy word (chill, lively, buzzing, packed or electric) plus up to five tags from 36 across crowd, mood and scene. it takes about ten seconds.",
      },
      {
        q: "what kinds of places?",
        a: "third spaces: bars, restaurants, cafés, clubs, outdoor dining, hotel lobbies, gyms, barbers and salons, bookstores and record shops, libraries, museums, parks, plazas and sports courts.",
      },
      {
        q: "how fresh is it?",
        a: "every vibe fades over six hours, so the read is always about tonight. the room resets at 5am.",
      },
    ],
  },
  {
    id: "using-it",
    title: "using it",
    items: [
      {
        q: "do i have to be there to drop a vibe?",
        a: "yes. your phone confirms you're inside the place first, so every vibe comes from someone in the room.",
      },
      {
        q: "how often can i drop a vibe?",
        a: "once every 90 minutes at the same place. you can drop vibes at different places as often as you like.",
      },
      {
        q: "can i add a place?",
        a: "places come from public map data, so everyone sees the same list. if somewhere is missing, email hello@getviberater.co.",
      },
    ],
  },
  {
    id: "people-and-privacy",
    title: "people and privacy",
    items: [
      {
        q: "who can see that i'm here?",
        a: "only people who are seen at the same place. dropping a vibe makes you seen there, and the app tells you right away. go ghost any time and you're invisible.",
      },
      {
        q: "what's a wave?",
        a: "a quick hello to someone in the same room. you both get a notification. a wave lasts while you're both there, and the rest happens in person.",
      },
      { q: "how old do i need to be?", a: "17 or older." },
      {
        q: "can i delete my account?",
        a: "yes, any time, in settings. your profile, vibes, photo and waves are deleted with it.",
      },
    ],
  },
  {
    id: "launch",
    title: "launch",
    items: [
      { q: "when does it launch?", a: "we're building now. waitlist members get in first." },
      {
        q: "which cities?",
        a: "starting with nyc and branching out based on local demand. join the waitlist and we'll tell you when your city goes live.",
      },
      { q: "iphone and android?", a: "iphone first, in a small nyc beta. android comes after." },
      { q: "is it free?", a: "yes. the core experience is free." },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GROUPS.flatMap((g) => g.items).map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <main id="main-content" className="flex-1">
        <section className="relative px-6 pt-36 md:pt-44 pb-24">
          <Glow style={{ top: -140, left: "75%", width: 700, height: 520, background: "radial-gradient(ellipse at center, rgba(215,255,58,0.14) 0%, transparent 70%)" }} />
          <div className="relative mx-auto max-w-[760px] flex flex-col gap-12">
            <header className="flex flex-col gap-5">
              <p className="animate-fade-up" style={eyebrow}>faq</p>
              <h1
                className="animate-fade-up delay-100"
                style={{ ...sectionTitle, fontSize: "clamp(42px, 7vw, 64px)", lineHeight: 1.02 }}
              >
                questions, answered.
              </h1>
              <p className="animate-fade-up delay-200" style={{ fontSize: 18, color: "var(--fg-3)" }}>
                how viberater works, who sees what, and when it opens.
              </p>
              <nav aria-label="faq sections" className="animate-fade-up delay-300 flex flex-wrap gap-2 mt-2">
                {GROUPS.map((g) => (
                  <a
                    key={g.id}
                    href={`#${g.id}`}
                    className="faq-chip"
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--fg-0)",
                      padding: "8px 14px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      textDecoration: "none",
                    }}
                  >
                    {g.title}
                  </a>
                ))}
              </nav>
            </header>

            {GROUPS.map((g) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-heading`} className="flex flex-col gap-3" style={{ scrollMarginTop: 96 }}>
                <h2
                  id={`${g.id}-heading`}
                  style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-3)" }}
                >
                  {g.title}
                </h2>
                <div data-reveal className="glass rounded-[20px] overflow-hidden">
                  {g.items.map((f, i) => (
                    <details key={f.q} className="faq-item" open={i === 0} style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                      <summary>
                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, letterSpacing: "-0.01em", color: "var(--fg-0)", lineHeight: 1.3 }}>
                          {f.q}
                        </h3>
                        <span aria-hidden="true" className="faq-sign" />
                      </summary>
                      <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--fg-3)", padding: "0 24px 22px" }}>{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="relative px-6 pb-28">
          <Glow style={{ top: -40, width: 760, height: 380, background: "radial-gradient(ellipse at center, rgba(215,255,58,0.12) 0%, transparent 70%)" }} />
          <div data-reveal className="relative mx-auto max-w-xl flex flex-col items-center gap-3 text-center">
            <h2 style={{ ...sectionTitle, fontSize: "clamp(32px, 4.5vw, 40px)" }}>still curious?</h2>
            <p style={{ fontSize: 17, color: "var(--fg-3)" }}>
              email{" "}
              <a href="mailto:hello@getviberater.co" style={{ color: "var(--lime)", textDecoration: "none" }}>
                hello@getviberater.co
              </a>
              , or get on the list.
            </p>
            <div id="waitlist" className="glass w-full max-w-[488px] rounded-3xl p-5 flex justify-center mt-4" style={{ scrollMarginTop: "96px" }}>
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>
      <ScrollReveals />
      <Footer />
    </>
  );
}
