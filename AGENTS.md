# Repository Guidelines

## Project Structure & Module Organization
This project is a Vite + Vue 3 app for querying Taipei YouBike stations.

- `src/main.js`: app bootstrap (`createApp`, Pinia registration).
- `src/App.vue`: main page flow (search, loading state, result rendering).
- `src/components/YoubikeCardItem/index.vue`: station card and detail modal UI.
- `src/stores/Youbike.js`: Pinia store for favorites and `localStorage` sync.
- `src/api/youbike/youbike.api.js`: API access layer (Axios wrapper).
- `src/style.css` and `src/assets/*.css`: Tailwind/DaisyUI and base styles.
- `public/`: static assets served as-is.

Use the `@` alias for imports from `src` (configured in `vite.config.js`).

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start local dev server with hot reload.
- `npm run build`: create production bundle in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run format`: run Prettier on `src/`.

Example workflow: `npm run format && npm run build`.

## Coding Style & Naming Conventions
- Follow Prettier config in `.prettierrc.json`: no semicolons, single quotes, `printWidth: 100`.
- Use 2-space indentation in Vue/JS files.
- Components: PascalCase folder/file names (example: `YoubikeCardItem`).
- Stores: `useXxxStore` naming (example: `useYoubikeStore`).
- Keep UI text and labels consistent (Traditional Chinese is currently used in the app).

## Testing Guidelines
No automated test framework is configured yet. For now:
- Validate manually with `npm run dev` and `npm run preview`.
- Check core flows: keyword search, station detail modal, add/remove favorite, page reload persistence.

When adding tests, prefer Vitest + Vue Test Utils and place tests under `src/__tests__/` with `*.spec.js` names.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commit prefixes:
- `feat: ...`
- `fix: ...`

Keep commit messages imperative and scoped. Example: `feat: add station keyword normalization`.

For pull requests:
- Provide a concise summary and why the change is needed.
- Link related issues/tasks.
- Include before/after screenshots or short recordings for UI changes.
- List validation steps (commands run and manual test scenarios).
