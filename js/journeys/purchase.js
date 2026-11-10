// Purchase journey, transcribed from "Oriflame Journey Mapping WIP.pdf" ("User Journey – Purchase"), plus the
// purchase- and basket-triggered CRM journeys 9–12 from "CRM journeys overview (BCM markets) 2025".
// Final-deliverable content: anything not yet known is shown as TBD.
//
// Coordinates are the PDF artboard rendered at 13180 × 4602. Its boxes are 240 × 64, so the artboard is
// stretched vertically (sy) to fit our cards while keeping every box centred on its source position.

import { HIGHLIGHTS } from './highlights.js';
import { USABILITY } from './usability.js';
import { FUNNELS } from './funnels.js';
import { artboard, finalize, FLOW_LEGEND } from './flow.js';

const SY = 1.75;
const { page, terminal, decision, ghostAt, frame, area, edge: e } = artboard({ ox: 0, oy: 0, sy: SY, pdfCardH: 64 });
const CRM = 'CRM journeys overview (BCM markets) 2025';
// Journeys 18 (Samples) and 19 (Advent Calendar) are journeys 2 and 3 of Part 2, numbered on from 17.
const CRM2 = 'CRM journeys overview – Part 2, 2026';

const POS = {}; // id → [cx, cy] in PDF coordinates, for elbow routing

// Referenced page, placed by its centre.
function P(ref, name, cx, cy, opts = {}) {
  const id = opts.id || ref.toLowerCase();
  POS[id] = [cx, cy];
  return page(ref, name, cx - 120, cy - 32, { ...opts, id });
}
// Unreferenced navigation step (no reference in the source).
function N(id, name, cx, cy, description) {
  POS[id] = [cx, cy];
  return { ...page('', name, cx - 120, cy - 32, { id, description }), ref: null };
}
// Collapsed group of product listing subpages, e.g. "x11 PLP Subpages".
function S(id, label, cx, cy) {
  POS[id] = [cx, cy];
  return ghostAt(id, label, cx, cy, { variant: 'subpages' });
}

// Elbow from a parent's bottom down its trunk into each child's left side.
const tree = (parent, trunkX, kids, opts = {}) => kids.map((k) => e(parent, k, { fromSide: 'b', via: [[trunkX, POS[k][1]]], ...opts }));
// Bracket lines that group sibling categories on their left (no arrowhead).
const bracket = (from, trunkX, to, opts = {}) => e(from, to, { fromSide: 'l', toSide: 'l', via: [[trunkX, POS[from][1]], [trunkX, POS[to][1]]], arrow: false, ...opts });

const shop = (path, sub) => `Navigation level in the SHOP menu: ${path}${sub ? `, leading to ${sub}` : ''}.`;

/* ---------------- Entry, home and site sections ---------------- */

const terminals = [
  terminal('t-email', 'Email communications', 217, 223, { d: 160 }),
  terminal('t-google', 'Google Search Results', 216, 447, { d: 160 }),
  terminal('t-ai', 'AI Tools Referral Links', 214, 687, { d: 160 }),
  terminal('t-url', 'uk.oriflame.com', 222, 925, { d: 160 }),
];

