import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import { getPost, posts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const paragraphs = post.content.trim().split("\n\n");

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-28 pb-24 px-6">
        <div className="mx-auto max-w-xl">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <Link
              href="/blog"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--fg-4)",
                textDecoration: "none",
                transition: "color var(--dur-micro) var(--ease-out)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-4)")}
            >
              ← blog
            </Link>
            <span style={{ color: "var(--fg-5)", fontSize: 10 }}>·</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--lime)",
              }}
            >
              {post.category}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 5.5vw, 48px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--fg-0)",
              marginBottom: 16,
            }}
          >
            {post.title}
          </h1>

          <time
            dateTime={post.date}
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.05em",
              color: "var(--fg-4)",
              marginBottom: 40,
            }}
          >
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>

          <div
            className="space-y-5"
            style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--fg-3)" }}
          >
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
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
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 20,
                color: "var(--fg-0)",
                letterSpacing: "-0.02em",
              }}
            >
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
