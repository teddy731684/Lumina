---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces rooted in Italian Classic interior design. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications for Lumina Interiors (or any Italian interior design context). Generates polished, opulent UI with a Classic Italian aesthetic — warm terracotta-orange and sky light blue palette, serif typography, ornamental details, and refined spatial composition.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces in the **Italian Classic** aesthetic for Lumina Interiors. Every interface must feel like it belongs in a Milanese palazzo — opulent, timeless, and meticulously crafted.

The user provides frontend requirements: a component, page, application, or interface to build.

## Design Identity

**Style**: Italian Classic Interior Design
**Mood**: Refined opulence, old-world elegance, warm luxury
**Color Scheme**:
- Primary: **Terracotta Orange** — `#C8622A` (warm, earthy, Renaissance-inspired)
- Accent: **Sky Light Blue** — `#87CEEB` (airy, Mediterranean, contrasting freshness)
- Neutral Dark: `#1A1208` (near-black with warm undertone)
- Neutral Light: `#FAF6EF` (aged parchment, ivory)
- Gold: `#C5A028` (gilded accent for ornamental details)

**CSS Variable Palette** (always use these):
```css
:root {
  --color-orange:       #C8622A;
  --color-orange-light: #E07840;
  --color-blue:         #87CEEB;
  --color-blue-deep:    #4A9EBF;
  --color-gold:         #C5A028;
  --color-dark:         #1A1208;
  --color-ivory:        #FAF6EF;
  --color-cream:        #F0E8D8;
  --color-muted:        #8C7B6B;
}
```

## Design Thinking

Before coding, commit to the Italian Classic direction:
- **Purpose**: What role does this interface play in a luxury interior design experience?
- **Tone**: Always refined and editorial — think *Architectural Digest Italia*, not startup SaaS.
- **Ornament**: Italian Classic embraces decorative detail: column motifs, arched frames, gilded borders, fresco-inspired textures.
- **Differentiation**: What timeless Italian design element makes this page UNFORGETTABLE? A marble-texture hero, hand-drawn linework border, a mosaic grid, a Renaissance-inspired typographic poster?

**CRITICAL**: Execute the Italian Classic vision with precision. Maximalism is welcome when ornamental; restraint is welcome when architectural. The key is intentionality — every element should feel *designed*, not assembled.

## Frontend Aesthetics Guidelines

### Typography
- **Display / Headlines**: Use serif fonts with historic character — `Playfair Display`, `Cormorant Garamond`, `IM Fell English`, or `Libre Baskerville`. These evoke Renaissance manuscripts and classical architecture.
- **Body**: Pair with an elegant transitional serif or refined sans — `EB Garamond`, `Lora`, or `Raleway` (light weight only).
- **Avoid**: Inter, Roboto, Arial, system-ui, Space Grotesk, or any font that reads as modern tech.
- Use generous tracking (`letter-spacing`) on headings and ALL-CAPS labels for aristocratic effect.

### Color & Theme
- Lead with **terracotta orange** (`#C8622A`) as the dominant warm tone; deploy **sky light blue** (`#87CEEB`) for contrast and Mediterranean airiness.
- Use **gold** (`#C5A028`) sparingly for borders, dividers, icons, and hover states — never as a background fill.
- Backgrounds: ivory (`#FAF6EF`) for light sections, near-black (`#1A1208`) for dark dramatic sections.
- Avoid pure white (`#ffffff`) and pure black (`#000000`) — they feel cold and modern.
- Blue as a highlight color: use for links, active states, sky imagery overlays, and cool-side accents that balance the warmth.

### Motion
- Animations should feel unhurried and ceremonial: slow fades (600–900ms), gentle upward reveals, graceful transitions.
- Page-load stagger: reveal elements top-to-bottom with `animation-delay` steps of 150–200ms.
- Hover states: subtle gold glow, delicate scale (1.02–1.04), or border color transition from orange to gold. Never abrupt or bouncy.
- Avoid energetic, springy, or playful animations — they break the classical mood.

### Spatial Composition
- Generous negative space with asymmetric elegance — think palazzo room layouts.
- Vertical rhythm: use consistent baseline grid spacing (multiples of 8px).
- Feature arched or rounded-top frames for images and cards (border-radius mimicking Roman arches).
- Decorative horizontal rules using `background: linear-gradient(to right, transparent, #C8622A, #C5A028, #C8622A, transparent)`.
- Overlap elements with intention: a heading overlapping an image edge, a border crossing a section divide.

### Backgrounds & Visual Details
- Marble texture: subtle CSS `background-image` noise or a fine grain overlay (`::after` pseudo-element, opacity 0.04–0.08).
- Section dividers: SVG ornamental flourishes or a centered diamond `◆` flanked by thin lines in gold.
- Card surfaces: `#F0E8D8` with a `1px solid rgba(197,160,40,0.3)` border (gold tint).
- Shadows: warm-toned (`box-shadow: 0 4px 24px rgba(200,98,42,0.12)`) rather than grey.
- Terracotta or sky-blue gradient overlays on hero images to unify photography with the palette.

### Italian Classic Motifs (use where appropriate)
- Column / pilaster details as decorative vertical lines
- Arch shapes in image containers and hero sections (`border-radius: 50% 50% 0 0 / 60% 60% 0 0`)
- Geometric intarsia patterns (repeating diamond / hexagon) as subtle section backgrounds
- Olive branch or laurel SVG dividers between sections
- Roman numeral labels for numbered lists or process steps
- Fresco-warm gradient overlays on full-bleed imagery
- Sky blue used for window / aperture motifs that frame content like a Mediterranean view

## What to Avoid
- Purple gradients, electric blues, neon accents
- Glassmorphism, neumorphism, or any trend-driven UI style
- Card grids that feel like SaaS dashboards
- Any element that looks like it belongs on a tech startup landing page
- Cookie-cutter layouts — every design must feel purpose-built for Italian luxury interiors
- Cold grey neutrals — always reach for warm ivory, cream, or terracotta tones instead

Remember: this is not a generic website. It is a digital expression of Italian Classical craftsmanship. Every pixel should feel considered, every typographic choice deliberate, and every color placement evocative of sun-warmed terracotta and Mediterranean sky.
