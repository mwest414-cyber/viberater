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

export type Post = PostFrontmatter & { contentHtml: string };

export function getAllPosts(): PostFrontmatter[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const raw = fs.readFileSync(path.join(postsDir, fileName), "utf8");
      const { data } = matter(raw);
      return data as PostFrontmatter;
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
      return { ...(data as PostFrontmatter), contentHtml };
    }
  }
  return undefined;
}
