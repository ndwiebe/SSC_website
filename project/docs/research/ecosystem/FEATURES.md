# Feature Landscape

**Domain:** Sports card dealer/flipper business platform website
**Researched:** 2026-03-27

## Table Stakes

Features users expect from a legitimate business platform. Missing = looks like a hobby project.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Product showcase pages | Visitors need to understand what each product does in under 30 seconds | Medium | One section per product (SST, DMC, Tax Playbook, Tax Ready) with clear CTAs |
| Mobile-responsive design | Card dealers browse on phones at shows, in line at LCS, at card shows | Medium | Design-first at 375px per Nathan's rules. Most card show browsing is mobile. |
| Clear pricing | Dealers comparison-shop tools constantly (CDP vs Slabfy vs SST) | Low | SST pricing on product page. DMC pricing links out. Tax Playbook is free. |
| Contact / inquiry form | Dealers want to talk to a person before buying services | Low | Especially for Tax Ready (reconciliation service). Form -> Resend -> Nathan's email. |
| About / founder story | "CPA who collects hockey cards" is THE differentiator -- must be front and center | Low | Not buried in footer. Part of the hero or above-the-fold positioning. |
| SSL / professional domain | Trust signals matter for financial services | Low | Already on slabsavvycpa.com via Vercel |
| Social proof | Dealers trust other dealers, not marketing copy | Medium | Testimonials, subscriber count, "trusted by X dealers" (even if small numbers early) |
| Speed / performance | Dealers have low patience; competing for attention with eBay, Whatnot, Slabfy | Low | Next.js + Vercel + image optimization handles this |

## Differentiators

Features that set Slab Savvy apart from competitors. These are the moat.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **CPA + Collector identity** | No other card tool platform is run by an actual CPA who collects. This is a once-in-a-market positioning. | Low | Copy and storytelling, not code. Must permeate every page. |
| **Canadian-first tax content** | Zero competition for Canadian card dealer tax guidance. Sports Card Tax Guy is US-only. | Medium | Blog posts, Tax Playbook content, CRA/GST explainers. Unique SEO opportunity. |
| **Ecosystem pitch** (all-in-one) | No competitor offers inventory + photos + tax + comps in one brand | Medium | The website sells the bundle value, even though products are separate apps. "One place for your card business." |
| **AI-native tools** | SST and DMC are both AI-powered. Most competitors bolt AI on as a feature. | Low | Marketing angle. "Built with AI from day one, not bolted on." |
| **Newsletter / content hub** | Cardlines and Sports Card Investor dominate content but don't sell tools. Slabfy and CDP sell tools but don't do content. Slab Savvy can do both. | Medium | Blog + newsletter. Tax tips, market commentary, tool tutorials, dealer spotlights. |
| **Free Tax Playbook** (lead magnet) | A free, genuinely useful tax guide is the best top-of-funnel play in this market | Low | PDF or web-based guide. Captures email. Positions Nathan as the authority. |
| **Card show / IRL presence** | Nathan can attend card shows as both a dealer AND the Slab Savvy founder | Low | "I use my own tools" credibility. Show photos, real inventory screenshots. |

## Anti-Features

Features to explicitly NOT build on the website. Save engineering time.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| User accounts / auth on the website | Website is marketing, not a product. SST has Telegram auth. DMC has its own auth. | Link to product-specific signup flows. |
| Card scanning / inventory on the website | That's SST's job. Don't duplicate. | Clear CTAs: "Try SST free for 30 days" |
| Pricing calculators / eBay fee tools | Free tools exist everywhere (130point, figoca, etc). Don't compete on commodity features. | Link to best free tools as a resource. Position as "we curate, you benefit." |
| Forums / community platform | Too early. Need audience mass first. Discord/Telegram groups are cheaper to run. | Link to existing community channels. |
| E-commerce / card sales | Slab Savvy helps dealers sell, it doesn't sell cards itself. Mixing would confuse positioning. | Never sell cards on slabsavvycpa.com. |
| Live chat widget | Nathan is one person. Can't staff live chat. | Contact form with "response within 24h" promise. Telegram link for SST support. |
| Multi-language support | Canadian market is English-first for card dealing. French Canadian card dealers are a tiny niche. | English only. Revisit if Quebec demand emerges. |

## Feature Dependencies

