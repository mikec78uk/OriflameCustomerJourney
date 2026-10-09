// Brand Partner Training (Onboarding) journey, transcribed from
// "User Journey BrandPartner Training (Onboarding).pdf" (key: "Key to read userflow.pdf").
// Final-deliverable content: anything not yet known is shown as TBD.
// Coordinates are PDF artboard pixels (rendered at 4626 × 1818). R-2 and R-35 are the same pages as in the
// Registration journey; R-35 uses a screenshot taken for this flow (R-35-training).

import { artboard, finalize, FLOW_LEGEND, SOURCE as source } from './flow.js';

const { page, terminal, edge: e } = artboard({ ox: 80, oy: 40 });
const BrP = { audience: 'BrP' };

const nodes = [
  page('R-35', 'My Account (Dashboard)', 584, 757, { ...BrP, screenshot: 'R-35-training' }),
  page('O-1', 'Connect with leaders', 1092, 1161, {
    ...BrP,
    challenges: [{
      title: 'No way to connect',
      text: 'There is no direct connection from My Account (Dashboard) (R-35) to Connect with leaders.',
      source,
    }],
  }),
  page('O-2', 'Training (Onboarding)', 1092, 326, BrP),
  page('R-2', 'UK Home', 1784, 166, BrP),
  page('O-3', 'PLP (Nutrition)', 1784, 385, BrP),

  // Step 1: Try
  page('O-4', 'Step 1 (Try)', 1784, 629, BrP),
  page('O-5', 'Download the app', 2151, 789, BrP),
  page('O-6', 'Digital Skin Diagnosis', 2151, 1010, BrP),
  page('O-7', 'Wellness assessment', 2151, 1230, BrP),
  page('O-8', 'Create your product story', 2151, 1451, BrP),

  // Step 2: Share
  page('O-9', 'Step 2 (Share)', 2552, 629, BrP),
  page('O-10', 'Share your product story', 2872, 789, BrP),
  page('O-11', 'Team up with your Beauty Entrepreneur', 2872, 1010, BrP),
  page('O-12', 'Share and Earn (Share & Earn)', 1092, 674, BrP),

  // Step 3: Grow
  page('O-13', 'Step 3 (Grow)', 3321, 629, BrP),
  page('O-14', 'Invite VIP’s to upgrade', 3624, 789, BrP),
  page('O-15', 'Congratulations', 3992, 629, BrP),
];

const terminals = [
  terminal('sign-in', 'Sign In', 223, 820),
];

const edges = [
  e('sign-in', 'r-35'),
  e('r-35', 'o-2', { via: [[958, 821], [958, 390]] }),
  e('r-35', 'o-12', { via: [[958, 821], [958, 738]] }),
  e('r-35', 'o-1', { style: 'none', flag: 'No way to connect', flagAt: 0.55, via: [[958, 821], [958, 1225]] }),

  e('o-2', 'r-2', { via: [[1383, 390], [1383, 230]] }),
  e('o-2', 'o-3', { via: [[1383, 390], [1383, 449]] }),
  e('o-2', 'o-4', { via: [[1383, 390], [1383, 693]] }),

  // Step 1 (Try)
  e('o-4', 'o-2', { fromSide: 't', toSide: 'b', via: [[1904, 562], [1212, 562]] }),
  e('o-4', 'o-5', { via: [[2103, 693], [2103, 853]] }),
  e('o-4', 'o-6', { via: [[2103, 693], [2103, 1074]] }),
  e('o-4', 'o-7', { via: [[2103, 693], [2103, 1294]] }),
  e('o-4', 'o-8', { via: [[2103, 693], [2103, 1515]] }),
  e('o-4', 'o-9'),

  // Step 2 (Share)
  e('o-9', 'o-2', { fromSide: 't', toSide: 'b', via: [[2672, 562], [1212, 562]] }),
  e('o-9', 'o-5', { fromSide: 'b', toSide: 'r', via: [[2672, 853]] }),
  e('o-9', 'o-10', { fromSide: 'b', via: [[2672, 853]] }),
  e('o-9', 'o-11', { fromSide: 'b', via: [[2672, 1074]] }),
  e('o-9', 'o-12', { fromSide: 'b', toSide: 'r', via: [[2672, 1681], [1400, 1681], [1400, 738]] }),
  e('o-9', 'o-13'),

  // Step 3 (Grow)
  e('o-13', 'o-14', { fromSide: 'b', via: [[3441, 853]] }),
  e('o-13', 'o-11', { fromSide: 'b', toSide: 'r', via: [[3441, 1074]] }),
  e('o-13', 'o-5', { fromSide: 'b', toSide: 'r', via: [[3441, 1185], [2440, 1185], [2440, 853]] }),
  e('o-13', 'o-15'),
  e('o-15', 'o-5', { fromSide: 'b', toSide: 'r', via: [[4112, 1185], [2440, 1185], [2440, 853]] }),
  e('o-15', 'r-35', { fromSide: 't', toSide: 't', via: [[4112, 97], [704, 97]] }),
];

// Screenshots in assets/screens/ (redacted web JPEGs), named by reference number.
const SCREENSHOTS = new Set([...Array.from({ length: 15 }, (_, i) => `O-${i + 1}`), 'R-2']);

finalize({ nodes, terminals, edges, screenshots: SCREENSHOTS });

export const training = {
  id: 'brand-partner-training',
  name: 'Brand Partner Training (Onboarding)',
  status: 'ready',
  width: 4260,
  height: 1720,
  nodes,
  terminals,
  decisions: [],
  groups: [],
  edges,
  legend: FLOW_LEGEND.filter((i) => !['trigger', 'email', 'aud-m', 'delay'].includes(i.kind)),
};
