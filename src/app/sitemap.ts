import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const SITE = "https://www.getviberater.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // lastModified is the date of the last real content change to each page.
  // Update the date by hand when a page's content changes. The blog index follows the newest post.
  const newestPost = posts.reduce((max, p) => Math.max(max, new Date(p.date).getTime()), 0);

  return [
    { url: SITE, lastModified: new Date("2026-10-03"), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/about`, lastModified: new Date("2026-10-03"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/faq`, lastModified: new Date("2026-10-07"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/blog`, lastModified: new Date(newestPost), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/privacy`, lastModified: new Date("2026-10-04"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terms`, lastModified: new Date("2026-10-03"), changeFrequency: "yearly", priority: 0.3 },
    ...postEntries,
  ];
}
