# Oriflame User Journey Flows

Interactive prototype for communicating Oriflame customer journeys. Each journey is drawn as a pannable, zoomable flow; selecting a page opens a flyout with a screenshot, description, GA data points, and qualitatively identified challenges and opportunities.

**Live:** https://mikec78uk.github.io/OriflameCustomerJourney/

> **Registration** includes a **BCM 6.0** swimlane (R-39 … R-46) showing the alternative registration flow after the business model change, lined up above the current flow, with a second lane (R-46 … R-50) for the My Account progression from Buyer to Seller to Builder.
> **Registration**, **Newsletter** and **Brand Partner Training (Onboarding)** are final-deliverable content, transcribed from their user-flow PDFs. Anything not yet known is shown as **TBD**, and pages without a screenshot show only their details (no image placeholder).
> CRM emails from *CRM journeys overview (BCM markets) 2025* are added to the flows they belong to; live journeys not triggered by site actions are on the **CRM journeys** tab.
> **Purchase** is the full site map and checkout from *Oriflame Journey Mapping WIP.pdf* (SHOP, INSPIRATION, ALL OFFERS, shopping example, checkout as-is and BCM 6.0 checkout), with the abandoned basket, Share & Earn, NovAge+ and Wellosophy CRM journeys in their own lanes.

## Features

- **Journeys:** Registration, Newsletter, Brand Partner Training (Onboarding), Purchase and CRM journeys, switched by tabs (Subscription and Revieve Beauty Tools are hidden for now)
- **Reference numbers:** pages have references (R-1 … R-50, E-1 … E-6, NL-1 … NL-8, O-1 … O-15, P-1 … P-46, CRM-n.n) and an audience badge: **M** = Member, **BrP** = Brand Partner
- **User-flow key:** start/end points, steps, envelope-shaped email steps, phone-shaped push/SMS/WhatsApp steps, UML decisions, UI elements, direct connections and dashed *no direct connection* links with ⚠ findings
- **Summary bar:** under the tabs, key metrics for the selected journey and a **Highlight** button that opens a panel of key takeaways. Highlight text (executive summaries) lives in `js/journeys/highlights.js`; each journey passes it as `summary: { intro, metrics, highlights }` (placeholders otherwise). A highlight with `area: 'A1'` links to a lettered, shaded area on the canvas, defined with `area(id, letter, boxes, { caption, badge })` in the journey's `areas`, where each box is PDF corners `[x0, y0, x1, y1]` or `{ ids: [...], pad }` (the bounds of those steps). The panel's button zooms to the area and the area's badge opens its highlight
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
js/data.js          Journey list and header settings
js/journeys/        Final journey content (registration.js, newsletter.js, training.js, purchase.js, crm.js), page descriptions, GA stats + shared flow helpers (flow.js)
js/app.js           Rendering, camera, animation, flyout
assets/             Logo, favicon, page screenshots
```

No build step. Open it through any static server:

```bash
python3 -m http.server 5173
```

## Updating content

**GA4 funnels:** step-by-step funnels live in `js/journeys/funnels.js` (users per step; completion and drop-off are derived), keyed by journey and passed as `funnels` on Registration and Purchase. Each funnel becomes a summary-bar tile (overall conversion) that opens the Funnels panel. Replace the file's contents when a new export is supplied, and update `FUNNEL_PERIOD` and `meta.dateRange` in `js/data.js`.

**Google Analytics data:** page metrics live in `js/journeys/stats.js`, keyed by reference number (users, views, views per session/user, engagement rate, each with its change vs the previous period). Pages with data show a users headline on the card and a Key Behaviour section in the flyout; this is hidden for now (`SHOW_STATS = false` in the same file). Replace the file's contents when a new export is supplied.

**Screenshots:** put full-size PNGs named by reference (e.g. `R-12.png`) in `assets/screens/` and run `scripts/optimise-screens.sh` to create 900px-wide JPEGs for the flyout. The original PNGs are git-ignored. Screenshots of signed-in pages and emails contain personal data (names, emails, phone numbers, account numbers, profile photos, sponsor details), so **redact the JPEGs before committing**. The published R-, NL- and O- JPEGs have already been redacted. List the references with screenshots in each journey's `SCREENSHOTS` set; a page can use a different image in one journey with `page(..., { screenshot: 'R-35-training' })`.

User-flow journeys live in `js/journeys/` and are built with `artboard()` and `finalize()` from `flow.js`. Use `page(ref, name, x, y, { audience, type, flag, challenges })` for pages, with PDF artboard coordinates, plus `terminal`, `trigger` (UI element) and `ghost` (expected but doesn't exist yet). Edges take optional `via` waypoints, `style: 'none'` for a dashed no-direct-connection link, `flag` for a ⚠ label and `delay: { wait, day }` for a time delay. Mark steps that exist in other markets but not the UK with `notUk: true` on pages, decisions, terminals and edges (shown faded, labelled "Not in UK", skipped by the walkthrough) and add a `banner` above them. `finalize()` derives the card summaries and the flyout's sources and destinations from the flow. When you add real data, replace the `TBD` values and set `detail.screenshot` to an image in `assets/screens/`.

To add a journey, create a file in `js/journeys/` and add it to the `journeys` list in `js/data.js`. Dense source maps can be stretched vertically with `artboard({ sy, pdfCardH })`.

## Deploying

The site is served by GitHub Pages from the `main` branch root (Settings → Pages → Deploy from a branch → `main` / `/ (root)`).
