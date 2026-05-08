import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/lib/posts";
import PostCard from "./PostCard";

export const metadata: Metadata = {
  title: "blog",
  description: "viberater — takes on vibe culture, bar theory, and the future of third spaces.",
};

export default function BlogPage() {
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
            blog
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(36px, 6vw, 52px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--fg-0)",
              marginBottom: 48,
            }}
          >
            the viberater dispatch.
          </h1>

          {posts.length === 0 ? (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                letterSpacing: "0.04em",
                color: "var(--fg-3)",
              }}
            >
              posts coming soon.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {posts.map((post, i) => (
                <PostCard key={post.slug} post={post} first={i === 0} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
