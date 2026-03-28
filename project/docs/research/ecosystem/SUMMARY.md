# Research Summary: Slab Savvy Website

**Domain:** Sports card dealer/flipper business platform (tools, tax, content)
**Researched:** 2026-03-27
**Overall confidence:** MEDIUM-HIGH

## Executive Summary

The sports card dealing ecosystem is a fragmented, underserved market experiencing significant growth. The global sports trading card market is valued at $11.8B+ (2025) and projected to reach $28B+ by 2033, with platforms like Whatnot alone processing $8B in GMV in 2025. Dealers are trapped between increasingly sophisticated selling platforms (eBay, Whatnot, MySlabs, Fanatics Collect) and primitive back-office tools -- most still manage inventory in Google Sheets, track costs manually, and panic about taxes every April.

The competitive landscape for dealer-facing tools is surprisingly thin. Card Dealer Pro ($50/mo for mid-tier) focuses on scan-to-list automation. Slabfy ($1 first month, then subscription) combines portfolio management with dealer ops. SlabIQ is AI-powered but still in beta. ConsignR targets brick-and-mortar consignment shops ($100+/mo). None of these combine inventory, tax tracking, comp search, photo enhancement, AND CPA expertise into a single ecosystem. That gap is exactly where Slab Savvy lives.

The "CPA + collector" positioning has almost zero competition. Sports Card Tax Guy (Jonny, an Enrolled Agent) and The Sports Card Accountant are the only identifiable niche tax practices in this space -- both US-only, both focused on tax prep rather than proactive business tools. There is no Canadian equivalent. A CPA who actually collects hockey cards, understands CRA/GST rules, and builds AI tools for dealers occupies an entirely uncontested position, especially for Canadian dealers who face different (and poorly understood) tax obligations.

The biggest strategic insight: dealers don't think of themselves as running businesses until tax time forces them to. The 1099-K threshold dropping to $600 in the US (2026) and CRA scrutiny of side-hustle income in Canada means thousands of casual flippers are about to discover they need professional help. Slab Savvy can be the platform that catches them before they're in trouble -- not after.

## Key Findings

**Stack:** Modern web platform (Next.js/Astro) with content-heavy landing pages, product ecosystem hub, and newsletter/content engine. Not an app -- a business platform website.

**Architecture:** Hub-and-spoke model where the Slab Savvy website is the front door, SST is the core product, DMC/Tax Playbook/Tax Ready are spokes. Each product has its own landing section but the site sells the ecosystem, not individual tools.

**Critical pitfall:** Trying to be everything at once. Ship the ecosystem story first (website + content), then drive traffic to individual products. The website is a marketing asset, not a SaaS product itself.

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Foundation: Ecosystem Landing Site** - Build the hub website that tells the Slab Savvy story and positions all four products. This is the brand foundation everything else depends on.
   - Addresses: Brand positioning, product showcase, trust-building
   - Avoids: Building features before establishing the narrative

2. **Content Engine: Newsletter + Blog** - Canadian card dealer tax content, market commentary, tool tips. This builds the audience before products need to convert them.
   - Addresses: SEO, authority building, email list growth
   - Avoids: Paying for traffic when organic content can compound

3. **Product Pages: SST + DMC Deep Dives** - Dedicated landing pages with demos, pricing, testimonials for SST and DMC.
   - Addresses: Conversion optimization for existing products
   - Avoids: Generic product descriptions that don't differentiate

4. **Tax Content Hub: Playbook + Tax Ready** - Canadian card dealer tax guide (free lead magnet) and Tax Ready service page.
   - Addresses: The unique CPA positioning, lead generation
   - Avoids: Burying the strongest differentiator

5. **Social Proof + Community** - Testimonials, case studies, community integration (Discord/Telegram links).
   - Addresses: Trust signals, community building
   - Avoids: Launching community features before there's content to sustain them

