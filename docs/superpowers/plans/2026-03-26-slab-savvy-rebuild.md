# Slab Savvy Website Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild slabsavvycpa.com as a premium ecosystem landing page with 4 routes (/, /spreadsheet, /taxready, /waitlist) featuring a scroll-driven card transformation animation, ready for expo on April 4.

**Architecture:** Next.js 14 App Router with Tailwind CSS, GSAP for scroll animations, Framer Motion for micro-interactions. Supabase for waitlist signups and existing spreadsheet gate. Static export deployed to Vercel.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v4, GSAP, Framer Motion, Supabase, Vercel, Google Fonts (Bebas Neue, DM Sans, JetBrains Mono)

**Spec:** `docs/superpowers/specs/2026-03-26-slab-savvy-website-redesign.md`

---

## File Structure

```
project/
├── public/
│   ├── fonts/                     # Self-hosted font files if needed
│   ├── images/
│   │   ├── ssc-logo.png           # Existing logo
│   │   ├── card-before.webp       # Source card photo (Nathan provides)
│   │   ├── card-after.webp        # DMC-enhanced version
│   │   └── hero-frames/           # Extracted animation frames (Phase 4)
│   └── card-placeholder.svg       # Keep existing SVG
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout: fonts, metadata, nav, footer
│   │   ├── page.tsx               # Homepage
│   │   ├── globals.css            # Tailwind directives + design tokens
│   │   ├── spreadsheet/
│   │   │   └── page.tsx           # Spreadsheet access gate (migrated)
│   │   ├── taxready/
│   │   │   └── page.tsx           # Records service landing page
│   │   └── waitlist/
│   │       └── page.tsx           # SST beta waitlist
│   ├── components/
│   │   ├── Nav.tsx                # Site navigation
│   │   ├── Footer.tsx             # Site footer with ecosystem links
│   │   ├── Button.tsx             # Shared button (gold accent, sharp corners)
│   │   ├── SectionHeading.tsx     # Reusable section title + subtitle
│   │   ├── ProductCard.tsx        # Ecosystem product card (bento grid cell)
│   │   ├── HeroScrollAnimation.tsx # Scroll-driven frame playback component
│   │   ├── HeroStatic.tsx         # Static fallback hero (before animation is ready)
│   │   ├── WaitlistForm.tsx       # Email capture + volume tier
│   │   ├── SpreadsheetForm.tsx    # Migrated access code form
│   │   ├── ContactForm.tsx        # Taxready inquiry form
│   │   ├── StatsBar.tsx           # Social proof numbers
│   │   ├── ProcessSteps.tsx       # Reusable step-by-step section
│   │   └── MobileStickyCTA.tsx    # Bottom sticky bar on mobile
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client init
│   │   └── animations.ts          # GSAP scroll trigger setup helpers
│   └── hooks/
│       ├── useScrollFrames.ts     # Hook for scroll-driven frame playback
│       └── useReducedMotion.ts    # Accessibility: prefers-reduced-motion
├── supabase/
│   ├── migrations/
│   │   ├── 20260310223353_create_spreadsheet_access.sql  # Existing
│   │   └── 20260326_create_waitlist_signups.sql          # New
│   └── functions/
│       ├── validate-spreadsheet-code/index.ts            # Existing
│       └── submit-waitlist/index.ts                      # New
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Initialize Next.js project in a clean directory**

The existing `project/` directory has the old Vite app. We'll build the new site alongside it and swap when ready.

```bash
cd ~/Projects/SSC_website
npx create-next-app@latest site --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

Accept defaults. This creates `site/` directory.

- [ ] **Step 2: Install dependencies**

```bash
cd ~/Projects/SSC_website/site
npm install gsap @gsap/react framer-motion @supabase/supabase-js
```

- [ ] **Step 3: Configure Tailwind with design system tokens**

Replace `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ssc: {
          bg: "#FAFAF8",
          surface: "#FFFFFF",
          text: "#0A0A0A",
          "text-muted": "#6B6B78",
          gold: "#C9A227",
          "gold-dark": "#8B7318",
          "gold-light": "#E5C84C",
          black: "#0A0A0A",
          "surface-dark": "#141417",
          border: "#E8E5DF",
          "border-dark": "#2A2A35",
        },
      },
      fontFamily: {
        headline: ['"Bebas Neue"', "Impact", "sans-serif"],
        body: ['"DM Sans"', "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px",
      },
      boxShadow: {
        gold: "0 4px 20px rgba(201, 162, 39, 0.15)",
        "gold-lg": "0 8px 40px rgba(201, 162, 39, 0.2)",
        "gold-hover": "0 12px 24px rgba(201, 162, 39, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
```

Note: Every `borderRadius` value set to `"0px"` — this forces sharp corners globally and overrides any component library defaults.

- [ ] **Step 4: Set up globals.css with fonts and base styles**

