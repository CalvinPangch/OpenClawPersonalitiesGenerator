# Repository Guidelines

## Project Structure & Module Organization
This project is a Vite-based vanilla JavaScript app.
- `index.html`: app shell and form layout.
- `src/main.js`: app initialization, event wiring, and generation flow.
- `src/generators/*.js`: markdown generators for output files (for example `IDENTITY.md`, `AGENTS.md`, `TOOLS.md`).
- `src/data/presets.js`: preset definitions used by the UI.
- `src/persona.js`, `src/tutorial.js`, `src/download.js`: persona card UI, onboarding, and file download helpers.
- `src/style.css`: global design system and component styles.
- `public/`: static assets copied as-is.
- `dist/`: build output. Treat as generated; do not hand-edit.

## Build, Test, and Development Commands
- `npm ci`: install dependencies from `package-lock.json` (same command used in CI).
- `npm run dev`: start local Vite dev server.
- `npm run build`: create production build in `dist/`.
- `npm run preview`: serve the built app locally for final checks.

## Coding Style & Naming Conventions
- Use ES modules and keep code in plain JavaScript/CSS.
- Match existing style: 2-space indentation, semicolons, single quotes.
- Use `camelCase` for functions/variables (`setupHeartbeatModes`, `renderPresetGrid`).
- Keep module names lowercase and descriptive (for example `src/generators/heartbeat.js`).
- Keep each generator focused on one output concern; shared constants belong in `src/data/`.

No formatter or linter is currently configured, so consistency with surrounding files is required.

## Testing Guidelines
Automated tests are not configured yet.
- Minimum pre-PR check: `npm run build` must pass.
- Run `npm run preview` and manually verify core flows: tab switching, preset selection, generate, and file downloads.
- If adding automated tests, use Vitest and place files as `src/**/__tests__/*.test.js`.

## Commit & Pull Request Guidelines
Git history is not available in this workspace snapshot, so use a clear conventional style:
- Commit format example: `feat(generators): add custom heartbeat schedule output`.
- Keep subjects imperative and under ~72 characters.
- PRs should include: summary, testing steps, UI screenshots/GIFs (for visual changes), and linked issue(s).
