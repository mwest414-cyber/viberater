import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import EnergySlider from "./EnergySlider";

// Homepage sections from Figma "🧪 Homepage additions" (approved 2026-10-10):
// real product screens, the energy slider and the feature tiles.

const eyebrow: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--lime)",
};

const sectionTitle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "clamp(32px, 5vw, 48px)",
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: "var(--fg-0)",
  textWrap: "balance",
};

function Glow({ style }: { style: CSSProperties }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ overflowX: "clip" }}>
      <div className="absolute left-1/2 -translate-x-1/2" style={{ filter: "blur(70px)", ...style }} />
    </div>
  );
}

/* ── Real product screens ─────────────────────────────────────── */

function Phone({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div
      style={{
        // percentages so the bezel keeps the screen's corner shape at every size (screen corners are baked into the image)
        padding: "2.4%",
        borderRadius: "13% / 6%",
        background: "#171717",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={780}
        height={1688}
        sizes="(min-width: 768px) 290px, 46vw"
        priority={priority}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}

export function ProductScreens() {
  return (
    <section aria-labelledby="app-heading" className="relative px-6 py-20 md:py-28">
      <Glow style={{ top: 40, width: 760, height: 620, background: "radial-gradient(ellipse at center, rgba(215,255,58,0.14) 0%, transparent 70%)", left: "70%" }} />
      <div className="relative mx-auto max-w-5xl grid md:grid-cols-2 gap-14 items-center">
        <div data-reveal className="flex flex-col gap-5 min-w-0">
          <span style={eyebrow}>the app</span>
          <h2 id="app-heading" style={sectionTitle}>
            see the room before you walk in.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--fg-3)", maxWidth: 440 }}>
            a live map of your block. every pin shows the energy right now, and every place shows the last 4 hours,
            so you know if it&apos;s picking up or winding down.
          </p>
          <ul className="flex flex-col gap-2.5" style={{ fontSize: 15, color: "var(--fg-0)" }}>
            {["energy from people inside, right now", "up to five vibe tags per place", "starting in nyc"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 999, background: "var(--lime)", flexShrink: 0 }} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="relative mx-auto w-full max-w-[520px]" style={{ aspectRatio: "520 / 640", ["--reveal-i" as string]: 1 }}>
          <div className="absolute left-0 w-[46%] md:w-[250px]" style={{ top: "9%", opacity: 0.85 }}>
            <Phone
              src="/images/app/venue.png"
              alt="venue screen for devoción coffee: buzzing, with right now, usually on thursdays and general vibe tags"
            />
          </div>
          <div className="absolute right-0 top-0 w-[54%] md:w-[290px]">
            <Phone
              src="/images/app/map.png"
              alt="map screen: energy pins across williamsburg and a card for devoción coffee, buzzing, with a line showing the last 4 hours"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Energy slider ─────────────────────────────────────────────── */

export function EnergySection() {
  return (
    <section aria-labelledby="energy-heading" className="relative px-6 py-20 md:py-24">
      <Glow style={{ top: 60, width: 640, height: 340, background: "radial-gradient(ellipse at center, rgba(217,106,20,0.16) 0%, transparent 70%)" }} />
      <div data-reveal className="relative mx-auto max-w-5xl flex flex-col items-center gap-3">
        <span style={eyebrow}>five words for the room</span>
        <h2 id="energy-heading" style={{ ...sectionTitle, fontSize: "clamp(28px, 4vw, 44px)", textAlign: "center" }}>
          slide through the energy.
        </h2>
        <div className="w-full mt-4">
          <EnergySlider />
        </div>
      </div>
    </section>
  );
}

/* ── Feature tiles ─────────────────────────────────────────────── */

function Tile({
  label,
  title,
  body,
  children,
  className = "",
  index = 0,
}: {
  label: string;
  title: string;
  body: string;
  children?: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <div
      data-reveal
      className={`glass rounded-3xl p-7 flex flex-col gap-2 min-w-0 ${className}`}
      style={{ ["--reveal-i" as string]: index }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-3)" }}>
        {label}
      </span>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", color: "var(--fg-0)", lineHeight: 1.15 }}>
        {title}
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--fg-3)", maxWidth: 440 }}>{body}</p>
      {children ? <div className="mt-auto pt-6">{children}</div> : null}
    </div>
  );
}

function EnergyLine() {
  return (
    <figure>
      <svg viewBox="0 0 300 84" width="100%" height="84" role="img" aria-label="example energy line rising over the last 4 hours">
        <defs>
          <linearGradient id="tile-energy" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#7A3A0E" />
            <stop offset="0.5" stopColor="#A84D12" />
            <stop offset="1" stopColor="#FF9A1F" />
          </linearGradient>
        </defs>
        <path
          d="M 4 74 C 44 74 64 66 104 60 C 144 54 164 64 204 44 C 244 24 264 26 292 10"
          fill="none"
          stroke="url(#tile-energy)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="292" cy="10" r="5" fill="#FF9A1F" />
      </svg>
      <figcaption className="flex justify-between mt-2" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-4)" }}>
        <span>4h ago</span>
        <span style={{ color: "var(--fg-3)" }}>now</span>
      </figcaption>
    </figure>
  );
}

export function FeatureTiles() {
  return (
    <section aria-labelledby="tiles-heading" className="relative px-6 py-20 md:py-24">
      <Glow style={{ top: 160, width: 1000, height: 640, background: "radial-gradient(ellipse at center, rgba(215,255,58,0.12) 0%, transparent 70%)" }} />
      <div className="relative mx-auto max-w-5xl flex flex-col gap-12">
        <div data-reveal className="flex flex-col items-center gap-3 text-center">
          <span style={eyebrow}>what&apos;s inside</span>
          <h2 id="tiles-heading" style={{ ...sectionTitle, fontSize: "clamp(28px, 4vw, 44px)" }}>
            built for reading the room.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Tile
            className="md:col-span-2"
            label="vibe tags"
            title="pick up to five."
            body="36 tags across crowd, mood and scene, so a place reads like itself."
          >
            <ul className="flex flex-wrap gap-2" aria-label="example tags">
              {["dimly lit", "loud", "lgbtq", "live music", "date night"].map((t) => (
                <li
                  key={t}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--fg-0)",
                    padding: "7px 14px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(215,255,58,0.5)",
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </Tile>

          <Tile index={1} label="last 4 hours" title="watch it build." body="see if it's picking up or winding down before you go.">
            <EnergyLine />
          </Tile>

          <Tile index={0} label="be seen" title="be seen or go ghost." body="show up in the room's list, or stay invisible. your call.">
            <div className="flex items-center gap-3" aria-hidden="true">
              <span style={{ width: 52, height: 30, borderRadius: 15, background: "var(--lime)", position: "relative", flexShrink: 0 }}>
                <span style={{ position: "absolute", right: 3, top: 3, width: 24, height: 24, borderRadius: 12, background: "var(--bg)" }} />
              </span>
              <span style={{ fontSize: 14, color: "var(--fg-0)" }}>you&apos;re seen here</span>
            </div>
          </Tile>

          <Tile index={1} label="waves" title="wave across the room." body="a wave lasts while you're both there.">
            <div className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-3" aria-hidden="true">
              <span style={{ width: 8, height: 8, borderRadius: 4, background: "var(--coral)" }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: "var(--fg-0)" }}>alex waved at you</span>
            </div>
          </Tile>

          <Tile index={2} label="5am" title="fresh every night." body="the room resets at 5am, so tonight never carries yesterday.">
            <p aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg-0)", fontSize: 48, letterSpacing: "-0.03em", lineHeight: 1 }}>
              5:00 <span style={{ fontSize: 24, color: "var(--lime)" }}>am</span>
            </p>
          </Tile>

          <div
            data-reveal
            className="glass rounded-3xl p-7 md:col-span-3 flex items-center justify-between gap-6"
          >
            <div className="flex flex-col gap-2 min-w-0">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-3)" }}>
                only from inside
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", color: "var(--fg-0)", lineHeight: 1.15 }}>
                only people in the room can drop a vibe.
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--fg-3)" }}>
                your phone confirms you&apos;re there first, so the read stays honest.
              </p>
            </div>
            <svg className="hidden sm:block shrink-0" width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
              <circle cx="66" cy="66" r="64" fill="none" stroke="#D7FF3A" strokeOpacity="0.12" strokeWidth="1.5" />
              <circle cx="66" cy="66" r="44" fill="none" stroke="#D7FF3A" strokeOpacity="0.25" strokeWidth="1.5" />
              <circle cx="66" cy="66" r="24" fill="none" stroke="#D7FF3A" strokeOpacity="0.6" strokeWidth="1.5" />
              <circle cx="66" cy="66" r="6" fill="#D7FF3A" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
