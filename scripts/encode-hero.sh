#!/usr/bin/env bash
# Encodes a chosen stock clip into the files the hero expects.
# Usage: scripts/encode-hero.sh path/to/source-clip.mp4
# Output (all keyframes so scrubbing is smooth, no audio, faststart):
#   public/media/hero-desktop.mp4  (1920 wide)
#   public/media/hero-mobile.mp4   (1080 wide)
#   public/media/hero-poster.jpg   (first frame)
set -euo pipefail

SRC="${1:?Pass the source clip path}"
OUT="public/media"
mkdir -p "$OUT"

ffmpeg -y -i "$SRC" -an -vf "scale=1920:-2" -c:v libx264 -preset veryfast -crf 22 \
  -g 1 -keyint_min 1 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-desktop.mp4"

ffmpeg -y -i "$SRC" -an -vf "scale=1080:-2" -c:v libx264 -preset veryfast -crf 23 \
  -g 1 -keyint_min 1 -pix_fmt yuv420p -movflags +faststart "$OUT/hero-mobile.mp4"

ffmpeg -y -i "$SRC" -frames:v 1 -vf "scale=1920:-2" -q:v 3 "$OUT/hero-poster.jpg"

# Contact sheet to check the frames before using the clip (3 x 2):
ffmpeg -y -i "$SRC" -vf "fps=1/2,scale=480:-2,tile=3x2" -frames:v 1 "$OUT/contact-sheet.jpg"

echo "Done. Set hero.video.enabled to true in lib/config.ts."
