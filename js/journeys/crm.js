// CRM journeys that aren't triggered by actions on the Oriflame site (live journeys only), from
// "CRM journeys overview (BCM markets) 2025". Each journey is a lane; references are CRM-<journey>.<step>,
// following the document's journey numbering. Journeys triggered on the site are drawn in their own flows
// (Welcome + Members Upgrade → Registration; Leads welcome → Newsletter).

import { artboard, finalize, FLOW_LEGEND } from './flow.js';

const { page, terminal, decision, edge: e } = artboard({ ox: 0, oy: 0 });
const CRM = 'CRM journeys overview (BCM markets) 2025';

// Layout grid: one row per flow; steps every 380px after the trigger.
const col = (i) => 380 + i * 380;
const step = (ref, name, i, cy, opts) => page(`CRM-${ref}`, name, col(i), cy - 64, { id: `crm-${ref.replace('.', '-')}`, ...opts });
const email = (channels = ['Email']) => ({ type: 'email', channels });
const push = (channels = ['Push']) => ({ type: 'push', channels });
const start = (id, label, cy, opts) => terminal(id, label, 170, cy, { d: 160, ...opts });
const lane = (id, label, y, h) => ({ id, label, x: 40, y, w: 2940, h });

// Rows
const A = 200, B = 520, C = 840, D1 = 1160, D2 = 1420, E1 = 1880, E2 = 2140, F = 2460, G = 2780, H = 3320;

const groups = [
  lane('lane-6', '6 · Campaign Support – Builders & Sellers · Live', 60, 280),
  lane('lane-7', '7 · Campaign Support – Members & End-consuming BrPs · Live', 380, 280),
  lane('lane-7-leads', '7 · Campaign Support – Leads (newsletter subscribers) · Live', 700, 280),
  lane('lane-4', '4 · Beauty Rewards support · Live in markets with Beauty Rewards', 1020, 680),
  lane('lane-15', '15 · Reactivation · Live in most markets', 1740, 540),
  lane('lane-14', '14 · Birthday · Status not stated', 2320, 280),
  lane('lane-16', '16 · Profile completion · New (proposal)', 2640, 500),
  lane('lane-8', '8 · Ad hoc communication', 3180, 280),
];

const CS_WEEK = (n) => `Week ${n} weekly offer, personalised product recommendations and other important initiatives.`;

