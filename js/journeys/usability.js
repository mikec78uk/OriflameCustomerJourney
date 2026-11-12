// Usability testing findings (unmoderated think-aloud, 10 participants per journey or market, November 2026):
// - "Registration-Journeys-Usability-Report-Findings.pptx": UK and Poland test the existing dual registration,
//   Portugal tests BCM 6.0 (Registration and Brand Partner Training tabs).
// - "Shopping-Checkout-Journeys-Usability-Report.pptx": UK and Poland test guest checkout, Portugal tests the
//   BCM 6.0 checkout with a required account (Purchase tab; Portugal's basket and account findings sit on the
//   BCM 6.0 lane). Its "Also observed: check in QA" items are included with `qa: true` (lower priority).
// Only frictions are recorded – things that worked are left out. Counts only, no participant IDs.
//
// USABILITY[journey][ref or step id] lists findings shown with that step's challenges (and counted in its Findings).
// USABILITY_OVERVIEW[area] holds the headline frictions for an Overview area, plus `general` ones that don't
// belong to a single step on the map. `markets` drives the circular flags; `evidence` is a count or "Observed".

export const USABILITY_STUDY = {
  source: 'Usability testing',
  date: 'November 2026',
  note: '10 participants per test, so counts are directional.',
};

export const MARKETS = {
  UK: 'United Kingdom',
  PL: 'Poland',
  PT: 'Portugal (BCM 6.0)',
};