const nodes = [
  P('R-2', 'UK Home', 656, 927),
  P('R-5', 'Become a member', 660, 1218),

  // SHOP – Top Offers / New Arrivals
  P('P-1', 'Top Offers', 1339, 516),
  P('P-3', 'Inside-out beauty', 1633, 708),
  P('P-4', 'Subscribe and save', 1635, 834),
  P('P-5', 'All New Arrivals', 1342, 963),
  P('P-6', 'New in Skincare', 1635, 1090),
  P('P-7', 'New in Makeup', 1634, 1221),
  P('P-8', 'New in Fragrance', 1635, 1348),
  P('P-9', 'New in Bath & Body', 1632, 1477),
  P('P-10', 'New in Hair', 1635, 1603),
  P('P-11', 'New in Accessories', 1635, 1730),
  P('P-12', 'New in Men', 1634, 1857),
  P('P-17', 'Best Savings take the spotlight', 1633, 2069),

  // SHOP – Skincare, Fragrance, Makeup
  P('P-13', 'All Skincare', 2004, 514),
  P('P-14', 'Shop by product', 2168, 661),
  P('P-15', 'Shop by benefit', 2169, 804),
  P('P-16', 'Shop by ingredient', 2169, 946),
  P('P-18', 'All Fragrance', 2003, 1188),
  N('fr-product', 'Shop by product', 2169, 1300, shop('All Fragrance › Shop by product', '5 product listing subpages')),
  N('fr-mood', 'Shop by mood', 2167, 1475, shop('All Fragrance › Shop by mood', 'Bold, Confident, Energising and 4 more subpages')),
  P('P-19', 'Bold', 2489, 1570),
  P('P-20', 'Confident', 2491, 1680),
  P('P-21', 'Energising', 2488, 1792),
  N('fr-family', 'Shop by family', 2168, 1972, shop('All Fragrance › Shop by family', '7 product listing subpages')),
  N('fr-whom', 'Shop by whom', 2168, 2132, shop('All Fragrance › Shop by whom', '3 product listing subpages')),
  N('makeup', 'All Makeup', 2003, 2389, shop('All Makeup', 'face, eyes, lips, nails, tools and gift sets')),
  N('mk-face', 'Face', 2166, 2498, shop('All Makeup › Face', '3 product listing subpages')),
  N('mk-eyes', 'Eyes makeup', 2168, 2676, shop('All Makeup › Eyes makeup', '4 more product listing subpages')),
  N('mk-lips', 'Lips makeup', 2168, 2869, shop('All Makeup › Lips makeup', '2 product listing subpages')),
  N('mk-nails', 'Nails', 2166, 3026, shop('All Makeup › Nails', '4 product listing subpages')),
  N('mk-tools', 'Tools and accessories', 2169, 3203, shop('All Makeup › Tools and accessories', '4 product listing subpages')),
  N('mk-gifts', 'Gifts and sets', 2168, 3364, shop('All Makeup › Gifts and sets', '2 product listing subpages')),

  // Below the SHOP frame
  P('P-22', 'Brands', 2147, 3939),
  P('P-23', 'Top Scents', 2320, 4069),
  P('P-28', 'Digital tools & news', 2609, 4149),
  N('insights', 'Insights HUB', 2112, 4213, 'Insights hub that links to articles, reached from the SHOP categories.'),

  // SHOP – Nutrition, Bath & Body, Hair
  N('nutrition', 'All Nutrition', 2930, 515, shop('All Nutrition', 'shop by product, goal and age, Glucose Shape and the Wellosophy subscription page')),
  N('n-product', 'Shop by product', 3129, 627, shop('All Nutrition › Shop by product', '3 product listing subpages')),
  N('n-goal', 'Shop by goal', 3128, 804, shop('All Nutrition › Shop by goal', '6 more product listing subpages, including Glucose Shape')),
  P('P-26', 'Glucose Shape', 3570, 1044),
  N('n-age', 'Shop by age', 3127, 1124, shop('All Nutrition › Shop by age', '3 product listing subpages')),
  N('bathbody', 'All Bath & Body', 2962, 1332, shop('All Bath & Body', 'shop by product and by benefit')),
  N('bb-product', 'Shop by product', 3127, 1445, shop('All Bath & Body › Shop by product', '10 product listing subpages')),
  N('bb-benefit', 'Shop by benefit', 3127, 1621, shop('All Bath & Body › Shop by benefit', '4 product listing subpages')),
  N('hair', 'All Hair', 2964, 1922, shop('All Hair', 'shop by product, benefit and concerns')),
  N('h-product', 'Shop by product', 3128, 2036, shop('All Hair › Shop by product', '8 product listing subpages')),
  N('h-benefit', 'Shop by benefit', 3129, 2275, shop('All Hair › Shop by benefit', '2 product listing subpages')),
  N('h-concerns', 'Shop by concerns', 3127, 2452, shop('All Hair › Shop by concerns', '5 product listing subpages')),
  N('hair-2', 'All Hair', 2964, 2643, shop('All Hair (second entry in the source map)', 'shop by product, benefit and concerns')),
  N('h2-product', 'Shop by product', 3129, 2756, shop('All Hair › Shop by product', '8 product listing subpages')),
  N('h2-benefit', 'Shop by benefit', 3127, 2933, shop('All Hair › Shop by benefit', '2 product listing subpages')),
  N('h2-concerns', 'Shop by concerns', 3129, 3107, shop('All Hair › Shop by concerns', '5 product listing subpages')),
  P('P-25', 'Go to', 3089, 3940),
  P('P-27', 'Digital tools & news', 3002, 4068),
  P('P-24', 'Subscribe to a rewarding wellness habit with Wellosophy', 3380, 4146),

  // SHOP – Accessories, Men, Gift ideas and top-level links
  N('accessories', 'All Accessories', 3938, 515, shop('All Accessories', 'shop by product, collections and gifts')),
  N('a-product', 'Shop by product', 4137, 628, shop('All Accessories › Shop by product', '8 product listing subpages')),
  N('a-collections', 'Collections', 4137, 802, shop('All Accessories › Collections')),
  N('a-gifts', 'Gifts', 4136, 963, shop('All Accessories › Gifts', '2 product listing subpages')),
  N('men', 'All Men', 3938, 1203, shop('All Men', 'shop by product and the fragrance “Shop by whom” subpages')),
  N('m-product', 'Shop by product', 4135, 1317, shop('All Men › Shop by product', '5 product listing subpages')),
  N('gifts', 'All Gift Ideas', 3969, 1620, shop('All Gift Ideas', 'gifts by recipient, gift sets, gift giving, holiday and the Beauty Advent Calendar')),
  N('g-recipient', 'By recipient', 4167, 1733, shop('All Gift Ideas › By recipient', '4 product listing subpages')),
  N('g-sets', 'Gift sets and bundles', 4167, 1907, shop('All Gift Ideas › Gift sets and bundles')),
  N('g-giving', 'Gift giving', 4166, 2037, shop('All Gift Ideas › Gift giving')),
  N('g-holiday', 'Holiday', 4167, 2147, shop('All Gift Ideas › Holiday')),
  N('bestseller', 'Bestseller', 4659, 514, shop('Bestseller')),
  N('icons', 'Icons', 4961, 514, shop('Icons')),
  N('sample-shop', 'Sample Shop', 5267, 515, shop('Sample Shop')),
  N('outlet', 'Oriflame Outlet', 5572, 514, shop('Oriflame Outlet')),
  P('P-29', 'Beauty Advent Calendar', 4018, 4163),

  // INSPIRATION and ALL OFFERS
  N('magazine', 'Magazine', 6114, 532, 'Magazine section of INSPIRATION, leading to magazine articles and all materials.'),
  N('magazine-2', 'Beauty Tools', 6418, 532, 'Beauty Tools entry in the INSPIRATION section, leading to digital beauty tools.'),
  N('discover', 'Discover', 6722, 531, 'Discover entry in the INSPIRATION section.'),
  N('magazine-n', 'Magazine (N)', 6114, 692, 'Magazine articles (one of many) in the INSPIRATION section.'),
  N('materials', 'See all materials', 6113, 852, 'Overview of all INSPIRATION materials.'),
  P('P-2', 'All current offers', 7267, 514),

  // SHOPPING – EXAMPLE
  P('P-30', 'PLP – Dandruff', 8146, 1510),
  P('P-31', 'PDP – Anti-Flake Purifying Scalp Scrub', 8144, 1641),
  P('P-32', 'Catalogue – Dandruff', 8148, 1863),
  P('P-33', 'Catalogue – Wellness Pack Man', 8143, 2023),
  P('P-34', 'Mini – Basket', 8546, 1751),
  P('P-35', 'Basket', 8976, 1752),

  // CHECKOUT AS-IS (P-38 appears twice in the source). P-47 Offers sits under the first P-38, reached optionally
  // from P-36 and leading on to P-38 (dashed), as in the updated source.
  P('R-4', 'Basket – Your Details', 9750, 1541),
  P('P-36', 'Basket – Your Details', 9750, 1750),
  P('P-37', 'Register as VIP', 9745, 1959),
  P('P-47', 'Offers', 10147, 1959),
  P('P-38', 'Delivery', 10147, 1751, { id: 'p-38' }),
  P('P-38', 'Delivery', 10531, 1752, { id: 'p-38-b' }),
  P('P-39', 'Shipping address', 10914, 1752),
  P('P-40', 'Payment', 11298, 1752),
  P('P-41', 'Card details', 11684, 1750),
  P('P-42', 'Thank you for your order', 12067, 1751),
  P('P-46', 'Payment refused', 11682, 1992, { type: 'email', flag: 'Dead End' }),
  P('P-45', 'Order confirmation email', 12066, 1989, { type: 'email' }),
  P('R-2', 'UK Home', 12497, 1559, { id: 'r-2-checkout' }),
  P('R-5', 'Become a member', 12500, 1926, { id: 'r-5-checkout' }),

  // BCM 6.0 checkout
  P('P-43', 'Basket', 9012, 2680),
  P('P-44', 'Register', 9730, 2682),
  P('R-39', 'Sign Up Landing Page', 10192, 2680),
  P('R-40', 'Register', 10703, 2718),
  P('R-45', 'Welcome to Oriflame!', 11086, 2718),
];

