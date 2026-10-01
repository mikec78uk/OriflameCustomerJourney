# Oriflame User Journey Flows

Interactive prototype for communicating Oriflame customer journeys. Each journey is drawn as a pannable, zoomable flow; selecting a page opens a flyout with a screenshot, description, GA data points, and qualitatively identified challenges and opportunities.

**Live:** https://mikec78uk.github.io/OriflameCustomerJourney/

> All figures are placeholder values taken from the Figma wireframes.

## Features

- **Journeys:** Core Transactional Journey (from Figma) and Brand Partner Onboarding (coming soon), switched by tabs
- **Canvas:** drag to pan, <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + scroll or pinch to zoom, zoom controls and fit-to-screen
- **Walkthrough:** a guided camera tour through every step of the journey
- **Page flyout:** animated stats, traffic sources and destinations, challenges and opportunities, with prev/next navigation (← → keys)
- **Deep links:** `#core/plp` opens a journey straight to a page
- Animated with [GSAP](https://gsap.com/) (intro sequence, connector draw-on, traffic particles via MotionPath, camera moves)
- Styled with Oriflame's *Flourish* design tokens and the SansOri typeface (Inter fallback)

## Project structure

```
index.html          App shell
css/styles.css      Flourish design tokens + component styles
js/data.js          Journey content: pages, positions, connectors, detail data
js/app.js           Rendering, camera, animation, flyout
assets/             Logo, favicon, page screenshots
```

No build step. Open it through any static server:

```bash
python3 -m http.server 5173
```

## Updating content

All content lives in `js/data.js`:

- **Pages:** add or edit entries in `coreNodes` (`x`/`y` are canvas positions, matching Figma)
- **Connectors:** `coreEdges` (`from`/`to` ids, optional `fromSide`/`toSide` of `t`/`r`/`b`/`l`, and an optional `label`)
- **Page detail:** set `detail` on a node (see `placeholderDetail` for the shape). Put screenshots in `assets/screens/`
- **New journey:** add an object to `journeys` with `status: 'ready'` and its own nodes, edges, decisions and groups

## Deploying

The site is served by GitHub Pages from the `main` branch root (Settings → Pages → Deploy from a branch → `main` / `/ (root)`).
