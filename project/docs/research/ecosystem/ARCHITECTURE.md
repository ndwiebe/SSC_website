# Architecture Patterns

**Domain:** Sports card dealer business platform (multi-product website)
**Researched:** 2026-03-27

## Recommended Architecture

### Hub-and-Spoke Model

The Slab Savvy website is the **hub**. Individual products are **spokes**.

```
                    slabsavvycpa.com (Hub)
                    /    |    |    \
                   /     |    |     \
                  /      |    |      \
               SST     DMC  Tax    Tax
            (Telegram) (SaaS) Playbook Ready
              |          |     |       |
           Hetzner   Vercel  Static  Manual
           VPS       +Supa   PDF/Web Service
```

The website does NOT run the products. It markets them, explains them, and drives traffic to them. Each product has its own infrastructure, auth, and user experience.

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **Website (Next.js)** | Brand storytelling, product marketing, content/blog, lead capture, newsletter | Resend (email), PostHog (analytics) |
| **SST** | AI inventory tracking, comp search, sheet management | Telegram/WhatsApp, Google Sheets, 130point, OpenAI |
| **DMC** | AI card photo enhancement | Supabase, Vercel, OpenAI |
| **Tax Playbook** | Free tax guide (PDF or web pages) | Resend (for email-gated download) |
| **Tax Ready** | Manual reconciliation service | Contact form -> Nathan's email |

### Data Flow

```
Visitor arrives at slabsavvycpa.com
  |
  +-> Reads ecosystem pitch
  |     |
  |     +-> Clicks "Try SST" -> Redirects to Telegram bot (@SlabSavvyTrackerBot)
  |     +-> Clicks "Try DMC" -> Redirects to displaymycard.com
  |     +-> Clicks "Get Tax Playbook" -> Email capture -> Resend delivers PDF/link
  |     +-> Clicks "Tax Ready" -> Contact form -> Resend notifies Nathan
  |
  +-> Reads blog post
  |     |
  |     +-> Subscribes to newsletter -> Resend adds to list
  |     +-> Shares on social -> Organic traffic loop
  |
  +-> PostHog tracks all interactions (page views, clicks, form submissions)
```

## Page Architecture

### Site Map

```
/                          # Hero + ecosystem overview
/tracker                   # SST product page (deep dive)
/photos                    # DMC product page (before/after gallery)
/tax-playbook              # Free tax guide (email-gated)
/tax-ready                 # Reconciliation service page
/about                     # Nathan's story (CPA + collector)
/blog                      # Content hub (MDX)
/blog/[slug]               # Individual blog posts
/contact                   # Contact form
/newsletter                # Newsletter signup (also embedded in footer)
/pricing                   # Comparison of all products/tiers
```

### Layout Structure

```
<RootLayout>
  <Header>
    <Logo />
    <Navigation links={[Tracker, Photos, Tax, Blog, Pricing]} />
    <CTAButton text="Start Free Trial" />
  </Header>

  <main>{children}</main>

  <Footer>
    <NewsletterSignup />
    <ProductLinks />
    <SocialLinks />
    <LegalLinks />
  </Footer>
</RootLayout>
```

## Patterns to Follow

### Pattern 1: Content-Driven Landing Sections
**What:** Each product section on the homepage tells a mini-story: problem -> solution -> proof -> CTA.
**When:** For every product showcase section.
**Why:** Dealers are skeptical. They've seen a hundred card apps. The story needs to land in 10 seconds.
**Example:**
```
[Problem] "You just bought 200 cards at a show. Now what?"
[Solution] "Send a photo to SST. Get a spreadsheet row + comp in 30 seconds."
[Proof] "Nathan uses SST to track his own 2,000+ card inventory."
[CTA] "Try it free for 30 days"
```

### Pattern 2: MDX Blog with Frontmatter
**What:** Blog posts as MDX files in the repo with YAML frontmatter for metadata.
**When:** All content pages (blog posts, guides, tutorials).
**Why:** Version-controlled, no CMS dependency, Nathan can write in Obsidian and copy over.
**Example:**
```mdx
---
title: "Canadian Card Dealer Tax Guide: CRA, GST, and Your Hockey Card Side Hustle"
date: "2026-04-01"
description: "Everything Canadian sports card dealers need to know about CRA reporting, GST registration, and claiming expenses."
tags: ["tax", "canada", "cra", "gst"]
author: "Nathan Wiebe, CPA"
---

# Your Side Hustle Just Became a Business

If you sold more than $30,000 in cards this year...
```

### Pattern 3: Email-Gated Lead Magnets
**What:** Free content (Tax Playbook) behind an email signup form. Server Action validates email, sends via Resend, tracks in PostHog.
**When:** Tax Playbook download, future resources.
**Why:** Builds email list. Email is the highest-converting channel for financial services.

### Pattern 4: Ecosystem Cross-Promotion
**What:** Every product page includes a "Works with" section showing how it connects to other Slab Savvy products.
**When:** On every product detail page.
**Why:** Increases perceived value. "SST tracks your inventory. DMC makes your listing photos pop. Tax Playbook keeps the CRA happy." The bundle is more valuable than any single product.