terminals.push(
  terminal('t-browse', 'Browse and shop (as-is)', 8150, 2694, { d: 120 }),
  terminal('t-checkout', 'Checkout', 11640, 2700, { d: 110 }),
);

const ghosts = [
  S('s-14', 'x11 PLP Subpages', 2490, 739),
  S('s-15', 'x11 PLP Subpages', 2490, 883),
  S('s-16', 'x10 PLP Subpages', 2490, 1027),
  S('s-fr-product', 'x5 PLP Subpages', 2487, 1397),
  S('s-fr-mood', 'Plus x4 PLP Subpages', 2491, 1891),
  S('s-fr-family', 'x7 PLP Subpages', 2487, 2037),
  S('s-fr-whom', 'x3 PLP Subpages', 2489, 2195),
  S('s-mk-face', 'x3 PLP Subpages', 2487, 2596),
  S('s-mk-eyes', 'Plus x4 PLP Subpages', 2491, 2756),
  S('s-mk-lips', 'x2 PLP Subpages', 2489, 2932),
  S('s-mk-nails', 'x4 PLP Subpages', 2489, 3092),
  S('s-mk-tools', 'x4 PLP Subpages', 2488, 3267),
  S('s-mk-gifts', 'x2 PLP Subpages', 2488, 3427),
  S('article', 'Article (N)', 2386, 4322),
  S('s-n-product', 'x3 PLP Subpages', 3448, 723),
  S('s-n-goal', 'Plus x6 PLP Subpages', 3450, 883),
  S('s-n-age', 'x3 PLP Subpages', 3449, 1187),
  S('s-bb-product', 'x10 PLP Subpages', 3449, 1539),
  S('s-bb-benefit', 'x4 PLP Subpages', 3447, 1700),
  S('s-h-product', 'x8 PLP Subpages', 3448, 2131),
  S('s-h-benefit', 'x2 PLP Subpages', 3448, 2355),
  S('s-h-concerns', 'x5 PLP Subpages', 3447, 2532),
  S('s-h2-product', 'x8 PLP Subpages', 3448, 2852),
  S('s-h2-benefit', 'x2 PLP Subpages', 3448, 3012),
  S('s-h2-concerns', 'x5 PLP Subpages', 3448, 3188),
  S('s-a-product', 'x8 PLP Subpages', 4456, 723),
  S('s-a-gifts', 'x2 PLP Subpages', 4457, 1043),
  S('s-m-product', 'x5 PLP Subpages', 4456, 1395),
  S('s-g-recipient', 'x4 PLP Subpages', 4487, 1828),
];

/* ---------------- Section frames and CRM swimlanes ---------------- */

const groups = [
  frame('f-shop', 'SHOP', 1133, 357, 5800, 3807),
  frame('f-insp', 'INSPIRATION', 5920, 363, 6936, 3808),
  frame('f-offers', 'ALL OFFERS', 7049, 363, 7636, 3808),
  frame('f-example', 'SHOPPING – EXAMPLE', 7913, 1363, 9337, 2133),
  frame('f-checkout', 'CHECKOUT AS-IS', 9514, 1364, 12952, 2133),
  frame('f-bcm6', 'BCM 6.0', 7914, 2279, 12969, 3046),
  frame('f-bcm6-reg', 'New registration flow within checkout', 10501, 2494, 11288, 2863),
  frame('lane-9', '9 · Post-purchase / Share & Earn journey', 7914, 3130, 12969, 3350),
  frame('lane-10', '10 · NovAge+ support journey', 7914, 3390, 12969, 3950),
  frame('lane-11', '11 · Abandoned basket journey – Members & End-consuming BrPs', 7914, 3990, 12969, 4330),
  frame('lane-12', '12 · Wellosophy CRM journey', 7914, 4370, 12969, 4810),
  frame('lane-18', '18 · Samples (Part 2, journey 2) · Launching across relevant markets', 7914, 4850, 12969, 5300),
  frame('lane-19', '19 · Advent Calendar (Part 2, journey 3) · EU timings shown', 7914, 5340, 12969, 5800),
];

/* ---------------- CRM journeys 9–12 ---------------- */

const crmStep = (ref, name, cx, cy, type, description, opts = {}) => P(`CRM-${ref}`, name, cx, cy, {
  id: `crm-${ref.replace('.', '-')}`, type, channels: opts.channels, flag: opts.flag, description,
});
// CRM lanes run in journey-number order: 9, 10, 11, 12, 18, 19.
const ROW = { se: 3245, n1: 3515, nsms: 3650, n2: 3755, n3: 3865, ab: 4150, w1: 4490, w2: 4615, w3: 4735, sm1: 4955, sm2: 5190, ac: 5460, ac2: 5690 };
const COL = (i) => 8560 + i * 420;

