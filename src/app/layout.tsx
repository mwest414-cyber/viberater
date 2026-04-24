import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "viberater", template: "%s · viberater" },
  description: "know the vibe before you come inside. viberater rates real venues so you always know what you're walking into.",
  keywords: ["vibe", "venues", "nightlife", "bars", "restaurants", "ratings", "third spaces"],
  openGraph: {
    title: "viberater",
    description: "know the vibe before you come inside.",
    type: "website",
    siteName: "viberater",
  },
  twitter: {
    card: "summary_large_image",
    title: "viberater",
    description: "know the vibe before you come inside.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: "var(--bg)", color: "var(--fg-1)" }}>
        <a href="#main-content" className="skip-link">skip to main content</a>
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3HKT1KPSDR" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3HKT1KPSDR');
        `}</Script>
      </body>
    </html>
  );
}
