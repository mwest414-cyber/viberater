import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ScrollReveals from "@/components/ScrollReveals";
import { Glow, sectionTitle } from "@/components/HomeSections";
import PostCard from "../PostCard";
import WaitlistForm from "@/components/WaitlistForm";
import { formatPostDate, getPost, getAllPosts, type PostSummary } from "@/lib/posts";
import { lastModified, latest } from "@/lib/lastModified";

const SITE = "https://www.getviberater.co";

type Props = { params: Promise<{ slug: string }> };

// Same rule as the sitemap: a later edit to the post file counts, otherwise the publish date. ISO string.
function modifiedISO(post: PostSummary): string {
  const d = latest(new Date(post.date), lastModified([`content/posts/${post.slug}.md`]));
  return d ? d.toISOString() : post.date;
}

// Posts with no author, or signed "viberater", are published by the brand itself.
function authorFor(post: PostSummary) {
  return !post.author || post.author === "viberater"
    ? { "@type": "Organization", name: "viberater", url: SITE }
    : { "@type": "Person", name: post.author };
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = post.canonicalUrl ?? `${SITE}/blog/${post.slug}`;
  const ogImage = post.ogImage ?? `${SITE}/blog/${post.slug}/opengraph-image`;
  const modifiedTime = modifiedISO(post);

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
      modifiedTime,
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
    dateModified: modifiedISO(post),
    author: authorFor(post),
    publisher: {
      "@type": "Organization",
      name: "viberater",
      url: SITE,
    },
    url,
    keywords: post.tags?.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  // "keep reading": the two most recent other posts
  const more = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={jsonLd} />
      <main id="main-content" className="flex-1">
        <article className="relative px-6 pt-36 md:pt-40 pb-16">
          <Glow style={{ top: -140, left: "75%", width: 760, height: 560, background: "radial-gradient(ellipse at center, rgba(215,255,58,0.13) 0%, transparent 70%)" }} />
          <div className="relative mx-auto max-w-[680px]">
            <div className="animate-fade-up flex flex-wrap items-center gap-x-4 gap-y-2 mb-7" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>
              <Link href="/blog" className="glass rounded-full px-3.5 py-2" style={{ color: "var(--fg-0)", textDecoration: "none" }}>
                ← blog
              </Link>
              <span>
                <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min read
              </span>
              {post.category ? <span style={{ color: "var(--lime)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 11 }}>{post.category}</span> : null}
            </div>

            <h1 className="animate-fade-up delay-100" style={{ ...sectionTitle, fontSize: "clamp(40px, 7vw, 64px)", lineHeight: 1.03 }}>
              {post.title}
            </h1>
            {post.description ? (
              <p className="animate-fade-up delay-200 mt-5" style={{ fontSize: "clamp(18px, 2.2vw, 21px)", lineHeight: 1.55, color: "var(--fg-2)" }}>
                {post.description}
              </p>
            ) : null}

            <div className="animate-fade-up delay-300 mt-9 pt-9" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </div>

            {post.tags && post.tags.length > 0 ? (
              <div className="mt-12 flex flex-col gap-3">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-4)" }}>
                  tagged
                </span>
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--fg-0)",
                        padding: "6px 12px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </article>

        {more.length > 0 ? (
          <section aria-labelledby="keep-reading" className="px-6 pb-20">
            <div className="mx-auto max-w-5xl flex flex-col gap-5">
              <h2
                id="keep-reading"
                data-reveal
                style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--lime)" }}
              >
                keep reading
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {more.map((p, i) => (
                  <PostCard key={p.slug} post={p} index={i} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

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