nodes.push(
  // 9. Share & Earn
  crmStep('9.1', 'Share and Earn', COL(0), ROW.se, 'email',
    `Post-purchase / Share & Earn journey – Email 10–14 days after each purchase (market-specific timing), limited to once per campaign and once per product (${CRM}). Promotes Share & Earn benefits (versions for Members and Brand Partners), features up to 6 products from the purchase with Share & Earn and Leave a review links, plus sharing tips.`),
  crmStep('9.2', 'Share and earn', COL(1), ROW.se, 'push',
    `Post-purchase / Share & Earn journey – Push (WhatsApp in pilot markets) with a direct Share & Earn link for one product from the last purchase (${CRM}).`),

  // 10. NovAge+
  crmStep('10.1', 'Welcome to your skincare journey with NovAge+', COL(0), ROW.n1, 'email',
    `NovAge+ journey 1 – Email 1 on Day 1 after the 1st NovAge+ SET purchase: welcome to the skincare journey with NovAge+ and routine introduction (${CRM}).`),
  crmStep('10.2', 'Loyalty programme introduction', COL(1), ROW.n1, 'email',
    `NovAge+ journey 1 – Email 2 on Day 6 (2nd campaign): NovAge+ loyalty programme introduction (${CRM}).`),
  crmStep('10.3', 'Increase your collagen production with NovAge+', COL(2), ROW.n1, 'email',
    `NovAge+ journey 1 – Email 3, in 5 weeks (${CRM}).`),
  crmStep('10.4', 'How to improve your skin from the inside out', COL(3), ROW.n1, 'email',
    `NovAge+ journey 1 – Email 4, in 8 weeks: Wellness cross-sell (${CRM}).`),
  crmStep('10.5', 'Segment / behaviour specific communication', COL(4), ROW.n1, 'email',
    `NovAge+ journey 1 – Email 5, in 9 weeks (${CRM}): “Become a Skinfluencer” for Builders/Sellers; loyalty programme last call for Members and End-consuming BrPs not in the programme; “Why your skin needs personalised treatment” for those in it.`),
  crmStep('10.6', 'Get your advanced customised routine set', COL(5), ROW.n1, 'email',
    `NovAge+ journey 1 – Email 6, in 13 weeks (${CRM}). Push notifications are to be added later.`),
  crmStep('10.7', 'Loyalty programme reminder (SMS 1)', COL(2), ROW.nsms, 'push',
    `NovAge+ journey 1 – SMS 1 in the next campaign if Email 2 wasn't opened, for buyers not in the loyalty programme (${CRM}).`, { channels: ['SMS'] }),
  crmStep('10.8', 'Final call before loyalty deadline (SMS 2)', COL(3), ROW.nsms, 'push',
    `NovAge+ journey 1 – SMS 2: final call before the loyalty programme deadline, for buyers not in the programme (${CRM}).`, { channels: ['SMS'] }),
  crmStep('10.9', 'Loyalty programme reminder', COL(0), ROW.n2, 'email',
    `NovAge+ journey 2 – loyalty programme reminder after the 2nd SET purchase and ongoing; versions for Builders & Sellers and for Members & End-consuming Brand Partners (${CRM}).`),
  crmStep('10.10', 'Up-sell NovAge+ SET', COL(0), ROW.n3, 'email',
    `NovAge+ journey 3 – sent once after the 1st single NovAge+ product purchase (${CRM}). 1 of 9 email versions depending on the product: fixed SET communication if the product is part of a fixed SET, otherwise the Digital skin diagnosis tool.`),

  // 11. Abandoned basket
  crmStep('11.1', '1st reminder', COL(0), ROW.ab, 'email',
    `Abandoned basket journey – Email 1, 1 hour after the basket is abandoned (${CRM}). Abandoned basket reminder with dynamic benefits based on the products in the basket: NovAge+ loyalty programme, Expiry Wallet, 15% welcome discount and free delivery (4 versions). A Push/WhatsApp reminder in the Oriflame App is to be added later.`),
  crmStep('11.2', '2nd reminder', COL(2), ROW.ab, 'email',
    `Abandoned basket journey – Email 2, 2 days later, only if the basket is still abandoned (${CRM}). Reminder with pictures of the products in the basket and personalised product recommendations (up-sell). A Push/WhatsApp reminder is to be added later.`),
  crmStep('11.3', 'Final reminder in Campaign Support last call', COL(3), ROW.ab, 'email',
    `Abandoned basket journey – Email 3, 2 days before campaign end, only if the basket is still abandoned (${CRM}). A content block with the abandoned basket is added automatically to the Campaign Support journey's “Last call” email.`),

  // 12. Wellosophy
  crmStep('12.1', 'Welcome and thank you, 1st-time Wellosophy buyer', COL(0), ROW.w1, 'email',
    `Wellosophy journey, 1st Wellosophy purchase – Email on Day 1 after purchase: welcome and thank 1st-time buyers, intro to benefits and recommendations on how to get the best result. Versions: default, meal replacement, Natural Balance, Wellness pack, Wellosophy skin (${CRM}).`),
  crmStep('12.2', 'Time to replenish', COL(1), ROW.w1, 'email',
    `Wellosophy journey, 1st Wellosophy purchase – Email + Push on Day 20 (Day 40 for Wellosophy skin, Day 10 for Metabo Boost): consistency is key for the best result; subscription communication and/or a special offer for the 2nd purchase (${CRM}).`, { channels: ['Email', 'Push'] }),
  crmStep('12.3', 'Get even better results with Wellosophy', COL(0), ROW.w2, 'email',
    `Wellosophy journey, never bought or stopped buying – Email on Day X after a 1st-time purchase of a specific category/product/BP amount, connecting the purchased products with Wellosophy. Versions by product or BP amount (100 BPs, Duology, Waunt, NovAge+ set) (${CRM}).`),
  crmStep('12.4', 'Offer for your 1st Wellosophy purchase', COL(1), ROW.w2, 'push',
    `Wellosophy journey, never bought or stopped buying – Push on Day X after the email if not engaged and no Wellosophy purchase yet: offer for the 1st Wellosophy purchase (${CRM}).`),
  crmStep('12.5', 'Business potential for Builders and Sellers', COL(0), ROW.w3, 'email',
    `Wellosophy journey – business potential for Builders and Sellers, triggered by constantly showing specific behaviour. Work in progress; journey flow to be confirmed (${CRM}).`, { flag: 'WIP – flow TBC', channels: ['Email', 'Push'] }),
);

