// Shared building blocks for user-flow journeys transcribed from PDF user-flow artboards
// (see "Key to read userflow.pdf"). Final-deliverable content: anything not yet known is TBD.

import { DESCRIPTIONS } from './descriptions.js';
import { STATS } from './stats.js';

export const TBD = 'TBD';

// Audiences: M = Member, BrP = Brand Partner (shown as "BP" in the source PDFs).
export const AUDIENCES = {
  M: { code: 'M', label: 'Member' },
  BrP: { code: 'BrP', label: 'Brand Partner' },
};

export const SOURCE = 'User flow review';

const W = 240;
const PDF_CARD_H = 128;
// Card height: taller when cards show traffic metrics (visits, conversion), compact otherwise.
const CARD_H = { metrics: 170, compact: 130 };

export const FLOW_LEGEND = [
  { kind: 'terminal', label: 'Start / End' },
  { kind: 'step', label: 'Step' },
  { kind: 'email', label: 'Email' },
  { kind: 'push', label: 'Push / SMS / WhatsApp' },
  { kind: 'trigger', label: 'UI element' },
  { kind: 'aud-m', label: 'Member' },
  { kind: 'aud-brp', label: 'Brand Partner' },
  { kind: 'decision', label: 'Decision' },
  { kind: 'flow', label: 'Direct connection' },
  { kind: 'none', label: 'No direct connection' },
  { kind: 'delay', label: 'Time delay' },
  { kind: 'finding', label: 'Finding' },
];

// Legend entry for journeys that include steps not available in the UK (see `notUk`).
export const NOT_UK_LEGEND = { kind: 'not-uk', label: 'Not available in the UK' };

// Placement helpers on a PDF artboard. Coordinates are PDF pixels; `ox`/`oy` shift them onto the canvas.
// Page `y` values are the PDF card tops; cards keep the PDF card centre so connectors line up.
// `sy` stretches the artboard vertically (for dense sources whose boxes are shorter than our cards) and
// `pdfCardH` is the source's box height, so cards stay centred on the source boxes.
export function artboard({ ox = 60, oy = 60, metrics = false, sy = 1, pdfCardH = PDF_CARD_H } = {}) {
  const pdf = ([x, y]) => [x - ox, y * sy - oy];
  const H = metrics ? CARD_H.metrics : CARD_H.compact;
  return {
    pdf,
    // `screenshot` overrides the image name when a page appears differently in this journey.
    // `type`: 'step' | 'email' | 'push' (phone-shaped: push, SMS or WhatsApp). `channels` lists every channel
    // a CRM send uses, e.g. ['Email', 'Push']. `description` comes from source documents (default TBD).
    // `notUk` marks steps that exist in other markets but not in the UK; they are shown faded and labelled.
    page(ref, name, x, y, {
      id = ref.toLowerCase(), audience = null, type = 'step', challenges = [], flag = null, screenshot = null,
      channels = null, description = null, notUk = false,
    } = {}) {
      return {
        id,
        ref,
        notUk,
        screenshot,
        channels,
        description,
        flow: true,
        name,
        audience: audience ? AUDIENCES[audience] : null,
        type, // 'step' | 'email' (purple in the source key)
        flag,
        challenges,
        x: x - ox,
        y: (y + pdfCardH / 2) * sy - H / 2 - oy,
        w: W,
        h: H,
        visits: TBD,
        rate: TBD,
      };
    },
    // Start / end points (yellow circles in the source key), placed by centre.
    terminal(id, label, cx, cy, { d = 150, tag = null, notUk = false } = {}) {
      return { id, label, tag, notUk, x: cx - d / 2 - ox, y: cy * sy - d / 2 - oy, w: d, h: d };
    },
    // UI elements (banners, buttons, icons) that lead between pages.
    trigger(id, label, x, y, w, h, { variant = 'light', caption = null, icon = null } = {}) {
      return { id, label, caption, icon, variant, x: x - ox, y: y * sy - oy, w, h };
    },
    // UML decision (triangle), placed by centre.
    decision(id, label, cx, cy, { size = 100, notUk = false } = {}) {
      return { id, label, size, notUk, x: cx - size / 2 - ox, y: cy * sy - size / 2 - oy };
    },
    // Text banner placed above a group of steps (rendered as a borderless group label).
    banner(id, label, x, y, { variant = 'not-uk' } = {}) {
      return { id, label, variant, x: x - ox, y: y * sy - oy, w: 1, h: 1 };
    },
    // Something the flow expects but that doesn't exist yet (dashed outline in the source).
    ghost(id, label, x, y, { caption = 'Does not exist yet', w = W, h = PDF_CARD_H } = {}) {
      return { id, label, caption, x: x - ox, y: y * sy - oy, w, h };
    },
    // Same as ghost, placed by centre (e.g. a collapsed group such as "x11 PLP Subpages").
    ghostAt(id, label, cx, cy, { caption = '', w = W, h = 72, variant = null } = {}) {
      return { id, label, caption, variant, x: cx - w / 2 - ox, y: cy * sy - h / 2 - oy, w, h };
    },
    // Lettered highlight area (shaded on the canvas, referenced from the Highlight panel), from one or more
    // source corner boxes [x0, y0, x1, y1] that are merged into a single shape.
    area(id, letter, boxes, opts = {}) {
      return { id, letter, ...opts, boxes: boxes.map(([x0, y0, x1, y1]) => ({ x: x0 - ox, y: y0 * sy - oy, w: x1 - x0, h: (y1 - y0) * sy })) };
    },
    // Section frame / swimlane from source corner coordinates.
    frame(id, label, x0, y0, x1, y1, opts = {}) {
      return { id, label, ...opts, x: x0 - ox, y: y0 * sy - oy, w: x1 - x0, h: (y1 - y0) * sy };
    },
    // Connector. `via` waypoints are PDF coordinates; the first and last snap to the anchors.
    // `style: 'none'` = "No direct connection"; `delay: { wait, day? }` marks time passing.
    edge(from, to, opts = {}) {
      return { from, to, ...opts, via: opts.via?.map(pdf) };
    },
  };
}

