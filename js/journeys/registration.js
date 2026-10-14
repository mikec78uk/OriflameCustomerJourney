// Registration journey, transcribed from "User Flow Registration.pdf" (with "Key to read userflow.pdf").
// This is final-deliverable content: anything not yet known is shown as TBD.
//
// Coordinates are taken from the PDF artboard (rendered at 6432 × 1813) so the canvas mirrors the
// source layout; `pdf()` shifts them onto the canvas. Page `y` values are the PDF card tops.
// The end of the flow (welcome emails broken out + CRM email sequence) follows a later update
// to the source, placed on the same grid.

import { artboard, finalize, FLOW_LEGEND, NOT_UK_LEGEND, SOURCE as source } from './flow.js';

// oy shifts the PDF artboard down 600px to make room for the BCM 6.0 swimlane at the top of the canvas.
const { page: flowPage, terminal, trigger, decision, banner, area, edge: e } = artboard({ ox: 60, oy: -540 });

// CRM email content and timings from "CRM journeys overview (BCM markets) 2025".
const CRM = 'CRM journeys overview (BCM markets) 2025';
const WELCOME_DAY1 = `Welcome journey, Day 1 – Email 1 “Welcome to Community & enjoy benefits” (${CRM}). 5 versions depending on whether the 1st order was placed, Member or BrP, and registration with or without invitation. With order: welcome to the Community and X hearts. Without order: 15% off the 1st order for Members; benefits overview for BrPs; free delivery for Members who registered without invitation; general welcome and benefits overview for those whose order doesn't qualify for welcome Hearts.`;

// R-n pages; CRM emails (E-n) share a number across Member and Brand Partner variants, so their ids include the audience.
const page = (n, name, x, y, { prefix = 'R', ...opts } = {}) => flowPage(`${prefix}-${n}`, name, x, y, {
  ...opts,
  id: opts.id || (prefix === 'R' ? `r-${n}` : `${prefix.toLowerCase()}-${n}-${opts.audience.toLowerCase()}`),
});

// BCM 6.0 swimlane, above the current flow: PDF-artboard card top for its main row (centre -380).
const BCM6_Y = -444;

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
  page(17, 'Welcome to Oriflame!', 5112, 1800, { audience: 'M', type: 'email', description: WELCOME_DAY1 }),
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
  page(34, 'Welcome to Oriflame!', 5112, 215, { audience: 'BrP', type: 'email', description: WELCOME_DAY1 }),
  page(35, 'My Account (Dashboard)', 5112, 488, { audience: 'BrP' }),
  page(36, 'Business Tools Register [Register new Brand Partners]', 5844, 488, { audience: 'BrP' }),
  page(37, 'Business Tools Register [Register a VIP Customer]', 5844, 681, { audience: 'BrP' }),
  page(38, 'Business Tools Register [Activate registered consultants]', 5844, 860, { audience: 'BrP' }),

  // BCM 6.0 – alternative registration flow after the business model change ("Registration BCM 6.pdf").
  // Its own swimlane above the current flow; steps line up under their counterparts (R-3, R-6, R-11, R-13,
  // R-14, R-16, R-18 / R-35). No audience badges: the source flow doesn't split Member / Brand Partner.
  page(39, 'Sign Up Landing Page', 1560, BCM6_Y),
  page(40, 'Register', 2264, BCM6_Y),
  page(41, 'Verify your phone', 2842, BCM6_Y),
  // R-12 also appears in BCM 6.0 (same page and screenshot), lined up above the original R-12.
  page(12, 'Verification code', 3182, BCM6_Y, { type: 'email', id: 'r-12-bcm6' }),
  page(42, 'Your details', 3514, BCM6_Y),
  page(43, 'Almost there', 3846, BCM6_Y),
  page(44, 'Welcome to Oriflame!', 3846, BCM6_Y + 230, { type: 'email' }),
  page(45, 'Welcome to Oriflame!', 4510, BCM6_Y),
  page(46, 'My Account (Dashboard)', 5112, BCM6_Y),

  // CRM Welcome journey after the welcome email (variants of the same email per audience).
  // Not available in the UK: shown faded and labelled (notUk).
  ...['M', 'BrP'].flatMap((audience) => {
    const y = audience === 'M' ? 1800 : 215;
    const email = { audience, type: 'email', prefix: 'E', notUk: true };
    return [
      page(1, 'Beauty Rewards intro & motivation to place 1st order', 5538, y, {
        ...email,
        description: `Welcome journey, Day 4 – Email 2 (${CRM}). “Have you already started collecting hearts?” Step-by-step guide to Beauty Rewards (app, earn and redeem). No first order yet: 15% 1st-order reminder focused on Best offers / eCatalogue for Members, or 20% immediate discount for BrPs. 3 versions depending on whether the 1st order was placed, and Member or BrP.`,
      }),
      page(2, 'Oriflame products introduction', 5989, y, {
        ...email,
        description: `Welcome journey, Day 7 – Email 3 (${CRM}). Oriflame brands, iconic products, NovAge+, the Skincare diagnostic tool and Wellosophy (skincare routines, wellness and iconic products). A/B test of 2 email versions.`,
      }),
      page(3, 'Share & Earn communication', 6700, y, {
        ...email,
        description: `Welcome journey, Day 10 – Email 4 (${CRM}), sent when an order has been placed. Share & Earn with a personal Invite Code; versions for Members and BrPs.`,
      }),
      page(4, '1st collected hearts communication', 6700, y + 255, {
        ...email,
        description: `Welcome journey (${CRM}): sent the next day after the 1st purchase, to all segments, if the purchase is made from 7 days to 9 months after registration. Congratulations on the first X hearts and Beauty Rewards Programme intro.`,
      }),
    ];
  }),

  // CRM Members Upgrade journey: Members who don't complete the upgrade (R-22). Not available in the UK (notUk).
  page(5, 'Upgrade to Brand Partner', 6060, 1549, {
    audience: 'M', type: 'email', prefix: 'E', notUk: true,
    description: `Members Upgrade journey – Email 1, sent immediately (${CRM}). Promotes Brand Partner benefits, business opportunities and the compensation plan, with an Upgrade to Brand Partner CTA. Journey triggers: Member is a Sponsor, active during the last 3 campaigns, with at least 2 first-line members who made purchases; visited/engaged with the “Upgrade to Brand Partner” pages and had at least 1 order within the 4 months before; last 3 orders total 200 BPs or more; completion of the Welcome Programme.`,
  }),
  page(6, 'Reminder to upgrade', 6460, 1549, {
    audience: 'M', type: 'email', prefix: 'E', flag: 'To be added later', notUk: true,
    description: `Members Upgrade journey – Email 2 (${CRM}), sent X weeks later to Members who haven't upgraded yet. Reminder of the upgrade opportunity, emphasising Brand Partner benefits and earning opportunities. Marked “To be added later” in the CRM overview.`,
  }),
  page(1, 'Upgrade to Brand Partner', 6820, 1549, {
    audience: 'M', type: 'push', prefix: 'P', flag: 'To be added later', notUk: true,
    description: `Members Upgrade journey – Push sent with the reminder email (${CRM}). Marked “To be added later” in the CRM overview.`,
  }),
];

