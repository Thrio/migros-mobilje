// All tuning lives here: scroll lengths, easing, shader strengths and feature flags.
import { asset } from "@/lib/asset";

export const config = {
  hero: {
    // Height of the hero section in viewport heights. The sticky stage scrubs through it.
    scrollLengthVh: { desktop: 520, mobile: 420 },
    // Easing toward the target (current += (target - current) * factor).
    videoSmoothing: 0.12,
    beatSmoothing: 0.1,
    // Share of one beat's range used to fade in and out.
    beatFade: 0.22,
    // Cover-fit focal point (0 to 1), separate for phones.
    focal: { desktop: [0.5, 0.5], mobile: [0.62, 0.5] },
    // Scrub video. Off until a clip is added to /public/media (see README).
    video: {
      enabled: false,
      desktop: asset("/media/hero-desktop.mp4"),
      mobile: asset("/media/hero-mobile.mp4"),
      poster: asset("/media/hero-poster.jpg"),
    },
    // Still photo with a slow camera move driven by scroll (used while there is no video).
    // The photo is already graded darker and warmer, so the shader adds no extra grade.
    still: {
      enabled: true,
      src: asset("/media/photos/hero.jpg"),
      overscan: 1.32, // image is drawn 132% of the stage, as in the design
      pan: 0.23, // share of the image panned over the whole scroll
      zoom: 0.08, // starts 8% closer, settles to 1
      shader: { gradeStrength: 0, vignette: 0, grain: 0.02 },
    },
    dprCap: { desktop: 1.75, mobile: 1.25 },
    // Shader look for video and the procedural fallback: warm grade, vignette, light grain.
    shader: {
      gradeStrength: 0.6,
      vignette: 0.55,
      grain: 0.035,
    },
  },
  lenis: { lerp: 0.085 },
  loader: { minMs: 800, maxMs: 2500 },
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
