// All tuning lives here: smoothing, photos and feature flags.
import { asset } from "@/lib/asset";

export const config = {
  hero: {
    // Static hero: no scroll length, no video, no canvas. One framed photo.
    src: asset("/media/photos/hero-migros.jpg"), // client photo (Facebook), landscape 4:3
  },
  lenis: { lerp: 0.085 },
  // Photos for tiles, cards and the Kuzhina section (/public/media/photos). Turn off to show flat tones.
  photos: { enabled: true },
  flags: {
    // Not confirmed by the client: keep these off.
    showEmail: false,
    showNoyaReference: false,
    // Map links use a search query per town, not a confirmed pin.
    confirmedMapPins: false,
    // Follower counts as seen on this date.
    followersCheckedOn: "2026-11-05",
  },
} as const;
