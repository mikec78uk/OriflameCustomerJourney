// Journey audit (expert review) findings, attached to the steps they are about. The source is the executive
// summaries in highlights.js (Overview areas A1–H); this file breaks them down to step level so a page shows the
// issues that apply to it. Findings that can't be pinned to a single step stay in the Overview only.
//
// AUDIT[journey][ref or step id] → [{ area, title, text, basis? }]. `basis: 'stakeholder'` marks issues
// stakeholders reported from an earlier review (area G1), rather than ones observed in this audit.
//
// REVIEWED[journey](node) says whether a step is inside the audit's scope, so a step with no findings can show
// "No issues recorded" (reviewed) rather than "Not yet reviewed".

export const AUDIT = {
  registration: {
    // A1 – getting to registration
    'R-1': [{
      area: 'A1', title: 'Country picker is easy to get wrong',
      text: 'The global landing page asks visitors to pick a country first, and it is easy to choose the wrong one, pulling people off course before they reach registration.',
    }],
    'R-2': [{
      area: 'A1', title: 'Several near-identical ways in',
      text: 'At least four entry points lead to separate, near-identical pages, and what visitors see depends on where they clicked.',
    }],
    'R-3': [{
      area: 'A1', title: 'A business model must be chosen before any details',
      text: 'There is no simple “create an account”. Visitors must choose between two routes that use four names (VIP Customer or Member, Beauty Entrepreneur or Business Owner) and work out for themselves which one is free.',
    }],
    'R-6': [{
      area: 'A1', title: 'reCAPTCHA puzzle, and controls off-screen on mobile',
      text: 'The registration form adds a reCAPTCHA puzzle, and on mobile – which Oriflame says brings most of its revenue – the form controls run off the screen.',
    }],
    'R-8': [{
      area: 'A1', title: 'reCAPTCHA puzzle, and controls off-screen on mobile',
      text: 'The registration form adds a reCAPTCHA puzzle, and on mobile – which Oriflame says brings most of its revenue – the form controls run off the screen.',
    }],
    'R-9': [{
      area: 'A1', title: 'Search gives no sign-up help',
      text: 'Searching for sign-up, register or account returns no help to get started, so it pulls people off course instead of leading them to registration.',
    }],
    'R-39': [{
      area: 'A1', title: 'Sign-up button below the first screen on mobile',
      text: 'BCM 6.0 replaces the competing routes with one sign-up page, but on mobile its sign-up button sits below the first screen.',
    }],
    'R-41': [{
      area: 'A1', title: 'Phone number only',
      text: 'BCM 6.0 registration accepts a phone number only, so people without one, or unwilling to give it, cannot register.',
    }],

    // A2 – completing registration
    'R-12': [{
      area: 'A2', title: 'Verification codes are fiddly and may not arrive',
      text: 'Entering the verification code is fiddly and, according to stakeholders, the code does not always arrive.',
    }],
    'R-28': [{
      area: 'A2', title: 'Verification codes are fiddly and may not arrive',
      text: 'Entering the verification code is fiddly and, according to stakeholders, the code does not always arrive.',
    }],
    'R-13': [{
      area: 'A2', title: 'Disabled buttons instead of error messages',
      text: 'The form blocks progress with a disabled button rather than explaining which field needs attention.',
    }],
    'R-29': [{
      area: 'A2', title: 'Disabled buttons instead of error messages',
      text: 'The form blocks progress with a disabled button rather than explaining which field needs attention.',
    }],
    'R-15': [{
      area: 'A2', title: 'Survey delays access to the site',
      text: 'A survey stands between the new member and the site, asking for effort before anything is given back.',
    }],
    'R-32': [{
      area: 'A2', title: 'Survey delays access to the site',
      text: 'A survey stands between the new Brand Partner and the site, asking for effort before anything is given back.',
    }],
    'R-16': [{
      area: 'A2', title: 'Welcome page delays access to the site',
      text: 'A welcome page is another step before the site; the first session can then bring loading errors.',
    }],
    'R-33': [{
      area: 'A2', title: 'Welcome page delays access to the site',
      text: 'A congratulations page is another step before the account, adding effort before value.',
    }],
    'R-30': [{
      area: 'A2', title: 'A seller is assigned that can’t be chosen or declined',
      text: 'Every registrant is assigned a seller they cannot choose or decline, which signs them up to something they didn’t choose.',
    }],
    'R-18': [{
      area: 'A2', title: 'Welcome discount is hidden',
      text: 'The first session hides the welcome discount, so new members don’t see the benefit they were promised.',
    }],

    // B – My Account and dashboards
    'R-19': [{
      area: 'B', title: 'A reduced Brand Partner dashboard',
      text: 'Members get a cut-down version of the Brand Partner dashboard; the two menus share only “What’s New” and “Settings”, and neither explains the network the account is built around.',
    }],
    'R-20': [{
      area: 'B', title: 'An assigned leader, called five different things',
      text: 'This is where members first meet a leader they didn’t choose, described in five different ways (sponsor, mentor, leader and more), with nothing explaining who they are.',
    }],
    'R-21': [{
      area: 'B', title: 'The upgrade goes by three names',
      text: 'The upgrade is offered as “Brand Partner”, “Beauty Entrepreneur” or “Business Owner”, without saying these are the same thing.',
    }],
    'R-24': [{
      area: 'B', title: 'Brand Partner number is never explained',
      text: 'Members see a “Brand Partner number” on their profile with no explanation of what it is, why a shopper has one or what it is for.',
    }],
    'R-35': [{
      area: 'B', title: 'Dashboard errors, and the assigned partner has no contact details',
      text: 'New Brand Partners land on a dashboard that errors and only partly loads on the first visit, and their assigned partner shows no contact details.',
    }],
    'R-47': [{
      area: 'B', title: 'Called a Brand Partner without explanation',
      text: 'The email announcing the move to seller starts calling the user a Brand Partner without saying why.',
    }],
    'R-49': [
      {
        area: 'B', title: 'Becoming a seller is automatic',
        text: 'A buyer becomes a seller as soon as one person registers through a link they shared – before they have earned anything – and the full business menu opens at once.',
      },
      {
        area: 'B', title: 'Business menu overloaded; rewards shown but not explained',
        text: 'Oriflame’s own team calls the menu overloaded and confusing, and the dashboard displays a 10–25% invite bonus without explaining how it works.',
      },
    ],
    'R-50': [{
      area: 'B', title: 'Rewards model shown but not explained',
      text: 'The builder dashboard displays a 16% or 20% community bonus that needs explaining, not just displaying.',
    }],
  },

  training: {
    'O-1': [{
      area: 'C', title: '“Connect on social media” with no how or where',
      text: 'The page encourages connecting with a leader and the community “on social media” but doesn’t say how or where.',
    }],
    'O-2': [
      {
        area: 'C', title: 'A list of links, not a guided start',
        text: 'Onboarding sends new Brand Partners to tools, articles and app downloads around the site with no easy way back; each time they must return through their account and find their place.',
      },
      {
        area: 'C', title: 'Main banner points away from the steps',
        text: 'The main banner links to the homepage, while “Begin step 1” sits at the bottom of the page.',
      },
    ],
    'O-5': [{
      area: 'C', title: 'Steps repeat each other',
      text: 'Step 2 sends people back to Step 1’s app-download page.',
    }],
    'O-11': [{
      area: 'C', title: 'Steps repeat each other',
      text: 'Step 3’s “Join a team” opens the same page as Step 2.',
    }],
    'O-8': [{
      area: 'C', title: 'Advice instead of something to do',
      text: '“Create your product story” never explains what a story is or how to use it, so the task ends in written advice rather than an action.',
    }],
    'O-7': [{
      area: 'C', title: 'Third-party tool with unclear data ownership',
      text: 'The wellness assessment runs on Typeform, and it is unclear who controls the data Brand Partners or their customers put into it.',
    }],
  },

  newsletter: {
    'NL-1': [{
      area: 'D', title: 'Interest fades before the confirmation arrives',
      text: 'The newsletter is the easiest way to start a relationship with Oriflame, but the confirmation email arrives about two hours after sign-up, after the moment of highest interest has passed.',
    }],
    'NL-3': [{
      area: 'D', title: 'Only two articles, with no sign of how current they are',
      text: 'The logged-in newsletter section shows only two articles, with no indication of their age or how often they change.',
    }],
    'NL-6': [{
      area: 'D', title: 'Only two articles, with no sign of how current they are',
      text: 'The Brand Partner newsletter section shows only two articles, with no indication of their age or how often they change; Members and Brand Partners see different content.',
    }],
    'NL-4.1': [{
      area: 'D', title: 'A side-hustle article for shoppers',
      text: 'One of the two articles members see is “Start your side hustle”, which pushes the business opportunity to people who signed up to shop.',
    }],
    'NL-5': [{
      area: 'D', title: 'Nothing offered to keep subscribers',
      text: 'Unsubscribing offers no alternative, such as fewer emails, or a reason to stay.',
    }],
  },

  purchase: {
    // E – browsing products
    'P-12': [{
      area: 'E', title: 'Empty page',
      text: '“New in Men” has no products, at the point where shoppers decide whether to trust the range.',
    }],
    'P-26': [{
      area: 'E', title: 'A single product in the main menu',
      text: 'A single “Glucose Shape” product page is linked straight from the main Nutrition menu, next to whole categories.',
    }],
    'P-22': [{
      area: 'E', title: 'Brands page can only be found by chance',
      text: 'The Brands page isn’t linked from the menu or any listing page.',
    }],
    'P-23': [{
      area: 'E', title: 'Reachable from a banner, not from Brands',
      text: 'This fragrance page looks like part of Brands but can only be reached from a menu banner, not from the Brands page itself.',
    }],
    ...Object.fromEntries(['P-19', 'P-20', 'P-21'].map((ref) => [ref, [{
      area: 'E', title: 'Inconsistent listing layout',
      text: 'The fragrance “shop by mood” pages mix large images and video into the product grid, unlike other listing pages.',
    }]])),
    'P-2': [{
      area: 'E', title: 'Offers now carry more of the buying journey',
      text: 'After the catalogue left the top menu in Europe, buying dropped and offers were added to the top menu – but there are several separate offers pages to keep on top of.',
    }],

    // F – Inspiration
    magazine: [{
      area: 'F', title: 'The Magazine is no longer in the top menu',
      text: 'The Magazine replaced the catalogue and still runs to about 150 pages of products you can buy, but it is no longer a top-menu item; Oriflame’s team links that change to a drop in buying in Europe.',
    }],
    'P-27': [{
      area: 'F', title: 'Sends shoppers to an external website',
      text: '“Digital tools & news” takes users to an external website, out of the shopping journey.',
    }],

    // G1 – basket (issues stakeholders reported from an earlier review)
    'P-35': [
      {
        area: 'G1', basis: 'stakeholder', title: 'Free items without clear pricing',
        text: 'Free items and a catalogue appeared in the basket without making clear whether they cost anything. Some of this was fixed at the time.',
      },
      {
        area: 'G1', basis: 'stakeholder', title: 'Layered discounts',
        text: 'Discounts were layered so heavily that it was hard to tell what you were paying for.',
      },
      {
        area: 'G1', basis: 'stakeholder', title: 'One free-delivery threshold for everyone',
        text: 'Brand Partners buying in bulk reach the free-delivery threshold easily; consumers find it harder.',
      },
    ],
    'P-43': [{
      area: 'G1', title: 'Another “spend more” offer, and a commission percentage',
      text: 'BCM 6.0 adds a “spend more to unlock a discount” offer to the existing “spend more to unlock a special product”, and shows a commission percentage at checkout.',
    }],

    // G2 – checkout
    'P-46': [{
      area: 'G2', title: 'Dead end: the email leads to a sign-in for an account the guest never created',
      text: 'When a guest’s payment is refused, Oriflame emails them, but the email’s button leads to a sign-in page for an account they never created. Someone who was ready to pay has no way to finish.',
    }],
    'P-44': [{
      area: 'G2', title: 'Email not marked as required; phone requirement unclear',
      text: 'BCM 6.0 removes guest checkout, so every first-time buyer registers here. The step doesn’t mark email as required, although order confirmations go by email, and it is unclear whether a phone number is mandatory – if it is, shoppers who won’t give one can’t buy and everyone else depends on an SMS code arriving.',
    }],
  },

  subscription: {
    'S-2': [{
      area: 'H', title: '“Add to bag” is far from the subscription choice',
      text: 'On desktop, “Add to bag” sits at the bottom of the page, away from the one-time / Subscribe & Save choice.',
    }],
    'S-6': [{
      area: 'H', title: 'Free-shipping prompt looks as if it already applies',
      text: 'The prompt to add a product for free shipping reads as though free shipping already applies to the order.',
    }],
    'S-10': [{
      area: 'H', title: 'Order detail instead of a confirmation, barely mentioning the subscription',
      text: 'After payment, customers land on an order detail page rather than a confirmation. “Recurring payment” under Payment doesn’t explain whether the whole order repeats or just the subscribed item, and what later deliveries will cost is never stated.',
    }],
    'S-13': [{
      area: 'H', title: 'Doesn’t explain future costs',
      text: 'The subscription email only links elsewhere and doesn’t explain whether later deliveries are free, so customers can’t resolve this without leaving checkout.',
    }],
  },
};

// Steps inside the journey audit's scope (Overview areas A1–H).
export const REVIEWED = {
  registration: (n) => /^R-\d+$/.test(n.ref || ''), // R-1 … R-50; the CRM emails (E-, P-) were not audited
  training: () => true, // R-35 and O-1 … O-15
  newsletter: (n) => !/^NL-(7|8)$/.test(n.ref || ''), // NL-1 … NL-6 and the account pages; NL-7/NL-8 are CRM emails
  purchase: (n) => !/^CRM-/.test(n.ref || ''), // site pages and menus (E, F, G1, G2); CRM journeys were not audited
  subscription: () => true, // S-1 … S-13
  crm: () => false,
};