export const USABILITY = {
  registration: {
    // A1 – finding the way in
    'R-2': [{
      title: 'Selling route not visible on the homepage',
      text: 'Would-be sellers did not see a way to sign up to sell from the homepage and reached it through the footer or search.',
      evidence: [['UK', '3/10']],
      quote: 'If they are trying to do this, they’re not making it very obvious.',
    }],
    'R-3': [
      {
        title: '“VIP” and “Beauty Entrepreneur” labels cause hesitation',
        text: '“VIP” sounded exclusive; “Beauty Entrepreneur” read as a premium tier, a business account or something you must already be.',
        evidence: [['UK', '6/10 members']],
        quote: 'I’m not a VIP so … that’s probably just stopped me in my tracks for a second.',
      },
      {
        title: 'Unclear which option lets you sell',
        text: 'Would-be sellers read the FAQs to compare the options; some signed up for a shopping account instead.',
        evidence: [['UK', '5/10 unsure'], ['PL', '4/10 chose a shopping account']],
        quote: 'I had to guess that Beauty Entrepreneur was the right thing rather than VIP.',
      },
      {
        title: '“Join the club” and “Business Partner” don’t read as sign-up or selling',
        text: 'Shoppers wanted to create an account, not join a club; the business option was taken to require a company. Benefit tiles look like buttons but are not.',
        evidence: [['PL', 'Observed']],
        quote: 'I just want to buy something, not be a club member.',
      },
    ],
    'R-4': [{
      title: 'Account icon opens sign-in only',
      text: 'People expect to register from the account icon, but it opens a login form, so they miss the account options and the small sign-up link below it.',
      evidence: [['UK', 'Observed on mobile'], ['PL', '6/10 started here'], ['PT', '6/9 started here']],
      quote: 'That it shows logging in after clicking the person icon…',
    }],
    'R-6': [
      {
        title: 'reCAPTCHA repeats after being completed',
        text: 'The captcha reappeared on later attempts, so members needed several tries.',
        evidence: [['UK', '4/10 members']],
      },
      {
        title: 'Invite-code field mistaken for “confirm password”',
        text: 'Members typed their password into the invite/bonus code field.',
        evidence: [['PL', '2/10 members']],
        quote: 'I though it was password confirmation.',
      },
    ],
    'R-8': [
      {
        title: 'reCAPTCHA slows sign-up',
        text: 'The captcha annoyed would-be sellers and slowed them down; one said it was hard to use with colour blindness.',
        evidence: [['UK', '4/10 Brand Partners']],
      },
      {
        title: 'Invite-code field mistaken for “confirm password”',
        text: 'Participants typed their password again and only read the label after the error.',
        evidence: [['UK', 'Observed']],
      },
      {
        title: 'Fee unclear',
        text: 'Few could state the full fee (£19 for the first year, then £10 a year); some read it as monthly or free. In Poland the fee is shown in light grey and the basket looked empty after it was added.',
        evidence: [['UK', '2/10 knew the full fee'], ['PL', '2/10 unclear']],
      },
    ],
    'R-10': [{
      title: 'Earnings not explained',
      text: 'Would-be sellers asked for realistic earnings before committing.',
      evidence: [['UK', '6/10']],
    }],

    // A2 – creating the account
    'R-30': [
      {
        title: 'Sponsor matching needs an address',
        text: 'Polish participants had to select their address to be assigned a sponsor, and one was offered a different region; UK participants were assigned one with a click.',
        evidence: [['PL', 'Observed']],
        quote: 'this is different region. I’m not sure. It’s so weird',
      },
      {
        title: 'Nothing known about the assigned partner',
        text: 'People knew nothing about the person assigned to them and met several names for them (sponsor, leader, Brand Partner).',
        evidence: [['UK', 'Observed']],
      },
    ],

    // B – first account view
    'R-16': [{
      title: 'Account icon signs new members out',
      text: 'On the confirmation page, the account icon opens the sign-up page and signs the user out, as if they had not registered.',
      evidence: [['PL', 'Observed']],
    }],
    'R-18': [{
      title: 'Welcome discount hard to find',
      text: 'New members land on a general page rather than their dashboard, and few found the 15% welcome discount.',
      evidence: [['UK', '1/10 found it'], ['PL', '4/9 found it']],
      quote: 'I though it says 15% off stuff, but I don’t know where that is.',
    }],
    'R-20': [
      {
        title: '“Connect with leaders” is empty',
        text: 'It opens an empty panel with no contact option; most thought no one was connected to their account.',
        evidence: [['UK', '8/10 thought no one was connected']],
      },
      {
        title: 'Members don’t want a seller linked to them',
        text: 'Members were open to hearing about becoming a Brand Partner but wanted to decide themselves, and would dislike or be surprised by contact.',
        evidence: [['UK', '5/10'], ['PL', '5/9']],
        quote: 'I would prefer for them not to. I’ve signed up as a customer, rather than a representative.',
      },
    ],
    'R-35': [
      {
        title: '“My business” terms not understood',
        text: 'Terms such as downline points, leg balance and qualified legs were not understood.',
        evidence: [['UK', '4/6 who reached the account']],
        quote: 'Leg balance. Title qualified legs. Don’t really understand that.',
      },
      {
        title: 'Dashboard sections did not load',
        text: 'A dashboard section failed to load for some new Brand Partners.',
        evidence: [['UK', 'Observed']],
      },
    ],

    // BCM 6.0 (Portugal)
    'R-39': [
      {
        title: '“Become a partner” and “sales” wording puts shoppers off',
        text: 'Links and headings mention partners and sales, so shoppers thought they were in the wrong place; some stopped and did not register.',
        evidence: [['PT', '4/9']],
        quote: 'I would like to just register as a user.',
      },
      {
        title: 'Register page has no form fields',
        text: 'The register link opens a landing page; people scrolled for another button, asked for the fields straight away, or took the landing page for the form.',
        evidence: [['PT', '4/9']],
      },
    ],
    'R-40': [{
      title: 'Progress bar shows two steps for a three-step form',
      text: 'The progress bar shows two steps, but registration has three.',
      evidence: [['PT', 'Observed']],
      quote: 'So it is actually three steps',
    }],
    'R-45': [{
      title: 'Benefits not shown on arrival',
      text: 'People expected to see their benefits and land on their dashboard straight after registering; only one found the 30% welcome offer.',
      evidence: [['PT', 'Observed']],
      quote: 'I think this, this discount should be on the homepage.',
    }],
    'R-46': [{
      title: 'Registrants don’t realise the account involves selling',
      text: 'Most did not think the account involves selling, although the terms make every registrant a Brand Partner, and would dislike seller contact.',
      evidence: [['PT', '6/10']],
      quote: 'I don’t want to have to sell this brand’s products.',
    }],
  },

  training: {
    'R-35': [{
      title: 'Onboarding not seen as the place to start',
      text: 'New Brand Partners did not see onboarding as where to begin; some could not find it or see a pathway.',
      evidence: [['UK', 'Observed']],
    }],
    'O-2': [
      {
        title: '“Begin step 1” found late',
        text: 'The start button sits at the end of the page and was found late; one participant was unsure the product pages were the onboarding.',
        evidence: [['PL', '2/5']],
        quote: 'at the very last second, I found this button right here. It wasn’t very obvious',
      },
      {
        title: 'No clear plan for the first week',
        text: 'People asked for goals, targets and a checklist; the steps felt too general and light on tools.',
        evidence: [['UK', '4/8'], ['PL', '3/5']],
        quote: 'it would be great if there was a week 1 suggestions or to do',
      },
    ],
  },
};

