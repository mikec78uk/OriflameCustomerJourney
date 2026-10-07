// Registration journey, transcribed from "User Flow Registration.pdf" (with "Key to read userflow.pdf").
// This is final-deliverable content: anything not yet known is shown as TBD.
//
// Coordinates are taken from the PDF artboard (rendered at 6432 × 1813) so the canvas mirrors the
// source layout; `pdf()` shifts them onto the canvas. Page `y` values are the PDF card tops.
// The end of the flow (welcome emails broken out + CRM email sequence) follows a later update
// to the source, placed on the same grid.

const TBD = 'TBD';
const OX = 60;
const OY = 60;
const W = 240;
const H = 170;
const PDF_CARD_H = 128;

const pdf = ([x, y]) => [x - OX, y - OY];

// Audiences: M = Member, BrP = Brand Partner (shown as "BP" in the source PDF).
const AUDIENCES = {
  M: { code: 'M', label: 'Member' },
  BrP: { code: 'BrP', label: 'Brand Partner' },
};

const source = 'User flow review';

function page(n, name, x, y, { audience = null, type = 'step', challenges = [], flag = null, prefix = 'R' } = {}) {
  // CRM emails (E-n) share a number across Member and Brand Partner variants, so their ids include the audience.
  const id = prefix === 'R' ? `r-${n}` : `${prefix.toLowerCase()}-${n}-${audience.toLowerCase()}`;
  return {
    id,
    ref: `${prefix}-${n}`,
    name,
    audience: audience ? AUDIENCES[audience] : null,
    type, // 'step' | 'email' (purple in the source key)
    flag,
    challenges,
    x: x - OX,
    y: y + PDF_CARD_H / 2 - H / 2 - OY, // keep the PDF card centre so connectors line up
    w: W,
    h: H,
    visits: TBD,
    rate: TBD,
  };
}

