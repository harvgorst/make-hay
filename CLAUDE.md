# Make Hay

A phone-first web app for pricing scything work: draw patches on a satellite map, give each a difficulty, and get a quote including travel. It is a single static page (`index.html`) served by GitHub Pages at https://harvgorst.github.io/make-hay/, with `manifest.webmanifest`, `sw.js` and icons beside it. Leaflet and Leaflet-Geoman are inlined in `index.html`; the app's own CSS and JS are the last `<style>` and `<script>` blocks.

## Working with the owner

- **Before changing anything, give a short heads-up** of what you're about to change and how, then wait for a go-ahead or additions. A one-line fix gets a one-line heads-up; bigger features get a few bullets. Plain questions get answers, not changes.
- **Push every finished change to `main` without asking**, once it has been tested. No pull requests unless asked.
- Commit as `Claude <noreply@anthropic.com>` so GitHub shows commits as verified.
- **Versions**: every published change bumps the version in three places together: `APP_VERSION` in `index.html`, `version.json`, and the cache name in `sw.js` (`make-hay-X.Y.Z`). Installed apps compare `version.json` with their own `APP_VERSION` and offer an Update bar. Use patch numbers for fixes (1.0.1), minor for features (1.1.0). Note notable changes in the README and tag releases (`git tag vX.Y.Z`).
- iPhones read the status-bar and home-screen settings only when the icon is added; changes to those need the icon re-adding. Everything else arrives through the Update bar.

## Rules for the app

- **Never change the user's saved rates** (Easy, Medium, Hard, Very hard, minimum charge) automatically. Only the user edits them, in Settings. The standard rates (£0.36 / £0.38 / £0.42 / £0.44 per m²) apply only to a new device or via the "Use standard rates" button.
- **Quotes go to customers**: no difficulty names, no per-m² rates, and no mention of the app's name. The app is separate from the contractor; the business name and phone come from Settings.
- Saved data lives in `localStorage` under `scythe-pricer-v2` (v1 is migrated). Don't rename the key or break older saved data; add migrations instead.
- Keep the web address; saved data is per site (`harvgorst.github.io`), so a path change keeps it but a host change would not.
- The feedback address is the `FEEDBACK_TO` constant, which the owner fills in themselves.

## Design

- Square, flat, IBM-style: no rounded corners, thin 1px rules, inputs with a tinted fill and a bottom line.
- Type: IBM Plex Sans for text; Space Mono (retro) for figures.
- Palette: moss and lichen greens (accent `#4A6B38`), with a dark-mode set of tokens; difficulty colours green / straw / orange / red.
- Phones come first: the map fills the screen, and the job sits in a bottom sheet (slim strip or opened). Editing a patch uses the patch bar, not the sheet. Keep tap targets at least 44px.

## Testing

Test in Playwright with phone emulation (`devices['iPhone 13']`, `devices['iPhone SE']`) and a desktop viewport, and check screenshots before pushing. Map tiles, fonts, address search and routing are blocked in the sandbox; stub search and routing with `page.route` when needed.
