# Akansha and Doodles — Portfolio & Commission Request App

Portfolio and custom commission request web application for illustrator **Akansha and Doodles** ([@akansha.and.doodles](https://www.instagram.com/akansha.and.doodles)).

Built with React, TypeScript, Vite, and Vanilla CSS adhering to strict Min-UI principles and flat pastel styling.

---

## Visual & Styling Constraints

- **Solid, Flat Colors:** Zero gradients across all containers, badges, cards, and buttons.
- **Zero Emojis:** Pure iconography using `hugeicons-react`.
- **Neutral Hairlines:** Borders use neutral tokens (`#E4E2EB`, `#D4D0DE`) only.
- **Zero Shadows:** `box-shadow: none` enforced application-wide.
- **Zero On-Hover Motion:** No `transform`, `translate`, `scale`, or `rotate` on hover. State changes occur via clean solid color transitions.
- **Curated Palette:**
  - Canvas: `#FAF8FF`
  - Secondary Container: `#F2EEFC`
  - Primary Accent: `#6E44FF`
  - Primary Ink: `#181523`
  - Muted Ink: `#645F73`
  - Neutral Hairlines: `#E4E2EB`

---

## Features

- **Top Bar:** Live availability indicator (`Commission status: Open — 3 slots remaining`), direct contact actions, and navigation links.
- **Works Gallery:** Filterable portfolio items (`Character`, `Couple`, `Pet`, `Sticker sheet`) with inline detail modal displaying dimensions, medium, completion year, and palette tokens.
- **Interactive Commission Configurator:** Live calculation for Format, Subject Count (1–4), Background Complexity, and Usage Rights with itemized price breakdown.
- **Client Reviews:** Compact verifiable client feedback.
- **Request Submission Form:** Pre-filled intake form with active configuration, validation, reference ID generation, and post-submission guidance.

---

## Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Production build
npm run build
```
