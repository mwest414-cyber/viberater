import type { Metadata } from "next";
import Script from "next/script";
import { ViewTransition } from "react";
import Header from "@/components/Header";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Self-hosted at build time by next/font: no request to Google from visitors' browsers.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.getviberater.co"),
  title: { default: "viberater", template: "%s · viberater" },
  description: "know the vibe before you come inside. viberater shows you the vibe at real venues so you always know what you're walking into.",
  openGraph: {
    title: "viberater",
    description: "know the vibe before you come inside.",
    type: "website",
    siteName: "viberater",
    url: "https://www.getviberater.co",
    images: [{ url: "/images/og/default.png", width: 1200, height: 630, alt: "viberater" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "viberater",
    description: "know the vibe before you come inside.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-full flex flex-col" style={{ background: "var(--bg)", color: "var(--fg-1)" }}>
        <a href="#main-content" className="skip-link">skip to main content</a>
        {/* One header for every page, outside the transition so it stays still while pages fade */}
        <Header />
        {/* Route changes cross fade (styles in globals.css); browsers without view transitions just swap pages */}
        <ViewTransition default="page-fade">{children}</ViewTransition>
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
