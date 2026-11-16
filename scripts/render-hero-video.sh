#!/bin/bash
# Renders public/assets/video/hero-sequence.mp4 (+ poster) from the Pexels
# masters: four 8 s clips, 1 s crossfades, cinematic grade + temporal grain.
# See obsidian/workflows/photo-brief.md → "Hero video".
#
# Usage: scripts/render-hero-video.sh <masters-dir>
#   <masters-dir> must hold factory.mp4 (Pexels 34383400), lab.mp4 (8381408),
#   solar.mp4 (38522698) and brainstorm.mp4 (6804128) — the 2560/2732×1440
#   versions. Needs ffmpeg and Python 3 with Pillow (for the WebP poster).
set -euo pipefail
M="$1"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/assets/video"

# Grade: lower saturation, a little contrast, cool shadows / warm highlights,
# lifted blacks + soft highlight roll-off, light vignette, moving film grain.
GRADE="eq=contrast=1.10:saturation=0.80:gamma=0.97,colorbalance=rs=-0.04:bs=0.06:rm=-0.01:bm=0.02:rh=0.06:gh=0.02:bh=-0.05,curves=all='0/0.035 0.25/0.22 0.5/0.49 0.75/0.77 1/0.96',vignette=angle=PI/5,noise=alls=5:allf=t+u"
FIT="scale=-2:1080:flags=lanczos,crop=1920:1080,fps=30,setsar=1"

ffmpeg -v error -y \
  -ss 5 -t 8 -i "$M/factory.mp4" \
  -ss 0 -t 8 -i "$M/lab.mp4" \
  -ss 2 -t 8 -i "$M/solar.mp4" \
  -ss 2 -t 8 -i "$M/brainstorm.mp4" \
  -filter_complex "[0:v]$FIT[a];[1:v]$FIT[b];[2:v]$FIT[c];[3:v]$FIT[d];\
[a][b]xfade=transition=fade:duration=1:offset=7[ab];\
[ab][c]xfade=transition=fade:duration=1:offset=14[abc];\
[abc][d]xfade=transition=fade:duration=1:offset=21,$GRADE,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -preset slow -crf 23 -profile:v high -pix_fmt yuv420p \
  -movflags +faststart "$OUT/hero-sequence.tmp.mp4"
mv "$OUT/hero-sequence.tmp.mp4" "$OUT/hero-sequence.mp4"

TMP="$(mktemp -d)"
ffmpeg -v error -y -i "$OUT/hero-sequence.mp4" -frames:v 1 "$TMP/poster.png"
python3 -c "from PIL import Image; Image.open('$TMP/poster.png').save('$OUT/hero-sequence-poster.webp','WEBP',quality=85,method=6)"
rm -rf "$TMP"
ffprobe -v error -show_entries format=duration,size -of csv=p=0 "$OUT/hero-sequence.mp4"