**Phase ordering rationale:**
- Website must exist before any product can be marketed effectively
- Content builds organic traffic that compounds over time -- start early
- SST and DMC pages come after foundation because the products already exist and need homes
- Tax content is the moat -- but only works after trust is established via the broader platform
- Community is last because it requires audience mass to sustain

**Research flags for phases:**
- Phase 1: Standard patterns, low research risk
- Phase 2: Needs content strategy research (what topics, what frequency, what platforms)
- Phase 3: Likely needs competitive positioning research (how SST differs from Slabfy, CDP)
- Phase 4: Canadian tax content requires CRA-specific research validation
- Phase 5: Community platform selection may need research (Discord vs Telegram vs custom)

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Standard web tech, well-understood patterns |
| Features | MEDIUM-HIGH | Competitive landscape verified across multiple sources |
| Architecture | HIGH | Hub-and-spoke is the obvious model for multi-product brand |
| Pitfalls | MEDIUM | Based on ecosystem patterns; Canadian-specific pitfalls need validation |
| Market Size | MEDIUM | Sources vary widely ($2B to $33B depending on scope definition) |
| Competitive Landscape | MEDIUM-HIGH | Key competitors verified but pricing details incomplete |
| Canadian Market | LOW-MEDIUM | Limited data on Canadian-specific dealer demographics |

## Gaps to Address

- Exact pricing for Slabfy and Card Dealer Pro (behind paywalls)
- Canadian dealer demographics and market size (sparse data)
- Content engagement benchmarks for sports card newsletters (open rates, conversion)
- Whether Canadian dealers use different tools/platforms than US dealers
- Community platform preferences for Canadian card dealer demographic
- Specific CRA guidance on card dealing as business income (needs accountant validation)

## Sources

### Competitor & Tool Research
- [Slabfy - Best Sports Card Apps 2026](https://slabfy.com/blog/best-sports-card-apps-2026)
- [Card Dealer Pro](https://www.carddealerpro.com/)
- [CollX](https://collx.app/)
- [SlabIQ](https://slabiq.app/)
- [ConsignR](https://consignr.com/)
- [Card Ladder](https://www.cardladder.com/)
- [Market Movers](https://www.marketmoversapp.com/)
- [130point](https://130point.com/)
- [TCG Automate](https://www.tcgautomate.com/)

### Tax & CPA Services
- [Sports Card Tax Guy](https://sportscardtaxguy.com/)
- [The Sports Card Accountant](https://thesportscardaccountant.com/)
- [SHRUTI CPA - Card Sales Tax Guide](https://shruticpa.com/blog/how-to-track-card-sales-for-taxes-a-guide-for-hobbyists-and-dealers/)
- [Cardlines Tax Guide](https://cardlines.com/2022-taxes-sports-cards/)
- [CRA GST/HST Registration](https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/when-register-charge.html)
- [Canadian Tax Implications of Trading Cards](https://taxpage.com/articles-and-tips/canadian-tax-implications-of-buying-and-selling-collectible-trading-cards-magic-the-gathering/)

### Market & Industry
- [Grand View Research - Sports Trading Cards Market](https://www.grandviewresearch.com/press-release/global-sports-trading-cards-market)
- [Yahoo Finance - Sports Cards Market Growth 2026](https://finance.yahoo.com/news/sports-cards-market-growth-2026-162318968.html)
- [State of Sports Collecting 2026](https://skyboxct.com/blogs/news/the-state-of-sports-collecting-in-2026-whats-changed-in-just-five-years-and-key-sports-card-market-trends)
- [Whatnot $8B in 2025](https://www.cllct.com/sports-collectibles/memorabilia/whatnot-doubled-sales-to-more-than-8-billion-in-2025)

### Content & Community
- [Sports Card Investor](https://www.sportscardinvestor.com/)
- [Cardlines](https://cardlines.com/)
- [Feedspot - Top Sports Card YouTube Channels](https://videos.feedspot.com/sports_card_youtube_channels/)
