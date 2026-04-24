import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "faq",
  description: "questions about viberater, answered.",
};

const FAQS = [
  {
    q: "what is viberater?",
    a: "viberater tells you what a place feels like before you walk in. crowd level, vibe tags, energy — no reviews, no star ratings. just the read.",
  },
  {
    q: "how does it work?",
    a: "we surface crowd-sourced vibe signals from people already inside. two inputs: crowd size and a vibe tag (chill, packed, date-worthy, dead, etc.). that's it. no typing.",
  },
  {
    q: "what kinds of places?",
    a: "third spaces. bars, cafés, dives, rooftops, record shops, hotel lobbies, parks, laundromats — anywhere people go that isn't home or work.",
  },
  {
    q: "what cities will you be in at launch?",
    a: "starting with a handful of major US cities. join the waitlist and we'll tell you when your city goes live.",
  },
  {
    q: "is it free?",
    a: "yes. the core experience is free. optional stuff down the road, maybe.",
  },
  {
    q: "when does the app launch?",
    a: "we're building now. waitlist members get in first.",
  },
  {
    q: "ios and android both?",
    a: "yes. both in the works.",
  },
  {
    q: "how do i get early access?",
    a: "drop your email below. we'll reach out before it opens to everyone else.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-28 pb-24 px-6">
        <div className="mx-auto max-w-xl">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--lime)",
              marginBottom: 20,
            }}
          >
            faq
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(36px, 6vw, 52px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--fg-0)",
              marginBottom: 40,
            }}
          >
            questions, answered.
          </h1>

          <div className="flex flex-col">
            {FAQS.map((faq, i) => (
              <div
                key={faq.q}
                style={{
                  borderTop: "1px solid var(--fg-5)",
                  paddingTop: i === 0 ? 0 : 28,
                  paddingBottom: 28,
                  borderTopWidth: i === 0 ? 0 : 1,
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 17,
                    letterSpacing: "-0.01em",
                    color: "var(--fg-1)",
                    marginBottom: 8,
                  }}
                >
                  {faq.q}
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--fg-3)", lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 16,
              paddingTop: 40,
              borderTop: "1px solid var(--fg-5)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--fg-3)" }}>
              something else?{" "}
              <a
                href="mailto:hello@getviberater.co"
                style={{ color: "var(--lime)", textDecoration: "none" }}
              >
                hello@getviberater.co
              </a>
            </p>
            <div style={{ marginTop: 24 }}>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