const nodes = [
  // 6. Campaign Support – Builders & Sellers
  step('6.1', 'Campaign opening', 0, A, { ...email(['Email', 'Push']), audience: 'BrP',
    description: `Campaign Support journey, Builders & Sellers – Day 1 (${CRM}). Wallet status update, key launches and offers, out-of-catalogue actions, sales support actions (recruitment, reactivation, etc.), conference information, guide to business tools; NEW Beauty Rewards drop via Push. Content order differs by segment: sales info first for Sellers, business-building info first for Builders. Sent once per 2 campaigns to those not engaged.` }),
  step('6.2', 'eCatalogue & key focuses', 1, A, { ...push(), audience: 'BrP',
    description: `Campaign Support journey, Builders & Sellers – Day 2 push, sent to those not engaged with the email (${CRM}).` }),
  step('6.3', 'Week 2 focuses', 2, A, { ...email(['Email', 'Push']), audience: 'BrP', description: `Campaign Support journey, Builders & Sellers – start of week 2 (${CRM}). ${CS_WEEK(2)}` }),
  step('6.4', 'Free shipping', 3, A, { ...push(), audience: 'BrP',
    description: `Campaign Support journey, Builders & Sellers – Day 12 push, sent to those who haven't placed an order in the current campaign yet (${CRM}).` }),
  step('6.5', 'Week 3 focuses', 4, A, { ...email(['Email', 'Push']), audience: 'BrP', description: `Campaign Support journey, Builders & Sellers – start of week 3 (${CRM}). ${CS_WEEK(3)}` }),
  step('6.6', 'Intro to the next campaign', 5, A, { ...email(), audience: 'BrP',
    description: `Campaign Support journey, Builders & Sellers – 4 days before campaign end (${CRM}). Next campaign intro and highlights (key launches and initiatives), plan social media posts with the Sharing app, share the PBS referral link (Share & Earn).` }),
  step('6.7', 'Last call', 6, A, { ...email(), audience: 'BrP',
    description: `Campaign Support journey, Builders & Sellers – 1 day before campaign end (${CRM}). Expiry Wallet reminder if an amount expires at the end of the campaign, selection of key offers, out-of-catalogue reminder.` }),

  // 7. Campaign Support – Members & End-consuming BrPs (plus Starters and Newcomers)
  step('7.1', 'Campaign opening', 0, B, { ...email(),
    description: `Campaign Support journey, Members & End-consuming BrPs (incl. Starters and Newcomers) – Day 1 (${CRM}). Wallet status update, eCatalogue promotion, key launches and offers, inspirational content (seasonal content, trends, beauty tips), personalised product recommendations, Members benefits; NEW Beauty Rewards drop via Push.` }),
  step('7.2', 'eCatalogue & key focuses', 1, B, { ...push(), description: `Campaign Support journey, Members & End-consuming BrPs – Day 2 push, sent to those not engaged with the email (${CRM}).` }),
  step('7.3', 'Week 2 focuses', 2, B, { ...email(['Email', 'Push']), description: `Campaign Support journey, Members & End-consuming BrPs – start of week 2 (${CRM}). ${CS_WEEK(2)}` }),
  step('7.4', 'Free shipping', 3, B, { ...push(), description: `Campaign Support journey, Members & End-consuming BrPs – Day 12 push, sent to those who haven't placed an order in the current campaign yet (${CRM}).` }),
  step('7.5', 'Week 3 focuses', 4, B, { ...email(['Email', 'Push']), description: `Campaign Support journey, Members & End-consuming BrPs – start of week 3 (${CRM}). ${CS_WEEK(3)}` }),
  step('7.6', 'Last call', 5, B, { ...email(),
    description: `Campaign Support journey, Members & End-consuming BrPs – 1 day before campaign end (${CRM}). Expiry Wallet reminder if an amount expires, abandoned basket reminder if products are left in the basket, product articles/offers, personalised product recommendations.` }),

  // 7. Campaign Support – Leads
  { ...step('7.1', 'Campaign opening (Leads version)', 0, C, { ...email(),
    description: `Campaign Support journey, Leads (newsletter subscribers) – Day 1 (${CRM}). Leads receive only the campaign opening email, without the Wallet status block and with a promotion of the Member concept and benefits.` }), id: 'crm-7-1-leads' },

  // 4. Beauty Rewards support
  step('4.1', 'Beauty Rewards programme intro', 0, D1, { ...email(),
    description: `Beauty Rewards support journey, flow 1 – Day 3 after the trigger (2nd campaign after the 1st purchase) (${CRM}). Introduces the opportunity to earn double Hearts; Beauty Rewards benefits – why to collect Hearts and how to redeem.` }),
  step('4.2', 'Beauty Rewards reminder at campaign start', 0, D2, { ...push(),
    description: `Beauty Rewards support journey, flow 2 – Push 1 on Day 3 of campaigns C2–C5 (${CRM}). Reminder to place a qualifying order to earn double Hearts and enjoy great rewards.` }),
  step('4.3', 'Beauty Rewards reminder at campaign end', 2, D2, { ...push(),
    description: `Beauty Rewards support journey, flow 2 – Push 2, 3 days before the period ends, if no qualifying order has been placed (${CRM}). Don't miss the opportunity to earn double Hearts.` }),

  // 15. Reactivation
  step('15.1', 'Reactivation email – segment specific', 0, E1, { ...email(),
    description: `Reactivation journey 1 – 7th day of each campaign (${CRM}). Trigger, once per campaign: Members and Brand Partners inactive for 3 campaigns, or inactive with an expiring Wallet balance at the end of the campaign. Expiry Wallet reminder, reactivation offer (if available in the market), eCatalogue & best offers, campaign highlights for Builders & Sellers to sell/activate their network. Versions for Members, Builders & Sellers, and a general version with expiring wallet.` }),
  step('15.2', 'Expiry Wallet final reminder', 1, E1, { ...push(),
    description: `Reactivation journey 1 – end of campaign, if there is still an expiring Wallet amount (${CRM}). Expiry amount and date reminder, best offers / eCatalogue. WhatsApp is planned only in pilot markets (ID, RO, PT).` }),
  step('15.3', 'Inactivity alert for Sponsors', 0, E2, { ...email(),
    description: `Reactivation journey 2 – 11th day of each campaign (${CRM}). Trigger, once per campaign: active Sponsors with downline members who are inactive for 3 campaigns, have an expiring Wallet balance, or are inactive Starters from the previous campaign. Reminder to motivate and support the downline, link to the activity report, and business tips on what to say. Manager alerts and a Business App push are listed as “to be added later”.` }),

  // 14. Birthday
  step('14.1', 'Birthday offer', 0, F, { ...email(),
    description: `Birthday journey – on the birthday (${CRM}). Birthday congratulations and birthday offer for Members and Brand Partners. A WhatsApp message for those who didn't open the email is available only in the pilot market (ID).` }),

  // 16. Profile completion
  step('16.1', 'Complete your profile and earn XYZ Hearts!', 0, G, { ...push(),
    description: `Profile completion journey (new, proposed) – Push to everyone with missing contact data (${CRM}). Trigger: once per quarter, check for contacts missing date of birth, email or phone number (max 2 times per contact).` }),
  step('16.2', 'Complete your profile (2 versions)', 3, G, { ...email(),
    description: `Profile completion journey – Email when an email address is available (${CRM}). 2 versions: missing DoB (“Provide your DoB and don't miss a birthday gift…”) and general (“Make your beauty journey uniquely yours!”), both with a Beauty Rewards intro. CTA: complete your profile and earn hearts/rewards. After sending, the journey exit is stamped to avoid repetitive communication.` }),
  step('16.3', 'Complete your profile (SMS)', 3, G + 250, { ...push(['SMS']), flag: 'Optional (if cost allows)',
    description: `Profile completion journey – SMS when only a phone number is available, optional if cost allows (${CRM}). “Complete your profile to receive tailored recommendations and exclusive perks.”` }),

  // 8. Ad hoc
  step('8.1', 'Ad hoc emails', 0, H, { ...email(),
    description: `Ad hoc journeys and communication (${CRM}). Educational content (new products, key brands such as NovAge+ and Wellosophy), holiday/seasonal and special offers (Black Friday, Christmas, Mother's Day, etc.), and launches of new programmes and digital tools. Regular ad hoc emails are usually sent in week 2 of each campaign as part of Campaign Support communication.` }),
  step('8.2', 'Ad hoc reminders', 1, H, { ...push(['Push', 'SMS']),
    description: `Ad hoc journeys – Push/SMS reminders as an additional channel in ad hoc journeys (${CRM}). WhatsApp only in pilot markets (ID, RO, PT).` }),
];