Replace `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --font-headline: "Bebas Neue", Impact, sans-serif;
  --font-body: "DM Sans", -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

body {
  font-family: var(--font-body);
  background-color: #FAFAF8;
  color: #0A0A0A;
}

/* Sharp corners override — nuclear option */
* {
  border-radius: 0 !important;
}

/* Gold hover lift */
.hover-lift {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(201, 162, 39, 0.12);
}

/* Glassmorphism utility */
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

- [ ] **Step 5: Set up root layout with Google Fonts**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Slab Savvy — Run Your Card Business",
  description:
    "The collector's business platform. Inventory tracking, AI photo enhancement, tax guides, and consulting — built by a CPA who collects.",
  openGraph: {
    title: "Slab Savvy — Run Your Card Business",
    description:
      "The collector's business platform. Inventory tracking, AI photo enhancement, tax guides, and consulting.",
    url: "https://slabsavvycpa.com",
    siteName: "Slab Savvy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-ssc-bg font-body text-ssc-text flex flex-col">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Create placeholder homepage**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="flex-1">
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-6xl md:text-8xl text-ssc-gold tracking-wide">
            SLAB SAVVY
          </h1>
          <p className="font-body text-xl text-ssc-text-muted mt-4">
            Run your card business. All of it.
          </p>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 7: Verify dev server runs**

```bash
cd ~/Projects/SSC_website/site
npm run dev
```

Expected: Site loads at localhost:3000 showing "SLAB SAVVY" in gold Bebas Neue with sharp corners and warm white background.

- [ ] **Step 8: Commit**

```bash
cd ~/Projects/SSC_website/site
git add -A
git commit -m "feat: scaffold Next.js project with Reverse DMC design system

- Next.js 14 App Router + TypeScript + Tailwind
- Design tokens: warm white base, gold accent, black text
- Sharp corners enforced globally (border-radius: 0 on everything)
- Fonts: Bebas Neue headlines, DM Sans body, JetBrains Mono numbers
- GSAP + Framer Motion installed for animations

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Shared Components (Nav, Footer, Button)

**Files:**
- Create: `src/components/Nav.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/Button.tsx`
- Create: `src/components/SectionHeading.tsx`
- Create: `src/components/MobileStickyCTA.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Build Nav component**

Create `src/components/Nav.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Tracker", href: "/waitlist" },
  { name: "Tax Ready", href: "/taxready" },
  { name: "Playbook", href: "/spreadsheet" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-ssc-bg/90 backdrop-blur-md border-b border-ssc-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/images/ssc-logo.png"
              alt="Slab Savvy"
              className="w-10 h-10 object-cover"
            />
            <span className="font-headline text-xl tracking-wide text-ssc-text">
              SLAB SAVVY
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-body font-medium text-ssc-text-muted hover:text-ssc-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/waitlist"
              className="ml-4 px-6 py-2 bg-ssc-gold text-white font-body font-semibold text-sm hover:bg-ssc-gold-dark transition-colors"
            >
              Join Waitlist
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-ssc-text"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="square" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="square" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-ssc-border">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-body font-medium text-ssc-text-muted hover:text-ssc-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/waitlist"
              onClick={() => setIsOpen(false)}
              className="block mx-4 mt-2 px-6 py-3 bg-ssc-gold text-white font-body font-semibold text-center"
            >
              Join Waitlist
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Build Footer component**

Create `src/components/Footer.tsx`:

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ssc-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/images/ssc-logo.png" alt="Slab Savvy" className="w-10 h-10 object-cover" />
              <span className="font-headline text-xl tracking-wide text-ssc-gold">
                SLAB SAVVY
              </span>
            </div>
            <p className="text-sm text-gray-400 font-body">
              The collector&apos;s business platform. Built by a CPA who rips packs.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-headline text-sm tracking-widest text-ssc-gold mb-4">PRODUCTS</h3>
            <ul className="space-y-2 font-body text-sm">
              <li><Link href="/waitlist" className="text-gray-400 hover:text-white transition-colors">Slab Savvy Tracker</Link></li>
              <li><a href="https://displaymycard.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">DisplayMyCard</a></li>
              <li><Link href="/spreadsheet" className="text-gray-400 hover:text-white transition-colors">Tax Playbook</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-headline text-sm tracking-widest text-ssc-gold mb-4">SERVICES</h3>
            <ul className="space-y-2 font-body text-sm">
              <li><Link href="/taxready" className="text-gray-400 hover:text-white transition-colors">Tax Ready</Link></li>
              <li><Link href="/taxready" className="text-gray-400 hover:text-white transition-colors">AI Consulting</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-headline text-sm tracking-widest text-ssc-gold mb-4">CONNECT</h3>
            <ul className="space-y-2 font-body text-sm">
              <li><a href="mailto:hello@slabsavvycpa.com" className="text-gray-400 hover:text-white transition-colors">hello@slabsavvycpa.com</a></li>
              <li><span className="text-gray-400">Facebook: Slab Savvy CPA</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ssc-border-dark mt-8 pt-8 text-center text-gray-500 text-sm font-body">
          <p>&copy; 2025 Slab Savvy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Build Button component**

Create `src/components/Button.tsx`:

```tsx
import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

const variants = {
  primary: "bg-ssc-gold text-white hover:bg-ssc-gold-dark",
  secondary: "border-2 border-ssc-gold text-ssc-gold hover:bg-ssc-gold hover:text-white",
  dark: "bg-ssc-black text-white hover:bg-ssc-surface-dark",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  external = false,
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-body font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 4: Build SectionHeading component**

Create `src/components/SectionHeading.tsx`:

```tsx
type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <h2
        className={`font-headline text-3xl md:text-5xl tracking-wide ${
          dark ? "text-ssc-gold" : "text-ssc-text"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-body text-lg mt-3 max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "text-gray-400" : "text-ssc-text-muted"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Build MobileStickyCTA component**

Create `src/components/MobileStickyCTA.tsx`:

```tsx
import Link from "next/link";

type MobileStickyCTAProps = {
  text: string;
  href: string;
};

export function MobileStickyCTA({ text, href }: MobileStickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-ssc-bg/95 backdrop-blur-md border-t border-ssc-border p-3">
      <Link
        href={href}
        className="block w-full py-3 bg-ssc-gold text-white font-body font-semibold text-center text-base min-h-[44px]"
      >
        {text}
      </Link>
    </div>
  );
}
```

- [ ] **Step 6: Wire Nav and Footer into layout**

Update `src/app/layout.tsx` — add imports and wrap children:

```tsx
// Add to imports:
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Update body content:
<body className="min-h-screen bg-ssc-bg font-body text-ssc-text flex flex-col">
  <Nav />
  <main className="flex-1">{children}</main>
  <Footer />
</body>
```

- [ ] **Step 7: Verify components render**

```bash
npm run dev
```

Expected: Nav with logo + links at top, footer at bottom, placeholder hero in the middle. All sharp corners, gold accents, warm white background.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add shared components (Nav, Footer, Button, SectionHeading, MobileStickyCTA)

- Responsive nav with mobile hamburger menu
- Dark footer with ecosystem links
- Button component with primary/secondary/dark variants
- SectionHeading for consistent page titles
- Mobile sticky CTA bar (hidden on desktop)
- All components enforce sharp corners and gold accent system

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Homepage — Static Hero + Ecosystem Sections

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/HeroStatic.tsx`
- Create: `src/components/ProductCard.tsx`
- Create: `src/components/StatsBar.tsx`
- Create: `src/lib/animations.ts`

- [ ] **Step 1: Create GSAP scroll animation helper**

Create `src/lib/animations.ts`:

```tsx
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function fadeInUp(element: string | Element, delay = 0) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function staggerFadeInUp(parent: string, children: string, stagger = 0.15) {
  return gsap.fromTo(
    `${parent} ${children}`,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: parent,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Build static hero**

Create `src/components/HeroStatic.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { Button } from "./Button";
import { gsap } from "@/lib/animations";

export function HeroStatic() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
      );
    }
    if (subtextRef.current) {
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — will be replaced with scroll animation in Phase 4 */}
      <div className="absolute inset-0 bg-gradient-to-b from-ssc-bg via-ssc-bg to-ssc-border/30" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1
          ref={headlineRef}
          className="font-headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-ssc-text tracking-wide leading-none opacity-0"
        >
          RUN YOUR CARD
          <br />
          <span className="text-ssc-gold">BUSINESS</span>
        </h1>

        <p
          ref={subtextRef}
          className="font-body text-lg md:text-xl text-ssc-text-muted mt-6 max-w-2xl mx-auto opacity-0"
        >
          Inventory tracking. AI photo enhancement. Tax guides. Comps.
          One ecosystem, built by a collector who&apos;s also a CPA.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mt-10 opacity-0">
          <Button href="/waitlist" size="lg">
            Join the Waitlist
          </Button>
          <Button href="/taxready" variant="secondary" size="lg">
            Get Tax Ready
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Build ProductCard component**

