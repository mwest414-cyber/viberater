export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  content: string;
};

export const posts: Post[] = [];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