// 18. Samples and 19. Advent Calendar (CRM journeys overview – Part 2)
const SAMPLE = (product, extra = '') => `Samples journey – Day 8 email (Day 12 in longer-delivery markets) for customers who bought a ${product} sample (${CRM2}). Encourages the full-size purchase and introduces complementary products. Customers need a valid email and marketing consent; when several samples are bought the same day, only the highest-priority journey is sent, full-size owners are skipped where applicable, and nobody enters the same journey twice.${extra}`;
const ADVENT = (n, when, extra = '') => `Advent Calendar journey – Email ${n}, ${when} (${CRM2}). Triggered by a consented waitlist sign-up and timed to the campaign calendar; dates shown are for EU markets (CIS one campaign later).${extra}`;

nodes.push(
  crmStep('18.1', 'NovAge ProCeuticals sample (priority 1)', COL(0), ROW.sm2, 'email',
    SAMPLE('NovAge ProCeuticals', ' “Take the next step towards renewed-looking skin”.')),
  crmStep('18.2', 'NovAge Day/Night Cream sample (priority 2)', COL(1), ROW.sm2, 'email',
    SAMPLE('NovAge Day or Night Cream', ' “Continue your anti-ageing care”.')),
  crmStep('18.3', 'Possess Intense sample (priority 3)', COL(2), ROW.sm2, 'email',
    SAMPLE('Possess Intense', ' “From first impression to lasting obsession”.')),
  crmStep('18.4', 'Diamonds sample – Cream (priority 4)', COL(3), ROW.sm2, 'email',
    SAMPLE('Diamond Cellular Anti-Ageing Cream', ' Diamonds Cream version: “The essence of timeless luxury”.')),
  crmStep('18.5', 'Diamonds sample – Concentrate (priority 4)', COL(4), ROW.sm2, 'email',
    SAMPLE('Diamond Cellular Night Concentrate', ' Diamonds Concentrate version: “Wrap your skin in rare overnight indulgence”.')),
  crmStep('18.6', 'Diamonds sample – Default (priority 4)', COL(5), ROW.sm2, 'email',
    SAMPLE('Diamonds', ' Diamonds default version: “The refined art of timeless skin”.')),
  crmStep('18.7', 'Giordani Gold sample', COL(6), ROW.sm2, 'email',
    SAMPLE('Giordani Gold', ' “Some first impressions deserve a second look”. Template supplied; Giordani Gold is not in the priority list.')),

  crmStep('19.1', 'Good things come to those on the waiting list', COL(0), ROW.ac, 'email',
    ADVENT(1, 'on entry after sign-up (retried after 2 hours if not sent)')),
  crmStep('19.2', 'For evenings that deserve a little extra sparkle', COL(1), ROW.ac, 'email',
    ADVENT(2, '1 day after week 2 of C13 starts', ' First product reveals.')),
  crmStep('19.3', 'The beauty of a well-curated countdown', COL(2), ROW.ac, 'email',
    ADVENT(3, '1 day after week 3 of C13 starts', ' More product reveals.')),
  crmStep('19.4', 'A beauty countdown with serious value', COL(3), ROW.ac, 'email',
    ADVENT(4, '2 days after C14 starts', ' The calendar’s value and reasons to buy.')),
  crmStep('19.5', 'The reactions say more than we ever could', COL(4), ROW.ac, 'email',
    ADVENT(5, '1 day after week 2 of C14 starts', ' Reactions to the calendar.')),
  crmStep('19.6', 'Not everyone gets this email', COL(5), ROW.ac, 'email',
    ADVENT(6, '4 days before C15 starts', ' Priority access begins tomorrow.')),
  crmStep('19.7', 'The Advent Calendar doors are open for you', COL(6), ROW.ac, 'email',
    ADVENT(7, '3 days before C15 starts', ' Exclusive early access with a promo code and how to use it at checkout.')),
  crmStep('19.8', 'December is looking brighter already', COL(0), ROW.ac2, 'email',
    ADVENT(8, 'sent automatically after an Advent Calendar purchase by a separate journey', ' Confirms the purchase.')),
  crmStep('19.9', 'The wait is over. So is the thinking time', COL(8), ROW.ac, 'email',
    ADVENT(9, '1 day before C15 starts, to contacts who have not bought the calendar', ' Last call with the promo code before priority access ends.')),
);

terminals.push(
  terminal('t-9', 'Purchase made', 8150, ROW.se, { d: 120 }),
  terminal('t-10-1', '1st NovAge+ SET purchase', 8150, ROW.n1, { d: 130 }),
  terminal('t-10-2', '2nd SET purchase & ongoing', 8150, ROW.n2, { d: 120 }),
  terminal('t-10-3', '1st single NovAge+ product', 8150, ROW.n3, { d: 120 }),
  terminal('t-12-1', '1st Wellosophy purchase', 8150, ROW.w1, { d: 120 }),
  terminal('t-12-2', 'Never bought or stopped buying', 8150, ROW.w2, { d: 120 }),
  terminal('t-12-3', 'Constantly showing specific behaviour', 8150, ROW.w3, { d: 120 }),
  terminal('t-18', 'Sample product ordered', 8150, ROW.sm1, { d: 120 }),
  terminal('t-19', 'Advent Calendar waitlist sign-up', 8150, ROW.ac, { d: 120 }),
  terminal('t-19-8', 'Advent Calendar purchased', 8150, ROW.ac2, { d: 120 }),
  terminal('exit-19', 'Exit · Email 8 comes from the purchase journey', COL(7), ROW.ac2, { d: 120 }),
  terminal('exit-11', 'Exit', COL(1) + 20, ROW.ab + 115, { d: 80 }),
  terminal('t-12-regular', 'Regular campaign Wellosophy communication', COL(3), (ROW.w1 + ROW.w2) / 2, { d: 150 }),
);

