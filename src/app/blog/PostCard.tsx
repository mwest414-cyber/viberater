import Link from "next/link";

import { formatPostDate, type PostSummary } from "@/lib/posts";

// Glass post card (Figma "🧪 Blog pages", approved 2026-10-10). The featured card is the newest post on /blog.
export default function PostCard({
  post,
  featured = false,
  index = 0,
}: {
  post: PostSummary;
  featured?: boolean;
  index?: number;
}) {
  const summary = post.excerpt ?? post.description;
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-reveal
      className={`post-card glass rounded-[24px] flex flex-col min-w-0 ${featured ? "p-8 md:p-9 gap-4" : "p-7 gap-3"}`}
      style={{ textDecoration: "none", ["--reveal-i" as string]: index }}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)" }}>
        {featured ? (
          <span style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--lime)" }}>latest</span>
        ) : null}
        <span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min read
        </span>
        {featured ? (
          <span
            aria-hidden="true"
            className="hidden md:block ml-auto"
            style={{
              width: 220,
              height: 6,
              borderRadius: 3,
              background: "linear-gradient(90deg, var(--energy-chill), var(--energy-lively), var(--energy-buzzing), var(--energy-packed), var(--energy-electric))",
            }}
          />
        ) : null}
      </div>
      <h2
        className="post-card-title"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: featured ? "clamp(32px, 4.4vw, 48px)" : 28,
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          color: "var(--fg-0)",
          textWrap: "balance",
        }}
      >
        {post.title}
      </h2>
      {summary ? (
        <p style={{ fontSize: featured ? 17 : 15, lineHeight: 1.6, color: "var(--fg-3)", maxWidth: 640 }}>{summary}</p>
      ) : null}
      <span className="mt-auto pt-3" style={{ fontSize: featured ? 15 : 14, fontWeight: 500, color: "var(--lime)" }}>
        {featured ? "read the post →" : "read →"}
      </span>
    </Link>
  );
}
