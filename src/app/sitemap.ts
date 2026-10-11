import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { lastModified, latest } from "@/lib/lastModified";

const SITE = "https://www.getviberater.co";

// Each date is the last git commit that changed that page's own content files, worked out at build time,
// so nothing needs updating by hand. Shared chrome (header, footer) is left out on purpose: a footer tweak
// isn't new content. If git history isn't available the date is left out rather than guessed.
const HOME_FILES = [
  "src/app/page.tsx",
  "src/components/HomeSections.tsx",
  "src/components/EnergySlider.tsx",
  "public/images/app",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    // a later edit to the post file counts; otherwise the publish date
    lastModified: latest(new Date(post.date), lastModified([`content/posts/${post.slug}.md`])),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // The blog index changes when a post is added or edited, or when the index page itself changes.
  const blogIndex = latest(
    lastModified(["src/app/blog/page.tsx", "src/app/blog/PostCard.tsx"]),
    ...postEntries.map((p) => (p.lastModified instanceof Date ? p.lastModified : undefined)),
  );

  const entries: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: lastModified(HOME_FILES), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/about`, lastModified: lastModified(["src/app/about"]), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/faq`, lastModified: lastModified(["src/app/faq"]), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/blog`, lastModified: blogIndex, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/privacy`, lastModified: lastModified(["src/app/privacy"]), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/terms`, lastModified: lastModified(["src/app/terms"]), changeFrequency: "yearly", priority: 0.3 },
    ...postEntries,
  ];

  // Shows in the build log, so it's easy to confirm the dates were found.
  const missing = entries.filter((e) => !e.lastModified).map((e) => e.url);
  console.log(
    missing.length
      ? `[sitemap] no git date for ${missing.length} page(s), left out: ${missing.join(", ")}`
      : `[sitemap] git dates found for all ${entries.length} pages`,
  );

  return entries;
}