### Pattern 5: Mobile-First Hero with Progressive Enhancement
**What:** Hero designed for 375px first. Card scroll animation as background on desktop, simplified on mobile.
**When:** Homepage hero section.
**Why:** Per the design direction: "On mobile: animation IS the hero, full-screen card transforming as you scroll." Desktop gets the full Antimetal-inspired experience.

## Anti-Patterns to Avoid

### Anti-Pattern 1: SPA Behavior for a Content Site
**What:** Client-side routing for everything, heavy JS bundles, loading spinners.
**Why bad:** Kills SEO, slows mobile experience, wastes bandwidth. This is a content site, not an app.
**Instead:** Use Next.js App Router with server components by default. Only client components where interactivity is needed (forms, animations).

### Anti-Pattern 2: Shared Component Library Across Repos
**What:** Building a shared package between DMC and the SSC website.
**Why bad:** Coupling. Different release cycles, different purposes. A change to a shared button shouldn't require deploying both sites.
**Instead:** Shared design tokens (colors, fonts) documented in both repos. Copy patterns, don't share packages.

### Anti-Pattern 3: Over-Engineering the Blog
**What:** Building a full CMS, admin panel, draft/publish workflow.
**Why bad:** Nathan is the only author. A git commit IS the publish workflow.
**Instead:** MDX files in `/content/blog/`. `git push` = published. If volume ever demands a CMS, migrate then.

### Anti-Pattern 4: Building Product Features into the Marketing Site
**What:** Adding card scanning, inventory management, or pricing tools to slabsavvycpa.com.
**Why bad:** Splits engineering effort. SST and DMC are the products. The website sells them.
**Instead:** The website demonstrates products via screenshots, videos, and "try it" CTAs that redirect to the actual products.

### Anti-Pattern 5: Premature Community Features
**What:** Building a forum, Discord integration, or user-generated content before there's an audience.
**Why bad:** Empty communities are worse than no community. They signal "nobody uses this."
**Instead:** Link to Nathan's Telegram group. Build community on existing platforms first. Move to custom only when scale demands it.

## File Structure

```
ssc-website/
  src/
    app/
      layout.tsx            # Root layout (header, footer, analytics)
      page.tsx              # Homepage (hero + ecosystem sections)
      tracker/page.tsx      # SST product page
      photos/page.tsx       # DMC product page
      tax-playbook/page.tsx # Tax Playbook landing + download
      tax-ready/page.tsx    # Tax Ready service page
      about/page.tsx        # Nathan's story
      blog/
        page.tsx            # Blog index
        [slug]/page.tsx     # Individual blog post
      contact/page.tsx      # Contact form
      pricing/page.tsx      # Pricing comparison
      newsletter/page.tsx   # Newsletter signup
      api/
        newsletter/route.ts # Newsletter signup handler
        contact/route.ts    # Contact form handler
    components/
      ui/                   # Base UI components (Button, Card, Input)
      sections/             # Page sections (Hero, ProductShowcase, Testimonials)
      blog/                 # Blog-specific components (PostCard, TagList)
      forms/                # Form components (NewsletterForm, ContactForm)
      layout/               # Layout components (Header, Footer, Navigation)
    lib/
      mdx.ts               # MDX utilities (get posts, parse frontmatter)
      resend.ts             # Email sending utilities
      constants.ts          # Site-wide constants (URLs, product names)
    styles/
      globals.css           # Tailwind imports + custom styles
  content/
    blog/                   # MDX blog posts
    pages/                  # MDX content pages (Tax Playbook chapters)
  public/
    images/
      products/             # Product screenshots and demos
      blog/                 # Blog post images
      cards/                # Sample card images for hero/demos
    fonts/                  # Self-hosted fonts (Bebas Neue, DM Sans, JetBrains Mono)
  tailwind.config.ts        # SSC design system tokens
  next.config.ts            # Next.js config (MDX, images, redirects)
```

## Scalability Considerations

| Concern | At launch | At 1K monthly visitors | At 10K monthly visitors |
|---------|-----------|----------------------|------------------------|
| Hosting | Vercel Hobby (free) | Vercel Hobby (free) | Vercel Pro ($20/mo) |
| Email | Resend free tier (3K/mo) | Resend free tier | Resend Pro ($20/mo for 50K) |
| Analytics | PostHog free tier | PostHog free tier | PostHog free tier (1M events) |
| Content | MDX in repo | MDX in repo | MDX in repo (or consider CMS) |
| Images | Vercel Image Optimization | Vercel Image Optimization | May need image CDN |
| SEO | Basic meta tags + sitemap | Blog content drives organic | Structured data, rich snippets |

The architecture is designed to scale from $0/mo at launch to ~$40/mo at 10K monthly visitors. No premature infrastructure investment.

## Sources

- Next.js App Router documentation (training data, HIGH confidence)
- Vercel hosting tiers (training data, MEDIUM confidence -- verify current pricing)
- Resend pricing (training data, MEDIUM confidence -- verify current free tier limits)
- SSC design direction from memory file (HIGH confidence)
- SST architecture from memory file (HIGH confidence)