const nodes = [
  page(1, 'Global landing page', 440, 616),
  page(2, 'UK Home', 920, 616),
  page(3, 'Sign Up', 1560, 616),
  page(4, 'Sign In', 1560, 892, {
    challenges: [{ title: 'No access', text: 'There is no direct connection from Sign In to Sign Up (R-3).', source }],
  }),
  page(5, 'Become a member', 1912, 892, {
    flag: 'R-5 is a barrier',
    challenges: [{ title: 'Barrier', text: 'R-5 is a barrier.', source }],
  }),
  page(6, 'Register', 2264, 892, { audience: 'M' }),
  page(7, 'Support Center', 2264, 1478, {
    challenges: [{ title: 'No direct way back', text: 'There is no direct way back from Support Center to Register (R-6).', source }],
  }),
  page(8, 'Register as a Beauty Entrepreneur', 2264, 488, { audience: 'BrP' }),
  page(9, 'Search (Sign up / Register / Account)', 1560, 1492),
  page(10, 'Become a business owner', 2082, 1185, {
    flag: 'R-10 is a barrier',
    challenges: [{ title: 'Barrier', text: 'R-10 is a barrier.', source }],
  }),

  // Member registration
  page(11, 'Verify your email', 2842, 892, { audience: 'M' }),
  page(12, 'Verification code', 3182, 892, { audience: 'M', type: 'email' }),
  page(13, 'Your details', 3514, 892, { audience: 'M' }),
  page(14, 'Almost there!', 3846, 892, { audience: 'M' }),
  page(15, 'Survey', 4178, 892, { audience: 'M' }),
  page(16, 'Welcome!', 4510, 892, { audience: 'M' }),
  page(17, 'Welcome to Oriflame!', 5112, 1800, { audience: 'M', type: 'email' }),
  page(18, 'Home', 5112, 892, { audience: 'M' }),
  page(19, 'My Account', 5112, 1133, { audience: 'M' }),
  page(20, 'Connect with leaders', 5112, 1326, { audience: 'M' }),
  page(21, 'Upgrade to Brand Partner', 5112, 1549, { audience: 'M' }),
  page(22, 'Member Upgrade', 5466, 1549, { audience: 'M' }),
  page(23, 'Profile Settings', 5434, 1133, { audience: 'M' }),
  page(24, 'General', 5756, 1133, {
    audience: 'M',
    flag: 'Brand Partner Number',
    challenges: [{ title: 'Brand Partner Number', text: 'Brand Partner Number.', source }],
  }),
  page(25, 'What’s New', 4811, 1133, { audience: 'M' }),
  page(26, 'Order Management [Voucher Centre]', 4808, 1326, { audience: 'M' }),

  // Brand Partner registration
  page(27, 'Verify your email', 2842, 488, { audience: 'BrP' }),
  page(28, 'Verification code', 3182, 488, { audience: 'BrP', type: 'email' }),
  page(29, 'Your details', 3514, 488, { audience: 'BrP' }),
  page(30, 'Get support from a Beauty Entrepreneur', 3846, 488, { audience: 'BrP' }),
  page(31, 'Almost there!', 4178, 488, { audience: 'BrP' }),
  page(32, 'Survey', 4510, 488, { audience: 'BrP' }),
  page(33, 'Congratulations', 4808, 488, { audience: 'BrP' }),
  page(34, 'Welcome to Oriflame!', 5112, 215, { audience: 'BrP', type: 'email' }),
  page(35, 'My Account (Dashboard)', 5112, 488, { audience: 'BrP' }),
  page(36, 'Business Tools Register [Register new Brand Partners]', 5844, 488, { audience: 'BrP' }),
  page(37, 'Business Tools Register [Register a VIP Customer]', 5844, 681, { audience: 'BrP' }),
  page(38, 'Business Tools Register [Activate registered consultants]', 5844, 860, { audience: 'BrP' }),

  // CRM email sequence after the welcome email (variants of the same email per audience)
  ...['M', 'BrP'].flatMap((audience) => {
    const y = audience === 'M' ? 1800 : 215;
    return [
      page(1, 'Perks Introduction', 5538, y, { audience, type: 'email', prefix: 'E' }),
      page(2, 'Products Introduction', 5989, y, { audience, type: 'email', prefix: 'E' }),
      page(3, 'Earn and Share + Personal Invite Code', 6386, y, { audience, type: 'email', prefix: 'E' }),
    ];
  }),
];

// Start / end points (yellow circles in the source key).
function terminal(id, label, cx, cy, { d = 150, tag = null } = {}) {
  return { id, label, tag, x: cx - d / 2 - OX, y: cy - d / 2 - OY, w: d, h: d };
}

const terminals = [
  terminal('email-comms', 'Email communications', 204, 157, { tag: 'TBC' }),
  terminal('url-uk', 'Typing URL uk.oriflame.com', 200, 384),
  terminal('url-global', 'Typing URL oriflame.com', 200, 576),
  terminal('google', 'Google Search Results', 200, 880),
  terminal('ai-tools', 'AI Tools Referral Links', 204, 1080),
  terminal('end-brp', 'BrP', 5876, 1613, { d: 64 }),
];

// UI elements on UK Home that lead into registration.
function trigger(id, label, x, y, w, h, { variant = 'light', caption = null, icon = null } = {}) {
  return { id, label, caption, icon, variant, x: x - OX, y: y - OY, w, h };
}

const triggers = [
  trigger('ui-discover-signup', 'Sign Up', 1368, 468, 120, 82, { variant: 'dark', caption: 'Discover' }),
  trigger('ui-signup-button', 'SIGN UP', 1366, 642, 127, 76),
  trigger('ui-account-icon', 'Account', 1391, 918, 77, 76, { icon: 'account' }),
  trigger('ui-discover-business', 'Become a Business owner', 1368, 1191, 200, 116, { variant: 'dark', caption: 'Discover' }),
];

const notes = [];