const terminals = [
  start('t-6', 'Campaign start', A, { tag: 'Builders & Sellers' }),
  start('t-7', 'Campaign start', B, { tag: 'Members & ECC' }),
  start('t-7-leads', 'Campaign start', C, { tag: 'Leads' }),
  start('t-4-1', '2nd campaign after 1st purchase', D1),
  start('t-4-2', 'Start of campaign C2–C5', D2),
  terminal('exit-4', 'Exit', 860, D2 + 190, { d: 90 }),
  start('t-15-1', 'Inactive 3 campaigns or expiring wallet', E1, { tag: 'Once per campaign' }),
  start('t-15-2', 'Sponsors with inactive downline', E2, { tag: 'Once per campaign' }),
  start('t-14', 'Birthday', F),
  start('t-16', 'Missing DoB, email or phone', G, { tag: 'Quarterly check' }),
  terminal('exit-16-none', 'Exit', 860, G + 210, { d: 90 }),
  terminal('exit-16', 'Exit · stamped for repetitive communication', 1980, G, { d: 150 }),
  start('t-8', 'Ad hoc', H, { tag: 'Launches, seasonal, education' }),
];

const decisions = [
  decision('d-4-qualifying', 'Qualifying order placed?', 860, D2, { size: 120 }),
  decision('d-16-missing', 'Missing data in the profile?', 860, G, { size: 120 }),
  decision('d-16-channel', 'Email or phone available?', 1110, G, { size: 120 }),
];

