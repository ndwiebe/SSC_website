# Slab Savvy Website -- UI Review

**Audited:** 2026-03-27
**Baseline:** Abstract 6-pillar standards (no UI-SPEC.md found)
**Design System:** "Reverse DMC" -- warm white (#FAFAF8), gold accent (#C9A227), black (#0A0A0A), Bebas Neue headlines, DM Sans body, 0px border-radius enforced
**Screenshots:** Not captured (no dev server detected, code-only audit)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 4/4 | Domain-specific, personality-rich copy throughout; no generic labels found |
| 2. Visuals | 3/4 | Strong hierarchy and premium feel; accessibility gaps on icon-only elements and missing focus indicators |
| 3. Color | 3/4 | Consistent design token usage with no hardcoded hex in components; gray-400 used alongside ssc-text-muted creates split muted-text system |
| 4. Typography | 4/4 | Clean 3-font system with disciplined size and weight usage across responsive breakpoints |
| 5. Spacing | 3/4 | Consistent Tailwind spacing; min-h-[44px] is the only arbitrary value and it serves an accessibility purpose |
| 6. Experience Design | 3/4 | Good loading, error, success, and disabled states on forms; missing ErrorBoundary and reduced-motion coverage gaps on GSAP animations |

**Overall: 20/24**

---

## Top 3 Priority Fixes

1. **Footer link hover colors are inconsistent** -- Products section links hover to `text-white` while the DisplayMyCard link hovers to `text-ssc-gold`; same section, two different hover targets breaks visual predictability. Fix: Change DisplayMyCard link in Footer.tsx:47 from `hover:text-ssc-gold` to `hover:text-white` to match siblings, or standardize all footer links to the gold hover.

2. **GSAP scroll-triggered animations lack reduced-motion fallback** -- The `useReducedMotion` hook exists and is used by the canvas-based hero components, but animations.ts (fadeInUp, staggerScaleIn, blurFadeIn, etc.) runs GSAP animations unconditionally on elements with `style={{ opacity: 0 }}`. Users who prefer reduced motion will see invisible content that never appears. Fix: In animations.ts, check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` at the top of each function and immediately set `opacity: 1` on targets if true, skipping the animation.

3. **SpreadsheetForm success state has dead link to /contact** -- SpreadsheetForm.tsx:148 links to `/contact` which is not a defined route in App.tsx (only `/`, `/spreadsheet`, `/taxready`, `/waitlist` exist). This will render a blank page. Fix: Change `to="/contact"` to `to="/taxready"` (which has the contact form), or add a mailto link to slabsavvycpa@gmail.com instead.

---

## Detailed Findings

### Pillar 1: Copywriting (4/4)

The copy across this site is exceptionally strong for a marketing site. Every CTA is specific to its context, and the voice is consistent -- confident, direct, niche-savvy.

**CTA labels -- all domain-specific, zero generics:**
- "Join the Waitlist" / "JOIN THE BETA" (WaitlistPage, HomePage hero)
- "Get Tax Ready" (HomePage, TaxReadyPage)
- "Try DisplayMyCard" (ProductCard, external)
- "Get the Playbook" (ProductCard)
- "Send Inquiry" (ContactForm)
- "Unlock Spreadsheet" (SpreadsheetForm)
- "Open Google Sheet (Make a Copy)" (SpreadsheetForm success state)

**Error messages are contextual:**
- WaitlistForm: "Please enter a valid email address." / "Network error. Please check your connection and try again."
- SpreadsheetForm: "Invalid code. The access code is included with your Tax Playbook purchase." -- tells the user exactly where to find it.
- Fallback: "Something went wrong. Try again." -- this is the weakest error copy (WaitlistForm:44, SpreadsheetForm:52) but still acceptable for an unexpected server error.

**Success states have personality:**
- "YOU'RE ON THE LIST" with "Keep an eye on your inbox" (WaitlistForm)
- "YOU'RE IN" with clear next-step instructions (SpreadsheetForm)
- "GOT IT" with fallback instructions if mailto did not open (ContactForm)

**Empty states:** Not applicable -- this is a marketing site, not a data-driven app. No list views or dashboards.

**No generic labels found:** Grep for "Submit", "Click Here", "OK", "Cancel", "Save" returned zero user-facing instances.

### Pillar 2: Visuals (3/4)

**Strengths:**

- Clear visual hierarchy: Bebas Neue headlines create unmistakable section breaks, DM Sans body is highly readable, JetBrains Mono for data/labels provides a nice third layer.
- ProductCards have well-structured icon + title inline layout, gradient accent bar, and arrow-slide CTA. The card-glow and card-tilt CSS classes provide premium micro-interactions.
- btn-shine CSS creates a convincing 3D button with shimmer sweep, depth shadow, and active press state -- this is above-average attention to tactile feedback.
- Mobile sticky CTA (MobileStickyCTA.tsx) provides persistent conversion path on mobile.

**Issues:**

- **Icon-only accessibility:** The mobile hamburger button in Navigation.tsx:63 has `aria-label` (good), but the inline SVG icons in HomePage (ClipboardIcon, CameraIcon, BookIcon, CalculatorIcon at lines 11-34) are decorative yet lack `aria-hidden="true"`. Not a major screen reader issue since they pair with text, but explicit `aria-hidden` would be cleaner.
- **Focus indicators:** Only 9 focus-related classes found across 4 files. All are on form inputs (ContactForm, SpreadsheetForm, WaitlistForm) and the hamburger button. Interactive elements like ProductCard (entire card is a link), footer links, and navigation links have no visible focus indicator beyond browser defaults. With `border-radius: 0 !important` in index.css, the default browser focus outline may look jarring -- a custom `focus-visible:ring-2 focus-visible:ring-ssc-gold` would integrate better.
- **HeroCinemagraph fallback image** (line 153) uses `alt=""` which is correct for decorative, but the loading spinner uses a border-based spinner that has no aria-label or role="status".
- **Footer social links** -- only Facebook and email listed. Consider adding at minimum the X/Twitter link that appears in the OG meta tags context, or remove to keep it minimal intentionally.

### Pillar 3: Color (3/4)

**Token system is well-structured and enforced:**

The Tailwind config defines a clean `ssc` namespace with semantic names. CSS custom properties in index.css mirror the config for use in utility classes. Zero hardcoded hex values found in `.tsx` component files -- all color comes through Tailwind tokens.

**Gold accent usage:**
- `text-ssc-gold`: 56 occurrences across 15 files
- `bg-ssc-gold`: 23 occurrences across 13 files
- Used on: headlines, CTAs, icons, badges, borders, hover states, credential bullets

The gold is used liberally but purposefully -- it marks interactive elements and section titles consistently. At 56 text occurrences it is on the high end, but given this is a marketing site where the accent IS the brand, this is appropriate.

**Muted text split:**
- `text-ssc-text-muted` (#6B6B78): 26 occurrences -- used on light backgrounds
- `text-gray-400` (#9CA3AF): 22 occurrences -- used on dark backgrounds
- `text-gray-300` (#D1D5DB): 2 occurrences -- hero body text on dark overlay

This is a reasonable light/dark section split, but `text-gray-400` is a Tailwind default, not a custom token. For full design system consistency, consider adding `ssc-text-muted-dark` or `ssc-text-light` to the Tailwind config so all text colors come from the same namespace.

**Other observations:**
- `text-red-500` (WaitlistForm:102) and `text-red-600` (SpreadsheetForm:199) are both used for error text -- should be one or the other. Both are Tailwind defaults rather than a custom error token.
- `bg-red-50` and `border-red-200` (SpreadsheetForm:198) are used for the error box -- no matching error pattern in WaitlistForm which just uses a bare `<p>` tag.

### Pillar 4: Typography (4/4)

**Font system:**
- `font-headline` (Bebas Neue): All `h1`, `h2`, `h3` headings, badges, nav labels
- `font-body` (DM Sans): Body text, buttons, labels, descriptions
- `font-mono` (JetBrains Mono): Step numbers, credential labels, code inputs, stat values, badge text

Three fonts is the right ceiling for this site. Each has a clear role and they are never mixed inappropriately.

**Size scale in active use:**
- `text-xs`: Badges, helper text, fine print (3 contexts)
- `text-sm`: Body copy, labels, footer links, nav links, card descriptions (dominant)
- `text-base`: Mobile nav items, button default, hero sub-text (3 contexts)
- `text-lg`: Section headings (h3 level), hero sub-headings, CTA buttons, credential labels
- `text-xl`: Hero subheadline responsive step, process step numbers, spreadsheet page body, nav brand
- `text-2xl`: Ecosystem heading, contact form heading, trust section h2 (light breakpoint)
- `text-3xl`: Section headings (h2 level), stat values, CTA band h2 (light breakpoint)
- `text-4xl`: Hero h1 mobile, section heading responsive step
- `text-5xl`: Hero h1 sm breakpoint, CTA band responsive
- `text-6xl`: Hero h1 md breakpoint
- `text-7xl`: Hero h1 lg breakpoint
- `text-8xl`: Hero h1 xl breakpoint

This is a wide range, but the responsive stepping is disciplined -- the large sizes (5xl-8xl) appear exclusively on the main hero h1 tag at progressive breakpoints, which is correct. Non-hero content stays within xs-4xl.

**Weight distribution:**
- `font-medium`: Labels, nav links, inline links (consistent "secondary emphasis")
- `font-semibold`: Buttons, CTAs, card titles in body font (consistent "primary emphasis")
- `font-bold`: Only on ProcessSteps step-number (font-mono context)

Two primary weights (medium, semibold) plus one specialty use (bold on monospace numbers). This is clean and disciplined.

### Pillar 5: Spacing (3/4)

**Consistent patterns observed:**

- Section padding: `py-16 md:py-24` (WaitlistPage features), `py-20` (TaxReadyPage sections, HomePage CTA), `py-10` (HomePage ecosystem/trust) -- slightly inconsistent between pages but within acceptable range.
- Container max-widths: `max-w-7xl` (full-width sections), `max-w-5xl` (HomePage ecosystem/trust), `max-w-4xl` (hero content, CTA band), `max-w-3xl` (SpreadsheetPage header), `max-w-2xl` (forms, centered content), `max-w-lg` (SpreadsheetForm container). These are used purposefully for content hierarchy.
- Standard page padding: `px-4 sm:px-6 lg:px-8` used consistently on every section container.
- Gap values: `gap-3`, `gap-4`, `gap-6`, `gap-8`, `gap-12` -- all standard Tailwind scale values.
- Form spacing: `space-y-4` (WaitlistForm), `space-y-5` (ContactForm, SpreadsheetForm) -- minor inconsistency between forms.

**Arbitrary values:**
- `min-h-[44px]`: 29 occurrences across 10 files. This is the WCAG touch target minimum and serves an accessibility purpose. Acceptable.
- `min-w-[44px]`: 1 occurrence (hamburger button). Same rationale.
- `tracking-[0.3em]`: Used on "SLAB SAVVY" badge text in hero sections. Custom letter-spacing for a specific brand element -- acceptable.

**Minor inconsistencies:**
- HomePage sections use `py-10` while TaxReadyPage and WaitlistPage use `py-16 md:py-24` and `py-20`. The HomePage is denser intentionally (content scrolls over a fixed background animation), but the difference is notable.
- `mb-4` vs `mb-3` vs `mb-6` on heading-to-body gaps varies between sections without a clear pattern.

### Pillar 6: Experience Design (3/4)

**Loading states:**
- FullPageScrollBackground: Shows a gold border spinner while frames load (line 148-152)
- HeroCinemagraph: Shows a gold spinner during frame preload (line 172-176)
- WaitlistForm: Shows `Loader2` spinner icon during submission (line 111-113)
- SpreadsheetForm: Shows a custom SVG spinner during submission (line 208-210)
- HeroScrollAnimation: Shows a spinner while frames load (line 42-45)

Good coverage. Two different spinner implementations (Lucide Loader2 vs custom SVG) -- minor inconsistency but both work.

**Error states:**
- WaitlistForm: Inline error text below form (red-500)
- SpreadsheetForm: Error box with background and border (red-50, red-200, red-600)
- ContactForm: No error handling -- the mailto approach skips server-side validation entirely, which is correct for its implementation but means no error state exists
- **No global ErrorBoundary** wrapping the app -- an unhandled React error in any component will crash the entire page with no recovery UI

**Success states:**
- WaitlistForm: "YOU'RE ON THE LIST" with icon and follow-up copy
- SpreadsheetForm: Full unlocked view with spreadsheet details and action button
- ContactForm: "GOT IT" with fallback instructions and "Send another inquiry" reset

All three forms handle success well with clear confirmation and next steps.

**Disabled states:**
- WaitlistForm: `disabled:opacity-60 disabled:cursor-not-allowed` during submission
- SpreadsheetForm: `disabled:bg-gray-500` during submission -- different disabled style than WaitlistForm (opacity vs color change)
- ContactForm: No disabled state during submission (but it is a synchronous mailto redirect, so this is acceptable)

**Reduced motion:**
- `useReducedMotion` hook exists and is used by FullPageScrollBackground, HeroCinemagraph, and HeroScrollAnimation (which falls back to HeroStatic)
- GSAP animations in animations.ts (used by HomePage, WaitlistPage, TaxReadyPage, SpreadsheetPage) do NOT check for reduced motion preference. Elements start with `style={{ opacity: 0 }}` and rely on GSAP to animate them in. If GSAP ScrollTrigger does not fire (or if the user prefers reduced motion), content remains invisible.

**Broken link:**
- SpreadsheetForm.tsx line 148: `to="/contact"` links to a route that does not exist in App.tsx. This is a functional bug.

---

## Files Audited

**Pages (4):**
- `src/pages/HomePage.tsx`
- `src/pages/WaitlistPage.tsx`
- `src/pages/TaxReadyPage.tsx`
- `src/pages/SpreadsheetPage.tsx`

**Components (14):**
- `src/components/Navigation.tsx`
- `src/components/Footer.tsx`
- `src/components/Button.tsx`
- `src/components/ProductCard.tsx`
- `src/components/WaitlistForm.tsx`
- `src/components/ContactForm.tsx`
- `src/components/SpreadsheetForm.tsx`
- `src/components/MobileStickyCTA.tsx`
- `src/components/ProcessSteps.tsx`
- `src/components/SectionHeading.tsx`
- `src/components/StatsBar.tsx`
- `src/components/FullPageScrollBackground.tsx`
- `src/components/HeroCinemagraph.tsx`
- `src/components/HeroScrollAnimation.tsx`
- `src/components/HeroStatic.tsx`

**Utilities (4):**
- `src/lib/animations.ts`
- `src/hooks/useReducedMotion.ts`
- `src/hooks/useScrollFrames.ts`
- `src/lib/supabase.ts` (exists but not audited -- backend config)

**Config (3):**
- `tailwind.config.js`
- `src/index.css`
- `index.html`

**Entry (2):**
- `src/main.tsx`
- `src/App.tsx`