Create `src/components/ProductCard.tsx`:

```tsx
import { Button } from "./Button";

type ProductCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  cta: string;
  gradient: string;
  external?: boolean;
  span?: "normal" | "wide";
};

export function ProductCard({
  title,
  description,
  icon,
  href,
  cta,
  gradient,
  external = false,
  span = "normal",
}: ProductCardProps) {
  return (
    <div
      className={`group relative border border-ssc-border bg-ssc-surface p-8 hover-lift overflow-hidden ${
        span === "wide" ? "md:col-span-2" : ""
      }`}
    >
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${gradient}`} />

      <div className="w-12 h-12 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mb-6">
        {icon}
      </div>

      <h3 className="font-headline text-2xl text-ssc-text tracking-wide mb-3">
        {title}
      </h3>
      <p className="font-body text-ssc-text-muted mb-6">{description}</p>

      <Button href={href} variant="secondary" size="sm" external={external}>
        {cta}
      </Button>
    </div>
  );
}
```

- [ ] **Step 4: Build StatsBar component**

Create `src/components/StatsBar.tsx`:

```tsx
type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "$4.99", label: "DMC Pro / month" },
  { value: "30s", label: "to log a card" },
  { value: "124", label: "team backgrounds" },
  { value: "100%", label: "built with AI" },
];

