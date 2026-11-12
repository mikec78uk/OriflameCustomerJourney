// Subscription journey (Brand Partner), transcribed from "Oriflame Journey Mapping WIP.pdf" (SUBSCRIPTION – BrP).
// Coordinates are PDF artboard pixels (rendered at 5120 × 852); page x/y are the card's top-left corner.
// Final-deliverable content: anything not yet known is shown as TBD.

import { AUDIT, REVIEWED } from './audit.js';
import { HIGHLIGHTS } from './highlights.js';
import { artboard, finalize, FLOW_LEGEND } from './flow.js';

// ox leaves room on the left for the start point, which isn't in the source.
const { page: flowPage, terminal, area, edge: e } = artboard({ ox: -160, oy: 220 });

// All pages in this flow are seen as a Brand Partner (the source flow is "Subscription – BrP").
const page = (ref, name, x, y, opts = {}) => flowPage(ref, name, x, y, { audience: 'BrP', ...opts });

const ROW = 364; // main row
const LOW = 604; // optional steps and emails

const nodes = [
  page('S-1', 'PLP – Nutrition, For him', 184, ROW, {
    description: 'Nutrition listing for men (Shop by age › For him). Eligible products, such as Gluco Shape, carry a “Subscribe & Save” label.',
  }),
  page('S-2', 'PDP – Wellosophy Wellness Pack Man', 553, ROW, {
    description: 'Wellosophy Wellness Pack Man product page with a choice of one-time purchase or Subscribe & Save, a “Don’t miss this offer” starter-kit carousel and the Add to bag button further down.',
  }),
  page('S-3', 'Basket', 922, ROW, {
    description: 'Basket (step 1 of 3) with the chosen items, Brand Partner registration fee and 20% discount, a Welcome Programme Bonus Points target, a special-price add-on and the order summary.',
  }),
  page('S-4', 'Offers', 1288, ROW, {
    description: 'Offers step (2 of 3): limited-time NovAge+ skin care sets and starter kits at special prices, plus a free gift to choose, beside the order summary.',
  }),
  page('S-5', 'Delivery (Checkout)', 1656, ROW, {
    description: 'Checkout (step 3 of 3) with My information, a choice of home delivery or pick-up point and an empty shipping address form.',
  }),
  page('S-6', 'Delivery Method (Checkout)', 2025, ROW, {
    description: 'Checkout with a saved primary address and Home Delivery (£4.95), plus a “Free shipping offer – buy product and get free delivery” prompt.',
  }),
  page('S-7', 'Get shipping for free', 2312, LOW, {
    description: 'Overlay of products to add for free delivery, each with an Add button, opened from the free-shipping prompt on the delivery method.',
  }),
  page('S-8', 'Payment (Checkout)', 2632, ROW, {
    description: 'Checkout with Home Delivery now free and payment by Visa set to “Recurring payments”, with a note that card details are stored for future orders, and the Finalise order button.',
  }),
  page('S-9', 'Card Details', 3000, ROW, {
    description: 'Hosted card payment page (Visa Secure / ID Check) for card number, expiry date, security code and cardholder name, showing the total and a Continue to payment button.',
  }),
  { ...flowPage('', 'Card details confirmation (Bank dependant)', 3320, 527, {
    id: 'card-confirm', audience: 'BrP',
    description: 'Card confirmation step from the customer’s bank (for example 3-D Secure), shown only for some cards. No reference or screenshot in the source.',
  }), ref: null },
  page('S-10', 'Order Detail (My Account)', 4506, ROW, {
    description: 'My Account order detail (“Order received”) with order number, “Recurring payments”, recipient, delivery, items and actions (buy all again, download product list, create a claim, cancel order). Customers land here instead of a confirmation page.',
  }),
  page('S-11', 'Thank you for your purchase (Order confirmation email)', 4024, LOW, {
    type: 'email',
    description: 'Order confirmation email with the order summary, home delivery, payment by “Recurring payments” (status to follow) and the items ordered.',
  }),
  page('S-12', 'Payment confirmation (Order confirmation email 2)', 4306, LOW, {
    type: 'email',
    description: 'Second email confirming the online payment: status Paid, amount, payment method “Recurring payments”, order number and date, with a link to the order details page.',
  }),
  page('S-13', 'You’re subscribed! Here’s how it works', 4698, LOW, {
    type: 'email',
    description: 'Subscription email explaining what a subscription means, with the subscribed product and frequency (for example every 2 weeks) and FAQ links on the delivery schedule and managing a subscription.',
  }),
];

const terminals = [
  terminal('start-tile', 'Product tile / Search results', 0, ROW + 64),
];

const edges = [
  e('start-tile', 's-1'),
  e('s-1', 's-2'),
  e('s-2', 's-3'),
  e('s-3', 's-4'),
  e('s-4', 's-5'),
  e('s-5', 's-6'),
  e('s-6', 's-8'),
  e('s-6', 's-7', { fromSide: 'b', style: 'dashed' }),
  e('s-7', 's-8', { toSide: 'b', style: 'dashed' }),
  e('s-8', 's-9'),
  e('s-9', 's-10'),
  e('s-9', 'card-confirm', { fromSide: 'b', style: 'dashed' }),
  e('card-confirm', 's-10', { fromSide: 't' }),
  e('s-10', 's-11', { fromSide: 'b', toSide: 't' }),
  e('s-10', 's-12', { fromSide: 'b', toSide: 't' }),
  e('s-10', 's-13', { fromSide: 'b', toSide: 't' }),
];

// Screenshots in assets/screens/ (redacted web JPEGs), named by reference number.
const SCREENSHOTS = new Set(Array.from({ length: 13 }, (_, i) => `S-${i + 1}`));

finalize({ nodes, terminals, edges, screenshots: SCREENSHOTS, audit: AUDIT.subscription || {}, reviewed: REVIEWED.subscription });

export const subscription = {
  id: 'subscription',
  name: 'Subscription',
  status: 'ready',
  metrics: false, // hide visits, conversion and traffic sources/destinations until real data is available
  width: 5220,
  height: 680,
  nodes,
  terminals,
  decisions: [],
  groups: [],
  // Area H: the whole subscription flow.
  areas: [area('area-h', 'H', [{ ids: nodes.map((n) => n.id), pad: 60 }], { caption: 'Subscription', badge: { at: 'bl-out' } })],
  summary: { highlights: HIGHLIGHTS.subscription },
  edges,
  legend: [
    ...FLOW_LEGEND.filter((i) => !['trigger', 'push', 'decision', 'aud-m', 'delay'].includes(i.kind)),
    { kind: 'dashed', label: 'Optional step' },
  ],
};