const decisions = [
  decision('d-abandoned', 'Basket abandoned?', 8150, ROW.ab, { size: 110 }),
  decision('d-18-sample', 'Consent and sample priority check (daily)', COL(0), ROW.sm1, { size: 110 }),
  decision('d-19-purchased', 'Advent Calendar purchased?', COL(7), ROW.ac, { size: 110 }),
  decision('d-still-abandoned', 'Still abandoned?', COL(1) + 20, ROW.ab, { size: 110 }),
];

/* ---------------- Connectors ---------------- */

const MAIN_Y = 258; // thick navigation line from UK Home
const LAND_Y = 80; // dashed "can land here directly" line from external entry points
const ext = ['t-email', 't-google', 't-ai'];

const edges = [
  // Entry points and home
  // (waypoint coordinates of 0 are placeholders: the first/last waypoint snaps to its box's anchor)
  ...ext.map((t) => e(t, 'r-2', { toSide: 't', via: [[658, 0]] })),
  e('t-url', 'r-2'),
  e('r-2', 'r-5', { fromSide: 'b', toSide: 't' }),
  ...ext.flatMap((t, i) => [
    e(t, 'f-shop', { style: 'dashed', toSide: 't', via: [[858, 0], [858, LAND_Y], [3466, LAND_Y]] }),
    e(t, 'f-insp', { style: 'dashed', toSide: 't', via: [[858, 0], [858, LAND_Y], [6428, LAND_Y]],
      ...(i === 0 ? { label: 'Users can land on any page as their first visit', labelAt: 0.42 } : {}) }),
    e(t, 'f-offers', { style: 'dashed', toSide: 't', via: [[858, 0], [858, LAND_Y], [7342, LAND_Y]] }),
  ]),
  e('r-2', 'p-1', { toSide: 't', via: [[1017, 927], [1017, MAIN_Y], [1339, MAIN_Y]] }),
  e('r-2', 'f-shop', { toSide: 't', via: [[1017, 927], [1017, MAIN_Y], [3466, MAIN_Y]] }),
  e('r-2', 'f-insp', { toSide: 't', via: [[1017, 927], [1017, MAIN_Y], [6428, MAIN_Y]] }),
  e('r-2', 'p-2', { toSide: 't', via: [[1017, 927], [1017, MAIN_Y], [7267, MAIN_Y]] }),

  // SHOP – top menu line and cross-links
  e('p-1', 'sample-shop', { fromSide: 't', toSide: 't', via: [[1339, 403], [5267, 403]] }),
  e('p-1', 'outlet', { fromSide: 't', toSide: 't', via: [[1339, 403], [5572, 403]] }),
  e('nutrition', 'p-24', { fromSide: 't', toSide: 'r', via: [[2930, 433], [3722, 433], [3722, 4146]] }),
  e('hair', 'bestseller', { toSide: 't', via: [[3753, 1922], [3753, 434], [4659, 434]] }),
  e('men', 's-fr-whom', { fromSide: 'l', toSide: 'r', via: [[3785, 1203], [3785, 2195]] }),
  e('gifts', 'p-29', { fromSide: 'l', toSide: 'l', via: [[3818, 1620], [3818, 4163]], flag: 'External website', flagAt: 0.9 }),

  // SHOP – trees
  ...tree('p-1', 1339, ['p-3', 'p-4']),
  ...tree('p-5', 1342, ['p-6', 'p-7', 'p-8', 'p-9', 'p-10', 'p-11', 'p-12', 'p-17']),
  ...tree('p-13', 2004, ['p-14', 'p-15', 'p-16']),
  ...tree('p-14', 2168, ['s-14']), ...tree('p-15', 2169, ['s-15']), ...tree('p-16', 2169, ['s-16']),
  ...tree('p-18', 2003, ['fr-product', 'fr-mood', 'fr-family', 'fr-whom']),
  ...tree('fr-product', 2169, ['s-fr-product']),
  ...tree('fr-mood', 2167, ['p-19', 'p-20', 'p-21', 's-fr-mood']),
  ...tree('fr-family', 2168, ['s-fr-family']), ...tree('fr-whom', 2168, ['s-fr-whom']),
  ...tree('makeup', 2003, ['mk-face', 'mk-eyes', 'mk-lips', 'mk-nails', 'mk-tools', 'mk-gifts', 'p-23', 'p-28']),
  ...['face', 'eyes', 'lips', 'nails', 'tools', 'gifts'].flatMap((k) => tree(`mk-${k}`, POS[`mk-${k}`][0], [`s-mk-${k}`])),
  bracket('p-13', 1833, 'p-18'),
  bracket('p-13', 1833, 'makeup'),
  bracket('p-13', 1833, 'article', { arrow: true }),
  ...tree('nutrition', 2930, ['n-product', 'n-goal', 'p-26', 'n-age']),
  ...tree('n-product', 3129, ['s-n-product']), ...tree('n-goal', 3128, ['s-n-goal']), ...tree('n-age', 3127, ['s-n-age']),
  e('s-n-goal', 'p-26', { fromSide: 'b', toSide: 't', via: [[3450, 962], [3570, 962]] }),
  ...tree('bathbody', 2962, ['bb-product', 'bb-benefit']),
  ...tree('bb-product', 3127, ['s-bb-product']), ...tree('bb-benefit', 3127, ['s-bb-benefit']),
  ...tree('hair', 2964, ['h-product', 'h-benefit', 'h-concerns']),
  ...['product', 'benefit', 'concerns'].flatMap((k) => tree(`h-${k}`, POS[`h-${k}`][0], [`s-h-${k}`])),
  ...tree('hair-2', 2964, ['h2-product', 'h2-benefit', 'h2-concerns']),
  ...['product', 'benefit', 'concerns'].flatMap((k) => tree(`h2-${k}`, POS[`h2-${k}`][0], [`s-h2-${k}`])),
  bracket('bathbody', 2762, 'hair'),
  bracket('bathbody', 2762, 'hair-2'),
  e('bathbody', 'article', { fromSide: 'l', toSide: 'r', via: [[2762, 1332], [2762, 4322]] }),
  ...tree('accessories', 3938, ['a-product', 'a-collections', 'a-gifts']),
  ...tree('a-product', 4137, ['s-a-product']), ...tree('a-gifts', 4136, ['s-a-gifts']),
  ...tree('men', 3938, ['m-product']), ...tree('m-product', 4135, ['s-m-product']),
  ...tree('gifts', 3969, ['g-recipient', 'g-sets', 'g-giving', 'g-holiday']),
  ...tree('g-recipient', 4167, ['s-g-recipient']),

  // Below the SHOP frame
  e('p-23', 'p-22', { style: 'none', fromSide: 't', toSide: 'r', via: [[2322, 3939]] }),
  e('insights', 'article', { fromSide: 'b', via: [[2112, 4322]] }),
  e('article', 'insights', { fromSide: 't', toSide: 'r', via: [[2386, 4213]] }),
  e('p-24', 'p-25', { fromSide: 't', toSide: 'r', via: [[3378, 3940]] }),
  e('p-25', 'p-27', { fromSide: 'b', toSide: 't', via: [[3090, 4002], [3002, 4002]] }),
  e('p-27', 'p-28', { fromSide: 'b', toSide: 'b', via: [[3000, 4232], [2609, 4232]] }),

  // INSPIRATION
  e('magazine', 'magazine-n', { fromSide: 'l', toSide: 'l', via: [[6000, 532], [6000, 692]] }),
  e('magazine', 'materials', { fromSide: 'l', toSide: 'l', via: [[6000, 532], [6000, 852]] }),

  // Browsing into the shopping example
  e('f-shop', 'f-example', { fromSide: 'b', toSide: 'l', via: [[3466, 3927], [7742, 3927], [7742, 1748]] }),
  e('f-insp', 'f-example', { fromSide: 'b', toSide: 'l', via: [[6428, 3927], [7742, 3927], [7742, 1748]] }),

  // SHOPPING – EXAMPLE
  ...['p-30', 'p-31', 'p-32', 'p-33'].flatMap((p) => [
    e(p, 'p-34', { via: [[8347, POS[p][1]], [8347, 1751]] }),
    e(p, 'p-35', { via: [[8730, POS[p][1]], [8730, 1752]] }),
  ]),
  e('p-34', 'p-35'),
  e('p-35', 'p-36'),

  // CHECKOUT AS-IS
  e('p-36', 'r-4', { fromSide: 't', toSide: 'b' }),
  e('p-36', 'p-37', { fromSide: 'b', toSide: 't' }),
  e('p-36', 'p-38'),
  e('p-36', 'p-47', { style: 'dashed', via: [[9948, 1783], [9948, 1991]] }),
  e('p-47', 'p-38', { style: 'dashed', fromSide: 't', toSide: 'b' }),
  e('p-38', 'p-38-b'),
  e('p-38-b', 'p-39'),
  e('p-39', 'p-40'),
  e('p-40', 'p-41'),
  e('p-41', 'p-42'),
  e('p-42', 'r-2-checkout', { via: [[12281, 1751], [12281, 1559]] }),
  e('p-42', 'r-5-checkout', { via: [[12281, 1751], [12281, 1926]] }),
  e('p-42', 'p-45', { fromSide: 'b', toSide: 't' }),
  e('p-42', 'p-46', { fromSide: 'b', toSide: 't', via: [[12067, 1855], [11682, 1855]] }),

  // BCM 6.0 checkout
  e('t-browse', 'p-43', { style: 'dashed' }),
  e('p-43', 'p-44'),
  e('p-44', 'r-39'),
  e('r-39', 'f-bcm6-reg'),
  e('r-40', 'r-45'),
  e('f-bcm6-reg', 't-checkout'),

  // 11. Abandoned basket – from either basket
  e('p-35', 'd-abandoned', { fromSide: 'b', via: [[8976, 2205], [7845, 2205], [7845, ROW.ab]] }),
  e('p-43', 'd-abandoned', { fromSide: 'b', via: [[9012, 2985], [7845, 2985], [7845, ROW.ab]] }),
  e('d-abandoned', 'crm-11-1', { label: 'Yes', labelAt: 0.15, delay: { wait: 'In 1 hour' }, delayAt: 0.6 }),
  e('crm-11-1', 'd-still-abandoned', { delay: { wait: 'In 2 days' } }),
  e('d-still-abandoned', 'crm-11-2', { label: 'Yes', labelAt: 0.15 }),
  e('d-still-abandoned', 'exit-11', { fromSide: 'b', toSide: 't', label: 'No' }),
  e('crm-11-2', 'crm-11-3', { delay: { wait: '2 days', day: 'before campaign end' } }),

  // Purchase-triggered journeys – from the order confirmation
  ...['t-9', 't-10-1', 't-10-2', 't-10-3', 't-12-1', 't-12-2', 't-12-3', 't-18'].map((t) => e('p-45', t, {
    fromSide: 'b', via: [[12066, 3088], [7880, 3088], [7880, 0]],
  })),

  // 9. Share & Earn
  e('t-9', 'crm-9-1', { delay: { wait: '10–14 days', day: 'after each purchase' } }),
  e('crm-9-1', 'crm-9-2'),

  // 10. NovAge+
  e('t-10-1', 'crm-10-1', { delay: { wait: 'Day 1' } }),
  e('crm-10-1', 'crm-10-2', { delay: { wait: 'Day 6', day: '2nd campaign' } }),
  e('crm-10-2', 'crm-10-3', { delay: { wait: 'In 5 weeks' } }),
  e('crm-10-3', 'crm-10-4', { delay: { wait: 'In 8 weeks' } }),
  e('crm-10-4', 'crm-10-5', { delay: { wait: 'In 9 weeks' } }),
  e('crm-10-5', 'crm-10-6', { delay: { wait: 'In 13 weeks' } }),
  e('crm-10-2', 'crm-10-7', { fromSide: 'b', via: [[COL(1), ROW.nsms]], delay: { wait: 'Next campaign', day: 'if Email 2 not opened' }, delayAt: 0.7 }),
  e('crm-10-7', 'crm-10-8', { label: 'If not in loyalty programme' }),
  e('t-10-2', 'crm-10-9'),
  e('t-10-3', 'crm-10-10', { label: 'Sent once' }),

  // 12. Wellosophy
  e('t-12-1', 'crm-12-1', { delay: { wait: 'Day 1', day: 'after purchase' } }),
  e('crm-12-1', 'crm-12-2', { delay: { wait: 'Day 20', day: '40 skin · 10 Metabo Boost' } }),
  e('crm-12-2', 't-12-regular'),
  e('t-12-2', 'crm-12-3', { delay: { wait: 'Day X', day: 'after purchase' } }),
  e('crm-12-3', 'crm-12-4', { delay: { wait: 'Day X', day: 'if not engaged' } }),
  e('crm-12-4', 't-12-regular'),
  e('t-12-3', 'crm-12-5'),

  // 18. Samples – Day 8 email by sample bought (Day 12 in longer-delivery markets)
  e('t-18', 'd-18-sample', { delay: { wait: 'Day 8', day: 'Day 12 in longer-delivery markets' } }),
  ...['18-1', '18-2', '18-3', '18-4', '18-5', '18-6', '18-7'].map((s) => e('d-18-sample', `crm-${s}`, { fromSide: 'b', toSide: 't' })),

  // 19. Advent Calendar – from the Advent Calendar page's waitlist sign-up
  e('p-29', 't-19', { fromSide: 'b', via: [[4018, ROW.ac]], label: 'Join the waitlist', labelAt: 0.6 }),
  e('t-19', 'crm-19-1', { delay: { wait: 'On entry', day: 'retry after 2 hours' } }),
  e('crm-19-1', 'crm-19-2', { delay: { wait: 'Mid C13', day: 'week 2 + 1 day' } }),
  e('crm-19-2', 'crm-19-3', { delay: { wait: 'Late C13', day: 'week 3 + 1 day' } }),
  e('crm-19-3', 'crm-19-4', { delay: { wait: 'Early C14', day: '2 days in' } }),
  e('crm-19-4', 'crm-19-5', { delay: { wait: 'Mid C14', day: 'week 2 + 1 day' } }),
  e('crm-19-5', 'crm-19-6', { delay: { wait: 'Before C15', day: '4 days before' } }),
  e('crm-19-6', 'crm-19-7', { delay: { wait: 'Before C15', day: '3 days before' } }),
  e('crm-19-7', 'd-19-purchased', { delay: { wait: '1 day before C15' } }),
  e('d-19-purchased', 'crm-19-9', { label: 'No' }),
  e('d-19-purchased', 'exit-19', { fromSide: 'b', toSide: 't', label: 'Yes' }),
  e('t-19-8', 'crm-19-8', { label: 'Separate journey' }),
];

