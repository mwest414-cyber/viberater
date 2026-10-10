"use client";

import { useState } from "react";

// The five energy words, in order. Colors are the app's energy pin ramp (orange, darker to brighter).
// Captions approved with the homepage mockups (Figma "Homepage additions", 2026-10-10).
const LEVELS = [
  { word: "chill", color: "var(--energy-chill)", caption: "easy, room to talk." },
  { word: "lively", color: "var(--energy-lively)", caption: "people around, good energy." },
  { word: "buzzing", color: "var(--energy-buzzing)", caption: "picking up. it's turning into a scene." },
  { word: "packed", color: "var(--energy-packed)", caption: "shoulder to shoulder." },
  { word: "electric", color: "var(--energy-electric)", caption: "the night is happening here." },
] as const;

export default function EnergySlider() {
  const [level, setLevel] = useState(2);
  const current = LEVELS[level];

  return (
    <div className="flex flex-col items-center text-center gap-3">
      <p
        aria-live="polite"
        className="energy-word"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(56px, 11vw, 88px)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: current.color,
          transition: "color var(--dur-element) var(--ease-out)",
        }}
      >
        {current.word}
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--fg-3)", minHeight: 28 }}>
        {current.caption}
      </p>

      <div className="glass w-full max-w-[860px] rounded-[28px] mt-6 px-6 md:px-12 pt-10 pb-7">
        <label htmlFor="energy-range" className="sr-only">
          energy level
        </label>
        <input
          id="energy-range"
          className="energy-range"
          type="range"
          min={0}
          max={4}
          step={1}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          aria-valuetext={current.word}
          style={{ ["--thumb-color" as string]: current.color }}
        />
        <div className="flex justify-between mt-5" role="group" aria-label="energy words">
          {LEVELS.map((l, i) => (
            <button
              key={l.word}
              type="button"
              onClick={() => setLevel(i)}
              aria-pressed={i === level}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: i === level ? "var(--fg-0)" : "var(--fg-3)",
                background: "none",
                border: "none",
                padding: "6px 2px",
                cursor: "pointer",
                transition: "color var(--dur-micro) var(--ease-out)",
              }}
            >
              {l.word}
            </button>
          ))}
        </div>
        <p className="text-right mt-3" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-4)" }}>
          drag or tap a word
        </p>
      </div>
    </div>
  );
}
