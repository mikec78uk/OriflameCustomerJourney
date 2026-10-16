// Highlight panel content (executive summaries), keyed by journey. Each item's `area` is the letter of the
// shaded area on that journey's canvas (defined in the journey file, whose badge caption matches `title`).
// `body` mixes paragraphs (strings) and bullet lists (arrays); a leading "BCM 6.0:", "Background only:",
// "Still to confirm:" or "To review:" is set in bold.

export const HIGHLIGHTS = {
  registration: [
    {
      area: 'A1',
      title: 'Getting to registration',
      scope: 'Home to the first registration form (R-1 to R-10; BCM 6.0: R-39 to R-40).',
      body: [
        'Before entering any details, visitors must choose a business model. At least four entry points lead to separate, near-identical pages, with content depending on where they clicked.',
        [
          'There is no simple “create an account” option. Two routes use four names: VIP Customer or Member, and Beauty Entrepreneur or Business Owner. Visitors must work out which is free.',
          'An easy-to-misuse country picker, an app-download prompt and search with no sign-up help can pull people off course.',
          'Forms add a reCAPTCHA puzzle. On mobile—which Oriflame says generates most revenue—form controls run off-screen.',
        ],
        'BCM 6.0: From November 2026, test markets get one sign-up page and form, with “register with us” replacing “Brand Partner” on the join page. This resolves most issues at this stage, provided it remains the only entry route. However:',
        [
          'The mobile sign-up button sits below the first screen.',
          'Registration accepts a phone number only.',
          'Removing guest checkout makes checkout a main registration route.',
        ],
      ],
    },
    {
      area: 'A2',
      title: 'Completing registration',
      scope: 'Email verification to the first My Account view (Members R-11 to R-26; Brand Partners R-27 to R-35; BCM 6.0: R-41 to R-46).',
      body: [
        'Registration demands effort before offering value and enrols people in things they have not chosen.',
        [
          'Verification codes are fiddly and, stakeholders say, do not always arrive.',
          'Disabled buttons block progress without explaining errors.',
          'A survey and welcome page delay access to the site.',
          'Everyone gets an assigned seller they cannot choose or decline.',
          '“Sponsor”, “mentor” and “Brand Partner number” appear without explanation.',
          'Loading errors and a hidden welcome discount can affect the first session.',
        ],
        'BCM 6.0: Fewer steps and details simplify registration, but seller assignment remains mandatory, verification is phone-only, and users accept terms twice. Those terms make everyone a Brand Partner without saying so on the page.',
        'Moving registration into checkout makes each of these a checkout issue too.',
      ],
    },
    {
      area: 'B',
      title: 'My Account and dashboards',
      scope: 'Member accounts (R-18 to R-24), Brand Partner accounts (R-35 to R-38), and BCM 6.0 buyer, seller and builder accounts (R-46 to R-50).',
      body: [
        'Members and Brand Partners get different account experiences, but neither explains the network behind them.',
        [
          'Members get a reduced Brand Partner dashboard. Their menus share only “What’s New” and “Settings”.',
          'Members first encounter an assigned leader they did not choose, described in five different ways; an upgrade called “Brand Partner”, “Beauty Entrepreneur” or “Business Owner”; and an unexplained Brand Partner number.',
          'Brand Partner dashboards can error and load only partly on first visit. Assigned partners have no contact details.',
        ],
        'BCM 6.0: One account evolves from buyer to seller to builder, introducing business features and bank details when relevant. However, the move to seller is automatic: one registration through a buyer’s shared link opens the full business menu, before the buyer has earned anything.',
        'Oriflame’s team describes that menu as overloaded and confusing. The notification email starts calling the user a Brand Partner without explaining why. Rewards also need explanation: the dashboards display a 10–25% invite bonus and a 16% or 20% community bonus.',
        'Still to confirm: Which account pages people use; how buyers react to becoming sellers automatically; whether the network treats buyers as recruits from day one.',
      ],
    },
  ],

  training: [
    {
      area: 'C',
      title: 'Brand Partner onboarding',
      scope: 'Logged-in Brand Partners, from the dashboard (R-35) through the three Training steps (O-1 to O-15).',
      body: [
        'Onboarding offers links rather than a guided start. Try, Share and Grow send new Brand Partners across tools, articles and app downloads, with no easy return route. Users must go back through their account and find their place.',
        [
          'The main banner links to the homepage; “Begin step 1” sits at the bottom.',
          'Steps repeat destinations: Step 2 reuses Step 1’s app-download page, and Step 3’s “Join a team” opens the same page as Step 2.',
          'Some tasks end in advice rather than an action. “Create your product story” explains neither what a story is nor how to use it.',
          'Advice to connect with a leader and community “on social media” gives no platform or instructions.',
          'The wellness assessment uses Typeform. Ownership of data entered by Brand Partners or their customers is unclear.',
        ],
        'A redesign is planned from a prototype informed by leaders at conferences. However, the designer and product owner have left, and BCM 6.0 will launch with the current onboarding. If development takes too long, the current version may be patched instead. Leader input also does not replace testing with new Brand Partners.',
        'Still to confirm: How many people start and finish each step; where they go after leaving; who owns assessment data.',
      ],
    },
  ],

  newsletter: [
    {
      area: 'D',
      title: 'Newsletter',
      scope: 'Sign-up, emails and the My Account newsletter section (NL-1 to NL-6).',
      body: [
        'The newsletter is the easiest way to start a relationship with Oriflame, but the journey does little to develop it.',
        [
          'Footer sign-up gives no immediate confirmation. The confirmation email arrives about two hours later, after peak interest.',
          'The logged-in newsletter section has only two articles, with no indication of their age or update frequency.',
          'Members and Brand Partners see different content. One of the two member articles is “Start your side hustle”.',
          'Unsubscribing offers no alternative, such as fewer emails, or a reason to stay.',
        ],
        'Sending frequency is unclear. Results sit in Salesforce Marketing Cloud rather than GA, so opens, clicks and unsubscribes are not yet available to this review. Markets write their own emails, so content varies by country.',
        'Still to confirm: Sending frequency; open, click and unsubscribe rates; how many subscribers later register or buy.',
      ],
    },
  ],

  purchase: [
    {
      area: 'E',
      title: 'Exploring and browsing products',
      scope: 'Menus, product listings and product pages (P-1 to P-29).',
      body: [
        'Browsing suggests parts of the range are poorly maintained, at the point where shoppers decide whether to trust it.',
        [
          '“New in Men” is empty; another page contains one out-of-stock product.',
          'The main Nutrition menu places a single “Glucose Shape” product alongside whole categories.',
          'Some pages are hard to discover. Brands has no menu or listing-page link. A fragrance page that appears to belong within Brands is accessible from a menu banner, but not from Brands itself.',
          'Layouts are inconsistent. Fragrance “shop by mood” pages mix large images and video into product grids, unlike other listings.',
        ],
        'The structure is difficult to maintain: dozens of listing pages use different organising principles—product, benefit, ingredient, mood, goal, age and more—alongside several separate offers pages.',
        'These pages now carry more of the buying journey. Oriflame’s team reports that buying fell after the catalogue left Europe’s top menu; offers were added to the menu in response.',
        'Still to confirm: Traffic and exits by listing page; search versus menu use; add-to-basket rates by page type; the number of empty or entirely out-of-stock pages.',
      ],
    },
    {
      area: 'F',
      title: 'Inspiration, Magazine and beauty tools',
      scope: 'Inspiration, including the Magazine, Insights hub and digital beauty tools.',
      body: [
        'Background only: no audit observations have been recorded yet.',
        'The Magazine replaced the catalogue and, according to Oriflame’s team, still contains around 150 pages of shoppable products. It is no longer in the top menu—a change the team links to reduced buying in Europe. India has retained the catalogue.',
        'The journey map also shows “Digital tools & news” taking users to an external website (P-27), away from shopping.',
        'If former catalogue shoppers now buy through the Magazine, it needs to be as easy to find and shop as product listings. Beauty tools, such as skin diagnosis, also need a clear route back to products.',
        'To review: How users find the Magazine; whether they can add to basket from it; how visits convert to orders compared with the old catalogue; where beauty tools live and whether users return from them.',
      ],
    },
    {
      area: 'G1',
      title: 'Basket',
      scope: 'Adding products from sample listing and product pages, the mini basket and basket (P-30 to P-35).',
      body: [
        'Background only: no audit observations have been recorded yet.',
        'The mapped example covers a listing page, a product page, two catalogue pages, the mini basket and basket. Stakeholders reported three issues from an earlier review:',
        [
          'Free items and a catalogue appeared without clear pricing. Some of this was fixed at the time.',
          'Layered discounts made it hard to understand what users were paying for.',
          'A single free-delivery threshold is easier for bulk-buying Brand Partners to reach than consumers.',
        ],
        'BCM 6.0: A new “spend more to unlock a discount” basket offer joins the existing “spend more to unlock a special product” offer. Checkout also displays a commission percentage.',
        'To review: Labelling and pricing of free items and catalogues; explanations of discounts and the delivery threshold; how first-time buyers understand the new unlock offer; drop-off between mini basket, basket and checkout.',
      ],
    },
    {
      area: 'G2',
      title: 'Checkout',
      scope: '“Your details” to order confirmation, including BCM 6.0 registration (P-36 to P-46).',
      body: [
        'Checkout has a payment-recovery failure today and a registration risk under BCM 6.0.',
        [
          'Failed payments: Guests whose payment is refused receive an email linking to sign-in for an account they never created (P-46), leaving them no way to complete the purchase.',
          'Registration in checkout: BCM 6.0 removes guest checkout, so every first-time buyer must register. This step (P-44) does not mark email as required, although confirmations are emailed. It is also unclear whether a phone number is mandatory. If it is, as in BCM 6.0 sign-up, shoppers unwilling to provide one cannot buy, and others depend on an SMS code arriving.',
        ],
        'Removing guest checkout may have less impact than expected. Oriflame’s UX team says it previously added no revenue because existing members mainly used it to avoid signing in. However, its removal makes checkout depend on successful registration.',
        'Still to confirm: Payment failure and recovery rates; drop-off at each checkout step; and the current share of UK guest orders.',
      ],
    },
  ],
};