export function StatsBar() {
  return (
    <section className="bg-ssc-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-bold text-ssc-gold">
                {stat.value}
              </div>
              <div className="font-body text-sm text-gray-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Assemble homepage**

Replace `src/app/page.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { HeroStatic } from "@/components/HeroStatic";
import { ProductCard } from "@/components/ProductCard";
import { StatsBar } from "@/components/StatsBar";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { staggerFadeInUp, fadeInUp } from "@/lib/animations";

export default function Home() {
  useEffect(() => {
    staggerFadeInUp("#ecosystem", ".product-card", 0.15);
    fadeInUp("#trust-section");
  }, []);

  return (
    <>
      <HeroStatic />

      {/* Ecosystem Section */}
      <section id="ecosystem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          title="THE ECOSYSTEM"
          subtitle="Everything you need to run your card business. Track, photograph, list, and stay tax-ready."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <ProductCard
            title="SLAB SAVVY TRACKER"
            description="Send a photo of your card. Confirm the details. Get a row in your spreadsheet and real-time comps from 130point. Works with Telegram and WhatsApp."
            icon={<svg className="w-6 h-6 text-ssc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
            href="/waitlist"
            cta="Join the Beta"
            gradient="bg-gradient-to-r from-ssc-gold to-ssc-gold-light"
            span="wide"
          />
          <ProductCard
            title="DISPLAYMYCARD"
            description="AI photo enhancement that makes your cards look professional for social media and listings. Less than a pack of cards per month."
            icon={<svg className="w-6 h-6 text-ssc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            href="https://displaymycard.com"
            cta="Try It Free"
            gradient="bg-gradient-to-r from-amber-500 to-amber-300"
            external
          />
          <ProductCard
            title="TAX PLAYBOOK"
            description="The Card Collector's Tax Playbook. Everything Canadian collectors need to know about taxes when selling cards. Written by a CPA who actually rips packs."
            icon={<svg className="w-6 h-6 text-ssc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            href="/spreadsheet"
            cta="Get the Playbook"
            gradient="bg-gradient-to-r from-emerald-600 to-emerald-400"
          />
          <ProductCard
            title="TAX READY"
            description="Behind on your records? Send me your digital exports and I'll turn them into a clean package your accountant can actually work with."
            icon={<svg className="w-6 h-6 text-ssc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
            href="/taxready"
            cta="Learn More"
            gradient="bg-gradient-to-r from-ssc-gold to-ssc-gold-dark"
          />
        </div>
      </section>

      <StatsBar />

      {/* Trust Section */}
      <section id="trust-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title="BUILT BY A COLLECTOR WHO'S ALSO A CPA"
              align="left"
            />
            <p className="font-body text-lg text-ssc-text-muted mt-6">
              Most CPAs don&apos;t know what a YG is. Most card dealers don&apos;t know what an
              adjusted cost base is. I&apos;m both. Every tool in this ecosystem was built because
              I needed it for my own collection and my own tax returns.
            </p>
            <p className="font-body text-lg text-ssc-text-muted mt-4">
              I&apos;m active in 15+ Facebook collector groups, mostly hockey.
              If you&apos;ve got a tax question about your card sales, I&apos;m the guy
              who actually gets it.
            </p>
            <div className="mt-8">
              <Button href="/taxready" variant="secondary">
                Work With Me
              </Button>
            </div>
          </div>
          <div className="bg-ssc-black p-8">
            <div className="space-y-6">
              {[
                { label: "CPA Designation", value: "Chartered Professional Accountant" },
                { label: "Collector Since", value: "15+ years" },
                { label: "Facebook Groups", value: "15+ active" },
                { label: "Built With", value: "AI + zero coding experience" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center border-b border-ssc-border-dark pb-4">
                  <span className="font-body text-gray-400">{item.label}</span>
                  <span className="font-mono text-ssc-gold font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-ssc-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-headline text-4xl md:text-5xl text-ssc-gold tracking-wide mb-4">
            STOP WINGING IT
          </h2>
          <p className="font-body text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Your card business deserves real tools. Join the waitlist for Slab Savvy Tracker
            and be the first to know when it launches.
          </p>
          <Button href="/waitlist" size="lg">
            Join the Waitlist
          </Button>
        </div>
      </section>

      <MobileStickyCTA text="Join the Waitlist" href="/waitlist" />
    </>
  );
}
```

- [ ] **Step 6: Verify homepage renders correctly**

```bash
npm run dev
```

Expected: Full homepage with blur-reveal hero, 4-card ecosystem grid with staggered fade-in, stats bar, trust section, CTA band. All sharp corners, gold accents, warm white base. Mobile hamburger works at 375px.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: build homepage with hero, ecosystem grid, stats, trust section

- Blur-to-sharp hero animation (Antimetal-inspired)
- 4-product bento grid with per-product gradient identity
- Stats bar with monospace numbers
- Trust section: CPA + collector credibility
- GSAP scroll-triggered staggered reveals
- Mobile sticky CTA bar
- All sections mobile-first responsive

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: /spreadsheet — Restyle Existing Gate

**Files:**
- Create: `src/app/spreadsheet/page.tsx`
- Create: `src/components/SpreadsheetForm.tsx`

- [ ] **Step 1: Build SpreadsheetForm component**

Create `src/components/SpreadsheetForm.tsx`:

```tsx
"use client";

import { useState } from "react";

export function SpreadsheetForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sheetUrl, setSheetUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/validate-spreadsheet-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
          },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setSheetUrl(data.sheet_url);
        setIsUnlocked(true);
      } else {
        setError(data.error || "Invalid code.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isUnlocked) {
    return (
      <div className="bg-ssc-surface border border-ssc-border p-8 text-center">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-headline text-2xl text-ssc-text tracking-wide mb-3">YOU&apos;RE IN</h2>
        <p className="font-body text-ssc-text-muted mb-6">
          Your tracking spreadsheet is ready. Make a copy to your own Google Drive and start tracking.
        </p>
        <a
          href={sheetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-3 bg-ssc-gold text-white font-body font-semibold hover:bg-ssc-gold-dark transition-colors"
        >
          Open Google Sheet (Make a Copy)
        </a>
        <p className="font-body text-xs text-ssc-text-muted mt-4">
          Click &ldquo;File&rdquo; then &ldquo;Make a copy&rdquo; to save it to your own Google Drive.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-ssc-surface border border-ssc-border p-8">
      <h2 className="font-headline text-xl text-ssc-text tracking-wide mb-6">
        ENTER YOUR ACCESS CODE
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-body font-medium text-ssc-text mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-bg text-ssc-text font-body"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-ssc-text mb-2">
            Access Code *
          </label>
          <input
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full px-4 py-3 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-bg text-ssc-text font-mono tracking-wider"
            placeholder="PLAYBOOK2025"
          />
          <p className="font-body text-xs text-ssc-text-muted mt-2">
            Your access code is on the last page of the Tax Playbook.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-3">
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-ssc-gold hover:bg-ssc-gold-dark disabled:bg-ssc-text-muted text-white px-6 py-3 font-body font-semibold transition-colors flex items-center justify-center min-h-[44px]"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Unlock Spreadsheet"
          )}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Build spreadsheet page**

Create `src/app/spreadsheet/page.tsx`:

```tsx
import { SpreadsheetForm } from "@/components/SpreadsheetForm";
import { SectionHeading } from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Tracking Spreadsheet — Slab Savvy",
  description: "Access your Card Collector's Tax Playbook tracking spreadsheet.",
};

export default function SpreadsheetPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-ssc-black py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <SectionHeading
            title="TAX TRACKING SPREADSHEET"
            subtitle="The tracking spreadsheet included with The Card Collector's Tax Playbook. Enter your email and access code below."
            dark
          />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-12">
        <SpreadsheetForm />

        <div className="bg-ssc-black p-6 mt-8 text-center">
          <h3 className="font-headline text-lg text-ssc-gold tracking-wide mb-3">
            DON&apos;T HAVE A CODE?
          </h3>
          <p className="font-body text-gray-400 text-sm mb-4">
            The access code comes with The Card Collector&apos;s Tax Playbook —
            a $29 digital guide covering everything Canadian collectors need to
            know about taxes on card sales.
          </p>
          <div className="font-mono text-xl font-bold text-ssc-gold">$29</div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify spreadsheet page**

Navigate to `localhost:3000/spreadsheet`. Expected: clean page matching new design system with working form (requires Supabase env vars).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add /spreadsheet page — restyled existing gate with new design system

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: /taxready — Records Service Landing Page

**Files:**
- Create: `src/app/taxready/page.tsx`
- Create: `src/components/ProcessSteps.tsx`
- Create: `src/components/ContactForm.tsx`

- [ ] **Step 1: Build ProcessSteps component**

Create `src/components/ProcessSteps.tsx`:

```tsx
type Step = {
  number: string;
  title: string;
  description: string;
};

type ProcessStepsProps = {
  steps: Step[];
};

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step) => (
        <div key={step.number} className="text-center">
          <div className="w-14 h-14 bg-ssc-gold text-white flex items-center justify-center font-mono text-xl font-bold mx-auto mb-4">
            {step.number}
          </div>
          <h3 className="font-headline text-lg text-ssc-text tracking-wide mb-2">
            {step.title}
          </h3>
          <p className="font-body text-ssc-text-muted text-sm">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Build ContactForm component**

Create `src/components/ContactForm.tsx`:

```tsx
"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    volume: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // For now, mailto fallback. Replace with Supabase edge function when ready.
    const subject = encodeURIComponent("Tax Ready Inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nVolume: ${formData.volume}\nMessage: ${formData.message}`
    );
    window.location.href = `mailto:hello@slabsavvycpa.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="bg-ssc-surface border border-ssc-border p-8 text-center">
        <div className="w-16 h-16 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-ssc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-headline text-2xl text-ssc-text tracking-wide mb-3">GOT IT</h3>
        <p className="font-body text-ssc-text-muted">
          Your email app should have opened with the inquiry. If not, email me directly at hello@slabsavvycpa.com.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-ssc-surface border border-ssc-border p-8 space-y-6">
      <h3 className="font-headline text-2xl text-ssc-text tracking-wide mb-2">GET STARTED</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-body font-medium text-ssc-text mb-2">Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-bg text-ssc-text font-body"
          />
        </div>
        <div>
          <label className="block text-sm font-body font-medium text-ssc-text mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-bg text-ssc-text font-body"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-body font-medium text-ssc-text mb-2">
          How many cards did you sell last year?
        </label>
        <select
          value={formData.volume}
          onChange={(e) => setFormData((prev) => ({ ...prev, volume: e.target.value }))}
          className="w-full px-4 py-3 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-bg text-ssc-text font-body"
        >
          <option value="">Select</option>
          <option value="under-100">Under 100</option>
          <option value="100-500">100–500</option>
          <option value="500+">500+</option>
          <option value="no-idea">Honestly, no idea</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-body font-medium text-ssc-text mb-2">
          What&apos;s the situation?
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          className="w-full px-4 py-3 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-bg text-ssc-text font-body"
          placeholder="Years behind, platforms you sell on, what your records look like right now..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-ssc-gold hover:bg-ssc-gold-dark text-white px-6 py-3 font-body font-semibold transition-colors min-h-[44px]"
      >
        Send Inquiry
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Build taxready page**

Create `src/app/taxready/page.tsx`:

```tsx
import { SectionHeading } from "@/components/SectionHeading";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Ready — Slab Savvy",
  description:
    "Behind on your records? I turn your digital exports into a clean, structured package your accountant can work with.",
};