// Fills in card summaries and flyout detail from the flow itself.
export function finalize({ nodes, terminals = [], triggers = [], ghosts = [], decisions = [], groups = [], edges, screenshots = new Set(), describeTerminal = {} }) {
  const byId = new Map([...nodes, ...terminals, ...triggers, ...ghosts, ...decisions, ...groups].map((x) => [x.id, x]));
  const isPage = (id) => nodes.some((n) => n.id === id);
  const pageLabel = (n) => `${n.ref ? `${n.ref} ${n.name}` : n.name}${n.notUk ? ' – not in UK' : ''}`;
  const triggerName = (t) => (t.icon ? `${t.label} icon` : [t.caption, t.label].filter(Boolean).join(' – '));
  const direct = edges.filter((x) => x.style !== 'none');
  const describe = (id) => (isPage(id) ? pageLabel(byId.get(id)) : describeTerminal[id] || byId.get(id).label);
  const delayText = (d) => (d ? ` (${[d.wait, d.day].filter(Boolean).join(', ')})` : '');

  const branch = (d, y) => ` (${d.label}${y.label ? ` ${y.label}` : ''})`;

  // Where a page sends people, looking through UI elements and decisions to the pages behind them.
  const destinations = (id) => direct.filter((x) => x.from === id).flatMap((x) => {
    const target = byId.get(x.to);
    if (triggers.includes(target)) {
      return direct.filter((y) => y.from === x.to).map((y) => ({ id: y.to, label: `${describe(y.to)} (via “${triggerName(target)}”)` }));
    }
    if (decisions.includes(target)) {
      return direct.filter((y) => y.from === x.to).map((y) => ({ id: y.to, label: `${describe(y.to)}${branch(target, y)}${delayText(y.delay)}` }));
    }
    return [{ id: x.to, label: `${describe(x.to)}${delayText(x.delay)}` }];
  });

  const origins = (id) => direct.filter((x) => x.to === id).flatMap((x) => {
    const src = byId.get(x.from);
    if (triggers.includes(src)) {
      return direct.filter((y) => y.to === x.from).map((y) => ({ id: y.from, label: `${describe(y.from)} (via “${triggerName(src)}”)` }));
    }
    if (decisions.includes(src)) {
      return direct.filter((y) => y.to === x.from).map((y) => ({ id: y.from, label: `${describe(y.from)}${branch(src, x)}` }));
    }
    return [{ id: x.from, label: describe(x.from) }];
  });

  const tbdRows = (rows) => (rows.length ? rows.map((r) => ({ label: r.label, value: TBD })) : [{ label: TBD, value: TBD }]);

  nodes.forEach((n) => {
    const outs = destinations(n.id);
    const uniqueOuts = [...new Set(outs.map((o) => o.id))];
    n.next = uniqueOuts.length === 1 && isPage(uniqueOuts[0]) ? byId.get(uniqueOuts[0]).name : TBD;
    n.findings = n.challenges.length || TBD;
    n.stats = (n.ref && STATS[n.ref]) || null; // Google Analytics metrics, when supplied for this reference
    n.detail = {
      // `screenshot: false` shows no image even when the page's reference has one.
      screenshot: n.screenshot === false ? null
        : n.screenshot ? `assets/screens/${n.screenshot}.jpg`
        : n.ref && screenshots.has(n.ref) ? `assets/screens/${n.ref}.jpg` : null,
      // Journey-specific text first, then the shared description for the page's screenshot, reference or id.
      description: n.description || DESCRIPTIONS[n.screenshot] || DESCRIPTIONS[n.ref] || DESCRIPTIONS[n.id] || TBD,
      keyBehaviour: [
        { label: 'Page Views', value: TBD },
        { label: 'Conversion to next step', value: TBD },
        { label: 'Exit rate', value: TBD },
      ],
      cameFrom: tbdRows(origins(n.id)),
      wentNext: tbdRows(outs),
      challenges: n.challenges.length ? n.challenges : [{ text: TBD }],
      opportunities: [{ text: TBD }],
    };
  });
}
