import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/WaitlistForm";
import { getPost, getAllPosts } from "@/lib/posts";

const SITE = "https://www.getviberater.co";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = post.canonicalUrl ?? `${SITE}/blog/${post.slug}`;
  const ogImage = post.ogImage ?? `${SITE}/blog/${post.slug}/opengraph-image`;

  return {
    title: post.title,
    description: post.description,
    authors: post.author ? [{ name: post.author }] : undefined,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      tags: post.tags,
      siteName: "viberater",
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = post.canonicalUrl ?? `${SITE}/blog/${post.slug}`;
  const ogImage = post.ogImage ?? `${SITE}/blog/${post.slug}/opengraph-image`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: ogImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author ?? "viberater",
    },
    publisher: {
      "@type": "Organization",
      name: "viberater",
      url: SITE,
    },
    url,
    keywords: post.tags?.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                color: "var(--fg-3)",
                textDecoration: "none",
              }}
            >
              ← blog
            </Link>
            {post.category && (
              <>
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
              </>
            )}
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

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <time
              dateTime={post.date}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.05em",
                color: "var(--fg-2)",
              }}
            >
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            {post.author && (
              <>
                <span style={{ color: "var(--fg-5)", fontSize: 10 }}>·</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.05em",
                    color: "var(--fg-2)",
                  }}
                >
                  {post.author}
                </span>
              </>
            )}
          </div>

          <div
            className="prose"
            style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65, color: "var(--fg-2)" }}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {post.tags && post.tags.length > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 40 }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--fg-3)",
                    background: "var(--bg-elev-2)",
                    border: "1px solid var(--fg-5)",
                    padding: "4px 10px",
                    borderRadius: 4,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

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