const steps = [
  { number: "01", title: "SEND YOUR EXPORTS", description: "eBay CSV, PayPal statements, whatever digital purchase records you have." },
  { number: "02", title: "AI RECONCILIATION", description: "I run everything through my AI workflow — the same one I use for my own cards." },
  { number: "03", title: "CPA REVIEW", description: "I personally QC every output. Cost basis, grading fees, currency conversions — all checked." },
  { number: "04", title: "ACCOUNTANT-READY", description: "You get a clean spreadsheet and summary memo. Hand it to your accountant, save on their bill." },
];

export default function TaxReadyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-ssc-black py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeading
            title="YOUR RECORDS. TAX READY."
            subtitle="Behind on your card sales records? I take your digital exports and turn them into a structured package your accountant can actually work with. You spend less. They charge you less. Everyone wins."
            dark
          />
        </div>
      </div>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading title="HOW IT WORKS" subtitle="Simple process. No surprises." />
        <div className="mt-12">
          <ProcessSteps steps={steps} />
        </div>
      </section>

      {/* What you get */}
      <section className="bg-ssc-black py-20">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading title="WHAT YOU GET" dark />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              "Purchase and sale reconciliation with cost basis",
              "Grading fee allocation to individual cards",
              "Trade logging with fair market value",
              "GST/HST threshold tracking",
              "Year-end summary ready for your accountant",
              "Two views: capital gains and business income",
            ].map((item) => (
              <div key={item} className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-ssc-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-body text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing hint + Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading title="PRICING" align="left" />
            <p className="font-body text-ssc-text-muted mt-4">
              Pricing depends on your volume and how far behind you are. Most collectors
              fall between $175–$600. I&apos;ll give you a firm quote after reviewing your exports.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center border-b border-ssc-border pb-4">
                <span className="font-body text-ssc-text">Under 100 transactions</span>
                <span className="font-mono text-ssc-gold font-medium">From $175</span>
              </div>
              <div className="flex justify-between items-center border-b border-ssc-border pb-4">
                <span className="font-body text-ssc-text">100–500 transactions</span>
                <span className="font-mono text-ssc-gold font-medium">From $350</span>
              </div>
              <div className="flex justify-between items-center border-b border-ssc-border pb-4">
                <span className="font-body text-ssc-text">500+ transactions</span>
                <span className="font-mono text-ssc-gold font-medium">From $600</span>
              </div>
            </div>
            <p className="font-body text-sm text-ssc-text-muted mt-6">
              Not tax prep. Not tax advice. Organized records your accountant will thank you for.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Verify and commit**

```bash
git add -A
git commit -m "feat: add /taxready records service landing page

- 4-step process section
- Feature checklist
- Tiered pricing table
- Contact form (mailto fallback, Supabase integration later)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: /waitlist — SST Beta Signup

**Files:**
- Create: `src/app/waitlist/page.tsx`
- Create: `src/components/WaitlistForm.tsx`
- Create: `src/lib/supabase.ts`
- Create: `supabase/migrations/20260326_create_waitlist_signups.sql`
- Create: `supabase/functions/submit-waitlist/index.ts`

- [ ] **Step 1: Create Supabase client**

Create `src/lib/supabase.ts`:

```tsx
import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
}
```

- [ ] **Step 2: Create waitlist migration**

Create `supabase/migrations/20260326_create_waitlist_signups.sql`:

```sql
CREATE TABLE public.waitlist_signups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  monthly_volume text,
  created_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

CREATE UNIQUE INDEX idx_waitlist_email ON public.waitlist_signups(email);

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;
```

- [ ] **Step 3: Create waitlist edge function**

Create `supabase/functions/submit-waitlist/index.ts`:

```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, monthly_volume } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error } = await supabase.from("waitlist_signups").upsert(
      {
        email: email.trim().toLowerCase(),
        monthly_volume: monthly_volume || null,
        ip_address: req.headers.get("x-forwarded-for") || "unknown",
        user_agent: req.headers.get("user-agent") || "unknown",
      },
      { onConflict: "email" }
    );

    if (error) {
      return new Response(
        JSON.stringify({ success: false, error: "Failed to save. Try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "Something went wrong." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
```

- [ ] **Step 4: Build WaitlistForm component**

Create `src/components/WaitlistForm.tsx`:

```tsx
"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [volume, setVolume] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/submit-waitlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
          },
          body: JSON.stringify({ email, monthly_volume: volume }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-ssc-surface border border-ssc-border p-8 text-center">
        <div className="w-16 h-16 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-ssc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-headline text-2xl text-ssc-text tracking-wide mb-3">YOU&apos;RE ON THE LIST</h3>
        <p className="font-body text-ssc-text-muted">
          I&apos;ll email you when Slab Savvy Tracker is ready for beta testers.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-ssc-surface border border-ssc-border p-8 space-y-5">
      <h3 className="font-headline text-2xl text-ssc-text tracking-wide">JOIN THE BETA</h3>

      <div>
        <label className="block text-sm font-body font-medium text-ssc-text mb-2">Email *</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-bg text-ssc-text font-body"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-body font-medium text-ssc-text mb-2">
          How many cards do you sell per month?
        </label>
        <select
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-full px-4 py-3 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-bg text-ssc-text font-body"
        >
          <option value="">Select (optional)</option>
          <option value="under-50">Under 50</option>
          <option value="50-200">50–200</option>
          <option value="200-500">200–500</option>
          <option value="500+">500+</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-3">
          <p className="font-body text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-ssc-gold hover:bg-ssc-gold-dark disabled:bg-ssc-text-muted text-white px-6 py-3 font-body font-semibold transition-colors min-h-[44px]"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
        ) : (
          "Join the Waitlist"
        )}
      </button>
    </form>
  );
}
```

- [ ] **Step 5: Build waitlist page**

Create `src/app/waitlist/page.tsx`:

```tsx
import { SectionHeading } from "@/components/SectionHeading";
import { WaitlistForm } from "@/components/WaitlistForm";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slab Savvy Tracker — Join the Beta",
  description:
    "AI-powered inventory tracking for sports card dealers. Send a photo, get a row in your spreadsheet with real-time comps.",
};