```
Website Foundation (design system, layout, navigation)
  |
  +-> Product Showcase Pages (SST, DMC, Tax Playbook, Tax Ready)
  |     |
  |     +-> SST Demo / Walkthrough (needs SST screenshots, maybe video)
  |     +-> DMC Before/After Gallery (needs DMC sample images)
  |
  +-> Blog / Content Engine (MDX setup, RSS feed)
  |     |
  |     +-> Newsletter Signup (needs Resend integration)
  |     +-> Tax Content Hub (blog posts about CRA, GST, card dealing taxes)
  |
  +-> Lead Capture Forms (contact, free trial request)
        |
        +-> Free Tax Playbook Download (email-gated PDF or web page)
```

## MVP Recommendation

**Phase 1 -- Launch with:**
1. Hero + ecosystem overview (the "what is Slab Savvy" pitch)
2. Four product sections (SST, DMC, Tax Playbook, Tax Ready) with CTAs
3. About / founder story (CPA + collector positioning)
4. Contact form
5. Newsletter signup
6. Mobile-responsive, fast, sharp design

**Phase 2 -- Add within 30 days:**
7. Blog with 3-5 launch articles (Canadian tax tips, "how I track my card inventory", "why I built SST")
8. Free Tax Playbook download page (email-gated)
9. Social proof section (even if just "Nathan's personal collection" stats)

**Defer:**
- Community features: Wait for 100+ newsletter subscribers
- Detailed SST/DMC comparison pages vs competitors: Wait for more user feedback
- Video content / tutorials: Wait for content to prove itself in text form first
- Podcast: The market has 90+ sports card podcasts. Text content is less saturated.

## Competitive Feature Matrix

What competitors offer vs. what Slab Savvy offers:

| Feature | Card Dealer Pro | Slabfy | Sports Card Tax Guy | Slab Savvy (planned) |
|---------|----------------|--------|--------------------|--------------------|
| Card scanning | Yes (AI) | Yes (AI) | No | Yes (via SST) |
| Inventory tracking | Yes | Yes | No | Yes (via SST) |
| eBay listing | Yes (direct API) | No | No | No (planned for SST) |
| Comp search | No | Yes (flip finder) | No | Yes (via SST, 130point) |
| Photo enhancement | No | No | No | Yes (via DMC) |
| Tax guidance | No | No | Yes (US only) | Yes (Canada + US planned) |
| Consignment mgmt | No | Yes | No | No (not planned) |
| Card show POS | No | Yes | No | No (not planned) |
| Newsletter/content | No | Yes (blog) | No | Yes (planned) |
| CPA on staff | No | No | Enrolled Agent (not CPA) | Yes (Nathan is CPA) |
| Canadian tax | No | No | No | Yes (primary focus) |
| AI-native | Partial | Yes | No | Yes (SST + DMC both AI) |

Key gap Slab Savvy fills: **No one combines tools + tax + content + Canadian focus.**

## Market Demand Signals

Evidence that these features are wanted:

- **Tax tracking:** 1099-K threshold dropping to $600 in US (2026). CRA increasing scrutiny on side-hustle income. Demand for tax help is about to spike.
- **Inventory management:** Google Sheets templates for card inventory are among the most-downloaded free tools in the hobby. Dealers clearly need this.
- **Comp search:** 130point.com is one of the most-visited card tools despite having a terrible UI. Demand is insatiable.
- **Photo quality:** eBay rolled out AI background enhancement because card photos are so consistently bad. DMC solves a real problem.
- **Canadian content:** Search "CRA sports card tax" or "Canadian card dealer GST" -- almost nothing comes up. Wide open SEO territory.

## Sources

- [Card Dealer Pro Features](https://www.carddealerpro.com/)
- [Slabfy Features](https://slabfy.com/blog/best-sports-card-apps-2026)
- [Sports Card Tax Guy Services](https://sportscardtaxguy.com/)
- [130point.com](https://130point.com/)
- [eBay AI Listing Tools](https://innovation.ebayinc.com/stories/magical-bulk-listing-tool-is-ebays-latest-ai-powered-time-saver-for-sellers/)
- [CRA GST/HST Thresholds](https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/when-register-charge.html)
- [US 1099-K Threshold Changes](https://shruticpa.com/blog/how-to-track-card-sales-for-taxes-a-guide-for-hobbyists-and-dealers/)