// Start / end points (yellow circles in the source key).
const terminals = [
  terminal('bcm6-start', 'BCM 6.0 sign-up', 1250, BCM6_Y + 64),
  terminal('email-comms', 'Email communications', 204, 157, { tag: 'TBC' }),
  terminal('url-uk', 'Typing URL uk.oriflame.com', 200, 384),
  terminal('url-global', 'Typing URL oriflame.com', 200, 576),
  terminal('google', 'Google Search Results', 200, 880),
  terminal('ai-tools', 'AI Tools Referral Links', 204, 1080),
  terminal('end-brp', 'BrP', 5830, 1430, { d: 64 }),
  terminal('exit-csj-brp', 'Exit journey · added to Campaign Support Journey', 6380, 720, { d: 150, notUk: true }),
  terminal('exit-csj-m', 'Exit journey · added to Campaign Support Journey', 6380, 2310, { d: 150, notUk: true }),
];

// UI elements on UK Home that lead into registration.
const triggers = [
  trigger('ui-discover-signup', 'Sign Up', 1368, 468, 120, 82, { variant: 'dark', caption: 'Discover' }),
  trigger('ui-signup-button', 'SIGN UP', 1366, 642, 127, 76),
  trigger('ui-account-icon', 'Account', 1391, 918, 77, 76, { icon: 'account' }),
  trigger('ui-discover-business', 'Become a Business owner', 1368, 1191, 200, 116, { variant: 'dark', caption: 'Discover' }),
];

const notes = [];

// Banners above the CRM Welcome sequences that aren't available in the UK.
const banners = [
  banner('not-uk-brp', 'Not available in the UK · CRM Welcome journey runs in other BCM markets', 5500, 150),
  banner('not-uk-m', 'Not available in the UK · CRM Welcome journey runs in other BCM markets', 5500, 1722),
  banner('not-uk-upgrade', 'Not available in the UK · CRM Members Upgrade journey runs in other BCM markets', 6060, 1462),
];

// Swimlane box around the BCM 6.0 flow (canvas coordinates).
const lanes = [
  { id: 'lane-bcm6', label: 'BCM 6.0 · Alternative registration flow (new business model)', x: 1100, y: 40, w: 4330, h: 470 },
];

const decisions = [
  decision('order-placed-brp', 'Order placed?', 6380, 279, { notUk: true }),
  decision('order-placed-m', 'Order placed?', 6380, 1864, { notUk: true }),
  decision('upgraded', 'Upgraded?', 5830, 1613),
];

