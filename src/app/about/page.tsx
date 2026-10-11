import type { Metadata } from "next";
import { shareMeta } from "@/lib/shareMeta";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import ScrollReveals from "@/components/ScrollReveals";
import SonarRings from "@/components/SonarRings";
import { Glow, eyebrow, sectionTitle } from "@/components/HomeSections";

// Layout from Figma "🧪 About page" (approved by Mark 2026-10-10).

const title = "about viberater: the vibe app for real venues";
const description =
  "viberater reads real third spaces (bars, cafés, dives, rooftops, record shops) by energy and vibe tags, so you know before you go.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  ...shareMeta({ title, description, path: "/about" }),
};

// Same captions as the homepage energy slider.
const ENERGY = [
  { word: "chill", color: "var(--energy-chill)", caption: "easy, room to talk." },
  { word: "lively", color: "var(--energy-lively)", caption: "people around, good energy." },
  { word: "buzzing", color: "var(--energy-buzzing)", caption: "picking up. it's turning into a scene." },
  { word: "packed", color: "var(--energy-packed)", caption: "shoulder to shoulder." },
  { word: "electric", color: "var(--energy-electric)", caption: "the night is happening here." },
];

const TAG_GROUPS = [
  { group: "crowd", tags: ["locals", "date night", "lgbtq"] },
  { group: "mood", tags: ["cozy", "dimly lit", "main character"] },
  { group: "scene", tags: ["dive", "live music", "rooftop"] },
];

const label: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--fg-3)",
};

const tileTitle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 24,
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
  color: "var(--fg-0)",
};

const tileBody: CSSProperties = { fontSize: 15, lineHeight: 1.55, color: "var(--fg-3)" };

const chip: CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: "var(--fg-0)",
  padding: "6px 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.14)",
  whiteSpace: "nowrap",
};

