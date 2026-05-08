import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/lib/posts";

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

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <article
                  style={{
                    paddingTop: i === 0 ? 0 : 32,
                    paddingBottom: 32,
                    borderBottom: "1px solid var(--fg-5)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget.querySelector(".post-title") as HTMLElement).style.color =
                      "var(--fg-0)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget.querySelector(".post-title") as HTMLElement).style.color =
                      "var(--fg-1)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--lime)",
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ color: "var(--fg-5)", fontSize: 10 }}>·</span>
                    <time
                      dateTime={post.date}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: "0.05em",
                        color: "var(--fg-4)",
                      }}
                    >
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>

                  <h2
                    className="post-title"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 22,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                      color: "var(--fg-1)",
                      marginBottom: 10,
                      transition: "color var(--dur-micro) var(--ease-out)",
                    }}
                  >
                    {post.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--fg-3)",
                    }}
                  >
                    {post.excerpt}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
