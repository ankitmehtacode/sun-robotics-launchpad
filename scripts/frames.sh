#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="raw/PRODUCT_DEMO.mp4"
OUT="public/frames"

if [ ! -f "$SRC" ]; then
  echo "Missing $SRC — place the source film there first." >&2
  exit 1
fi

rm -rf "$OUT"
mkdir -p "$OUT/m"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# This ffmpeg build has no built-in webp encoder, so extract PNG frames and
# convert each with cwebp (from the `webp` formula) instead of encoding
# webp directly in one ffmpeg pass.

# Desktop set: crop out the top "Product Demo" watermark band, grade toward
# the site's blacks, sample at 12fps for scrubbing.
mkdir -p "$TMP/desktop"
ffmpeg -y -i "$SRC" \
  -vf "crop=in_w:in_h*0.85:0:in_h*0.12,fps=12,scale=1280:-2,eq=contrast=1.06:brightness=-0.02:saturation=0.92" \
  "$TMP/desktop/f%03d.png"
for f in "$TMP"/desktop/*.png; do
  cwebp -quiet -q 80 -m 6 "$f" -o "$OUT/$(basename "${f%.png}").webp"
done

# Mobile set — half width, loaded on <=820px.
mkdir -p "$TMP/mobile"
ffmpeg -y -i "$SRC" \
  -vf "crop=in_w:in_h*0.85:0:in_h*0.12,fps=12,scale=720:-2,eq=contrast=1.06:brightness=-0.02:saturation=0.92" \
  "$TMP/mobile/f%03d.png"
for f in "$TMP"/mobile/*.png; do
  cwebp -quiet -q 75 -m 6 "$f" -o "$OUT/m/$(basename "${f%.png}").webp"
done

# Manifest so the app doesn't hardcode the frame count.
node -e "
const fs = require('fs');
const files = fs.readdirSync('$OUT').filter(f => f.endsWith('.webp')).sort();
fs.writeFileSync('$OUT/frames.json', JSON.stringify(files, null, 0));
console.log('Wrote ' + '$OUT/frames.json' + ' with ' + files.length + ' frames');
"

echo "Desktop set:"
du -sh "$OUT" --exclude=m 2>/dev/null || du -sh "$OUT"
echo "Mobile set:"
du -sh "$OUT/m"
