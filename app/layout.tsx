import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Young_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { shareBase, pagePath, shareImage } from "@/lib/share";

const display = Young_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const text = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-text",
  display: "swap",
});

// Demo builds (NEXT_PUBLIC_BASE_PATH set) must not be indexed.
const isDemo = Boolean(process.env.NEXT_PUBLIC_BASE_PATH);

export const metadata: Metadata = {
  metadataBase: new URL(shareBase),
  ...(isDemo ? { robots: { index: false, follow: false } } : {}),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "sq_AL",
    type: "website",
    url: pagePath(),
    images: [{ ...shareImage, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: [shareImage.url] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15110F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq" className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
