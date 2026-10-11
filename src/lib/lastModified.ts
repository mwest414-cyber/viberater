import { execFileSync } from "node:child_process";

// Last-changed dates for the sitemap, read from git history at build time, so they update on their own
// whenever a page's files change. If git history isn't available (or is cut off before the last change),
// we return undefined and the sitemap simply leaves the date out instead of guessing.

function git(args: string[]): string | undefined {
  try {
    return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return undefined;
  }
}

let boundary: Set<string> | undefined;

// In a shallow clone the oldest fetched commits look like they changed every file, so their dates can't be trusted.
// (Asking git directly, rather than reading .git/shallow, keeps the build from tracing the whole project.)
function shallowBoundary(): Set<string> {
  if (boundary) return boundary;
  const shallow = git(["rev-parse", "--is-shallow-repository"]) === "true";
  const roots = shallow ? git(["rev-list", "--max-parents=0", "HEAD"]) : undefined;
  boundary = new Set(roots ? roots.split("\n").filter(Boolean) : []);
  return boundary;
}

export function lastModified(paths: string[]): Date | undefined {
  const out = git(["log", "-1", "--format=%H %cI", "--", ...paths]);
  if (!out) return undefined;
  const [sha, iso] = out.split(" ");
  if (!sha || !iso || shallowBoundary().has(sha)) return undefined;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function latest(...dates: (Date | undefined)[]): Date | undefined {
  const times = dates.filter((d): d is Date => d instanceof Date).map((d) => d.getTime());
  return times.length ? new Date(Math.max(...times)) : undefined;
}
