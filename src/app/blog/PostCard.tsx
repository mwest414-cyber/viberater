"use client";

import Link from "next/link";
import type { PostFrontmatter } from "@/lib/posts";

export default function PostCard({ post, first }: { post: PostFrontmatter; first: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
      <article
        style={{
          paddingTop: first ? 0 : 32,
          paddingBottom: 32,
          borderBottom: "1px solid var(--fg-5)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget.querySelector(".post-title") as HTMLElement | null;
          if (el) el.style.color = "var(--fg-0)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget.querySelector(".post-title") as HTMLElement | null;
          if (el) el.style.color = "var(--fg-1)";
        }}
      >
        {(post.category || post.date) && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            {post.category && (
              <>
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
                {post.date && <span style={{ color: "var(--fg-5)", fontSize: 10 }}>·</span>}
              </>
            )}
            {post.date && (
              <time
                dateTime={post.date}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
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
            )}
          </div>
        )}

        <h2
          className="post-title"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: "var(--fg-1)",
            marginBottom: post.excerpt ? 10 : 0,
            transition: "color var(--dur-micro) var(--ease-out)",
          }}
        >
          {post.title}
        </h2>

        {post.excerpt && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--fg-2)",
            }}
          >
            {post.excerpt}
          </p>
        )}
      </article>
    </Link>
  );
}
