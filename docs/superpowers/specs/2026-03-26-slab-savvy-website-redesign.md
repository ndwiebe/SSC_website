# Slab Savvy Website Redesign — Design Spec

**Date:** 2026-03-26
**Deadline:** April 4, 2026 (Expo)
**Repo:** ~/Projects/SSC_website/
**Live:** slabsavvycpa.com (Vercel project: ssc-website)

---

## 1. Project Overview

Full rebuild of slabsavvycpa.com as the hub for the Slab Savvy ecosystem — a business platform for sports card dealers and flippers. The site serves as a follow-up tool for expo attendees scanning a QR code, and as the landing page for Tax Playbook readers hitting /taxready and /spreadsheet.

**Target audience:** Serious card flippers and dealers doing $10K-$100K+/year in sales. Not casual hobbyists.

**Brand positioning:** "Slab Savvy" (not "Slab Savvy CPA"). CPA is a trust signal, not the identity. The brand is the ecosystem — tools, content, and services that help dealers run their card business.

---

## 2. Pages

### 2.1 Homepage (/)
The ecosystem landing page. One killer hero with card scroll animation, then sections showcasing the ecosystem products.

**Hero:**
- Antimetal-inspired full-screen card scroll animation as background
- A real sports card transforms: raw phone photo → spinning with particle effects → lands on DMC-enhanced background
- Content overlaid with glassmorphism containers (bg-white/80 backdrop-blur)
- Headline, subtext, and 2-3 CTA buttons on top
- Animation tied to scroll position (frame-by-frame playback via extracted .webp frames)
- On mobile: animation IS the hero, full-width card transforms as you scroll

**Below hero sections:**
- Ecosystem overview — bento grid or product cards showing SST, DMC, Tax Playbook, Services
- Each product card: icon/gradient identity, one-liner, CTA
- Stats/proof bar (if available): cards tracked, enhancements made, etc.
- "Built by a collector who's also a CPA" trust section
- Footer with ecosystem links, social links, contact

**Copy tone:** Firecrawl-level swagger. "Stop using a Notes app to track your $50K inventory." Entrepreneur-first, acknowledges the hustle.

### 2.2 Spreadsheet Access (/spreadsheet)
**No changes.** Keep the existing Supabase-powered access gate. Only visual updates to match the new design system (palette, typography, sharp corners).

### 2.3 Tax Ready (/taxready)
Landing page for the inventory reconciliation service.

**Content:**
- Hero: what the service is (digital exports → accountant-ready package)
- How it works: 3-4 step process (send exports → AI reconciliation → QC review → delivery)
- What you get: clean spreadsheet + summary memo for your accountant
- Pricing: tiers by transaction volume (casual/active/heavy) or "starting at" with contact for quote
- CTA: contact form or Calendly booking link
- Trust signals: CPA designation, "I use the same process for my own cards"

**Note:** Copy may come from Nathan's other Claude project. Placeholder structure needed at minimum.

### 2.4 SST Waitlist (/waitlist)
Beta signup page for Slab Savvy Tracker.

**Content:**
- Product explainer: what SST does (send photo → confirm details → row in spreadsheet + comps)
- Short animated video/demo of the Telegram bot flow (if available) or animated mockup
- Features list: inventory tracking, 130point comp search, Google Sheets output, Telegram/WhatsApp
- Pricing preview: 4 tiers (Hobby $25 / Side Hustle $59 / Full-Time $119 / High Volume $219 CAD)
- Email capture form with optional "How many cards do you sell per month?" field (Under 50 / 50-200 / 200-500 / 500+)
- Supabase edge function to store signups

---

## 3. Design System — "Reverse DMC"

