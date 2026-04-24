import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "about",
  description: "viberater — the app that tells you what a place actually feels like before you walk in.",
};

export default function AboutPage() {
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
            about
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(36px, 6vw, 52px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--fg-0)",
              marginBottom: 32,
            }}
          >
            know before you go.
          </h1>

          <div
            className="space-y-5"
            style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--fg-3)" }}
          >
            <p>
              you pick a bar. make the trip. wait in line.
              push open the door. dead inside. you turn around.
            </p>
            <p>
              viberater fixes that.
            </p>
            <p>
              we rate real third spaces: bars, cafés, dives, rooftops, record shops,
              hotel lobbies. based on what they actually feel like right now.
              crowd size. energy. vibe tags. that&apos;s it. no stars. no paragraphs.
            </p>
            <p>
              we&apos;re building for people who care about atmosphere.
              the ones who&apos;d rather know it&apos;s a loud dive before they show up in a blazer.
              the ones who want something chill on a tuesday and something packed on a friday.
            </p>
            <p>
              pre-launch right now. cities everywhere, soon.
            </p>
          </div>

          <div
            style={{
              marginTop: 56,
              paddingTop: 40,
              borderTop: "1px solid var(--fg-5)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--fg-0)", letterSpacing: "-0.02em" }}>
              get early access.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
