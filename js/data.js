import { registration } from './journeys/registration.js';
import { newsletter } from './journeys/newsletter.js';
import { training } from './journeys/training.js';
import { purchase } from './journeys/purchase.js';
import { crm } from './journeys/crm.js';

// Journey list. Each journey's content lives in js/journeys/ (transcribed from the user-flow PDFs).

export const meta = {
  title: 'User Journey Flows',
  source: 'Google Analytics',
  dateRange: '21 Aug 2026 – 15 Oct 2026', // GA4 funnels (js/journeys/funnels.js)
  market: { code: 'UK', name: 'United Kingdom' },
};

export const journeys = [
  registration,
  newsletter,
  training,
  purchase,
  {
    id: 'subscription',
    name: 'Subscription',
    status: 'coming-soon',
    hidden: true, // hidden for now; remove to show the tab again
  },
  crm,
  {
    id: 'revieve',
    name: 'Revieve Beauty Tools',
    status: 'coming-soon',
    hidden: true, // hidden for now; remove to show the tab again
  },
].filter((j) => !j.hidden);