// Connectors. `via` points are PDF coordinates; the first and last are snapped to the anchors.
// `style: 'none'` = "No direct connection" (dashed in the source key).
// CRM Welcome journey: welcome email → E-1 → E-2 → Order placed? (Yes → E-3; No → exit to Campaign Support
// Journey) plus E-4 the day after a 1st purchase. `delay` marks time passing before the next send.
const crmSequence = (welcome, aud) => {
  const y = aud === 'm' ? 1864 : 279;
  return [
    e(welcome, `e-1-${aud}`, { notUk: true, delay: { wait: '+3 days', day: 'Day 4' } }),
    e(`e-1-${aud}`, `e-2-${aud}`, { notUk: true, delay: { wait: '+6 days', day: 'Day 7' } }),
    e(`e-2-${aud}`, `order-placed-${aud}`, { notUk: true }),
    e(`order-placed-${aud}`, `e-3-${aud}`, { notUk: true, label: 'Yes', labelAt: 0.12, delay: { wait: '+9 days', day: 'Day 10' }, delayAt: 0.6 }),
    e(`order-placed-${aud}`, `exit-csj-${aud}`, { notUk: true, fromSide: 'b', toSide: 't', label: 'No', labelAt: 0.82 }),
    e(`order-placed-${aud}`, `e-4-${aud}`, { notUk: true, fromSide: 'b', via: [[6380, y + 255]], delay: { wait: 'Next day', day: 'after 1st purchase' }, delayAt: 0.72 }),
  ];
};

const edges = [
  // BCM 6.0 swimlane
  e('bcm6-start', 'r-39'),
  e('r-39', 'r-40'),
  e('r-40', 'r-41'),
  e('r-41', 'r-12-bcm6'),
  e('r-12-bcm6', 'r-42'),
  e('r-42', 'r-43'),
  e('r-43', 'r-44', { fromSide: 'b', toSide: 't' }),
  e('r-43', 'r-45'),
  e('r-45', 'r-46'),

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
  e('r-22', 'upgraded'),
  e('upgraded', 'end-brp', { fromSide: 't', toSide: 'b', label: 'Yes' }),
  e('upgraded', 'e-5-m', { notUk: true, label: 'No', labelAt: 0.15, delay: { wait: 'Immediately' }, delayAt: 0.62 }),
  e('e-5-m', 'e-6-m', { notUk: true, delay: { wait: 'After X weeks' } }),
  e('e-6-m', 'p-1-m', { notUk: true }),
];

// Pages with a screenshot in assets/screens/, named by reference number (redacted web JPEGs).
// CRM emails (E-n) have no screenshots yet.
const SCREENSHOTS = new Set(Array.from({ length: 45 }, (_, i) => `R-${i + 1}`)); // R-46 to follow

finalize({ nodes, terminals, triggers, decisions, edges, screenshots: SCREENSHOTS, describeTerminal: { 'end-brp': 'Becomes a Brand Partner (BrP)' } });

export const registration = {
  id: 'registration',
  name: 'Registration',
  status: 'ready',
  metrics: false, // hide visits, conversion and traffic sources/destinations until real data is available
  width: 7000,
  height: 3060,
  nodes,
  terminals,
  triggers,
  notes,
  decisions,
  groups: [...lanes, ...banners],
  areas: [
    // Area A from "Oriflame Journey Mapping WIP": the ways in plus both verification/form routes (R-3 … R-16, R-27 … R-32).
    area('area-a', 'A', [[1234, 429, 2682, 1799], [2500, 429, 4790, 1112]], { caption: 'Business-model decision before a reason to buy' }),
  ],
  summary: {
    intro: 'We mapped and expert-reviewed Oriflame UK’s as-is sign-up, sign-in and registration journeys: the Member (VIP) and Brand Partner routes, from first visit to first dashboard, alongside the incoming BCM 6.0 flow. These findings haven’t yet been tested with users or checked against current funnel data.',
    highlights: [
      {
        title: 'Registration asks people to make a business-model decision before they have a reason to buy',
        area: 'A',
        bullets: [
          'Visitors encounter several near-identical ways in and eight different names for three roles.',
          'They must be linked to a seller they can’t choose or decline, and sometimes can’t contact.',
          'Verification and form steps add effort before any value.',
          'The first session can bring loading errors and a hard-to-find welcome discount.',
        ],
      },
      {
        title: 'BCM 6.0 simplifies the form, but leaves wider friction',
        text: 'BCM 6.0 is due in test markets from 21 October. It replaces the two routes with one form and fewer fields.',
        bullets: [
          'Seller assignment remains unchanged. Removing guest checkout extends assignment to every buyer.',
          'New friction is introduced: phone-only registration, terms accepted twice, and a sign-up button below the fold on mobile.',
          'Registration moves inside checkout, so registration friction becomes checkout friction.',
        ],
      },
      {
        title: 'Mobile needs particular attention',
        text: 'Oriflame says most of its revenue comes from mobile, and several of these issues only appear there.',
      },
      {
        title: 'Current funnel data is needed',
        text: 'Stakeholders recall an earlier review (spring 2026) showing about 86% registration abandonment, mostly at the first step. We haven’t seen the underlying data, and the flow has changed since. We’re requesting current GA funnel data to confirm or replace that figure.',
      },
    ],
  },
  edges,
  legend: [...FLOW_LEGEND, NOT_UK_LEGEND],
};
