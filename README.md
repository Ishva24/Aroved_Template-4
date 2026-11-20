# Aroved Healthcare — AROSAFE 3D Website

An immersive 3D corporate website for **Aroved Healthcare Pvt Ltd** and its **AROSAFE** infection-control range. It is built from scratch and runs separately from the existing site at aroved.com.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Three.js · React Three Fiber · Drei · GSAP + ScrollTrigger · Framer Motion · Tailwind CSS v4

## v2 experience layer

| Feature | Where | Technique |
| --- | --- | --- |
| Cinematic intro | `fx/Preloader.tsx` | Split-curtain reveal, shown once per session |
| Bio-fluid hero backdrop | `three/FluidBackground.tsx` | Full-screen GLSL, domain-warped fbm noise, cursor glow, molecular lattice |
| Holographic scan glove | `three/hologram.ts` | `onBeforeCompile` shader injection: Fresnel rim + world-space scan band |
| Post-processing | `HeroScene`, `UniverseScene` | Bloom, chromatic aberration, vignette (`@react-three/postprocessing`) |
| Kinetic headline | `fx/KineticText.tsx` | Variable-font `wght` axis follows the cursor |
| **AROSAFE Universe** (product section) | `sections/ProductUniverse.tsx`, `three/UniverseScene.tsx` | All 18 products on a 3D ring of holographic pedestals in one canvas; GSAP pinned scroll with snapping; tabs, index rail, arrows and keyboard |
| Spotlight product cards | `products/ProductCard.tsx` | Pointer-tracked radial glow, 3D tilt, outlined numerals |
| Smooth scroll | `fx/SmoothScroll.tsx` | Lenis driven by the GSAP ticker |
| Custom cursor + magnetic CTAs | `fx/Cursor.tsx`, `fx/Magnetic.tsx` | Context labels (`data-cursor="Drag"`), disabled on touch |
| Velocity marquee | `fx/VelocityMarquee.tsx` | Speed and skew follow scroll velocity |
| Liquid glass UI | `globals.css` `.liquid-glass` | Backdrop blur/saturate, masked conic specular rim, light sweep |
| Native scroll-driven reveals | `globals.css` `.sd-reveal` | CSS `animation-timeline: view()` behind `@supports` |

Every motion effect respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run models       # regenerate the 3D GLB models (optional — they are committed)
```

Node 20+ is recommended.

## What's inside

| Route | Content |
| --- | --- |
| `/` | Full-screen 3D hero (360° AROSAFE nitrile glove: drag, zoom, mouse parallax, scroll choreography), About + animated stats, sticky scroll-driven 3D product reveal, Expertise, Why Aroved (network graphic), Contact |
| `/products` | The full catalogue grouped into the four AROSAFE categories, plus the 3D showcase |
| `/products/[slug]` | 18 statically generated product pages: interactive 3D viewer, specifications, applications, product photo, related products, enquiry form pre-filled with the product |
| `/about` | Vision, mission, quality policy and managing team |
| `/contact` | Enquiry form, contact details, opening hours, map |

`sitemap.xml`, `robots.txt`, per-page metadata, Open Graph tags and JSON-LD (Organization and Product) are generated automatically.

## Project structure

```
scripts/
  generate-models.mjs     SDF definitions of the glove & gown → GLB
  lib/sdf.mjs             signed-distance primitives (round cones, smooth-min…)
  lib/surface-nets.mjs    isosurface mesher + Taubin smoothing
  lib/glb.mjs             dependency-free glTF 2.0 binary writer
public/models/            arosafe-glove.glb, arosafe-gown.glb (~1 MB each)
src/
  app/                    routes, layout, SEO, /api/enquiry
  lib/company.ts          company facts — single source of truth
  lib/products.ts         product catalogue & 3D model mapping
  components/three/       Glove, Gown, procedural models, Studio lighting,
                          HeroScene, ProductStage/Viewer, lazy canvas wrapper
  components/sections/    page sections (Hero, About, ProductShowcase, …)
  components/ui/          Button, Reveal, CountUp, EnquiryForm, Logo, …
```

## The 3D models

- **Glove (built from scratch).** It is modelled on the supplied reference photography (`glove_blue_front`, `glove_blue_45`). The shape is a signed distance field: a tapered palm, three-segment fingers with natural curl, the thumb, a flared wrist with stretch wrinkles, a rolled cuff bead and a hollow opening. Surface Nets meshes the field, normals come from the SDF gradient, and the result is written to GLB. One mesh serves every glove product through five material finishes: blue nitrile, black nitrile, white latex, sterile surgical and transparent EVA. The AROSAFE print is a projected decal, and a procedural diamond grip micro-texture is applied as a normal map.
- **Surgeon gown** is built the same way: raglan sleeves, a raised chest panel, skirt folds, and separate knit cuffs with ribbing.
- **Other products** (drape kits, wet wipes, under pads, caps, shoe covers, masks, sterilization reels, wrap sheets, indicator tape, labels) are lightweight procedural models with procedural fabric, quilt and pleat textures. They are illustrative placeholders. When real manufacturer GLB files are available, drop them into `public/models/` and swap the component in `components/three/ProductModel.tsx`.

To change the glove's shape, edit `FINGERS`, `THUMB` or `gloveSDF` in `scripts/generate-models.mjs`, then run `npm run models`.

### Performance

- WebGL code is code-split and client-only (`next/dynamic`, `ssr: false`).
- Canvases mount only near the viewport and stop rendering when scrolled away (`ViewportCanvas`).
- Pixel ratio adapts on slower GPUs (`PerformanceMonitor` and `AdaptiveDpr`).
- Lighting uses Lightformers, so no HDR is downloaded. The glass effects avoid costly transmission passes.
- GLB files are served with immutable cache headers.

### Accessibility

- Skip link, semantic landmarks, visible focus styles and `aria-current` navigation.
- The 3D viewers are keyboard operable (arrow keys rotate, `+`/`-` zoom, `0` resets) and have labelled controls.
- `prefers-reduced-motion` stops auto-rotation and scroll choreography.

## Enquiry form

The form posts to `/api/enquiry`. To deliver submissions by email, copy `.env.example` to `.env.local` and set `RESEND_API_KEY` (plus a verified `ENQUIRY_FROM` sender). Without a key, the endpoint returns 503 and the form opens the visitor's email client with the enquiry addressed to sales@aroved.com, so no enquiry is silently lost.

## Content policy

All company details, product names, descriptions, specifications, statistics (20 years' experience, 250+ hospitals, 500+ distributors) and team information come from the existing aroved.com pages. No certifications, medical claims or figures have been added. Products whose pages list no specifications (drape kits, LSCS kit, gowns, labels) show "available on request" instead.

Notes for review:
- The old site's under-pads text reads "Get Lock Technology". The new site uses "Gel Lock Technology", assuming a typo; please confirm.
- The site lists "Labels" under CSSD products without any details.
- Team bios for the two Directors are shortened to the opening sentence available on the old site.
- Product photos in `public/images/products/` and the team photos were downloaded from aroved.com. The old site's gown image returned a 404, so the supplied `gown_surgeon_hero.webp` is used instead.
