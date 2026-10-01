// Journey content. All figures are placeholder values taken from the Figma wireframes
// (Figma file ouyzjeKmWbwAY8r0IazvNt). Swap these out for real GA data as it becomes available.

export const meta = {
  title: 'User Journey Flows',
  source: 'Google Analytics',
  dateRange: '1 Oct 2025 - 30 Sep 2026',
  market: { code: 'UK', name: 'United Kingdom' },
};

// Placeholder detail content (from the Figma "Information" frame). Pages without their own
// detail fall back to this so every step can be opened in the prototype.
const placeholderDetail = {
  placeholder: true,
  screenshot: null,
  description:
    'Allows customers to browse and compare products within a category and narrow the available range before selecting a product.',
  keyBehaviour: [
    { label: 'Page Views', value: '2.8m' },
    { label: 'Product Click Through', value: '37%' },
    { label: 'Filter interaction', value: '18%' },
    { label: 'Exit rate', value: '24%' },
  ],
  cameFrom: [
    { label: 'Homepage', value: '28%' },
    { label: 'Organic Search', value: '23%' },
    { label: 'Navigation', value: '19%' },
    { label: 'Campaign / Promotion', value: '14%' },
    { label: 'Other', value: '16%' },
  ],
  wentNext: [
    { label: 'PDP', value: '37%' },
    { label: 'Another PLP', value: '20%' },
    { label: 'Search', value: '10%' },
    { label: 'Basket', value: '8%' },
    { label: 'Other/Exit', value: '25%' },
  ],
  challenges: [
    { text: 'Only a minority of customers interact with filters before selecting a product.', source: 'GA' },
  ],
  opportunities: [
    {
      title: 'Support comparison',
      text: 'Surface the product information customers need to distinguish between similar products.',
    },
    {
      title: 'Improve filtering',
      text: 'Understand whether low filter usage reflects low customer need or poor discoverability/relevance.',
    },
  ],
};

const CARD_W = 204;
const CARD_H = 146;

// Positions are in canvas pixels, mirroring the Figma "Core Transactional Journey" section.
const coreNodes = [
  { id: 'country', name: 'Country Selection', x: 40, y: 157, visits: '2.1m', rate: '25.1%', next: 'Home', findings: 4 },
  { id: 'home', name: 'Home', x: 325, y: 157, visits: '2.1m', rate: '25.1%', next: 'Navigation', findings: 4 },
  { id: 'navigation', name: 'Navigation', x: 726, y: 157, visits: '2.1m', rate: '12.4%', next: 'PLP', findings: 2 },
  { id: 'search', name: 'Search', x: 726, y: 335, visits: '2.1m', rate: '65%', next: 'Search Results', findings: 4 },
  {
    id: 'plp', name: 'PLP', fullName: 'Product Listing Page', x: 1013, y: 157,
    visits: '2.1m', rate: '12.4%', next: 'PDP', findings: 2,
    detail: { ...placeholderDetail, placeholder: false, screenshot: 'assets/screens/plp.jpg' },
  },
  { id: 'search-results', name: 'Search Results', x: 1013, y: 335, visits: '1.1m', rate: '12.4%', next: 'PDP', findings: 2 },
  { id: 'pdp', name: 'PDP', fullName: 'Product Detail Page', x: 1296, y: 157, visits: '1.7m', rate: '21.1%', next: 'Basket', findings: 4 },
  { id: 'basket', name: 'Basket', x: 1577, y: 157, visits: '1.7m', rate: '85%', next: 'Sign Up', findings: 4 },
  { id: 'sign-up', name: 'Sign Up', x: 1817, y: 481, visits: '1.7m', rate: '12.3%', next: 'Sign In', findings: 4 },
  { id: 'sign-in', name: 'Sign In', x: 2045, y: 481, visits: '1.7m', rate: '89%', next: 'Basket', findings: 4 },
  { id: 'offers', name: 'Offers', x: 2384, y: 157, visits: '1.7m', rate: '78.2%', next: 'Checkout', findings: 4 },
  { id: 'checkout', name: 'Checkout', x: 2667, y: 157, visits: '1.7m', rate: '10.6%', next: 'Confirmation', findings: 4 },
  { id: 'confirmation', name: 'Confirmation', x: 2948, y: 157, visits: '1.7m', rate: '21.1%', next: 'Basket', findings: 4 },
].map((n) => ({ w: CARD_W, h: CARD_H, detail: placeholderDetail, ...n }));

// Decision points and groupings drawn on the canvas but not selectable.
const coreDecisions = [{ id: 'signed-in', x: 1990, y: 193, size: 73, label: 'Signed in?' }];
const coreGroups = [{ id: 'auth', x: 1781, y: 467, w: 517, h: 186, label: 'Account' }];

// Connectors. `from`/`to` are node or decision ids; sides are t/r/b/l.
// `via` lists optional intermediate points for orthogonal routing.
const coreEdges = [
  { from: 'country', to: 'home' },
  { from: 'home', to: 'navigation' },
  { from: 'home', to: 'search', fromSide: 'r', toSide: 'l', elbow: 'h' },
  { from: 'navigation', to: 'plp' },
  { from: 'search', to: 'search-results' },
  { from: 'plp', to: 'pdp' },
  { from: 'search-results', to: 'pdp', fromSide: 'r', toSide: 'l', elbow: 'h' },
  { from: 'pdp', to: 'basket' },
  { from: 'basket', to: 'signed-in' },
  { from: 'signed-in', to: 'offers', label: 'Signed In = TRUE', labelAt: 0.5 },
  { from: 'signed-in', to: 'auth', fromSide: 'b', toSide: 't', label: 'Signed In = FALSE', labelAt: 0.45 },
  { from: 'sign-up', to: 'sign-in' },
  { from: 'auth', to: 'basket', fromSide: 'l', toSide: 'b', elbow: 'v-from-h' },
  { from: 'offers', to: 'checkout' },
  { from: 'checkout', to: 'confirmation' },
];

export const journeys = [
  {
    id: 'core',
    name: 'Core Transactional Journey',
    status: 'ready',
    width: 3200,
    height: 700,
    nodes: coreNodes,
    decisions: coreDecisions,
    groups: coreGroups,
    edges: coreEdges,
  },
  {
    id: 'brand-partner',
    name: 'Brand Partner Onboarding',
    status: 'coming-soon',
  },
];
