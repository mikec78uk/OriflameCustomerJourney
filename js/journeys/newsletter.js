// Newsletter journey, transcribed from "User Journey Newsletter.pdf" (key: "Key to read userflow.pdf").
// Final-deliverable content: anything not yet known is shown as TBD.
// Coordinates are PDF artboard pixels (rendered at 4626 × 938). R-19, R-25 and R-35 are the same pages
// as in the Registration journey, so they keep their R- references and screenshots.

import { HIGHLIGHTS } from './highlights.js';
import { artboard, finalize, FLOW_LEGEND, SOURCE as source } from './flow.js';

const { page, terminal, ghost, area, edge: e } = artboard({ ox: 80, oy: 60 });

// The logged-in Member / Brand Partner routes moved right to make room for NL-7 and NL-8 (later updates).
const S = 653;

// Leads welcome journey timings and content from "CRM journeys overview (BCM markets) 2025" (marked WIP there).
const CRM = 'CRM journeys overview (BCM markets) 2025';

const nodes = [
  page('NL-1', 'UK Home (Footer)', 840, 304, {
    challenges: [{
      title: 'No immediate confirmation',
      text: 'No confirmation email is sent straight after signing up to the newsletter; the first email (NL-2) arrives after 2 hours.',
      source,
    }],
  }),
  page('NL-2', 'Welcome to Oriflame!', 1285, 304, {
    type: 'email',
    description: `Leads welcome journey – first email, sent automatically after newsletter sign-up (${CRM}; journey marked WIP). In this user flow it arrived after 2 hours.`,
  }),
  page('NL-5', 'Unsubscribe', 1285, 690),
  page('NL-7', 'Discover beauty and wellness with Oriflame!', 1700, 304, {
    type: 'email',
    description: `Leads welcome journey – Day 3 email (${CRM}; journey marked WIP).`,
  }),
  page('NL-8', 'Free delivery on your first order', 2120, 304, {
    type: 'email',
    description: `Leads welcome journey – Day 6 email (${CRM}; journey marked WIP): free delivery on the first order, “Beauty favourites” product picks and “You might also like” suggestions. Title translated from the Czech example in the overview; no UK version captured yet.`,
  }),

  // Logged in as Member
  page('R-19', 'My Account', 1817 + S, 299, { audience: 'M' }),
  page('R-25', 'What’s New', 2137 + S, 299, { audience: 'M' }),
  page('NL-3', 'Newsletter', 2137 + S, 505, { audience: 'M' }),
  page('NL-4.1', '“Start your side hustle…”', 2489 + S, 505, { id: 'nl-4-1', audience: 'M' }),
  page('NL-4.2', '“Spotted in the press…”', 2489 + S, 690, { id: 'nl-4-2', audience: 'M' }),

  // Logged in as Brand Partner
  page('R-35', 'My Account (Dashboard)', 2942 + S, 294, { audience: 'BrP' }),
  { ...page('', 'What’s New', 3261 + S, 294, { id: 'whats-new-brp', audience: 'BrP' }), ref: null }, // no reference in the source
  page('NL-6', 'Newsletter', 3261 + S, 501, { audience: 'BrP' }),
];

const terminals = [
  terminal('url-uk', 'Typing URL uk.oriflame.com', 223, 368),
];

const ghosts = [
  ghost('confirmation-email', 'Confirmation email', 840, 545),
];

const edges = [
  e('url-uk', 'nl-1'),
  e('nl-1', 'nl-2', { delay: { wait: 'After 2h' } }),
  e('nl-1', 'confirmation-email', { fromSide: 'b', toSide: 't', style: 'none', flag: 'No immediate confirmation' }),
  e('nl-2', 'nl-5', { fromSide: 'b', toSide: 't' }),
  e('nl-2', 'nl-7', { delay: { wait: 'After 3 days' } }),
  e('nl-7', 'nl-8', { delay: { wait: 'After 3 days', day: 'Day 6' } }),

  e('nl-1', 'r-19', { fromSide: 't', toSide: 't', via: [[960, 226], [1937 + S, 226]], label: 'Logged in as Member', labelAt: 0.45 }),
  e('r-19', 'r-25'),
  e('r-25', 'nl-3', { fromSide: 'b', toSide: 't' }),
  e('nl-3', 'nl-4-1'),
  e('nl-3', 'nl-4-2', { via: [[2434 + S, 569], [2434 + S, 754]] }),

  e('nl-1', 'r-35', { fromSide: 't', toSide: 't', via: [[960, 162], [3062 + S, 162]], label: 'Logged in as Brand Partner', labelAt: 0.6 }),
  e('r-35', 'whats-new-brp'),
  e('whats-new-brp', 'nl-6', { fromSide: 'b', toSide: 't' }),
];

// Screenshots in assets/screens/ (redacted web JPEGs), named by reference number.
const SCREENSHOTS = new Set(['NL-1', 'NL-2', 'NL-3', 'NL-4.1', 'NL-4.2', 'NL-5', 'NL-6', 'NL-7', 'NL-8', 'R-19', 'R-25', 'R-35']);

finalize({ nodes, terminals, ghosts, edges, screenshots: SCREENSHOTS });

export const newsletter = {
  id: 'newsletter',
  name: 'Newsletter',
  status: 'ready',
  metrics: false, // hide visits, conversion and traffic sources/destinations until real data is available
  width: 4220,
  height: 880,
  nodes,
  terminals,
  ghosts,
  decisions: [],
  groups: [],
  // Area D from "Newsletter.pdf": the whole flow after the entry point.
  areas: [area('area-d', 'D', [{ ids: [...nodes.map((n) => n.id), ...ghosts.map((g) => g.id)], pad: [170, 60, 60, 60] }], {
    caption: 'Newsletter sign-up, emails and My Account section', badge: { at: 'bl-out' },
  })],
  summary: { highlights: HIGHLIGHTS.newsletter },
  edges,
  legend: FLOW_LEGEND.filter((i) => !['trigger', 'push', 'decision'].includes(i.kind)).concat({ kind: 'ghost', label: 'Does not exist yet' }),
};
