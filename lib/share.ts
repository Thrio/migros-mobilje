import { asset } from "@/lib/asset";

// Link previews (WhatsApp, Viber, Facebook, LinkedIn, Slack) read the Open Graph tags and need
// absolute URLs. Demo builds live at https://demo.thrio.co/<client-name>, so that is the base there.
// Set NEXT_PUBLIC_SITE_URL to the real domain when the site moves to its own address.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const shareBase =
  process.env.NEXT_PUBLIC_SITE_URL || (basePath ? "https://demo.thrio.co" : "http://localhost:3000");

/** Path of a page, base path included, for og:url and the canonical link. */
export const pagePath = (path = "/") => (basePath ? `${basePath}${path === "/" ? "" : path}` : path);

/** 1200 x 630 share image (public/share.jpg), the size every preview card expects. */
export const shareImage = { url: asset("/share.jpg"), width: 1200, height: 630 };
