import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import LogoMark from "@/components/LogoMark";

export const metadata: Metadata = {
  title: "viberater — know the vibe before you come inside",
  description:
    "viberater rates real venues — bars, dives, cafés, rooftops — so you know what you're walking into before you get there.",
};

const TEASER_FEATURES = [
  {
    label: "crowd",
    value: "pretty packed",
    sub: "updated 3m ago",
    lime: true,
  },
  {
    label: "vibe",
    value: "dim · loud · queer",
    sub: "the long goodbye · 0.3 mi",
    lime: false,
  },
  {
    label: "energy",
    value: "buzzing",
    sub: "live right now",
    lime: true,
  },
];

const APP_STORE_ICON = (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const PLAY_STORE_ICON = (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M3.18 23.76c.3.17.64.22.99.13l12.12-6.99-2.54-2.54-10.57 9.4zM.47 1.96C.17 2.3 0 2.8 0 3.44v17.12c0 .64.17 1.14.48 1.48l.08.07 9.59-9.59v-.22L.55 1.89l-.08.07zM20.49 10.46l-2.6-1.5-2.84 2.84 2.84 2.84 2.62-1.51c.75-.43.75-1.13-.02-1.67zM3.18.24l12.12 6.99-2.54 2.54L2.19.37C2.52.06 2.88.07 3.18.24z" />
  </svg>
);

export default function Home() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-1">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 overflow-hidden">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: 600,
              height: 400,
              background: "radial-gradient(ellipse at center, rgba(215,255,58,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
            {/* Eyebrow */}
            <span
              className="animate-fade-up"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--lime)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--lime)",
                  boxShadow: "0 0 8px var(--lime)",
                  flexShrink: 0,
                }}
              />
              coming soon · join the waitlist
            </span>

            {/* Headline */}
            <h1
              className="animate-fade-up delay-100"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(42px, 8vw, 72px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--fg-0)",
              }}
            >
              know the vibe<br />before you come inside.
            </h1>

            <p
              className="animate-fade-up delay-200"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--fg-3)",
                maxWidth: 440,
              }}
            >
              viberater rates real third spaces — bars, cafés, dives, rooftops —
              so you know what you&apos;re walking into. no reviews. no guessing.
            </p>

            <div id="waitlist" className="animate-fade-up delay-300 w-full flex justify-center">
              <WaitlistForm />
            </div>

            <p
              className="animate-fade-up delay-400"
              style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", letterSpacing: "0.04em" }}
            >
              no spam. unsubscribe anytime.
            </p>
          </div>
        </section>

        {/* ── Teaser / locked preview ────────────────────────────── */}
        <section aria-labelledby="teaser-heading" className="px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h2
                id="teaser-heading"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--fg-3)",
                  fontWeight: 400,
                }}
              >
                what&apos;s waiting for you
              </h2>
            </div>

            {/* Cards + lock overlay */}
            <div className="relative">
              <div
                className="absolute inset-0 z-10 flex items-center justify-center"
                style={{ backdropFilter: "blur(3px)" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--fg-2)",
                    background: "var(--bg-elev-2)",
                    border: "1px solid var(--fg-4)",
                    padding: "10px 20px",
                    borderRadius: 999,
                  }}
                >
                  unlocks at launch
                </span>
              </div>

              <div aria-hidden="true" className="grid md:grid-cols-3 gap-4">
                {TEASER_FEATURES.map((f) => (
                  <div
                    key={f.label}
                    style={{
                      background: "var(--bg-elev-1)",
                      border: "1px solid var(--fg-4)",
                      borderRadius: 12,
                      padding: "20px 24px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--fg-3)",
                        marginBottom: 10,
                      }}
                    >
                      {f.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 22,
                        letterSpacing: "-0.02em",
                        color: f.lime ? "var(--lime)" : "var(--fg-0)",
                      }}
                    >
                      {f.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--fg-4)",
                        marginTop: 6,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {f.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────── */}
        <section aria-labelledby="how-it-works-heading" className="px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <h2
              id="how-it-works-heading"
              className="text-center mb-10"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--fg-3)",
                fontWeight: 400,
              }}
            >
              how it works
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { n: "01", title: "pick your city.", body: "open the app anywhere. we surface third spaces around you — bars, cafés, dives, rooftops." },
                { n: "02", title: "read the room.", body: "see crowd level and vibe tags for every spot. no reviews. no stars. just the read." },
                { n: "03", title: "walk in knowing.", body: "dead or buzzing, chill or packed — you know before you get there. that's it." },
              ].map((step) => (
                <div
                  key={step.n}
                  style={{
                    background: "var(--bg-elev-1)",
                    border: "1px solid var(--fg-4)",
                    borderRadius: 12,
                    padding: "24px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: "var(--lime)",
                      marginBottom: 12,
                    }}
                  >
                    {step.n}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 18,
                      letterSpacing: "-0.02em",
                      color: "var(--fg-0)",
                      marginBottom: 8,
                    }}
                  >
                    {step.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg-3)", lineHeight: 1.6 }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── App download — coming soon ─────────────────────────── */}
        <section aria-labelledby="app-download-heading" className="px-6 pb-24">
          <div className="mx-auto max-w-xl text-center flex flex-col items-center gap-6">
            <h2
              id="app-download-heading"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--fg-3)",
                fontWeight: 400,
              }}
            >
              get the app. read the room.
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              {[
                { icon: APP_STORE_ICON, store: "App Store" },
                { icon: PLAY_STORE_ICON, store: "Google Play" },
              ].map(({ icon, store }) => (
                <button
                  key={store}
                  disabled
                  aria-label={`${store} — coming soon`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 22px",
                    borderRadius: 12,
                    background: "var(--bg-elev-1)",
                    border: "1px solid var(--fg-4)",
                    color: "var(--fg-4)",
                    cursor: "not-allowed",
                    opacity: 0.5,
                  }}
                >
                  {icon}
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em", color: "var(--fg-3)" }}>
                      coming soon
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--fg-2)", letterSpacing: "-0.01em" }}>
                      {store}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ─────────────────────────────────────────── */}
        <section className="px-6 pb-28">
          <div
            className="mx-auto max-w-2xl flex flex-col items-center gap-6 text-center"
            style={{
              borderTop: "1px solid var(--fg-5)",
              paddingTop: 64,
            }}
          >
            <LogoMark size={48} />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px, 5vw, 42px)",
                letterSpacing: "-0.03em",
                color: "var(--fg-0)",
                lineHeight: 1.1,
              }}
            >
              be first in the door.
            </h2>
            <WaitlistForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
