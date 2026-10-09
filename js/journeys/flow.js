// Shared building blocks for user-flow journeys transcribed from PDF user-flow artboards
// (see "Key to read userflow.pdf"). Final-deliverable content: anything not yet known is TBD.

export const TBD = 'TBD';

// Audiences: M = Member, BrP = Brand Partner (shown as "BP" in the source PDFs).
export const AUDIENCES = {
  M: { code: 'M', label: 'Member' },
  BrP: { code: 'BrP', label: 'Brand Partner' },
};

export const SOURCE = 'User flow review';

const W = 240;
const H = 170;
const PDF_CARD_H = 128;

export const FLOW_LEGEND = [
  { kind: 'terminal', label: 'Start / End' },
  { kind: 'step', label: 'Step' },
  { kind: 'email', label: 'Email' },
  { kind: 'trigger', label: 'UI element' },
  { kind: 'aud-m', label: 'Member' },
  { kind: 'aud-brp', label: 'Brand Partner' },
  { kind: 'flow', label: 'Direct connection' },
  { kind: 'none', label: 'No direct connection' },
  { kind: 'delay', label: 'Time delay' },
  { kind: 'finding', label: 'Finding' },
];

// Placement helpers on a PDF artboard. Coordinates are PDF pixels; `ox`/`oy` shift them onto the canvas.
// Page `y` values are the PDF card tops; cards keep the PDF card centre so connectors line up.
export function artboard({ ox = 60, oy = 60 } = {}) {
  const pdf = ([x, y]) => [x - ox, y - oy];
  return {
    pdf,
    // `screenshot` overrides the image name when a page appears differently in this journey.
    page(ref, name, x, y, { id = ref.toLowerCase(), audience = null, type = 'step', challenges = [], flag = null, screenshot = null } = {}) {
      return {
        id,
        ref,
        screenshot,
        flow: true,
        name,
        audience: audience ? AUDIENCES[audience] : null,
        type, // 'step' | 'email' (purple in the source key)
        flag,
        challenges,
        x: x - ox,
        y: y + PDF_CARD_H / 2 - H / 2 - oy,
        w: W,
        h: H,
        visits: TBD,
        rate: TBD,
      };
    },
    // Start / end points (yellow circles in the source key), placed by centre.
    terminal(id, label, cx, cy, { d = 150, tag = null } = {}) {
      return { id, label, tag, x: cx - d / 2 - ox, y: cy - d / 2 - oy, w: d, h: d };
    },
    // UI elements (banners, buttons, icons) that lead between pages.
    trigger(id, label, x, y, w, h, { variant = 'light', caption = null, icon = null } = {}) {
      return { id, label, caption, icon, variant, x: x - ox, y: y - oy, w, h };
    },
    // Something the flow expects but that doesn't exist yet (dashed outline in the source).
    ghost(id, label, x, y, { caption = 'Does not exist yet', w = W, h = PDF_CARD_H } = {}) {
      return { id, label, caption, x: x - ox, y: y - oy, w, h };
    },
    // Connector. `via` waypoints are PDF coordinates; the first and last snap to the anchors.
    // `style: 'none'` = "No direct connection"; `delay: { wait, day? }` marks time passing.
    edge(from, to, opts = {}) {
      return { from, to, ...opts, via: opts.via?.map(pdf) };
    },
  };
}

// Fills in card summaries and flyout detail from the flow itself.
export function finalize({ nodes, terminals = [], triggers = [], ghosts = [], edges, screenshots = new Set(), describeTerminal = {} }) {
  const byId = new Map([...nodes, ...terminals, ...triggers, ...ghosts].map((x) => [x.id, x]));
  const isPage = (id) => nodes.some((n) => n.id === id);
  const pageLabel = (n) => (n.ref ? `${n.ref} ${n.name}` : n.name);
  const triggerName = (t) => (t.icon ? `${t.label} icon` : [t.caption, t.label].filter(Boolean).join(' – '));
  const direct = edges.filter((x) => x.style !== 'none');
  const describe = (id) => (isPage(id) ? pageLabel(byId.get(id)) : describeTerminal[id] || byId.get(id).label);
  const delayText = (d) => (d ? ` (after ${[d.wait, d.day].filter(Boolean).join(', ')})` : '');

  // Where a page sends people, looking through UI elements to the pages behind them.
  const destinations = (id) => direct.filter((x) => x.from === id).flatMap((x) => {
    const target = byId.get(x.to);
    if (triggers.includes(target)) {
      return direct.filter((y) => y.from === x.to).map((y) => ({ id: y.to, label: `${describe(y.to)} (via “${triggerName(target)}”)` }));
    }
    return [{ id: x.to, label: `${describe(x.to)}${delayText(x.delay)}` }];
  });

  const origins = (id) => direct.filter((x) => x.to === id).flatMap((x) => {
    const src = byId.get(x.from);
    if (triggers.includes(src)) {
      return direct.filter((y) => y.to === x.from).map((y) => ({ id: y.from, label: `${describe(y.from)} (via “${triggerName(src)}”)` }));
    }
    return [{ id: x.from, label: describe(x.from) }];
  });

  const tbdRows = (rows) => (rows.length ? rows.map((r) => ({ label: r.label, value: TBD })) : [{ label: TBD, value: TBD }]);

  nodes.forEach((n) => {
    const outs = destinations(n.id);
    const uniqueOuts = [...new Set(outs.map((o) => o.id))];
    n.next = uniqueOuts.length === 1 && isPage(uniqueOuts[0]) ? byId.get(uniqueOuts[0]).name : TBD;
    n.findings = n.challenges.length || TBD;
    n.detail = {
      screenshot: n.screenshot ? `assets/screens/${n.screenshot}.jpg`
        : n.ref && screenshots.has(n.ref) ? `assets/screens/${n.ref}.jpg` : null,
      screenshotPending: 'Coming soon',
      description: TBD,
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
