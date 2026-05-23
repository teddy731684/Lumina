# Lumina Interiors

A luxury interior design studio landing page. Pure HTML/CSS/JS — no build step, no dependencies.

## Local Development

Serve locally (required — `file://` breaks the contact form and parallax CSS):

```bash
npx serve .
```

Then open `http://localhost:3000`.

## Features

- Dark / light mode with no flash on load
- Filterable portfolio grid with lightbox
- Animated stats counter
- Auto-advancing testimonial carousel with swipe support
- Contact form via [FormSubmit](https://formsubmit.co) (posts to `teddy01190@gmail.com`)
- WhatsApp float button, back-to-top button, toast notifications

## Stack

| File | Role |
|------|------|
| `index.html` | All markup |
| `style.css` | CSS variables, dark mode, all styles |
| `script.js` | Nine `init*()` functions, no framework |