USABILITY.purchase = {
  // E – browsing products
  'P-30': [{
    title: 'Filters don’t apply when selected',
    text: 'Selected filters were not applied, and shoppers did not notice the apply button at the bottom right of the filter panel.',
    evidence: [['PL', 'Observed']],
    quote: 'I’m expecting those filters to be applied … They are not.',
  }],
  'P-31': [{
    title: '“Buy” reads as an instant purchase',
    text: 'The “Buy” (“Kup”) button on product pages and listings made shoppers feel they would commit straight away; they expected “Add to basket”.',
    evidence: [['UK', 'Observed'], ['PL', 'Observed']],
    quote: 'I’m adding to basket. I’m not buying it.',
  }],
  men: [{
    title: 'No clear route to men’s skincare',
    text: 'Men’s skincare sits under different categories, and a shopper could not find it.',
    evidence: [['UK', 'Observed']],
    quote: 'Where is the skincare? I can’t find skincare for men.',
  }],

  // F – Inspiration
  magazine: [{
    title: 'Magazine link didn’t respond',
    text: 'The Magazine link in the Explore (Inspiration) menu did not respond.',
    evidence: [['PT', 'Observed']],
  }],

  // G1 – basket (guest checkout: UK, Poland)
  'P-35': [
    {
      title: 'Added items not recognised as in the basket',
      text: 'Items added automatically are labelled “Recommended by us”, so shoppers took them for suggestions; they also disliked items being added for them, even free ones.',
      evidence: [['UK', '4/10']],
      quote: 'it says we’ve added some items to your basket … but they are not added.',
    },
    {
      title: '“Free gift” items are charged',
      text: 'A magazine and leaflets were added as “Prezent gratis” (free gift), without images, yet cost about 6,7 zł; shoppers who only saw the “free” message assumed they cost nothing. The magazine opened an error page when clicked.',
      evidence: [['PL', '7/10 noticed the charge']],
      quote: 'you say gratis, which is you know, free of charge, but then you charge me',
    },
    {
      title: 'No delivery cost in the basket',
      text: 'The basket shows no delivery cost, and the free-delivery rule is easy to miss: in the UK it applies only to VIP orders over £45.',
      evidence: [['UK', '3/10 expected to pay, 3/10 unsure'], ['PL', '3/10 found no delivery information']],
      quote: 'I don’t know, it isn’t clear from the basket page',
    },
    {
      title: 'Recommended items without a clear button',
      text: 'Some recommended items had no clear Add button; adding one bundle added only part of it.',
      evidence: [['PL', 'Observed']],
    },
  ],

  // G1 – basket (BCM 6.0: Portugal)
  'P-43': [
    {
      title: 'Unclear whether delivery is charged',
      text: 'The basket shows no delivery cost; free delivery applies to selected products, stated only in a banner at the top.',
      evidence: [['PT', '8/10 unsure']],
      quote: 'the subtotal does not mention anything related to delivery being paid',
    },
    {
      title: 'Discount steps and added items hard to read',
      text: 'The discount steps were noticed only after reaching 10%; some added items could not be identified, one had no picture, and a reduced price was not explained.',
      evidence: [['PT', '2/10']],
    },
  ],

  // G2 – checkout (guest checkout: UK, Poland)
  'P-36': [
    {
      title: 'Error after the guest checkout form',
      text: 'After the guest form, shoppers saw “Sorry, something went wrong” and a long code with no explanation; most returned to the basket.',
      evidence: [['UK', '4/8 mentioned it']],
      quote: 'Oh, something went wrong. Kind of. Not my problem.',
    },
    {
      title: 'Guest option not seen',
      text: 'Shoppers did not see that they could buy without an account, and created one because they thought it was the only option.',
      evidence: [['PL', '5/7; 4 created an account']],
      quote: 'I did create new account, huge buttons and UI guided me in that way.',
    },
    {
      title: 'Fields turn red while typing',
      text: 'Fields turned red before shoppers had finished typing, and disabled buttons did not say what was missing.',
      evidence: [['UK', 'Observed'], ['PL', 'Observed']],
    },
  ],
  'P-37': [{
    title: 'Reasons not to create an account',
    text: 'Shoppers avoided an account because of marketing emails and the longer VIP form.',
    evidence: [['UK', '3/10']],
  }],
  'p-38': [{
    title: 'Delivery fee is a surprise',
    text: 'Delivery costs appeared only at checkout: £4.95 for guests on orders over £45 (free delivery is for VIP orders), 17–20 zł in Poland, or free delivery lost after a discount.',
    evidence: [['UK', '2/8 charged'], ['PL', '3/10 surprised']],
    quote: 'The information about the cost of the delivery should be displayed earlier.',
  }],

  // G2 – checkout (BCM 6.0: Portugal, account required)
  'P-44': [
    {
      title: 'Shoppers want a guest option',
      text: 'The account is required with no guest option; shoppers asked for one or an optional account, and one would shop elsewhere. Some realised an account was required only when completing the order.',
      evidence: [['PT', '6/10 asked for it']],
      quote: 'I don’t like creating accounts just to make purchase once so I avoid those websites.',
    },
    {
      title: 'Couldn’t get past the account form',
      text: 'Fields turned red while typing and the button stayed disabled without a reason; some did not realise they had to create a password.',
      evidence: [['PT', '2/10 could not continue']],
      quote: 'the registration does not seem to go through here, which I do not know why',
    },
  ],
};