const features = [
  { title: "Photo-First Logging", desc: "Send a photo of your card. AI identifies it, you confirm, done." },
  { title: "Real-Time Comps", desc: "130point comp search built in. Know what your cards are worth." },
  { title: "Your Google Sheet", desc: "Data goes straight to your own spreadsheet. Your data, your way." },
  { title: "Telegram & WhatsApp", desc: "Works where you already are. No new app to download." },
  { title: "Cost Basis Tracking", desc: "Track what you paid, what you sold for, and your actual profit." },
  { title: "Tax-Ready Records", desc: "Good records now means less pain at tax time. Built by a CPA." },
];

const tiers = [
  { name: "Hobby", price: "$25", volume: "Up to 50 cards/mo" },
  { name: "Side Hustle", price: "$59", volume: "Up to 200 cards/mo" },
  { name: "Full-Time", price: "$119", volume: "Up to 500 cards/mo", featured: true },
  { name: "High Volume", price: "$219", volume: "Unlimited" },
];

export default function WaitlistPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-ssc-black py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center px-3 py-1 bg-ssc-gold/10 border border-ssc-gold/20 text-ssc-gold text-xs font-mono font-medium mb-6">
            BETA COMING SOON
          </span>
          <SectionHeading
            title="TRACK YOUR CARDS. KNOW YOUR NUMBERS."
            subtitle="Send a photo. Confirm the details. Get a row in your spreadsheet with real-time comps from 130point. Stop guessing what your inventory is worth."
            dark
          />
        </div>
      </div>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading title="WHAT IT DOES" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((f) => (
            <div key={f.title} className="border border-ssc-border bg-ssc-surface p-6">
              <h3 className="font-headline text-lg text-ssc-text tracking-wide mb-2">{f.title}</h3>
              <p className="font-body text-ssc-text-muted text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-ssc-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="PRICING" subtitle="All plans include comp search. CAD pricing." dark />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-6 text-center ${
                  tier.featured
                    ? "border-2 border-ssc-gold bg-ssc-surface-dark"
                    : "border border-ssc-border-dark bg-ssc-surface-dark"
                }`}
              >
                {tier.featured && (
                  <span className="inline-block px-2 py-0.5 bg-ssc-gold text-white text-xs font-mono font-medium mb-3">
                    POPULAR
                  </span>
                )}
                <h3 className="font-headline text-xl text-white tracking-wide">{tier.name.toUpperCase()}</h3>
                <div className="font-mono text-3xl font-bold text-ssc-gold mt-2">{tier.price}</div>
                <div className="font-body text-sm text-gray-400 mt-1">/month</div>
                <div className="font-body text-sm text-gray-400 mt-4">{tier.volume}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="max-w-lg mx-auto px-4 py-20">
        <WaitlistForm />
      </section>

      <MobileStickyCTA text="Join the Beta" href="#waitlist-form" />
    </div>
  );
}
```

- [ ] **Step 6: Verify and commit**

```bash
git add -A
git commit -m "feat: add /waitlist SST beta signup page

- Product features grid
- 4-tier pricing preview (CAD)
- Email capture form with optional volume field
- Supabase edge function + migration for waitlist_signups table

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Card Scroll Animation

**Files:**
- Create: `src/hooks/useScrollFrames.ts`
- Create: `src/hooks/useReducedMotion.ts`
- Create: `src/components/HeroScrollAnimation.tsx`
- Modify: `src/app/page.tsx` (swap HeroStatic for HeroScrollAnimation)

- [ ] **Step 1: Create useReducedMotion hook**

Create `src/hooks/useReducedMotion.ts`:

```tsx
"use client";

import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
```

- [ ] **Step 2: Create useScrollFrames hook**

Create `src/hooks/useScrollFrames.ts`:

```tsx
"use client";

import { useState, useEffect, useRef } from "react";

type UseScrollFramesOptions = {
  frameCount: number;
  framePath: string; // e.g., "/images/hero-frames/frame-"
  frameExtension?: string;
  scrollHeight?: number; // How many pixels of scroll the animation covers
};

export function useScrollFrames({
  frameCount,
  framePath,
  frameExtension = "webp",
  scrollHeight = 2000,
}: UseScrollFramesOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload all frames
    const frames: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, "0");
      img.src = `${framePath}${paddedIndex}.${frameExtension}`;
      img.onload = () => {
        loaded++;
        if (loaded === frameCount) {
          framesRef.current = frames;
          setIsLoaded(true);
          // Draw first frame
          drawFrame(0);
        }
      };
      frames.push(img);
    }

    function drawFrame(index: number) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = framesRef.current[index];
      if (!canvas || !ctx || !img) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    }

    function onScroll() {
      const container = containerRef.current;
      if (!container || !isLoaded) return;

      const rect = container.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollHeight));
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollProgress * frameCount)
      );
      drawFrame(frameIndex);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [frameCount, framePath, frameExtension, scrollHeight, isLoaded]);

  return { containerRef, canvasRef, isLoaded };
}
```

- [ ] **Step 3: Build HeroScrollAnimation component**

Create `src/components/HeroScrollAnimation.tsx`:

```tsx
"use client";

