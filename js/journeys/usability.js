// Usability testing findings from "Registration-Journeys-Usability-Report-Findings.pptx" (unmoderated think-aloud,
// 10 participants per journey, November 2026): UK and Poland test the existing dual registration, Portugal tests
// BCM 6.0. Only frictions are recorded – things that worked are left out. Counts only, no participant IDs.
//
// USABILITY[journey][ref] lists findings shown with that step's challenges (and counted in its Findings).
// USABILITY_OVERVIEW[area] holds the headline frictions for an Overview area, plus `general` ones that don't
// belong to a single step on the map. `markets` drives the circular flags; `evidence` is a count or "Observed".

export const USABILITY_STUDY = {
  source: 'Usability testing',
  date: 'November 2026',
  note: '10 participants per journey, so counts are directional.',
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
};