// "Also observed: check in QA" items from the shopping and checkout report (lower priority).
const QA = (title, text, market, evidence = 'Observed') => ({ title, text, evidence: [[market, evidence]], qa: true });
const addQa = (key, item) => { USABILITY.purchase[key] = [...(USABILITY.purchase[key] || []), item]; };
addQa('P-14', QA('“Moisturisers” lists tablets and wellness packs', 'The moisturiser listing includes tablets and wellness packs.', 'UK'));
addQa('P-35', QA('Newly added product missing from the basket', 'A product that had just been added did not appear in the basket, so the shopper added it again.', 'UK'));
addQa('g-recipient', QA('Few gifts to choose from', '“Gifts for her” had few items to choose from.', 'UK'));
addQa('fr-family', QA('Fragrance family names and listing videos unclear', 'Fragrance family names, and the videos on fragrance listings, were not understood.', 'PL'));
addQa('P-36', QA('Phone-number verification not understood', 'A shopper did not understand the phone-number verification step.', 'PL'));
addQa('P-39', QA('Postcode field and saving the address', 'The postal-code field did not accept input at first, and the address must be saved to continue – one shopper asked why.', 'PL'));
addQa('P-44', QA('“Information from a Brand Partner” checkbox goes unnoticed', 'Only one participant noticed the checkbox for information from a Brand Partner; that participant then received a text message naming a Brand Partner.', 'PT'));