// Screenshots in assets/screens/ (redacted web JPEGs), named by reference number.
const SCREENSHOTS = new Set([
  ...Array.from({ length: 47 }, (_, i) => `P-${i + 1}`),
  'R-2', 'R-4', 'R-5', 'R-39', 'R-40', 'R-45',
  'CRM-9.1', 'CRM-10.2', 'CRM-10.3', 'CRM-10.4', 'CRM-10.5', 'CRM-10.6', 'CRM-10.9', 'CRM-10.10',
  'CRM-11.1', 'CRM-11.3', 'CRM-12.1', 'CRM-12.2', 'CRM-12.3', 'CRM-12.4',
  ...[1, 2, 3, 4, 5, 6, 7].map((i) => `CRM-18.${i}`),
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `CRM-19.${i}`),
]);

finalize({ nodes, terminals, ghosts, decisions, groups, edges, screenshots: SCREENSHOTS, usability: USABILITY.purchase });

export const purchase = {
  id: 'purchase',
  name: 'Purchase',
  status: 'ready',
  metrics: false, // hide visits, conversion and traffic sources/destinations until real data is available
  width: 13200,
  height: 10300,
  nodes,
  terminals,
  ghosts,
  decisions,
  groups,
  // Areas from "Purchase.pdf" (journey-mapping highlights).
  areas: [
    // E is SHOP plus a strip along the top to All current offers (P-2), as in the source.
    area('area-e', 'E', [[1090, 290, 5810, 4450], [5700, 290, 7300, 430], { ids: ['p-2'], pad: 60 }], { caption: 'Exploring and browsing products' }),
    area('area-f', 'F', [{ ids: ['magazine', 'magazine-2', 'discover', 'magazine-n', 'materials'], pad: [40, 60, 60, 60] }], { caption: 'Inspiration, Magazine and beauty tools', badge: { at: 'bl-out' } }),
    area('area-g1', 'G1', [{ ids: ['f-example'], pad: 24 }], { caption: 'Basket', badge: { at: 'bl-out' } }),
    area('area-g2', 'G2', [{ ids: ['f-checkout'], pad: 24 }], { caption: 'Checkout', badge: { at: 'bl-out' } }),
  ],
  funnels: FUNNELS.purchase, // GA4 funnels, shown in the summary bar
  summary: { highlights: HIGHLIGHTS.purchase },
  edges,
  legend: [
    ...FLOW_LEGEND.filter((i) => !['trigger', 'aud-m', 'aud-brp'].includes(i.kind)),
    { kind: 'subpages', label: 'Group of PLP subpages' },
    { kind: 'dashed', label: 'Can land directly' },
    { kind: 'ux', label: 'Usability friction (count)' },
  ],
};
