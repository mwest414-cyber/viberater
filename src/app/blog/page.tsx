import type { Metadata } from "next";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import ScrollReveals from "@/components/ScrollReveals";
import { Glow, eyebrow, sectionTitle } from "@/components/HomeSections";
import { getAllPosts } from "@/lib/posts";
import PostCard from "./PostCard";

export const metadata: Metadata = {
  title: "blog",
  description: "viberater: takes on vibe culture, bar theory, and the future of third spaces.",
  alternates: { canonical: "https://www.getviberater.co/blog" },
  openGraph: {
    type: "website",
    url: "https://www.getviberater.co/blog",
    title: "blog · viberater",
    description: "takes on vibe culture, bar theory, and the future of third spaces.",
    images: [{ url: "/images/og/default.png", width: 1200, height: 630, alt: "viberater blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "blog · viberater",
    description: "takes on vibe culture, bar theory, and the future of third spaces.",
    images: ["/images/og/default.png"],
  },
};

export default function BlogPage() {
  const [latest, ...rest] = getAllPosts();

  return (
    <>
      <main id="main-content" className="flex-1">
        <section className="relative px-6 pt-36 md:pt-44 pb-20">
          <Glow style={{ top: -140, left: "75%", width: 760, height: 560, background: "radial-gradient(ellipse at center, rgba(215,255,58,0.14) 0%, transparent 70%)" }} />
          <div className="relative mx-auto max-w-5xl flex flex-col gap-10">
            <header className="flex flex-col gap-5">
              <p className="animate-fade-up" style={eyebrow}>blog</p>
              <h1 className="animate-fade-up delay-100" style={{ ...sectionTitle, fontSize: "clamp(44px, 7.5vw, 72px)", lineHeight: 1.02 }}>
                the viberater read.
              </h1>
              <p className="animate-fade-up delay-200" style={{ fontSize: 19, color: "var(--fg-3)", maxWidth: 620 }}>
                takes on vibe culture, bar theory, and the future of third spaces.
              </p>
            </header>

            {latest ? (
              <div className="flex flex-col gap-4">
                <PostCard post={latest} featured />
                {rest.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {rest.map((post, i) => (
                      <PostCard key={post.slug} post={post} index={i % 2} />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-3)" }}>posts coming soon.</p>
            )}
          </div>
        </section>

        <section className="relative px-6 pb-28">
          <Glow style={{ top: -40, width: 760, height: 380, background: "radial-gradient(ellipse at center, rgba(215,255,58,0.12) 0%, transparent 70%)" }} />
          <div data-reveal className="relative mx-auto max-w-xl flex flex-col items-center gap-3 text-center">
            <h2 style={{ ...sectionTitle, fontSize: "clamp(32px, 4.5vw, 40px)" }}>get early access.</h2>
            <p style={{ fontSize: 17, color: "var(--fg-3)" }}>be first in the door when viberater opens in nyc.</p>
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