export const USABILITY_OVERVIEW = {
  A1: {
    items: [
      { evidence: [['UK', 'Observed'], ['PL', '6/10'], ['PT', '6/9']], text: 'The account icon opens sign-in only, so people miss the sign-up options.' },
      { evidence: [['UK', '6/10']], text: 'Members hesitated over “VIP” and “Beauty Entrepreneur”.' },
      { evidence: [['UK', '5/10'], ['PL', '4/10']], text: 'Would-be sellers could not tell which option lets them sell.' },
      { evidence: [['PT', '4/9']], text: 'BCM 6.0’s “partner” and “sales” wording made shoppers doubt it was for them.' },
    ],
    general: [
      { evidence: [['PT', 'Observed']], text: 'The small register link at the bottom of the sign-in page was not noticed.' },
    ],
  },
  A2: {
    items: [
      { evidence: [['UK', '8/20']], text: 'The reCAPTCHA repeated or slowed people down.' },
      { evidence: [['UK', 'Observed'], ['PL', '2/10']], text: 'The invite-code field was mistaken for “confirm password”.' },
      { evidence: [['PL', 'Observed']], text: 'Sponsor matching needs an address and can offer the wrong region.' },
      { evidence: [['PT', 'Observed']], text: 'BCM 6.0’s progress bar shows two steps for a three-step form.' },
    ],
    general: [
      { evidence: [['PL', 'Observed']], text: 'Registration steps have no Back option; the browser back button lost details or went to the wrong page.' },
      { evidence: [['PL', '2/10']], text: 'Phone verification showed “wrong format” for valid numbers, and the resend button was disabled with no countdown.' },
      { evidence: [['PT', '4/10']], text: 'Continuing with Google using an email without an Oriflame account dead-ends.' },
    ],
  },
  B: {
    items: [
      { evidence: [['UK', '1/10'], ['PL', '4/9']], text: 'Few new members found their 15% welcome discount.' },
      { evidence: [['UK', '5/10'], ['PL', '5/9'], ['PT', '6/10']], text: 'Members would dislike a seller contacting them.' },
      { evidence: [['UK', '8/10']], text: '“Connect with leaders” opens an empty panel.' },
      { evidence: [['UK', '4/6']], text: '“My business” terms such as leg balance were not understood.' },
    ],
    general: [],
  },
  C: {
    items: [
      { evidence: [['UK', 'Observed'], ['PL', '2/5']], text: 'Onboarding is not seen as the place to start, and “Begin step 1” is found late.' },
      { evidence: [['UK', '4/8'], ['PL', '3/5']], text: 'New Brand Partners had no clear plan for their first week.' },
    ],
    general: [
      { evidence: [['UK', 'Observed']], text: 'The Success plan and Oriflame Academy pages did not load.' },
    ],
  },

  E: {
    items: [
      { evidence: [['UK', 'Observed'], ['PL', 'Observed']], text: '“Buy” (“Kup”) reads as an instant purchase rather than “Add to basket”.' },
      { evidence: [['UK', 'Observed']], text: 'There is no clear route to men’s skincare.' },
      { evidence: [['PL', 'Observed']], text: 'Filters don’t apply when selected.' },
    ],
    general: [
      { evidence: [['PT', 'Observed']], text: 'The Instagram and social-post module did not load; shoppers saw grey boxes and thought something was wrong.' },
      { evidence: [['UK', 'Observed']], text: 'Check in QA: a search for “skincare” showed a deodorant first.' },
    ],
  },
  F: {
    items: [
      { evidence: [['UK', 'Observed'], ['PL', 'Observed']], text: 'Shoppers used the Shop sections rather than the catalogue or Magazine.' },
      { evidence: [['PT', 'Observed']], text: 'The Magazine link in the Explore menu didn’t respond.' },
    ],
    general: [
      { evidence: [['PT', 'Observed']], text: '“Explorar” (Explore) was taken for the shop; shoppers didn’t enter the catalogue and went back to “Loja”.' },
    ],
  },
  G1: {
    items: [
      { evidence: [['UK', '4/10']], text: 'Items added automatically weren’t recognised as being in the basket.' },
      { evidence: [['PL', '7/10']], text: '“Free gift” items were charged about 6,7 zł.' },
      { evidence: [['UK', '6/10'], ['PL', '3/10'], ['PT', '8/10']], text: 'The basket shows no delivery cost, so shoppers expected to pay, weren’t sure or found no information.' },
    ],
    general: [],
  },
  G2: {
    items: [
      { evidence: [['UK', '4/8']], text: 'An error followed the guest checkout form.' },
      { evidence: [['PL', '5/7']], text: 'The guest option wasn’t seen, so shoppers created an account.' },
      { evidence: [['PT', '6/10']], text: 'BCM 6.0 shoppers asked for a guest option; 2/10 couldn’t get past the account form.' },
      { evidence: [['UK', 'Observed'], ['PL', 'Observed'], ['PT', 'Observed']], text: 'Fields turn red while typing, and disabled buttons don’t say what’s missing.' },
    ],
    general: [
      { evidence: [['PL', '3/10']], text: 'A “Premium” 23% discount appeared with no explanation.' },
      { evidence: [['PT', 'Observed']], text: 'The BCM 6.0 upsell step showed the products again and felt like a step back; the delivery step said “Free shipping” next to a €5 charge.' },
      { evidence: [['PT', 'Observed']], text: 'Check in QA: typing an address partly filled the field above it, and the site doesn’t say that delivery is to Portugal only.' },
    ],
  },
};
