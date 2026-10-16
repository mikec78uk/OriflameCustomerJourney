// GA4 funnel explorations from "Funnels_CX_Journeys.xlsx" (all markets roll-up, web), keyed by journey.
// Only active users per step are stored; completion and abandonment are derived from them
// (they match the export). Update this file when a new export is supplied.

export const FUNNEL_PERIOD = {
  source: 'GA4 funnel exploration',
  scope: 'All markets roll-up, web',
  dateRange: '21 Aug 2026 – 15 Sep 2026',
};

// Purchase funnels track delivery, payment and order review as a single step.
const COMBINED_CHECKOUT = 'Delivery, payment and order review are tracked as one step, so these funnels don’t give a detailed view of the booking flow.';

export const FUNNELS = {
  registration: [
    {
      id: 'brp-reg',
      name: 'Brand Partner registration',
      short: 'BrP registration',
      steps: [
        ['Primary contact', 841],
        ['Contact verification', 268],
        ['Personal info', 235],
        ['Sponsor selection', 215],
        ['Accept T&C', 210],
        ['Registration submit', 196],
        ['My account dashboard', 169],
      ],
    },
    {
      id: 'member-reg',
      name: 'Member registration',
      short: 'Member registration',
      steps: [
        ['Enter primary contact', 1467],
        ['Contact verification', 688],
        ['Personal info', 612],
        ['Accept T&C', 598],
        ['Registration submit', 571],
        ['Start exploring (home page)', 208],
      ],
    },
  ],

  purchase: [
    {
      id: 'basket-logged-in',
      name: 'Basket to order – logged in',
      short: 'Basket to order · logged in',
      caveat: COMBINED_CHECKOUT,
      steps: [
        ['Shopping bag', 8760],
        ['Offers', 3909],
        ['Delivery, payment & review', 3677, { combined: true }],
        ['Order complete', 2799],
      ],
    },
    {
      id: 'basket-new',
      name: 'Basket to order – new customers',
      short: 'Basket to order · new customers',
      caveat: COMBINED_CHECKOUT,
      steps: [
        ['Shopping bag', 8760],
        ['Registration (guest or registered)', 2033],
        ['Delivery, payment & review', 1279, { combined: true }],
        ['Order complete', 710],
      ],
    },
    {
      id: 'ecatalogue',
      name: 'eCatalogue to order',
      short: 'eCatalogue to order',
      caveat: COMBINED_CHECKOUT,
      steps: [
        ['Visit eCatalogue', 13418],
        ['Add to cart from eCatalogue', 852],
        ['Delivery, payment & review', 412, { combined: true }],
        ['Order complete', 319],
      ],
    },
  ],
};