// Connectors. `via` points are PDF coordinates; the first and last are snapped to the anchors.
// `style: 'none'` = "No direct connection" (dashed in the source key).
const e = (from, to, opts = {}) => ({ from, to, ...opts, via: opts.via?.map(pdf) });

// Welcome email → E-1 → E-2 → E-3. `delay` marks time passing before the next send.
const crmSequence = (welcome, aud) => [
  e(welcome, `e-1-${aud}`, { delay: { wait: '+3 days', day: 'Day 4' } }),
  e(`e-1-${aud}`, `e-2-${aud}`, { delay: { wait: '+6 days', day: 'Day 7' } }),
  e(`e-2-${aud}`, `e-3-${aud}`, { delay: { wait: '+9 days', day: 'Day 10' } }),
];

const edges = [
  // Entry points
  e('email-comms', 'r-2', { toSide: 't', via: [[1040, 157]] }),
  e('email-comms', 'r-3', { toSide: 't', via: [[1680, 157]] }),
  e('url-uk', 'r-2', { toSide: 't', via: [[1040, 384]] }),
  e('url-global', 'r-1', { via: [[360, 576], [360, 680]] }),
  e('google', 'r-1', { via: [[360, 880], [360, 680]] }),
  e('ai-tools', 'r-1', { toSide: 'b', via: [[560, 1080]] }),
  e('ai-tools', 'r-2', { toSide: 'b', via: [[1040, 1080]] }),
  e('r-1', 'r-2'),

  // UK Home → UI elements → registration pages
  e('r-2', 'ui-discover-signup', { via: [[1320, 680], [1320, 509]] }),
  e('r-2', 'ui-signup-button'),
  e('r-2', 'ui-account-icon', { via: [[1320, 680], [1320, 956]] }),
  e('r-2', 'ui-discover-business', { via: [[1320, 680], [1320, 1249]] }),
  e('r-2', 'r-9', { style: 'none', via: [[1320, 680], [1320, 1556]] }),
  e('ui-discover-signup', 'r-5', { toSide: 't', via: [[2032, 509]] }),
  e('ui-signup-button', 'r-3'),
  e('ui-account-icon', 'r-4'),
  e('ui-discover-business', 'r-10'),

  // Sign up / sign in / become a member
  e('r-3', 'r-8', { toSide: 'b', via: [[2384, 680]] }),
  e('r-3', 'r-6', { toSide: 't', via: [[2384, 680]] }),
  e('r-4', 'r-3', { fromSide: 't', toSide: 'b', style: 'none', flag: 'No access' }),
  e('r-4', 'r-5'),
  e('r-8', 'r-4', { fromSide: 'l', toSide: 'r', via: [[1848, 552], [1848, 956]] }),
  e('r-5', 'r-6'),
  e('r-6', 'r-4', { fromSide: 'b', toSide: 'b', via: [[2384, 1096], [1680, 1096]] }),
  e('r-10', 'r-3', { fromSide: 't', toSide: 't', via: [[2202, 578], [1680, 578]] }),
  e('r-10', 'r-8', { toSide: 'b', via: [[2634, 1249], [2634, 690], [2384, 690]] }),
  e('r-6', 'r-7', { toSide: 'r', via: [[2570, 956], [2570, 1542]] }),
  e('r-7', 'r-6', { fromSide: 't', toSide: 'b', style: 'none', flag: 'No direct way back', flagAt: 0.16 }),

  // Brand Partner registration
  e('r-8', 'r-27', { label: 'Brand Partner' }),
  e('r-27', 'r-28'),
  e('r-28', 'r-29'),
  e('r-29', 'r-30'),
  e('r-30', 'r-31'),
  e('r-31', 'r-32'),
  e('r-32', 'r-33'),
  e('r-33', 'r-35'),
  e('r-33', 'r-34', { fromSide: 't', via: [[4928, 279]] }),
  e('r-35', 'r-36'),
  e('r-35', 'r-37', { via: [[5600, 552], [5600, 745]] }),
  e('r-35', 'r-38', { via: [[5600, 552], [5600, 924]] }),
  ...crmSequence('r-34', 'brp'),

  // Member registration
  e('r-6', 'r-11', { label: 'Member' }),
  e('r-11', 'r-12'),
  e('r-12', 'r-13'),
  e('r-13', 'r-14'),
  e('r-14', 'r-15'),
  e('r-15', 'r-16'),
  e('r-16', 'r-18'),
  e('r-16', 'r-17', { fromSide: 'b', via: [[4630, 1864]] }),
  ...crmSequence('r-17', 'm'),
  e('r-18', 'r-19', { fromSide: 'b', toSide: 't' }),
  e('r-19', 'r-25', { fromSide: 'l', toSide: 'r' }),
  e('r-19', 'r-26', { fromSide: 'l', toSide: 'r', via: [[5080, 1197], [5080, 1390]] }),
  e('r-19', 'r-20', { fromSide: 'l', toSide: 'l', via: [[5080, 1197], [5080, 1390]] }),
  e('r-19', 'r-21', { fromSide: 'l', toSide: 'l', via: [[5080, 1197], [5080, 1613]] }),
  e('r-19', 'r-23'),
  e('r-23', 'r-24'),
  e('r-21', 'r-22'),
  e('r-22', 'end-brp'),
];

