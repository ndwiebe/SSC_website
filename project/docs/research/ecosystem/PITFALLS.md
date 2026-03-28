# Domain Pitfalls

**Domain:** Sports card dealer business platform website
**Researched:** 2026-03-27

## Critical Pitfalls

Mistakes that cause rewrites, lost credibility, or wasted months.

### Pitfall 1: Building a Product When You Need a Marketing Site
**What goes wrong:** Engineering effort goes into building features (card scanning, inventory tools, pricing calculators) on the website instead of shipping the marketing story that sells the products that already exist.
**Why it happens:** Developer instinct to build. It feels productive to code features. Writing compelling copy and designing landing pages feels less "real."
**Consequences:** SST and DMC don't get the traffic they need. The website becomes a half-baked tool instead of a polished storefront. Months of engineering with no revenue impact.
**Prevention:** Hard rule: the website MARKETS products. It does NOT replicate them. Every feature decision should pass the test: "Does this drive signups for SST, DMC, or Tax Ready?" If no, don't build it.
**Detection:** If you're writing API integrations or database schemas for the website, you've crossed the line.

### Pitfall 2: Underselling the CPA Positioning
**What goes wrong:** The website looks and reads like every other card tool landing page. The CPA + collector angle gets buried in a sidebar or footer "About" section instead of being the headline.
**Why it happens:** Imposter syndrome. "Who cares that I'm a CPA?" Dealers care. Enormously. Tax anxiety is one of the top 3 pain points in every online discussion.
**Consequences:** You become another tool in a crowded market instead of the ONLY CPA-run card dealer platform. The moat disappears.
**Prevention:** Nathan's CPA credential and collector identity should be on the homepage hero, not the about page. "Built by a CPA who collects hockey cards" is the first thing visitors should read.
**Detection:** If a friend visits the site and can't tell you're a CPA within 5 seconds, the positioning is buried.

### Pitfall 3: Launching Without Content
**What goes wrong:** Beautiful website ships with zero blog posts, no Tax Playbook, no newsletter. It's a brochure with nothing to come back for.
**Why it happens:** Content takes time. It's tempting to ship the site first and "add content later."
**Consequences:** No SEO. No reason for return visits. No email list growth. The site is a dead end that only works when you manually send someone the URL.
**Prevention:** Launch with at minimum 3 blog posts and the Tax Playbook download. Content is not a Phase 2 feature -- it's the engine that makes the website work.
**Detection:** Google Search Console shows zero impressions after 30 days = no content is working.

### Pitfall 4: Making Tax Claims Without Proper Disclaimers
**What goes wrong:** Blog posts or the Tax Playbook make specific tax recommendations without appropriate professional disclaimers. A reader follows advice, gets audited, blames you.
**Why it happens:** Nathan IS a CPA and knows this stuff. The line between "educational content" and "professional advice" is easy to cross in casual writing.
**Consequences:** Professional liability. CPA regulatory issues. Reputational damage. Potential lawsuits.
**Prevention:** Every tax-related page includes a standard disclaimer: "This is educational content, not professional advice. Consult a qualified tax professional for your specific situation." Nathan should also clarify his jurisdiction (Canadian CPA -- not licensed to provide US tax advice).
**Detection:** Have a fellow CPA or lawyer review tax content before publication.

### Pitfall 5: Ignoring the Canadian-First Strategy
**What goes wrong:** Website content and positioning default to US-centric language (IRS, 1099-K, Schedule C) because that's where most online card content comes from.
**Why it happens:** The US market is bigger. Most research sources are American. It's easy to unconsciously write for an American audience.
**Consequences:** Canadian dealers -- your actual initial target market -- feel ignored. US dealers see yet another generic tax resource. You lose the niche positioning that makes Slab Savvy unique.
**Prevention:** Every piece of content should lead with Canadian context (CRA, GST/HST, T4A, personal-use property rules). US equivalents can be mentioned as secondary. The Tax Playbook should be explicitly "The Canadian Card Dealer Tax Playbook."
**Detection:** Ctrl+F for "IRS" on the website. If it appears more than "CRA," the targeting is wrong.

## Moderate Pitfalls

### Pitfall 6: Over-Engineering the Design System Before Shipping
**What goes wrong:** Weeks spent perfecting animations, micro-interactions, and component libraries before the first page is live.
**Prevention:** Ship a clean, functional site first. The Antimetal-style hero animation is impressive but not required for launch. A static hero with good copy converts better than a broken animation. Add polish in iterations.

### Pitfall 7: Pricing Transparency Gone Wrong
**What goes wrong:** Showing SST pricing on the website that conflicts with what's on Telegram, or pricing that changes without updating the website.
**Prevention:** SST pricing should link to or mirror the official pricing, not duplicate it. Consider "Starting at $19 CAD/mo" with a "See full pricing" link rather than maintaining a full pricing table in two places.

### Pitfall 8: Hero Animation Performance on Mobile
**What goes wrong:** The Antimetal-style card scroll animation destroys mobile performance. 15fps on older Android phones. Battery drain.
**Prevention:** Progressive enhancement. Mobile gets a simplified version (static image with subtle CSS animation). Full WebGL/canvas animation only on desktop with capable GPUs. Test on a $200 Android phone, not just an iPhone 15.

