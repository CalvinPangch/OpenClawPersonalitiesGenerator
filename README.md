# OpenClaw Personality Generator

A Vite-based web app for building an OpenClaw assistant personality and exporting all core markdown config files in one flow.

Live app: https://calvinpangch.github.io/OpenClawPersonalitiesGenerator/

## What It Generates

- `IDENTITY.md`
- `SOUL.md`
- `USER.md`
- `AGENTS.md`
- `TOOLS.md`
- `HEARTBEAT.md`

## Features

- Guided tab-based configuration UI
- Preset cards for common roles, vibe, tools, and heartbeat modes
- Persona card preview after generation
- One-click file downloads (single file or all files)
- Built-in SEO metadata, sitemap, robots.txt, and social preview image

## Tech Stack

- Vanilla JavaScript (ES modules)
- Vite
- Plain CSS

## Getting Started

### Requirements

- Node.js 18+ (recommended)
- npm

### Install

```bash
npm ci
```

### Run Locally

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Project Structure

```text
.
├── index.html
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.js
│   ├── style.css
│   ├── persona.js
│   ├── tutorial.js
│   ├── download.js
│   ├── data/
│   │   └── presets.js
│   └── generators/
│       ├── identity.js
│       ├── soul.js
│       ├── user.js
│       ├── agents.js
│       ├── tools.js
│       └── heartbeat.js
└── vite.config.js
```

## Deployment Notes

- This project is configured for GitHub Pages with:
  - `base: '/OpenClawPersonalitiesGenerator/'` in `vite.config.js`
- Build output is generated in `dist/`.
- Do not manually edit files in `dist/`.

## Contributing

- Keep JavaScript and CSS style consistent with the codebase (2-space indentation, semicolons, single quotes).
- Run `npm run build` before opening a PR.
- Manually verify key flows with `npm run preview`:
  - tab switching
  - preset selection
  - generate flow
  - file downloads

## License

Licensed under the MIT License. See `LICENSE`.