/* ---------- Derived content: card summaries and flyout detail ---------- */

const byId = new Map([...nodes, ...terminals, ...triggers].map((x) => [x.id, x]));
const isPage = (id) => nodes.some((n) => n.id === id);
const pageLabel = (n) => `${n.ref} ${n.name}`;
const triggerName = (t) => (t.icon ? `${t.label} icon` : [t.caption, t.label].filter(Boolean).join(' – '));
const direct = edges.filter((x) => x.style !== 'none');

function describe(id) {
  const x = byId.get(id);
  if (isPage(id)) return pageLabel(x);
  if (id === 'end-brp') return 'Becomes a Brand Partner (BrP)';
  return x.label;
}

// Where a page sends people, looking through UI elements to the pages behind them.
function destinations(id) {
  return direct.filter((x) => x.from === id).flatMap((x) => {
    const target = byId.get(x.to);
    if (triggers.includes(target)) {
      return direct.filter((y) => y.from === x.to).map((y) => ({ id: y.to, label: `${describe(y.to)} (via “${triggerName(target)}”)` }));
    }
    const delay = x.delay ? ` (after ${x.delay.wait}, ${x.delay.day})` : '';
    return [{ id: x.to, label: `${describe(x.to)}${delay}` }];
  });
}

function origins(id) {
  return direct.filter((x) => x.to === id).flatMap((x) => {
    const src = byId.get(x.from);
    if (triggers.includes(src)) {
      return direct.filter((y) => y.to === x.from).map((y) => ({ id: y.from, label: `${describe(y.from)} (via “${triggerName(src)}”)` }));
    }
    return [{ id: x.from, label: describe(x.from) }];
  });
}

const tbdRows = (rows) => (rows.length ? rows.map((r) => ({ label: r.label, value: TBD })) : [{ label: TBD, value: TBD }]);

nodes.forEach((n) => {
  const outs = destinations(n.id);
  const uniqueOuts = [...new Set(outs.map((o) => o.id))];
  n.next = uniqueOuts.length === 1 && isPage(uniqueOuts[0]) ? byId.get(uniqueOuts[0]).name : TBD;
  n.findings = n.challenges.length || TBD;
  n.detail = {
    screenshot: null,
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

export const registration = {
  id: 'registration',
  name: 'Registration',
  status: 'ready',
  width: 6700,
  height: 1960,
  nodes,
  terminals,
  triggers,
  notes,
  decisions: [],
  groups: [],
  edges,
  legend: [
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
  ],
};
