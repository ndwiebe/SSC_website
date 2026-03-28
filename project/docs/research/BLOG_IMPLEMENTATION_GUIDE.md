# Slab Savvy CPA — Blog Implementation & Content Launch Guide

---

## Part 1: Blog Technical Setup

### Directory Structure (Astro Recommendation)
If building a fast, SEO-friendly blog, Astro is ideal (like DisplayMyCard's blog):

```
slab-savvy-cpa/
├── src/
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro (blog listing page)
│   │   │   ├── [slug].astro (dynamic blog post)
│   │   │   └── tags/
│   │   │       ├── [tag].astro (taxonomy pages)
│   │   │
│   │   ├── api/
│   │   │   └── sitemap.xml.ts (dynamic sitemap)
│   │   │
│   │   └── robots.txt.ts (dynamic robots.txt)
│   │
│   ├── layouts/
│   │   ├── BlogLayout.astro (post wrapper)
│   │   └── BaseLayout.astro (site-wide)
│   │
│   ├── components/
│   │   ├── BlogPostHeader.astro (title, date, author, read time)
│   │   ├── TableOfContents.astro (auto-generated)
│   │   ├── RelatedPosts.astro (internal links)
│   │   ├── SchemaMarkup.astro (JSON-LD Article)
│   │   └── AuthorBio.astro (Nathan Wiebe credentials)
│   │
│   ├── data/
│   │   └── posts/ (markdown + YAML frontmatter)
│   │       ├── gst-sports-cards-canada.md
│   │       ├── hobby-vs-business-cra.md
│   │       └── ... (20+ posts)
│   │
│   └── lib/
│       ├── posts.ts (query/sort posts)
│       ├── schema.ts (Zod schema for post frontmatter)
│       └── seo.ts (canonical URLs, OG tags)
│
├── public/
│   ├── /blog/
│   │   └── /images/ (blog-specific images)
│   │
│   └── sitemap.xml
│
└── astro.config.mjs (sitemap plugin, image optimization)
```

---

## Part 2: Blog Post Frontmatter Schema (Zod)

```typescript
// src/lib/schema.ts
import { z } from 'astro/zod';

export const BlogPostSchema = z.object({
  // Required fields
  title: z.string().min(30).max(70),
  description: z.string().min(120).max(160), // Meta description
  slug: z.string().optional(),

  // Author & dates
  author: z.string().default('Nathan Wiebe'),
  publishedDate: z.date(),
  updatedDate: z.date().optional(),

  // SEO & taxonomy
  primaryKeyword: z.string(),
  secondaryKeywords: z.array(z.string()).default([]),
  tags: z.array(z.enum(['tax', 'operations', 'marketplace', 'market-trends', 'compliance'])),
  category: z.enum(['tax-compliance', 'inventory-operations', 'marketplace-selling', 'market-intelligence', 'business-setup']),

  // Content metadata
  readingTime: z.number().optional(), // minutes
  wordCount: z.number(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),

  // Media
  coverImage: z.string().optional(),
  coverImageAlt: z.string().optional(),

  // Internal linking
  relatedPosts: z.array(z.string()).default([]), // slugs of related posts
  internalLinks: z.array(z.object({
    text: z.string(),
    href: z.string(),
    position: z.number(), // paragraph number
  })).default([]),

  // Product tie-ins
  productLink: z.enum(['tax-playbook', 'tax-ready', 'sst', 'dmc']).optional(),

  // Changelog (for updates)
  changelog: z.array(z.object({
    date: z.date(),
    change: z.string(),
  })).default([]),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
```

---

## Part 3: Example Blog Post Markdown

```markdown
---
title: "GST on Sports Card Sales in Canada: A Dealer's Complete Guide"
description: "Understand when you need to charge GST on card sales, how to register with CRA, and what happens if you don't. Updated for 2025."
author: "Nathan Wiebe"
publishedDate: 2026-04-01
updatedDate: 2026-04-01
primaryKeyword: "GST on sports card sales Canada"
secondaryKeywords:
  - "do I need to charge GST cards"
  - "sports card business GST registration CRA"
  - "GST threshold sports cards"
tags: [tax, compliance]
category: tax-compliance
readingTime: 8
wordCount: 2847
featured: true
coverImage: "/blog/images/gst-guide-hero.jpg"
coverImageAlt: "Canadian GST rate on sports card sales"
relatedPosts:
  - "hobby-vs-business-cra"
  - "adjusted-cost-base-sports-cards"
  - "complete-dealer-tax-checklist"
internalLinks:
  - text: "Learn about hobby vs business classification"
    href: "/blog/hobby-vs-business-cra"
    position: 3
  - text: "Tax Ready checklist"
    href: "/taxready"
    position: 7
  - text: "Get the full Tax Playbook"
    href: "/spreadsheet"
    position: 9
productLink: "tax-playbook"
---

## The Short Answer

If you're selling sports cards in Canada and your income from card sales exceeds **$30,000 in any year** (or you're deemed a business by CRA), you **must register for GST** and charge 5% on taxable sales.

But the real question isn't just "Do I need GST?" — it's "Am I running a hobby or a business?" Because that answer changes everything.

---

## Table of Contents

- [When GST Registration is Mandatory](#mandatory)
- [The Hobby vs Business Test](#hobby-vs-business)
- [How to Register for GST](#registration)
- [Calculating and Remitting GST](#calculating)
- [Common Mistakes Dealers Make](#mistakes)
- [Questions CRA Will Ask](#questions)
- [Final Checklist](#checklist)

---

## When GST Registration is Mandatory {#mandatory}

### The $30,000 Threshold

CRA's basic rule is straightforward: **If your business revenue exceeds $30,000 in any 12-month period, you must register for GST.**

This isn't per year. It's a rolling 12-month window. So if you sell $2,000/month in cards, you'll hit the threshold in month 15. At that point, you have **30 days to register**. If you don't, CRA will find out (usually through eBay data or bank records), and you'll owe penalties.

**Important:** This $30,000 is *gross revenue*, not profit. A $50K card inventory with 20% margins ($10K profit) still triggers the $30K revenue threshold.

### "But I'm Just Selling My Personal Collection"

This is where the hobby vs business distinction matters. More on that below.

---

## The Hobby vs Business Test {#hobby-vs-business}

Here's the part that catches most dealers off guard:

**Even if you're under $30,000 in revenue, CRA can still classify you as running a business and require GST registration.**

This happens if CRA believes you're *operating a business*, not just liquidating a personal hobby.

The CRA's test (from IT-479R Transactions in Securities) looks at:

1. **Frequency & volume** — Are you doing this constantly? (Selling 20 cards/month = business; selling 20 cards/year = hobby)
2. **Time spent** — Is this your part-time job? (10+ hrs/week = business)
3. **Advertising & marketing** — Are you actively promoting sales? (eBay listings, Facebook ads = business)
4. **Profit motive** — Are you trying to make money? (If yes, business)
5. **Expertise** — Do you have special knowledge? (Understanding grading, comps = business indicator)
6. **Continuity** — Is this an ongoing operation? (Running it for 3+ years = business)

**Real example:** A dealer with $8K in card sales but selling 15-20 cards per week, maintaining a spreadsheet inventory, using eBay as primary channel, and actively marketing? CRA would likely classify this as a business, GST required.

---

## How to Register for GST {#registration}

If you've exceeded the threshold (or CRA deems you a business), here's how to register:

### Step 1: Gather Your Information
- Business name and address
- SIN or corporate number
- Date you started operations (not necessarily when revenue hit $30K)
- Expected monthly revenue going forward
- Accounting period (most card dealers use calendar year)

### Step 2: Register Online or by Mail
**Online (fastest):** Go to [canada.ca/taxes/businesses/gst-hst](https://www.canada.ca/taxes/businesses)
- Create a CRA My Business Account
- File Form GST/HST1 (Application for GST/HST Registration)
- Typically processed within 2-3 weeks

**By mail:** Complete Form GST/HST1, mail to your regional Tax Services Office

### Step 3: Get Your GST/HST Account Number
Once approved, CRA issues a 15-digit GST account number (usually BN + 2-digit suffix). This is what you use on invoices and returns.

### Step 4: Set Up Accounting
From the moment you're registered, you must:
- Charge 5% GST on all Canadian card sales
- Keep records of all GST collected
- File a GST return monthly (Form GST34), quarterly, or annually (depending on your election)
- Remit GST to CRA

---

## Calculating and Remitting GST {#calculating}

### How to Charge GST

If a card sells for $100 CAD:
- **Subtotal:** $100
- **GST (5%):** $5
- **Total charged to buyer:** $105

You collect that $5, but it doesn't go in your pocket. It's held in trust and remitted to CRA.

### A Typical Month Example

Let's say in March you sell:
- 8 cards @ $100 each = $800
- 3 cards @ $200 each = $600
- 2 cards @ $50 each = $100
- **Total revenue:** $1,500
- **GST collected:** $75

On your GST return (filed by April 30), you report:
- **Total sales (including GST):** $1,575
- **GST owing to CRA:** $75

### Filing Your Return

**Frequency options:**
- **Monthly:** Most dealers file monthly to avoid accumulating large balances
- **Quarterly:** Smaller dealers can elect quarterly (less paperwork)
- **Annually:** Only if your revenue stays under $150K/year

You file Form GST34 online through CRA My Business Account. Takes about 15 minutes if your records are organized.

### When You Get Money Back

If you're paying for inventory or supplies out-of-pocket and registered for GST, you can claim **Input Tax Credits (ITCs)** for GST you paid.

Example: You buy $500 of card sleeves and pay $25 in GST. When you file your return, you claim that $25 as an ITC, which reduces the GST you owe.

---

## Common Mistakes Dealers Make {#mistakes}

### Mistake 1: Not Registering When Required
**The penalty:** 10% of the GST you owed, plus interest compounded monthly.

If you sold $40K in cards and didn't register, CRA will assess you for $2,000 in GST + penalties + 2 years of compounded interest.

### Mistake 2: Charging GST Inconsistently
If you charge GST to some buyers but not others, CRA will flag this. Be consistent and keep records.

### Mistake 3: Treating Personal Sales the Same as Business Sales
If you're selling a vintage card from your childhood collection, it might not be GST-taxable. But if you're selling from a business inventory, it is. Keep these separate in your records.

### Mistake 4: Forgetting to File Even if You Owe $0
If you're registered, you **must file a return every period**, even if you had no sales. Missing filings attract penalties.

### Mistake 5: Not Deducting Input Tax Credits
Many dealers forget to track the GST they paid on supplies, equipment, shipping materials, etc. This costs them money at filing time.

---

## Questions CRA Will Ask {#questions}

If CRA audits your GST account (unlikely but possible), expect:

1. **"Show me your sales records for the last 3 years"**
   - eBay transaction history
   - Bank statements showing card sales
   - Spreadsheet inventory with sell prices

2. **"Did you charge GST consistently?"**
   - Every invoice/listing should show GST (or note it's exempt)

3. **"What's your purchase cost vs. selling price?"**
   - CRA looks for unrealistic margins (helps catch unreported income)

4. **"Do you have receipts for inventory purchases?"**
   - Grading costs, bulk purchases, sleeves, boxes, etc.

5. **"How much time do you spend on this activity?"**
   - Helps CRA confirm it's a business (supporting hobby vs. business classification)

**Best practice:** Keep everything for 7 years. eBay automatically archives, but keep bank statements, supplier receipts, and your inventory spreadsheet backed up.

---

## Final Checklist {#checklist}

Use this before making your first sale:

- [ ] Estimated revenue exceeds $30,000 in the next 12 months? → Register for GST now
- [ ] Planning to operate for 3+ years? → Register for GST now (prevents issues later)
- [ ] Already have $30K+ in sales and not registered? → Register immediately (contact a CPA)
- [ ] GST account number obtained? → Keep it safe; you'll need it for everything
- [ ] Accounting system set up (spreadsheet or software)? → Track each sale with date, amount, GST collected
- [ ] Input Tax Credit system? → Track all business expenses with GST component
- [ ] Filing frequency chosen (monthly/quarterly)? → Mark calendar for deadlines
- [ ] Contingency plan if audited? → Keep 7 years of records

---

## What's Next?

Now that you understand GST, the next question is **"What about income tax?"** That's where hobby vs. business matters even more.

Check out our guide on **[Hobby vs Business Income Classification](#hobby-vs-business)** — it determines whether you're:
- Claiming deductions for a "full business" (rent, equipment, travel)
- Or just reporting "investment income" with limited deductions

**Already registered and still confused?** Download the [Tax Playbook](/spreadsheet) — it walks you through the full year of tax tracking for Canadian card dealers.

---

## Changelog

| Date | Update |
|------|--------|
| Apr 1, 2026 | Initial publication |
| May 15, 2026 | Updated GST registration link to 2026 CRA page |
```

---

## Part 4: Blog Post Template (Reusable)

```markdown
---
title: "[Target Keyword]: [Compelling Angle for Card Dealers]"
description: "[Summary in 120-160 chars including primary keyword]"
author: "Nathan Wiebe"
publishedDate: YYYY-MM-DD
updatedDate: YYYY-MM-DD
primaryKeyword: "[Keyword you're ranking for]"
secondaryKeywords:
  - "[Variant 1]"
  - "[Variant 2]"
  - "[Variant 3]"
tags: [category-slug]
category: [tax-compliance|inventory-operations|marketplace-selling|market-intelligence|business-setup]
readingTime: [6-10]
wordCount: [1800-2500]
featured: [true|false]
coverImage: "/blog/images/[slug]-hero.jpg"
coverImageAlt: "[Descriptive alt text with keyword]"
relatedPosts:
  - "[related-post-slug-1]"
  - "[related-post-slug-2]"
  - "[related-post-slug-3]"
internalLinks:
  - text: "[Anchor text linking to related content]"
    href: "[Full path]"
    position: [Paragraph number]
productLink: [tax-playbook|tax-ready|sst|dmc|null]
---

## The Problem

[Start with the pain point that brought readers here. Example: "You're selling $50K in cards annually, but tracking comps is taking hours per week. You're using a Notes app. It's chaos."]

---

## What Dealers Are Actually Looking For

[Bridge section that shows you understand the audience's real need, beyond the keyword.]

---

## The Solution

[Core content: tutorial, guide, or strategy.]

### Subsection 1

### Subsection 2

### Subsection 3

---

## How This Applies to You

[Real-world example specific to Canadian card dealers.]

---

## Quick Checklist

- [ ] [Actionable item 1]
- [ ] [Actionable item 2]
- [ ] [Actionable item 3]

---

## What's Next

[Link to related post or product.]

Learn more: [Internal link to related content or product page]

---

## FAQ

**Q: [Common question readers have]**
A: [Clear answer]

---

## Resources

- [Linked source 1](https://example.com)
- [Linked source 2](https://example.com)
```

---

## Part 5: Internal Linking Strategy (Concrete Examples)

### Linking Pattern: Tax Posts → Tax Playbook

**In "GST on Sports Card Sales" post:**
```markdown
Now that you understand GST, you need to know how it affects your overall tax picture.
[Read our guide on hobby vs. business classification](#hobby-vs-business) to see if you even need to collect GST.

Once you're registered, tracking becomes critical. The [Tax Playbook](/spreadsheet)
includes templates for monthly GST tracking — it's built specifically for Canadian dealers.
```

### Linking Pattern: Operations Posts → SST

**In "Sports Card Inventory Tracking Spreadsheet" post:**
```markdown
Most dealers build a spreadsheet in Excel, tracking:
- Card details (set, number, grade)
- Purchase cost
- Current market value
- Selling price
- Tax lot info for CRA

But spreadsheets have limits. Once you hit 500+ cards, finding comps becomes slow.

That's exactly why we built [Slab Savvy Tracker](/waitlist) — send a photo,
confirm details, get a spreadsheet row + comp data automatically.
```

### Linking Pattern: Marketplace Posts → DMC

**In "Photography Tips for eBay Card Listings" post:**
```markdown
The best card photo includes:
- Clean white or brand background
- Even lighting (no shadows)
- Card centered in frame
- No glare

Getting this right with your phone camera takes practice. That's why we built
[DisplayMyCard](https://displaymycard.com) — AI-powered background removal and
enhancement for card photos. Takes 10 seconds, looks professional.
```

### Linking Pattern: All Posts → Blog Index

At the end of every post:
```markdown
---

**Related articles:**
- [Hobby vs Business: How CRA Classifies Sports Card Income](/blog/hobby-vs-business-cra)
- [How to Price Sports Cards for eBay](/blog/how-to-price-sports-cards-ebay)
- [The Complete Dealer Tax Checklist](/blog/complete-dealer-tax-checklist)

**Browse all articles:** [See all Slab Savvy guides](/blog)
```

---

## Part 6: SEO Checklist (Pre-Publish)

Before publishing any post, run through this:

### Content Quality
- [ ] Primary keyword appears in: title, H1, first 100 words, at least 2 H2s
- [ ] Reading level: Grade 8-10 (use Flesch Kincaid)
- [ ] Minimum 1,600 words (shorter posts underperform for competitive keywords)
- [ ] Includes: examples, lists, images, a checklist or template
- [ ] Has a clear CTA to product or related post

### Technical SEO
- [ ] Title tag: 50-60 characters, primary keyword first
- [ ] Meta description: 150-160 characters, keyword-forward, includes benefit
- [ ] H1: Single, primary keyword, compelling
- [ ] H2-H6: Hierarchical structure (never skip levels)
- [ ] Slug format: `/blog/[primary-keyword-slugified]` (lowercase, hyphens)
- [ ] URL length: <75 characters

### On-Page Markup
- [ ] Image alt text: Descriptive, keyword-natural (not stuffed)
- [ ] Inline code/formatting: Used sparingly for emphasis
- [ ] Lists: Used for scanability (bullet + numbered)
- [ ] Bold/italic: Used to highlight key phrases (not overused)
- [ ] Table of Contents: Included if post > 2000 words

### Internal Linking
- [ ] 3-5 internal links per 1000 words
- [ ] Links point to: related posts, product pages, high-value category pages
- [ ] Anchor text: Natural, includes keyword variant when possible
- [ ] Links scattered throughout, not all at the end

### External Linking
- [ ] 2-3 links to authority sources (CRA, eBay, financial publications)
- [ ] Links are nofollowed where appropriate (no endorsement implied)
- [ ] All links open in new tab (target="_blank")

### Schema Markup
- [ ] Article schema (JSON-LD) with: title, description, image, author, datePublished, dateModified, wordCount
- [ ] Author schema: Name + description (CPA credentials)
- [ ] BreadcrumbList schema: Home > Blog > [Category] > [Post Title]
- [ ] FAQ schema if post includes Q&A section

### Mobile & Accessibility
- [ ] Tested at 375px viewport (mobile-first)
- [ ] Images scale responsively
- [ ] Alt text present and descriptive for all images
- [ ] Font size minimum 16px body text
- [ ] Line height minimum 1.5 (readability)

### Analytics Tracking
- [ ] GA4 event configured for "blog_view"
- [ ] Outbound link tracking enabled
- [ ] CTA click tracking enabled (Tax Playbook, SST, DMC links)
- [ ] Scroll tracking set up (engagement metric)

### Final Checks
- [ ] Spelling & grammar check (Grammarly)
- [ ] Read aloud (catches awkward phrasing)
- [ ] Links tested (all working, no 404s)
- [ ] Images optimized for web (< 100KB)
- [ ] Canonical tag set to post URL
- [ ] Date published visible (builds trust)

---

## Part 7: Content Operations Workflow

### Weekly Workflow

**Monday:** Plan
- Pick 1 post for the week (from prioritized list)
- Create outline (H1, H2s, key points)
- Assign primary keyword + secondary keywords
- Identify product tie-in

**Tuesday-Wednesday:** Draft & Research
- Write first draft (1500-2000 words in 90 min)
- Add images (3-5 relevant images)
- Insert internal links (3-5 per 1000 words)
- Flag any external sources

**Thursday:** Edit & Optimize
- Spell check
- Optimize title, meta description
- Add schema markup
- Create featured image
- Verify all links work

**Friday:** Publish & Promote
- Publish to blog
- Update sitemap
- Share on social (Facebook, LinkedIn)
- Add to email draft (if building mailing list)
- Monitor first 24h engagement

### Monthly Review

- **End of month:** Analyze blog analytics
  - Top posts by traffic
  - Average time on page
  - Click-through to product pages
  - Bounce rate trends
- **Month 2+:** Update underperforming posts
  - Add more depth
  - Improve title/meta description
  - Add missing internal links

---

## Part 8: Blog Infrastructure Tech Stack

### Recommended Setup (Based on DMC Approach)

**Front-End:** Astro + React components + Tailwind CSS
- Fast static site (SEO advantage)
- Component reuse (like DemoCard, ProductCard)
- Responsive images out of box
- Built-in SEO features

**Blog Source:** Markdown in `/src/data/posts/` with Zod schema
- Version control friendly
- Easy to backup
- Frontmatter powers taxonomy & internal linking

**CMS (Optional):** Sanity or Payload CMS
- If you want non-technical users writing posts
- Sync to GitHub for version control
- Not necessary for 20-30 posts

**Hosting:** Vercel (same as main site)
- Automatic deployments on git push
- Built-in analytics
- Edge functions for dynamic redirects

**Analytics:**
- Google Search Console (keyword tracking)
- GA4 (behavior & conversion tracking)
- Hotjar (scroll depth, engagement)

**Backup & Monitoring:**
- GitHub version control
- Automated tests (playwright) for broken links
- Supabase for structured blog metadata

---

## Part 9: Batch Publishing Strategy (Months 1-5)

### Month 1: Tax Foundation (4 posts)

**Published weekly:**
1. "GST on Sports Card Sales in Canada" (Week 1)
2. "Hobby vs Business: CRA Classification" (Week 2)
3. "Sports Card Inventory Tracking Spreadsheet" (Week 3)
4. "How to Price Sports Cards for eBay" (Week 4)

**Total effort:** 4 weeks × 5 days/week = 80 hours
**Expected traffic by month 3:** 200-300 organic sessions/month

### Month 2: Operations & Marketplace (4 posts)

**Published weekly:**
1. "Photography Tips: Better eBay Card Photos" (Week 1)
2. "Canadian Card Dealer Business Setup" (Week 2)
3. "Adjusted Cost Base & Capital Gains Taxes" (Week 3)
4. "5 Ways to Find Card Comps Online" (Week 4)

**Expected traffic by month 3:** 500-800 organic sessions/month cumulative

### Month 3: Market Intelligence & Niches (4 posts)

**Published weekly:**
1. "eBay Sports Card Fees in Canada Breakdown" (Week 1)
2. "Sports Card Market Trends 2025" (Week 2)
3. "Selling Inherited Card Collections: Tax & Logistics" (Week 3)
4. "Card Authentication vs Grading: Costs & When It Matters" (Week 4)

**Expected traffic by month 4:** 1000-1500 organic sessions/month cumulative

---

## Part 10: Measuring Success

### By Month 1
- [ ] 4 blog posts published
- [ ] All posts indexed in Google Search Console
- [ ] Blog traffic: 50-100 sessions
- [ ] Average time on page: > 2 minutes

### By Month 3
- [ ] 12 blog posts published
- [ ] Ranking top 10 for "GST sports cards Canada"
- [ ] Ranking top 10 for "hobby vs business Canada"
- [ ] Blog traffic: 300-500 sessions/month
- [ ] 10-15% click-through to product pages
- [ ] Bounce rate: < 65%

### By Month 6
- [ ] 20+ blog posts published
- [ ] Ranking top 5 for primary keywords
- [ ] Ranking top 10 for 8-10 secondary keywords
- [ ] Blog traffic: 800-1200 sessions/month
- [ ] 15-20% click-through to product pages
- [ ] Organic traffic attribution: $500-1000/month revenue

---

**Document prepared by: Claude Code (SEO Implementation Agent)**
**Last updated:** 2026-03-27
**Next milestone:** Publish first blog post (Week 1 of Month 1)
