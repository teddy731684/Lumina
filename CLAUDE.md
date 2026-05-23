# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

Serve locally (`file://` breaks FormSubmit AJAX and `background-attachment: fixed`):
```
npx serve .
```
No build step, no dependencies. Pure HTML/CSS/JS.

## Architecture

Three files: [index.html](index.html), [style.css](style.css), [script.js](script.js).

`script.js` — nine `init*()` functions called in one `DOMContentLoaded` listener.

### CSS variables & dark mode

All colours in `:root`. Dark mode (`[data-theme="dark"]`) overrides only semantic aliases (`--bg-primary`, etc.) — palette vars (`--color-gold`, etc.) never change. FOUC prevented by a blocking inline `<script>` in `<head>` that sets `data-theme` before first paint.

### Scroll animations

Add `fade-in` class → `IntersectionObserver` adds `visible` on entry. JS injects stagger delays inline for `.service-card` and `.stat-item`.

### Stats counter

`.stat-item` needs `data-target="<n>"` and `data-suffix="<str>"`. Counts up once on intersection (50% threshold, easeOutQuad, 2s).

### Portfolio items

Each `.portfolio-item` requires: `data-category` (must match a `data-filter` button), `data-title`, `data-full` (lightbox URL), `data-span` (grid column span: `1` or `2`).

Filter uses `display:none` after 400ms fade. Lightbox rebuilds its nav array at click time from visible items only — keeps prev/next in sync with active filter.

### Carousel

5s auto-advance. Pauses on hover and `visibilitychange`. Swipe threshold: 50px. Dots are JS-generated — don't add them in HTML.

### Form (FormSubmit)

Posts JSON to `https://formsubmit.co/ajax/teddy01190@gmail.com`. Response `success` is the **string** `"true"`. `_honey` and `_captcha` hidden fields are required. First submission triggers a one-time confirmation email.

### Utilities

- `showToast(msg, type)` — module-level, callable anywhere. `type`: `'success'` | `'error'`. Auto-dismisses at 4.5s.
- `lockScroll()` / `unlockScroll()` — `position:fixed` + saved `scrollY` (iOS Safari workaround), pads right for scrollbar width.
