"""Generate the dark-section background textures: soft blue light streaks
melting into near-black, with fine film grain (owner request 2026-11-16).

Writes public/assets/textures/field-{palette}-{0,1,2}.webp (dark, 2400×1200)
and field-light-{palette}-{0,1,2}.webp (light haze), for each palette in
PALETTES (blue, violet, teal, amber, green — one per page type).
Usage: python3 scripts/generate-gradient-textures.py   (needs Pillow)
"""
import math
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter

OUT = Path(__file__).resolve().parent.parent / "public" / "assets" / "textures"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 480, 240           # draw size (smooth field; enlarged without loss)
OUT_W, OUT_H = 2400, 1200

# Palettes by page type (owner, 2026-11-16): dark = ink → night → mid → highlight;
# light = paper → haze → deeper haze (halved 2026-11-16: owner found it loud).
PALETTES = {
    "blue":   {"dark": [(10, 11, 14), (34, 52, 92), (88, 116, 186), (138, 156, 214)], "light": [(250, 250, 248), (236, 240, 248), (219, 226, 246)]},
    "violet": {"dark": [(11, 10, 15), (50, 38, 90), (118, 96, 196), (172, 156, 230)], "light": [(250, 250, 248), (241, 237, 248), (229, 222, 247)]},
    "teal":   {"dark": [(9, 12, 13), (20, 62, 72), (58, 146, 164), (136, 202, 212)], "light": [(250, 250, 248), (234, 244, 244), (216, 237, 238)]},
    "amber":  {"dark": [(13, 11, 9), (78, 48, 24), (190, 124, 66), (232, 186, 138)], "light": [(250, 250, 248), (249, 241, 231), (246, 229, 210)]},
    "green":  {"dark": [(9, 12, 10), (24, 62, 46), (62, 142, 106), (142, 202, 168)], "light": [(250, 250, 248), (236, 245, 238), (218, 237, 224)]},
}

# variant: (where the light sits 0=top..1=bottom, slope in degrees, fold scale)
VARIANTS = [
    (0.10, -8, 1.0),   # light top, fading to ink (like a sky)
    (0.85, 6, 1.2),    # light rising from the bottom
    (0.45, -4, 0.8),   # a band of light across the middle
]


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def _lin(c):
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(rgb):
    r, g, b = (_lin(v) for v in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


# White text must keep >= 4.5:1 on the brightest point of a dark texture:
# (1.05) / (L + 0.05) >= 4.5  ->  L <= 0.183. Aim a little lower for grain.
MAX_DARK_L = 0.15


def cap(rgb, max_l=MAX_DARK_L):
    """Darken a colour (keeping its hue) until its luminance is <= max_l."""
    r, g, b = rgb
    k = 1.0
    while luminance((r * k, g * k, b * k)) > max_l and k > 0:
        k -= 0.01
    return (int(r * k), int(g * k), int(b * k))


def dark_paint(p):
    ink, night, mid, high = (cap(c) for c in p)
    # The contrast cap leaves no headroom above the mid tone, and a capped pale
    # highlight just reads as a grey seam along the brightest line — so the
    # band peaks at the (saturated) mid tone instead.
    high = mid
    def paint(v):
        v = max(0.0, min(1.0, v))
        if v < 0.35:
            return lerp(ink, night, v / 0.35)
        if v < 0.75:
            return lerp(night, mid, (v - 0.35) / 0.4)
        return lerp(mid, high, (v - 0.75) / 0.25)
    return paint


def light_paint(p):
    paper, haze, deep = p
    def paint(v):
        v = max(0.0, min(1.0, v))
        if v < 0.6:
            return lerp(paper, haze, v / 0.6)
        return lerp(haze, deep, (v - 0.6) / 0.4)
    return paint


def render(n, centre, slope, scale, paint, grain_amt, suffix):
    img = Image.new("RGB", (W, H))
    px = img.load()
    a = math.radians(slope)
    ca, sa = math.cos(a), math.sin(a)
    for y in range(H):
        for x in range(W):
            u = x * ca + y * sa
            v = -x * sa + y * ca
            warp = 10 * math.sin(u / (90 * scale) + n) + 5 * math.sin(u / (37 * scale) + 2 * n)
            folds = 0.10 * math.sin((v + warp) / (16 * scale)) + 0.05 * math.sin((v + warp * 1.4) / (7 * scale) + 0.7)
            dist = abs(y / H - centre)
            light = max(0.0, 1.0 - dist * 1.9) ** 1.6
            px[x, y] = paint(light * 0.95 + folds * light)
    big = img.resize((OUT_W, OUT_H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(12))
    noise = Image.effect_noise((OUT_W, OUT_H), 30).filter(ImageFilter.GaussianBlur(0.5)).convert("RGB")
    grained = Image.blend(big, ImageChops.overlay(big, noise), grain_amt)
    name = f"field{suffix}-{n}.webp"
    grained.save(OUT / name, "WEBP", quality=86, method=6)
    print("wrote", OUT / name)


for name, pal in PALETTES.items():
    worst = max(luminance(cap(c)) for c in pal["dark"])
    print(f"{name}: brightest dark tone L={worst:.3f}, white text contrast {1.05 / (worst + 0.05):.2f}:1")
    for n, (centre, slope, scale) in enumerate(VARIANTS):
        render(n, centre, slope, scale, dark_paint(pal["dark"]), 0.35, f"-{name}")
        render(n, centre, slope, scale, light_paint(pal["light"]), 0.22, f"-light-{name}")