### 3.1 Palette
| Token | Hex | Usage |
|-------|-----|-------|
| ssc-bg | #FAFAF8 | Warm white page base |
| ssc-surface | #FFFFFF | Cards, content blocks |
| ssc-text | #0A0A0A | Primary text |
| ssc-text-muted | #6B6B78 | Secondary text |
| ssc-gold | #C9A227 | Primary accent (ecosystem link) |
| ssc-gold-dark | #8B7318 | Hover states |
| ssc-gold-light | #E5C84C | Highlights |
| ssc-black | #0A0A0A | Dark sections, accents |
| ssc-surface-dark | #141417 | Dark section backgrounds |
| ssc-border | #E8E5DF | Light borders |
| ssc-border-dark | #2A2A35 | Dark section borders |

### 3.2 Typography
| Element | Font | Fallback |
|---------|------|----------|
| Headlines/Display | Bebas Neue | Impact, sans-serif |
| Body | DM Sans | -apple-system, sans-serif |
| Numbers/Prices/Code | JetBrains Mono | monospace |

Evaluate Satoshi or General Sans (Fontshare, free) as DM Sans alternative if it looks too similar to DMC.

### 3.3 Design Rules
- **Sharp corners everywhere** — border-radius: 0 on all elements. This is the Slab Savvy brand signature.
- **No rounded buttons, no rounded cards.** Override frontend-design skill defaults via Brand Guidelines.
- **Gold shadows** — box-shadow uses gold tones (rgba(201, 162, 39, 0.15)) not generic black
- **Hover lift** — translateY(-2px) with gold shadow on interactive elements
- **Glassmorphism** for content over animation: bg-white/80 backdrop-blur-sm
- **Ban list:** Inter font, Arial, Indigo 500, purple gradients, 3-column default grids, rounded white cards

### 3.4 Responsive
- **Mobile-first** — default styles are mobile (375px), use md: breakpoint for desktop
- **Test at 375px** — every section, every animation, every font size
- **Bottom sticky CTA on mobile** — "Get Started" / "Join Waitlist" always in thumb reach
- **44px minimum tap targets** on all interactive elements

---

## 4. Card Scroll Animation

### 4.1 Pipeline
1. **Source:** Nathan provides a before photo of a real sports card (phone photo quality)
2. **Nano Banana 2:** Generate start frame (card on clean white background, nothing touching edges) and end frame (card on DMC-enhanced background)
3. **Kling 3.0:** Animate the transformation — card spins, particle effects, background morphs
4. **FFmpeg:** Extract frames as .webp files (200-400 frames)
5. **Scroll binding:** JavaScript ties frame index to scroll position
6. **Fallback:** Static before/after image for browsers/devices that can't handle frame playback

### 4.2 Gotchas (from NotebookLM research)
- Generate Nano Banana assets on **clean white background** with **nothing touching edges** — or they won't blend into #FAFAF8
- **Disable Puppeteer screenshot loop** when working on animated backgrounds — Claude gets stuck in infinite loop
- **Git-track the frames** or ensure they're in the Vercel deployment — .gitignore exclusion = invisible animations
- **useReducedMotion** for accessibility — fall back to static image
- On mobile: frames should be optimized for size (100-200KB total for mobile connection)

### 4.3 Risk Mitigation
- Build the site with static hero FIRST, animation layered on top
- If animation pipeline fails or takes too long, ship with premium static hero + CSS animations (GSAP fade-ins, scroll reveals)
- Animation is an enhancement, not a blocker

---

## 5. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js (App Router) or Astro | SSR/SSG for SEO, React for interactivity |
| Styling | Tailwind CSS v4 | Already know it from DMC |
| Animation | GSAP + Framer Motion | Scroll reveals, hover effects, scroll-driven frame playback |
| Backend | Supabase | Existing spreadsheet gate + new waitlist signup function |
| Deployment | Vercel | Existing project, auto-deploy from GitHub |
| Fonts | Google Fonts (Bebas Neue, DM Sans, JetBrains Mono) | Free, fast CDN |
| Components | 21st.dev, Aceternity UI, ShadCN | Premium pre-built components, adapted to sharp-corner brand |

**Decision needed:** Next.js vs Astro. Astro is faster for a mostly-static site with islands of interactivity. Next.js is more familiar from the DMC ecosystem. Recommend Next.js for consistency.