import { useScrollFrames } from "@/hooks/useScrollFrames";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "./Button";
import { HeroStatic } from "./HeroStatic";

export function HeroScrollAnimation() {
  const prefersReducedMotion = useReducedMotion();

  const { containerRef, canvasRef, isLoaded } = useScrollFrames({
    frameCount: 200, // Adjust based on actual frame count
    framePath: "/images/hero-frames/frame-",
    frameExtension: "webp",
    scrollHeight: 2000,
  });

  // Fallback for reduced motion or if frames haven't loaded
  if (prefersReducedMotion || !isLoaded) {
    return <HeroStatic />;
  }

  return (
    <div ref={containerRef} style={{ height: "300vh" }} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain opacity-40"
        />

        {/* Glassmorphism content overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="glass p-8 md:p-12">
            <h1 className="font-headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-ssc-text tracking-wide leading-none">
              RUN YOUR CARD
              <br />
              <span className="text-ssc-gold">BUSINESS</span>
            </h1>

            <p className="font-body text-lg md:text-xl text-ssc-text-muted mt-6 max-w-2xl mx-auto">
              Inventory tracking. AI photo enhancement. Tax guides. Comps.
              One ecosystem, built by a collector who&apos;s also a CPA.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button href="/waitlist" size="lg">
                Join the Waitlist
              </Button>
              <Button href="/taxready" variant="secondary" size="lg">
                Get Tax Ready
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Swap hero in homepage**

Update `src/app/page.tsx` — replace the HeroStatic import with HeroScrollAnimation:

```tsx
// Change import:
import { HeroScrollAnimation } from "@/components/HeroScrollAnimation";

// Change usage (replace <HeroStatic />):
<HeroScrollAnimation />
```

- [ ] **Step 5: Add placeholder frames for testing**

Create a script to generate test frames (solid color gradient) so the scroll mechanic can be tested before real frames arrive:

```bash
cd ~/Projects/SSC_website/site/public/images
mkdir -p hero-frames
# Generate 200 placeholder frames (gradient from white to gold)
python3 -c "
from PIL import Image
for i in range(200):
    t = i / 199
    r = int(250 - t * (250 - 201))
    g = int(250 - t * (250 - 162))
    b = int(248 - t * (248 - 39))
    img = Image.new('RGB', (800, 600), (r, g, b))
    img.save(f'hero-frames/frame-{i:04d}.webp', 'webp', quality=80)
print(f'Generated 200 placeholder frames')
"
```

- [ ] **Step 6: Verify scroll animation works with placeholder frames**

```bash
npm run dev
```

Expected: Scrolling down triggers a color transition in the background canvas. Content stays pinned with glassmorphism overlay.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add scroll-driven card animation hero with glassmorphism overlay

- useScrollFrames hook: preloads frames, binds to scroll position
- useReducedMotion hook: accessibility fallback to static hero
- HeroScrollAnimation: canvas background + glass content overlay
- Placeholder frames for testing (replace with real Nano Banana + Kling output)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Environment, Deployment, and Polish

**Files:**
- Create: `.env.local` (not committed)
- Create: `.env.example`
- Modify: `next.config.ts`
- Create: `.gitignore` updates

- [ ] **Step 1: Create .env.example**

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

- [ ] **Step 2: Create .env.local with real values**

Get values from existing Supabase project (same one used for spreadsheet gate).

```bash
# Check existing Vercel env vars for the SSC project
vercel env ls --project ssc-website
```

- [ ] **Step 3: Configure next.config.ts for static export**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
```

Note: Static export for Vercel. No server-side rendering needed — all API calls go directly to Supabase edge functions from the client.

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

Expected: Static export succeeds with all 4 routes generated.

- [ ] **Step 5: Add SEO metadata to all pages**

Verify each page has proper `<Metadata>` export with title, description, and OpenGraph tags. Already done in Tasks 4-6.

- [ ] **Step 6: Copy logo from old project**

```bash
cp ~/Projects/SSC_website/project/public/ssc-logo.png ~/Projects/SSC_website/site/public/images/ssc-logo.png
```

- [ ] **Step 7: Deploy to Vercel**

```bash
cd ~/Projects/SSC_website/site
vercel --prod
```

Or push to GitHub and let auto-deploy handle it. May need to update the Vercel project root directory from `project/` to `site/`.

- [ ] **Step 8: Verify all routes on production**

- slabsavvycpa.com — homepage loads, animations work
- slabsavvycpa.com/spreadsheet — form works with Supabase
- slabsavvycpa.com/taxready — page renders, contact form works
- slabsavvycpa.com/waitlist — form submits to Supabase

- [ ] **Step 9: Final commit**

```bash
git add -A
git commit -m "feat: production deployment with all 4 routes

- Environment config for Supabase
- Static export for Vercel
- SEO metadata on all pages
- Logo migrated from old project

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- [x] Homepage with hero animation ✓ (Tasks 3, 7)
- [x] /spreadsheet restyled ✓ (Task 4)
- [x] /taxready service page ✓ (Task 5)
- [x] /waitlist with Supabase ✓ (Task 6)
- [x] Design system (palette, typography, sharp corners) ✓ (Task 1)
- [x] Shared components ✓ (Task 2)
- [x] Scroll animation with fallback ✓ (Task 7)
- [x] Mobile-first responsive ✓ (throughout)
- [x] Deployment ✓ (Task 8)

**Placeholder scan:** No TBDs. Taxready copy uses drafted content (Nathan can replace). Animation uses placeholder frames until real ones are generated.

**Type consistency:** Button, SectionHeading, ProductCard — all props consistent across tasks. Supabase client used identically in SpreadsheetForm and WaitlistForm.

**Scope:** 8 tasks, each independently committable. Task 7 (animation) can be skipped without breaking anything — HeroStatic is the fallback.
