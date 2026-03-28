# Technology Stack

**Project:** Slab Savvy Website (slabsavvycpa.com)
**Researched:** 2026-03-27

## Context

This is a marketing/brand website with content capabilities, NOT a SaaS application. SST and DMC are separate products with their own infrastructure. The website needs to:
- Look premium and sharp (reverse-DMC design direction)
- Load fast (card dealers browse on phones at shows)
- Support blog/newsletter content
- Showcase four products with dedicated landing sections
- Capture leads (email signups, free trial CTAs)
- Be maintainable by Nathan (CPA, not full-time dev)

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x | Full-stack React framework | SSR for SEO, App Router for layouts, API routes for form handling. Nathan already uses React/Next.js for DMC. Consistency across ecosystem. |
| TypeScript | 5.x | Type safety | Nathan's universal rule. Strict mode, no `any`. |
| Tailwind CSS | 4.x | Utility-first styling | Fast iteration, design system tokens map cleanly to SSC palette. Already used in DMC. |

### Content Management
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| MDX | 3.x | Blog posts and content pages | Write content in Markdown with React components. No CMS dependency, version-controlled, Nathan can write posts in VS Code or Obsidian. |
| next-mdx-remote | latest | MDX rendering in Next.js | Server-side MDX rendering without bundling issues. |
| gray-matter | latest | Frontmatter parsing | Extract metadata (title, date, tags) from MDX files. |

### Email & Newsletter
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Resend | latest API | Transactional + newsletter emails | Simple API, great DX, generous free tier (3K emails/mo), React Email templates. Modern alternative to SendGrid/Mailchimp. |
| React Email | latest | Email templates | Build email templates in React/TSX. Consistent with the rest of the stack. |

### Analytics & Tracking
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| PostHog | Cloud | Analytics, funnels, feature flags | Nathan already has PostHog MCP. Track which products get clicks, where visitors drop off. |

### Hosting & Deployment
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | Pro/Hobby | Hosting, CDN, previews | Nathan already uses Vercel for DMC. Zero-config Next.js deploys. Preview URLs for every PR. |

### Forms & Lead Capture
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Server Actions | Next.js built-in | Form handling | No separate API needed. Email signup, contact forms, free trial requests all handled in-app. |

### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| framer-motion | 11.x | Animations | Hero card scroll animation, section transitions, product card hover states |
| @radix-ui/react-* | latest | Accessible primitives | Accordions, tabs, dialogs for product feature sections |
| lucide-react | latest | Icons | Consistent icon set across ecosystem |
| sharp | latest | Image optimization | Card images, product screenshots |
| date-fns | latest | Date formatting | Blog post dates, "last updated" timestamps |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js | Astro | Astro is faster for pure static sites, but Next.js gives us API routes for forms, server actions, and future interactive features. Nathan already knows Next.js. |
| Framework | Next.js | Remix | Smaller ecosystem, less deployment flexibility with Vercel. No meaningful advantage for this use case. |
| CMS | MDX files | Sanity/Contentful | Overkill for a single-author blog. Adds complexity, cost, and another service to manage. MDX in the repo is simpler and Nathan can write in Obsidian. |
| CMS | MDX files | WordPress | Wrong ecosystem entirely. Slow, security headaches, doesn't fit the modern dev workflow. |
| Email | Resend | Mailchimp | Mailchimp is bloated, expensive at scale, and the DX is poor. Resend is API-first and fits a developer workflow. |
| Email | Resend | ConvertKit | Better for pure creators. Overkill for what starts as a simple newsletter + lead capture. Can migrate later if needed. |
| Styling | Tailwind | CSS Modules | Tailwind is faster to iterate and Nathan is already using it across projects. Design tokens map directly to Tailwind config. |
| Analytics | PostHog | Google Analytics | PostHog already integrated in Nathan's workflow via MCP. Better funnels, session replay, feature flags. Privacy-friendlier. |
| Hosting | Vercel | Netlify | Nathan already has Vercel setup and CLI. Zero switching cost. |

## Design System Integration

The SSC design direction (reverse-DMC) maps directly to Tailwind config:

```typescript
// tailwind.config.ts (relevant theme extension)
{
  colors: {
    'ssc-bg': '#FAFAF8',
    'ssc-surface': '#FFFFFF',
    'ssc-text': '#0A0A0A',
    'ssc-text-muted': '#6B6B78',
    'ssc-gold': '#C9A227',
    'ssc-gold-dark': '#8B7318',
    'ssc-black': '#0A0A0A',
    'ssc-border': '#E8E5DF',
  },
  fontFamily: {
    headline: ['Bebas Neue', 'sans-serif'],
    body: ['DM Sans', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  }
}
```

## Installation

```bash
# Core
npx create-next-app@latest ssc-website --typescript --tailwind --app --src-dir

# Content
npm install next-mdx-remote gray-matter

# UI & Animation
npm install framer-motion @radix-ui/react-accordion @radix-ui/react-tabs @radix-ui/react-dialog lucide-react

# Email
npm install resend @react-email/components

# Utilities
npm install date-fns sharp

# Dev dependencies
npm install -D @types/node
```

## Key Decisions

1. **No headless CMS** -- MDX in the repo is simpler for a single-author site. Nathan writes in Obsidian, copies to repo, done. If content volume grows significantly, revisit with Sanity.

2. **No database** -- The website itself doesn't need one. SST has Supabase. DMC has Supabase. The website is content + marketing. Forms send emails via Resend, leads tracked in PostHog.

3. **No auth** -- The website doesn't have user accounts. SST onboarding is via Telegram. DMC has its own auth. The website just drives traffic.

4. **Shared design DNA, separate repos** -- The website shares typography and color DNA with DMC but lives in its own repo. Don't try to share components across repos -- the sites serve different purposes.

## Sources

- Next.js 15 docs (training data, HIGH confidence)
- Tailwind CSS 4 docs (training data, HIGH confidence)
- Resend API docs (training data, MEDIUM confidence -- verify current pricing/limits)
- Vercel deployment docs (training data, HIGH confidence)
- Nathan's existing DMC stack as reference (from memory files)