const chain = (ids, timings) => ids.slice(1).map((to, i) => e(ids[i], to, { delay: timings[i] }));

const edges = [
  ...chain(['t-6', 'crm-6-1', 'crm-6-2', 'crm-6-3', 'crm-6-4', 'crm-6-5', 'crm-6-6', 'crm-6-7'], [
    { wait: 'Day 1' }, { wait: 'Day 2', day: 'if not engaged' }, { wait: 'Start of week 2' }, { wait: 'Day 12', day: 'if no order yet' },
    { wait: 'Start of week 3' }, { wait: '4 days', day: 'before campaign end' }, { wait: '1 day', day: 'before campaign end' },
  ]),
  ...chain(['t-7', 'crm-7-1', 'crm-7-2', 'crm-7-3', 'crm-7-4', 'crm-7-5', 'crm-7-6'], [
    { wait: 'Day 1' }, { wait: 'Day 2', day: 'if not engaged' }, { wait: 'Start of week 2' }, { wait: 'Day 12', day: 'if no order yet' },
    { wait: 'Start of week 3' }, { wait: '1 day', day: 'before campaign end' },
  ]),
  e('t-7-leads', 'crm-7-1-leads', { delay: { wait: 'Day 1' } }),

  e('t-4-1', 'crm-4-1', { delay: { wait: 'Day 3' } }),
  e('t-4-2', 'crm-4-2', { delay: { wait: 'Day 3' } }),
  e('crm-4-2', 'd-4-qualifying'),
  e('d-4-qualifying', 'crm-4-3', { label: 'No', labelAt: 0.12, delay: { wait: '3 days', day: 'before period ends' }, delayAt: 0.58 }),
  e('d-4-qualifying', 'exit-4', { fromSide: 'b', toSide: 't', label: 'Yes' }),

  e('t-15-1', 'crm-15-1', { delay: { wait: 'Day 7', day: 'of campaign' } }),
  e('crm-15-1', 'crm-15-2', { delay: { wait: 'End of campaign', day: 'if wallet still expiring' } }),
  e('t-15-2', 'crm-15-3', { delay: { wait: 'Day 11', day: 'of campaign' } }),

  e('t-14', 'crm-14-1', { delay: { wait: 'On birthday' } }),

  e('t-16', 'crm-16-1'),
  e('crm-16-1', 'd-16-missing', { delay: { wait: 'Wait 2 days' } }),
  e('d-16-missing', 'exit-16-none', { fromSide: 'b', toSide: 't', label: 'No' }),
  e('d-16-missing', 'd-16-channel', { label: 'Yes' }),
  e('d-16-channel', 'crm-16-2', { label: 'Email', labelAt: 0.3 }),
  e('d-16-channel', 'crm-16-3', { fromSide: 'b', via: [[1110, G + 250]], label: 'Phone number', labelAt: 0.75 }),
  e('crm-16-2', 'exit-16'),

  e('t-8', 'crm-8-1'),
  e('crm-8-1', 'crm-8-2', { label: 'Additional channel' }),
];

finalize({ nodes, terminals, decisions, edges });

export const crm = {
  id: 'crm',
  name: 'CRM journeys',
  status: 'ready',
  width: 3020,
  height: 3520,
  nodes,
  terminals,
  decisions,
  groups,
  edges,
  legend: [
    { kind: 'terminal', label: 'Trigger / Exit' },
    { kind: 'email', label: 'Email' },
    { kind: 'push', label: 'Push / SMS / WhatsApp' },
    { kind: 'decision', label: 'Decision' },
    { kind: 'aud-brp', label: 'Brand Partner' },
    { kind: 'flow', label: 'Sequence' },
    { kind: 'delay', label: 'Timing' },
  ],
};
