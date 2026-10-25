import type { Metadata } from "next";

// Admin only. Never indexed; the page itself checks the account against public.admins through the database.
export const metadata: Metadata = {
  title: "admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
