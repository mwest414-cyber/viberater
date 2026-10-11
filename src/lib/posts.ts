import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDir = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  slug: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  excerpt?: string;
  category?: string;
};

export type PostSummary = PostFrontmatter & { readingMinutes: number };

export type Post = PostSummary & { contentHtml: string };

// About 220 words a minute, rounded up.
function readingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatPostDate(date: string): string {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toLowerCase();
}

export function getAllPosts(): PostSummary[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const raw = fs.readFileSync(path.join(postsDir, fileName), "utf8");
      const { data, content } = matter(raw);
      return { ...(data as PostFrontmatter), readingMinutes: readingMinutes(content) };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | undefined {
  if (!fs.existsSync(postsDir)) return undefined;
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  for (const fileName of files) {
    const raw = fs.readFileSync(path.join(postsDir, fileName), "utf8");
    const { data, content } = matter(raw);
    if (data.slug === slug) {
      const contentHtml = String(marked.parse(content));
      return { ...(data as PostFrontmatter), readingMinutes: readingMinutes(content), contentHtml };
    }
  }
  return undefined;
}
