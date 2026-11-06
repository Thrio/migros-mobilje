import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Young_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

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
  ...(isDemo ? { robots: { index: false, follow: false } } : {}),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "sq_AL",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15110F",
};

// Runs before first paint: shows the loader once per session, and never leaves it stuck.
const loaderGate = `try{var d=document.documentElement;if(sessionStorage.getItem('mm-loader')!=='1'){d.classList.add('mm-loading');setTimeout(function(){d.classList.remove('mm-loading')},4000)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq" className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderGate }} />
        <noscript>
          <style>{`.mm-loader{display:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
