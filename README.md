# Oriflame User Journey Flows

Interactive prototype for communicating Oriflame customer journeys. Each journey is drawn as a pannable, zoomable flow; selecting a page opens a flyout with a screenshot, description, GA data points, and qualitatively identified challenges and opportunities.

**Live:** https://mikec78uk.github.io/OriflameCustomerJourney/

> **Registration**, **Newsletter** and **Brand Partner Training (Onboarding)** are final-deliverable content, transcribed from their user-flow PDFs. Anything not yet known is shown as **TBD**, and screenshots are marked *Coming soon*.
> **Core Transactional Journey** still uses placeholder values from the Figma wireframes.

## Features

- **Journeys:** Registration, Newsletter, Brand Partner Training (Onboarding), Core Transactional Journey (placeholder) and Revieve Beauty Tools (coming soon), switched by tabs
- **Reference numbers:** pages have references (R-1 … R-38, E-1 … E-3, NL-1 … NL-7, O-1 … O-15) and an audience badge: **M** = Member, **BrP** = Brand Partner
- **User-flow key:** start/end points, steps, email steps, UI elements, notes, direct connections and dashed *no direct connection* links with ⚠ findings
- **Canvas:** drag to pan, <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + scroll or pinch to zoom, zoom controls and fit-to-screen
- **Walkthrough:** a guided camera tour through every step of the journey
- **Page flyout:** animated stats, traffic sources and destinations, challenges and opportunities, with prev/next navigation (← → keys)
- **Deep links:** `#registration/r-6` opens a journey straight to a page
- Animated with [GSAP](https://gsap.com/) (intro sequence, connector draw-on, traffic particles via MotionPath, camera moves)
- Styled with Oriflame's *Flourish* design tokens and the SansOri typeface (Inter fallback)

## Project structure

```
index.html          App shell
css/styles.css      Flourish design tokens + component styles
js/data.js          Journey list + Core Transactional Journey placeholder content
js/journeys/        Final journey content (registration.js, newsletter.js, training.js) + shared flow helpers (flow.js)
js/app.js           Rendering, camera, animation, flyout
assets/             Logo, favicon, page screenshots
```

No build step. Open it through any static server:

```bash
python3 -m http.server 5173
```

## Updating content

**Screenshots:** put full-size PNGs named by reference (e.g. `R-12.png`) in `assets/screens/` and run `scripts/optimise-screens.sh` to create 900px-wide JPEGs for the flyout. The original PNGs are git-ignored. Screenshots of signed-in pages and emails contain personal data (names, emails, phone numbers, account numbers, profile photos, sponsor details), so **redact the JPEGs before committing**. The published R-, NL- and O- JPEGs have already been redacted. List the references with screenshots in each journey's `SCREENSHOTS` set; a page can use a different image in one journey with `page(..., { screenshot: 'R-35-training' })`.

User-flow journeys live in `js/journeys/` and are built with `artboard()` and `finalize()` from `flow.js`. Use `page(ref, name, x, y, { audience, type, flag, challenges })` for pages, with PDF artboard coordinates, plus `terminal`, `trigger` (UI element) and `ghost` (expected but doesn't exist yet). Edges take optional `via` waypoints, `style: 'none'` for a dashed no-direct-connection link, `flag` for a ⚠ label and `delay: { wait, day }` for a time delay. `finalize()` derives the card summaries and the flyout's sources and destinations from the flow. When you add real data, replace the `TBD` values and set `detail.screenshot` to an image in `assets/screens/`.

Placeholder content lives in `js/data.js`:

- **Pages:** add or edit entries in `coreNodes` (`x`/`y` are canvas positions, matching Figma)
- **Connectors:** `coreEdges` (`from`/`to` ids, optional `fromSide`/`toSide` of `t`/`r`/`b`/`l`, and an optional `label`)
- **Page detail:** set `detail` on a node (see `placeholderDetail` for the shape). Put screenshots in `assets/screens/`
- **New journey:** add an object to `journeys` with `status: 'ready'` and its own nodes, edges, decisions and groups

## Deploying

The site is served by GitHub Pages from the `main` branch root (Settings → Pages → Deploy from a branch → `main` / `/ (root)`).
