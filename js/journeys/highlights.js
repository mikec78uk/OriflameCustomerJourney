// Highlight panel content (executive summaries), keyed by journey. Each item's `area` is the letter of the
// shaded area on that journey's canvas (defined in the journey file). `body` mixes paragraphs (strings)
// and bullet lists (arrays).

export const HIGHLIGHTS = {
  registration: [
    {
      area: 'A1',
      title: 'Executive summary',
      scope: 'Home to the first registration form (R-1 to R-10; BCM 6.0: R-39 to R-40).',
      body: [
        'Before anyone enters a detail, Oriflame asks them to choose a business model. Visitors reach registration through at least four entry points that lead to separate, near-identical pages, and what they see depends on where they clicked. There’s no plain “create an account”. People choose between two routes that go by four names (VIP Customer or Member, Beauty Entrepreneur or Business Owner), and they have to work out which one is free. On the way, three things pull them off course: a country picker that’s easy to get wrong, an app-download prompt, and a search with no sign-up help. The forms then add a reCAPTCHA puzzle. On mobile, which Oriflame says brings most of its revenue, the form controls run off the screen.',
        'BCM 6.0 reaches test markets from November 2026. It replaces the competing routes with one sign-up page and form, and the join page says “register with us” rather than “Brand Partner”. That fixes most of this stage, as long as it stays the only way in. It also brings new issues:',
        [
          'The sign-up button sits below the first screen on mobile.',
          'Registration accepts a phone number only.',
          'With guest checkout gone, checkout becomes a main way in.',
        ],
      ],
    },
    {
      area: 'A2',
      title: 'Executive summary',
      scope: 'Registration from email verification to the first view of My Account (Members R-11 to R-26; Brand Partners R-27 to R-35; BCM 6.0: R-41 to R-46).',
      body: [
        'Once people start registering, the process asks for effort before it gives anything back, and signs them up to things they didn’t choose. Verification codes are fiddly and, according to stakeholders, don’t always arrive. Forms block progress with disabled buttons instead of explaining errors, and a survey and a welcome page stand between users and the site. Along the way, every registrant is assigned a seller they can’t choose or decline. They also meet terms like “sponsor”, “mentor” and “Brand Partner number” that nobody explains. The first session can then bring loading errors and a hidden welcome discount.',
        'BCM 6.0 trims the steps and asks for fewer details. But it still has problems:',
        [
          'Seller assignment stays mandatory.',
          'Verification is by phone only.',
          'Users accept the terms twice.',
          'The terms make every registrant a Brand Partner without saying so on the page.',
        ],
        'Because registration moves inside checkout, every issue here also becomes a checkout issue.',
      ],
    },
    {
      area: 'B',
      title: 'Executive summary',
      scope: 'My Account & Dashboard (R-18 to R-24) and Brand Partners (R-35 to R-38), and the BCM 6.0 buyer, seller and builder accounts (R-46 to R-50).',
      body: [
        'Today’s account is two different products, and neither explains the network it’s built around. Members get a cut-down version of the Brand Partner dashboard; the two menus share only “What’s New” and “Settings”. The member account is where people first meet the network: a leader they didn’t choose, called five different things; an upgrade offered as “Brand Partner”, “Beauty Entrepreneur” or “Business Owner”; and a Brand Partner number nobody explains.',
        'Brand Partners land on a dashboard that errors and only partly loads on first visit, and their assigned partner has no contact details.',
        'BCM 6.0 gets the principle right, but the change from buyer to seller needs work. One account changes as people progress from buyer to seller to builder, so business features and bank details only appear when they’re relevant. But the move to seller is automatic. It happens as soon as one person registers through a link the buyer shared, before they’ve earned anything, and it opens the full business menu at once.',
        'Oriflame’s own team calls that menu overloaded and confusing. The email announcing the change starts calling the user a Brand Partner without saying why. The new dashboards also show a rewards model (10–25% invite bonus, 16% or 20% community bonus) that needs explaining, not just displaying.',
        'Still to confirm: which account pages people actually use; how buyers react to becoming sellers without choosing to; whether the network treats new buyers as recruits from day one.',
      ],
    },
  ],

  training: [
    {
      area: 'C',
      title: 'Executive summary',
      scope: 'Onboarding for logged-in Brand Partners, from the dashboard (R-35) through the three Training steps (O-1 to O-15).',
      body: [
        'Onboarding is a list of links, not a guided start. The three steps (Try, Share, Grow) send new Brand Partners to tools, articles and app downloads around the site. There’s no easy way back: each time, they have to return through their account and find their place. The main banner points to the homepage, while “Begin step 1” sits at the bottom of the page. Steps repeat each other: Step 2 sends people to Step 1’s app-download page again, and Step 3’s “Join a team” opens the same page as Step 2. Some tasks end in written advice rather than something to do. “Create your product story” never explains what a story is or how to use it. The page encourages connecting with a leader and community “on social media” but doesn’t say how or where. The wellness assessment runs on a third-party tool (Typeform), and it’s unclear who controls the data Brand Partners, or their customers, put into it.',
        'A redesign is planned, based on a prototype with input from leaders at conferences. But the designer and product owner who ran onboarding have left, and BCM 6.0 launches with the current version. If the new one takes long to build, the current one may be patched rather than replaced. Also, input from leaders isn’t the same as testing with new Brand Partners, who this is for.',
        'Still to confirm: how many new Brand Partners start and finish each step; where they go when they leave; who owns the assessment data.',
      ],
    },
  ],

  newsletter: [
    {
      area: 'D',
      title: 'Executive summary',
      scope: 'Newsletter sign-up, emails and the newsletter section in My Account (NL-1 to NL-6).',
      body: [
        'The newsletter is the easiest way for someone to start a relationship with Oriflame, and the journey doesn’t build on it. Signing up from the homepage footer gives no immediate confirmation. The confirmation email arrives about two hours later, after the moment of highest interest has passed. Logged-in users find a newsletter section with only two articles and no sign of how current they are or how often they change. For members, one of the two is a “Start your side hustle” piece. Members and Brand Partners see different content. When people unsubscribe, nothing is offered to keep them, such as fewer emails or a reason to stay.',
        'It’s unclear how often the newsletter is sent. Email results sit in Salesforce Marketing Cloud rather than GA, so we can’t yet see opens, clicks or unsubscribes. Markets also write their own emails, so content varies by country.',
        'Still to confirm: how often it’s sent; open, click and unsubscribe rates; how many subscribers go on to register or buy.',
      ],
    },
  ],

  purchase: [
    {
      area: 'E',
      title: 'Executive summary',
      scope: 'Explore and Browse Products from the menu to product listing and product pages (P-1 to P-29).',
      body: [
        'Browsing shows signs that the range isn’t being looked after, right where shoppers decide whether to trust it.',
        [
          '“New in Men” has no products, and one page features a single product that’s out of stock.',
          'A single “Glucose Shape” product page is linked straight from the main Nutrition menu, next to whole categories.',
          'Some pages can only be found by chance. The Brands page isn’t linked from the menu or any listing page. A fragrance page that looks like part of Brands can be reached from a menu banner but not from Brands itself.',
          'Layouts vary: the fragrance “shop by mood” pages mix large images and video into the product grid, unlike other listing pages.',
        ],
        'The scale makes this hard to keep on top of. The menu leads to dozens of listing pages, each category is organised differently (by product, benefit, ingredient, mood, goal, age and more), and there are several separate offers pages.',
        'This matters more now. Oriflame’s team told us that after the catalogue left the top menu in Europe, buying dropped, and offers were added to the top menu in response. These pages now carry more of the buying journey.',
        'Still to confirm: traffic and exit rates by listing page; how much shoppers use search versus the menu; add-to-basket rates by page type; how many pages are empty or out of stock across the range.',
      ],
    },
    {
      area: 'F',
      title: 'Executive summary',
      scope: 'The Inspiration section, including the Magazine, the Insights hub and digital beauty tools.',
      body: [
        'We haven’t recorded audit observations for this area yet, so this summary gives background, not findings.',
        'The Magazine replaced the catalogue and, according to Oriflame’s team, still runs to about 150 pages of products you can buy. But it’s no longer a top-menu item, and the team links that change to a drop in buying in Europe. India has kept the catalogue. The map also shows “Digital tools & news” sending users to an external website (P-27), out of the shopping journey.',
        'If the Magazine is now where former catalogue shoppers buy, it needs to be as easy to find and shop as the listing pages. Beauty tools such as skin diagnosis also need a clear route back to products.',
        'To review: how people find the Magazine without a top-menu link; whether they can add to basket from it; how Magazine visits turn into orders compared with the old catalogue; where the beauty tools live and whether users come back from them.',
      ],
    },
    {
      area: 'G1',
      title: 'Executive summary',
      scope: 'Basket. Adding products to the basket from the sample listing and product pages, the mini basket and the basket (P-30 to P-35).',
      body: [
        'We haven’t recorded audit observations for this area yet, so this summary gives background, not findings.',
        'The mapped example covers a listing page, a product page, two catalogue pages, the mini basket and the basket. Stakeholders told us about basket problems found in an earlier review:',
        [
          'Free items and a catalogue appeared in the basket without making clear whether they cost anything. Some of this was fixed at the time.',
          'Discounts were layered so heavily that it was hard to tell what you were paying for.',
          'There’s one free-delivery threshold for everyone. Brand Partners buying in bulk reach it easily; consumers find it harder.',
        ],
        'BCM 6.0 adds a “spend more to unlock a discount” offer to the basket and shows a commission percentage at checkout. This is an addition to the already existing “spend more to unlock a special product”.',
        'To review: whether free items and catalogues in the basket are clearly labelled and priced; how discounts and the delivery threshold are explained; how the new unlock offer reads to a first-time buyer; drop-off between mini basket, basket and checkout.',
      ],
    },
    {
      area: 'G2',
      title: 'Executive summary',
      scope: 'Checkout from “Your details” to order confirmation, including the BCM 6.0 registration step (P-36 to P-46).',
      body: [
        'Checkout fails at the two moments that matter most: when a payment fails, and, under BCM 6.0, when a first-time buyer has to register.',
        [
          'Failed payments: today, if a guest’s payment is refused, Oriflame emails them, but the email’s button leads to a sign-in page for an account they never created (P-46). Someone who was ready to pay has no way to finish.',
          'Registering in checkout: BCM 6.0 removes guest checkout, so every first-time buyer registers inside checkout. That step (P-44) doesn’t mark email as required, even though order confirmations go by email. It’s also unclear whether people can register without a phone number. If they can’t, as in the BCM 6.0 sign-up, shoppers who won’t give a number can’t buy, and everyone else depends on an SMS code arriving.',
        ],
        'Removing guest checkout may cost less than it looks. Oriflame’s UX team told us it added no revenue when it was offered before, because existing members mostly used it to skip signing in. But removing it means all the risk now sits on that registration step.',
        'Still to confirm: how often payments fail and how many are recovered; drop-off at each checkout step; and the share of UK orders placed as guest today.',
      ],
    },
  ],
};
