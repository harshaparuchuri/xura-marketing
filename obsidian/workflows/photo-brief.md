---
tags: [workflow, imagery, brand]
updated: 2026-11-15
status: first set generated and in use (2026-11-15) — tiles are Real-ESRGAN 4× upscales of contact-sheet crops; replace with full-res exports when possible, and the hero/team card with real team photos
---

# Photo brief — Indian industry and people

Imagery for the home and industry pages ([[home-repositioning-plan]],
ADR-0035). Each image replaces a `PHOTO SLOT` (`BlurField`) in code.

## Rules

- **Real team photos win.** The hero and "Our deployment team" card should
  be your own people on a real site. Use generated images there only until
  a shoot happens, and never caption them as "our team" or a named client.
- **Generated people are fine for industry scenes** (a plant floor, a lab,
  a trading desk): they illustrate a setting, not a claim.
- No logos, readable screens, brand names or text in frame.
- One look across the set (matches the monochrome site):
  candid, documentary, shallow depth of field, slight motion blur, muted
  desaturated colour, soft natural light, film grain, people mid-task and
  never posing at the camera.

## Style suffix (append to every prompt)

> candid documentary photograph, shot on 35mm, shallow depth of field,
> subtle motion blur, muted desaturated colour palette, soft natural window
> light, light film grain, people mid-task not looking at camera, no text,
> no logos, editorial, 16:9

## Shot list and prompts

| Slot | File name | Prompt (then add the style suffix) |
|---|---|---|
| Home hero | `hero-team-onsite.webp` | Three Indian professionals in smart-casual clothes gathered around a laptop on a factory mezzanine in Hyderabad, one pointing at the screen, machinery softly blurred behind them, late afternoon light |
| Deployment team card | `team-workshop.webp` | Indian deployment consultant leading a whiteboard workshop with four plant managers in a modest Indian company meeting room, sticky notes and a process diagram on the board, warm daylight |
| Bootcamp card | `bootcamp-room.webp` | Two-day workshop in an Indian mid-size company office, laptops open on a long table, chai cups, people discussing a printed report, relaxed and focused |
| Pharma | `industry-pharma.webp` | Indian pharmaceutical quality analyst in a lab coat and hairnet reviewing batch records on a tablet beside stainless-steel equipment in a clean room, Telangana pharma plant |
| Manufacturing | `industry-manufacturing.webp` | Indian shift supervisor in a hi-vis vest and safety glasses walking a busy auto-components shop floor in Pune, CNC machines and orange robotic arms blurred in motion |
| Fintech | `industry-fintech.webp` | Young Indian finance operations team in a Bengaluru office at dusk, one person reconciling numbers on a laptop, city lights through glass behind them |
| Healthcare | `industry-healthcare.webp` | Indian hospital administrator and nurse reviewing a scheduling board at a busy multispecialty hospital corridor in Chennai, soft motion blur of passing staff |
| SaaS | `industry-saas.webp` | Indian product and sales team stand-up in an open-plan Bengaluru startup office, standing around a large monitor, casual clothes, plants and natural light |
| Southeast Asia (spare) | `sea-operations.webp` | Operations manager in a Kuala Lumpur or Jakarta distribution warehouse checking stock on a tablet, forklifts blurred in background |
| Dark texture band | `texture-motion.webp` | Abstract long-exposure light streaks over a dark grey surface, monochrome, soft gradients, no objects (no style suffix needed) |

Generate 4 options per slot and pick the one with natural hands and faces,
no garbled text and no extra fingers.

## Paid stock alternative

If generated images look artificial, search **Stocksy** or **Getty Images**
with terms like "india factory supervisor candid", "indian office meeting
documentary", "hyderabad pharma lab". Licence each image for web use.

## Specs and hand-off

- At least 2400 px wide, landscape 16:9 (hero 3:2 is also fine).
- Drop the files into `public/assets/photos/` with the file names above.
- Then: convert to WebP (`cwebp -q 80 -resize 1920 0`), run
  `node scripts/resize-images.mjs`, swap each `PHOTO SLOT` `BlurField` for
  `next/image` + a dark gradient wherever text sits on top, and write alt
  text describing the scene, not the brand.

## Hero video

`public/assets/video/hero-sequence.mp4` — three Pexels clips (owner-chosen:
aerial industrial complex 38522698, aerial factory site 34383400, people in
a laboratory 8381408, brainstorming at work 6804128), cut 8 s each from
the masters, scaled to 1920×1080 with Lanczos (the 2732×1440 team clip is
scaled to 1080 high and centre-cropped), crossfaded 1 s (`xfade`, offsets
7/14/21), 30 fps, H.264 CRF 20 — 29 s total. Graded
and grained in the same pass (grain `alls=5`, CRF 23, ~15 MB). **To redo, run
`scripts/render-hero-video.sh <masters-dir>`** (filters and offsets live
there). Otherwise: keep CRF ≤ 20 for quality, `-movflags +faststart`, `yuv420p`, no audio;
regenerate the poster from frame 0. Replace with Indian-site footage of our
own when available.

## Enhancing low-res images

If only small images exist (e.g. a contact sheet), upscale before use:
Real-ESRGAN ncnn-vulkan (github.com/xinntao/Real-ESRGAN, macOS release,
~50 MB, runs offline on the GPU):
`realesrgan-ncnn-vulkan -i in/ -o out/ -n realesrgan-x4plus -f png`.
Crop without any prior resizing or sharpening, check faces and hands at
100%, then cap at 2400 px and export WebP q86 before running
`scripts/resize-images.mjs`. Keep the tool outside the repo.

> **2026-11-16 (ADR-0045):** the generated stand-ins listed here were replaced with real Pexels photos — see `public/assets/photos/CREDITS.txt`. Keep photos sharp (no blur layer, grain 12
> **2026-11-16 (ADR-0045):** the generated stand-ins listed here were replaced with real Pexels photos; see `public/assets/photos/CREDITS.txt`. Keep photos sharp: no blur layer, grain at 12 percent.
