# viberater marketing site

The public site for viberater at [getviberater.co](https://www.getviberater.co): landing page, waitlist, blog, about, faq and legal pages.

## stack

- Next.js (App Router) with React
- Tailwind CSS v4 plus a small set of CSS variables in `src/app/globals.css`
- Deployed on Vercel

Read `AGENTS.md` before touching any Next.js convention: this version of Next may differ from what you expect, and the docs ship in `node_modules/next/dist/docs/`.

## run it

```bash
npm install
npm run dev
```

`npm run build` runs the production build, `npm run lint` runs eslint.

## blog posts

Posts live in `content/posts/` as markdown files with frontmatter. Fields: `title`, `slug`, `description`, `date`, `author`, `tags`, `canonicalUrl`. The file name must match `slug`. Each post gets its own page at `/blog/<slug>` and a generated social card.

## brand rules

- lowercase everywhere in UI copy
- no exclamation marks
- no em dashes or en dashes (use a colon, comma or period)
- avoid the words "review", "score" and "rank"
- say "third space", not "third place"