function Rule({ title, body, visual, index }: { title: string; body: string; visual: ReactNode; index: number }) {
  return (
    <div
      data-reveal
      className="glass rounded-3xl p-7 flex flex-col sm:flex-row gap-6 sm:items-center justify-between min-w-0"
      style={{ ["--reveal-i" as string]: index }}
    >
      <div className="flex flex-col gap-3 min-w-0 sm:max-w-[60%]">
        <h3 style={{ ...tileTitle, fontSize: 26 }}>{title}</h3>
        <p style={tileBody}>{body}</p>
      </div>
      <div className="shrink-0">{visual}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <main id="main-content" className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative px-6 pt-36 pb-16 md:pt-44 md:pb-24">
          <Glow style={{ top: -120, left: "78%", width: 720, height: 560, background: "radial-gradient(ellipse at center, rgba(215,255,58,0.16) 0%, transparent 70%)" }} />
          <div className="relative mx-auto max-w-5xl flex flex-col gap-6">
            <p className="animate-fade-up" style={eyebrow}>about</p>
            <h1
              className="animate-fade-up delay-100"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(52px, 10vw, 88px)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "var(--fg-0)",
              }}
            >
              know before
              <br />
              you go.
            </h1>
            <div className="animate-fade-up delay-200 flex flex-col gap-5" style={{ fontSize: "clamp(18px, 2.2vw, 22px)", lineHeight: 1.55, color: "var(--fg-3)", maxWidth: 560 }}>
              <p>you pick a bar. make the trip. wait in line. push open the door. wrong room. you turn around.</p>
              <p>viberater fixes that.</p>
            </div>
          </div>
        </section>

        {/* ── The room, right now ──────────────────────────────── */}
        <section aria-labelledby="room-heading" className="px-6 py-16 md:py-24">
          <div data-reveal className="mx-auto max-w-5xl grid md:grid-cols-[1.25fr_1fr] gap-8 md:gap-20 items-start">
            <div className="flex flex-col gap-4 min-w-0">
              <p style={eyebrow}>the room, right now</p>
              <h2 id="room-heading" style={{ ...sectionTitle, fontSize: "clamp(30px, 4.4vw, 44px)" }}>
                star ratings tell you about the place. we tell you about the room.
              </h2>
            </div>
            <p className="md:pt-10" style={{ fontSize: 18, lineHeight: 1.6, color: "var(--fg-3)", maxWidth: 440 }}>
              a great bar can be chill on a tuesday and electric on a saturday. the same spot feels like a date at 7pm and a
              party at 11. the place stays the same. the room changes every hour.
            </p>
          </div>
        </section>

        {/* ── How a vibe works ─────────────────────────────────── */}
        <section aria-labelledby="vibe-heading" className="relative px-6 py-16 md:py-24">
          <Glow style={{ top: 40, width: 760, height: 420, background: "radial-gradient(ellipse at center, rgba(217,106,20,0.12) 0%, transparent 70%)" }} />
          <div className="relative mx-auto max-w-5xl flex flex-col gap-10">
            <div data-reveal className="flex flex-col items-center gap-3 text-center">
              <p style={eyebrow}>how a vibe works</p>
              <h2 id="vibe-heading" style={{ ...sectionTitle, fontSize: "clamp(28px, 4vw, 44px)" }}>
                one word, up to five tags, ten seconds.
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              <ul className="grid grid-cols-2 md:grid-cols-5 gap-3" aria-label="the five energy words">
                {ENERGY.map((e, i) => (
                  <li
                    key={e.word}
                    data-reveal
                    className={`glass rounded-2xl p-5 flex flex-col gap-3 min-w-0 ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
                    style={{ ["--reveal-i" as string]: i }}
                  >
                    <span aria-hidden="true" style={{ height: 6, borderRadius: 3, background: e.color }} />
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", color: e.color }}>
                      {e.word}
                    </span>
                    <span style={{ fontSize: 14, lineHeight: 1.5, color: "var(--fg-3)" }}>{e.caption}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-4)" }}>energy: pick exactly one, every time</p>
            </div>

            <div className="grid md:grid-cols-[1.6fr_1fr] gap-4">
              <div data-reveal className="glass rounded-3xl p-7 flex flex-col gap-3 min-w-0">
                <span style={label}>tags</span>
                <h3 style={tileTitle}>36 tags across crowd, mood and scene. pick up to five.</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  {TAG_GROUPS.map((g) => (
                    <div key={g.group} className="flex flex-col gap-2 min-w-0">
                      <span style={{ ...label, color: "var(--fg-4)" }}>{g.group}</span>
                      <ul className="flex flex-wrap sm:flex-col items-start gap-2">
                        {g.tags.map((t) => (
                          <li key={t} style={chip}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div data-reveal className="glass rounded-3xl p-7 flex flex-col gap-3 min-w-0" style={{ ["--reveal-i" as string]: 1 }}>
                <span style={label}>fresh</span>
                <h3 style={tileTitle}>tonight is about tonight.</h3>
                <p style={tileBody}>every vibe fades over six hours, and the room resets at 5am.</p>
                <div className="mt-auto pt-6" aria-hidden="true">
                  <div style={{ height: 8, borderRadius: 4, background: "linear-gradient(90deg, var(--energy-buzzing), rgba(217,106,20,0.05))" }} />
                  <div className="flex justify-between mt-2" style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>
                    <span style={{ color: "var(--fg-3)" }}>dropped</span>
                    <span style={{ color: "var(--fg-4)" }}>6h later</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it's built ───────────────────────────────────── */}
        <section aria-labelledby="rules-heading" className="relative px-6 py-16 md:py-24">
          <Glow style={{ top: 120, width: 1000, height: 620, background: "radial-gradient(ellipse at center, rgba(215,255,58,0.10) 0%, transparent 70%)" }} />
          <div className="relative mx-auto max-w-5xl flex flex-col gap-10">
            <div data-reveal className="flex flex-col items-center gap-3 text-center">
              <p style={eyebrow}>how it&apos;s built</p>
              <h2 id="rules-heading" style={{ ...sectionTitle, fontSize: "clamp(28px, 4vw, 44px)" }}>
                four rules we build around.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Rule
                index={0}
                title="only from inside"
                body="you can only drop a vibe where you actually are. your phone checks first."
                visual={<SonarRings size={120} />}
              />
              <Rule
                index={1}
                title="right now first"
                body={'live energy sits on top. patterns like "usually on thursdays" sit underneath.'}
                visual={
                  <div className="flex flex-col gap-1" aria-hidden="true">
                    <span style={{ ...label, color: "var(--fg-4)" }}>right now</span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--energy-buzzing)" }}>buzzing</span>
                    <span className="mt-2" style={{ ...label, color: "var(--fg-4)" }}>usually on thursdays</span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--energy-lively)" }}>lively</span>
                  </div>
                }
              />
              <Rule
                index={0}
                title="made to get you out the door"
                body="wave at someone in the same room. the rest happens in person."
                visual={
                  <div className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-3" aria-hidden="true">
                    <span style={{ width: 8, height: 8, borderRadius: 4, background: "var(--coral)" }} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fg-0)", whiteSpace: "nowrap" }}>alex waved at you</span>
                  </div>
                }
              />
              <Rule
                index={1}
                title="every kind of third place"
                body="bars, cafés, dives, rooftops, parks, libraries, record shops, barbers, gyms. anywhere you spend time that isn't home or work."
                visual={
                  <ul className="grid grid-cols-2 gap-2" aria-hidden="true">
                    {["bar", "café", "park", "library", "barber", "gym"].map((p) => (
                      <li key={p} style={{ ...chip, fontSize: 12, padding: "5px 10px", textAlign: "center", border: "none" }}>
                        {p}
                      </li>
                    ))}
                  </ul>
                }
              />
            </div>
          </div>
        </section>

        {/* ── Who it's for ─────────────────────────────────────── */}
        <section aria-labelledby="for-heading" className="px-6 py-16 md:py-24">
          <div data-reveal className="mx-auto max-w-3xl flex flex-col items-center gap-5 text-center">
            <h2 id="for-heading" style={eyebrow}>who it&apos;s for</h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(24px, 3.4vw, 34px)",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                color: "var(--fg-0)",
                textWrap: "balance",
              }}
            >
              people who care about atmosphere. the ones who&apos;d rather know it&apos;s a loud dive before they show up in a
              blazer. the ones who want something chill on a tuesday and something packed on a friday.
            </p>
          </div>
        </section>

        {/* ── Close ────────────────────────────────────────────── */}
        <section className="relative px-6 pt-16 pb-28">
          <Glow style={{ top: 20, width: 760, height: 380, background: "radial-gradient(ellipse at center, rgba(215,255,58,0.12) 0%, transparent 70%)" }} />
          <div data-reveal className="relative mx-auto max-w-xl flex flex-col items-center gap-3 text-center">
            <h2 style={{ ...sectionTitle, fontSize: "clamp(36px, 5vw, 52px)" }}>starting in nyc.</h2>
            <p style={{ fontSize: 18, color: "var(--fg-3)" }}>get early access.</p>
            <div id="waitlist" className="glass w-full max-w-[488px] rounded-3xl p-5 flex justify-center mt-4" style={{ scrollMarginTop: "96px" }}>
              <WaitlistForm />
            </div>
            <nav aria-label="read more" className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-8" style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
              <span style={{ color: "var(--fg-4)" }}>read more:</span>
              <Link href="/faq" style={{ color: "var(--fg-3)" }}>faq</Link>
              <Link href="/blog/why-we-built-viberater" style={{ color: "var(--fg-3)" }}>why we built viberater</Link>
              <Link href="/blog/what-is-a-vibe" style={{ color: "var(--fg-3)" }}>what is a vibe, anyway?</Link>
            </nav>
          </div>
        </section>
      </main>
      <ScrollReveals />
      <Footer />
    </>
  );
}