---

## 6. Supabase

### 6.1 Existing
- `spreadsheet_access` table — keep as-is
- `validate-spreadsheet-code` edge function — keep as-is

### 6.2 New
- `waitlist_signups` table: id (uuid), email (text), monthly_volume (text, nullable), created_at (timestamptz), ip_address (text), user_agent (text)
- `submit-waitlist` edge function: validates email, stores signup, returns success. CORS headers, service role key, insert-only.
- Optional: `taxready_inquiries` table + edge function for contact form submissions

---

## 7. CLAUDE.md Rules for Build

```markdown
# SSC Website Build Rules

## Design
- Act as a senior UI designer and front-end developer
- Always invoke the frontend_design skill before writing any frontend code
- Override: border-radius must be 0 on ALL elements — sharp corners are the brand signature
- Ban: Inter font, Arial, Indigo 500, purple gradients, 3-column grids, rounded corners
- Use: Bebas Neue headlines, DM Sans body, JetBrains Mono numbers
- Palette: warm white base (#FAFAF8), gold accent (#C9A227), black (#0A0A0A)
- Glassmorphism: bg-white/80 backdrop-blur-sm for content over animations
- Gold shadows: rgba(201, 162, 39, 0.15)

## Animation
- Disable Puppeteer screenshot loop when implementing animated backgrounds
- GSAP/Framer Motion for scroll reveals (300ms delay on hover effects)
- Scroll-driven video: frames tied to scroll position, .webp format
- Always implement useReducedMotion fallback

## Code
- TypeScript strict mode, no .js files
- No console.log — use proper logging
- Test at 375px mobile viewport
- Sharp corners: rounded-none on everything, override any component library defaults
```

---

## 8. Build Phases

### Phase 1: Foundation (Day 1-2)
- Scaffold Next.js + Tailwind project with design system tokens
- Set up fonts, palette, sharp-corner overrides
- Build shared components: Nav, Footer, Button, Card, Section layouts
- Deploy empty shell to Vercel to verify pipeline

### Phase 2: Homepage (Day 2-4)
- Static hero with before/after card image + CSS animations
- Ecosystem bento grid / product cards
- Stats bar, trust section, CTAs
- Mobile-first responsive throughout
- GSAP scroll reveals on sections

### Phase 3: Sub-pages (Day 4-5)
- /taxready — service landing page with process steps + contact form
- /waitlist — SST product explainer + email capture + Supabase integration
- /spreadsheet — restyle existing gate page to match new design system

### Phase 4: Card Scroll Animation (Day 5-7)
- Nathan provides source card photo
- Generate Nano Banana start/end frames
- Animate in Kling 3.0
- Extract frames, implement scroll-driven playback
- Fallback to static if pipeline fails

### Phase 5: Polish & Ship (Day 7-9)
- Cross-browser testing
- Mobile testing at 375px
- Performance optimization (image compression, lazy loading)
- SEO: meta tags, JSON-LD, Open Graph
- QR code generation for expo
- Final deploy to production

---

## 9. Success Criteria

- [ ] Homepage loads in under 3 seconds on mobile
- [ ] Card scroll animation plays smoothly (or graceful fallback)
- [ ] /spreadsheet still works (existing Supabase gate)
- [ ] /taxready clearly explains the service with working contact mechanism
- [ ] /waitlist captures email + optional volume tier to Supabase
- [ ] All pages look premium at 375px mobile viewport
- [ ] Sharp corners on every element — zero border-radius anywhere
- [ ] QR code ready for expo handout
- [ ] Deployed to slabsavvycpa.com before April 4

---

## 10. Dependencies on Nathan

- [ ] Choose a card photo for the scroll animation (before photo, phone quality)
- [ ] Provide /taxready copy (or approve AI-generated draft)
- [ ] Review and approve the live site before expo
- [ ] Generate QR code pointing to slabsavvycpa.com (or approve one I generate)