### Pitfall 9: Newsletter Without a Content Calendar
**What goes wrong:** Newsletter launched with enthusiasm. First 3 issues are great. Then 6 weeks of silence. Subscribers forget who you are.
**Prevention:** Before launching the newsletter, have 8 weeks of content planned. Even simple "3 tax tips + 1 market observation + 1 product update" format is fine. Consistency > quality for early newsletters.

### Pitfall 10: Competing with Free Tools
**What goes wrong:** Building features that free tools already do well (comp search, eBay fee calculator, card scanning). Visitors use the free feature and leave.
**Prevention:** Don't replicate 130point, figoca, or CollX on the website. Link to them as resources. Position Slab Savvy as "the business platform that connects all these tools" rather than replacing them.

### Pitfall 11: Not Tracking the Right Metrics
**What goes wrong:** Celebrating page views when what matters is SST free trials started, Tax Playbook downloads, and newsletter signups.
**Prevention:** PostHog custom events for: (1) SST CTA clicks, (2) DMC CTA clicks, (3) Tax Playbook downloads, (4) newsletter signups, (5) contact form submissions. Vanity metrics (page views, time on site) are secondary.

## Minor Pitfalls

### Pitfall 12: Stock Photos of Cards
**What goes wrong:** Website uses generic stock photos of baseball cards instead of real cards from Nathan's collection.
**Prevention:** Use Nathan's actual cards. Enhanced by DMC. This IS the product demo. Stock photos of Babe Ruth cards look fake and generic.

### Pitfall 13: Forgetting About Card Show Context
**What goes wrong:** Website optimized for desktop browsing but dealers most often visit while standing at a card show, on their phone, with one hand holding a stack of cards.
**Prevention:** Test every page at 375px width with one thumb. CTAs must be reachable without stretching. Phone numbers should be tap-to-call. SST Telegram link should open directly in the Telegram app.

### Pitfall 14: SEO Meta Tags Missing or Generic
**What goes wrong:** Pages have default Next.js meta titles like "Create Next App" or generic descriptions.
**Prevention:** Every page gets a unique title, description, and Open Graph image. Blog posts get structured data (Article schema). Product pages get Product schema with pricing.

### Pitfall 15: Not Setting Up Google Search Console and Analytics Day One
**What goes wrong:** Site is live for weeks before anyone realizes it's not indexed by Google.
**Prevention:** Submit sitemap to Google Search Console on launch day. Verify the domain. Set up PostHog from day one.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Foundation / Design | Over-engineering animations before shipping content | Ship functional site first, add polish in sprints |
| Product Pages | Building features instead of marketing pages | Hard rule: no APIs, no databases on the website |
| Blog / Content | Defaulting to US-centric tax content | Lead every article with Canadian context, add US as secondary |
| Tax Playbook | Making specific tax recommendations without disclaimers | Standard disclaimer on every tax page, CPA review before publish |
| Newsletter | Starting without a content pipeline | Plan 8 weeks of content before launching the newsletter |
| SST Integration | Duplicating SST pricing that drifts out of sync | Dynamic pricing or "starting at" with link to source of truth |
| Mobile | Hero animation killing mobile performance | Progressive enhancement, test on budget Android device |
| Launch | No content, no SEO, dead-end brochure | Minimum 3 blog posts + Tax Playbook at launch |
| Analytics | Tracking vanity metrics instead of conversions | PostHog custom events for product CTAs and lead captures |

## Domain-Specific Regulatory Warnings

### CPA Professional Standards
- Nathan should identify his CPA jurisdiction (Canadian, which province)
- Content about US tax should explicitly disclaim that Nathan is not a US CPA
- Tax Playbook should state it's educational, not a substitute for professional advice
- Any client testimonials must comply with CPA advertising rules in Nathan's province

### CRA / Tax Content
- GST/HST registration threshold: $30,000 in four consecutive quarters
- Hobby vs. business classification is fact-specific -- don't present rules as black and white
- Personal-use property rules for collectibles (ACB > $1,000 threshold)
- Card dealing as business income vs. capital gains -- the CRA looks at frequency, effort, and profit intent
- Tax content should be dated and include "as of [year]" to avoid stale advice

### Sports Card Market Claims
- Market size figures vary wildly ($2B to $33B depending on source and scope)
- Don't cite specific market sizes as fact -- use ranges and cite sources
- "Million dollar sales" and growth statistics should be attributed to specific sources

## Sources

- [CRA Hobby vs Business](https://www.montrealfinancial.ca/blog/cra-hobby-vs-business)
- [Canadian Tax Implications of Trading Cards](https://taxpage.com/articles-and-tips/canadian-tax-implications-of-buying-and-selling-collectible-trading-cards-magic-the-gathering/)
- [CRA GST/HST Registration](https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/when-register-charge.html)
- [Sports Card Market Size Variance](https://www.businessresearchinsights.com/market-reports/sports-trading-card-market-101765)
- [eBay Sports Card Fee Challenges](https://cardlines.com/ebay-selling-fees-sports-card-collectors/)
- [Dealer Pain Points](https://cardlines.com/why-are-retail-cards-no-longer-selling-well/)
- [PSA Grading Price Increases 2026](https://shopcardsusa.com/blogs/news/psa-grading-costs-2026-price-increase)
