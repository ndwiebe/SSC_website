# SSC Site Completion — PRD + Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn slabsavvycpa.com from a four-product brochure into a working reputation-and-funnel machine: fix the broken signup plumbing, remove the scrapped Tax Ready service, and build the email-list engine (on-site Playbook capture, welcome + drip emails, About and portfolio pages).

**Architecture:** Astro 6 static site (`project/`) on Vercel; React islands for forms; Supabase (project `jqjfxcbyotfozaspqwfz`) for signup storage + edge functions; Resend for transactional email; GitHub Actions cron for the drip scheduler. No new frameworks.

**Tech Stack:** Astro 6, React 18, Tailwind 3 (ssc-* tokens), Supabase Edge Functions (Deno), Resend API, PostHog.

## Product decisions (from Nathan, 2026-07-09 — do not relitigate)

1. **Site's one job:** reputation builder + funnel. "The CPA who builds things for collectors." Funnel: Facebook groups → blog/Playbook → owned email list → DisplayMyCard now, SST later, consulting occasionally.
2. **Tax Ready is scrapped.** Nathan doesn't have time to deliver the service. Remove the page, all links, all mentions. Copy survives in git history.
3. **All inquiries/notifications → slabsavvycpa@gmail.com.** The subscriber list itself lives in Supabase (`waitlist_signups`), NOT Gumroad and NOT the inbox.
4. **SST waitlist stays** — no pricing shown, but the stale "BETA COMING SOON" gets honest wording.
5. **AI consulting = "What I've Built" portfolio page** with a soft mailto CTA. No pricing, no service page.
6. **Playbook capture moves on-site:** email form → Supabase → welcome email containing the Gumroad link. Gumroad button becomes the fallback, not the front door.

## Global Constraints

- TypeScript strict, **no `any`**, **no `console.log`** (use nothing client-side; edge functions may use structured `console.error` for Supabase log drains — that is the established pattern there).
- Voice: Slab Savvy CPA — hobby-native, direct, plain English. New copy in this plan is pre-written; use it verbatim unless it factually conflicts with something on the page.
- Design tokens: `ssc-gold`, `ssc-gold-dark`, `ssc-black`, `ssc-bg`, `ssc-border`, `ssc-text`, `ssc-text-muted`; fonts `font-headline` / `font-body` / `font-mono`; sharp corners (no `rounded-*`); interactive elements `min-h-[44px]`. Copy patterns from sibling components, never invent new styles.
- Test every UI change at **375px width** as well as desktop.
- No test framework exists in this repo. Verification = `npm run build` (must exit 0), `curl` checks with expected output, and browser checks at 375px. Do not add a test framework.
- Branch: `feat/site-completion` off `main`. One PR per phase. **Never push to `main` directly** — Nathan approves each merge.
- Never commit secrets. Resend/PostHog/Supabase keys go in Vercel env, Supabase secrets, or GitHub secrets only.
- Git author: `Nathan Wiebe <dominathan@gmail.com>` — verify `git config user.email` before the first commit.
- Working dir for npm commands: `project/`. Supabase project ref: `jqjfxcbyotfozaspqwfz`.
- The Gumroad Playbook URL is `https://slabsavvycpa.gumroad.com/l/tax-playbook` — used in email templates below.

## Nathan-only steps (blockers surfaced up front)

These need Nathan; everything else is autonomous. When one blocks a task, add a line to `~/jarvis-memory/_ops/WAITING-ON-NATHAN.md` and continue with other tasks.

| # | Step | Blocks |
|---|------|--------|
| N1 | Create Resend account (or confirm existing) → `supabase secrets set RESEND_API_KEY=...` | Task 13 emails (function degrades gracefully without it) |
| N2 | Verify `slabsavvycpa.com` sending domain in Resend (2 DNS records at the registrar) | Welcome/drip emails to subscribers (notifications to Nathan work without it) |
| N3 | `gh secret set DRIP_SECRET` + `supabase secrets set DRIP_SECRET` (same random value) | Task 15 cron |
| N4 | Approve the headshot chosen in Task 16 (picked from the Golden Hour set) | PR #3 merge |
| N5 | If Task 2's fix doesn't clear the PostHog 401: check the key in PostHog dashboard → Vercel env `PUBLIC_POSTHOG_KEY` | Task 2 fallback only |

---

# PHASE 1 — Stop the bleeding (PR #1)

### Task 1: Normalize line endings

The working tree shows ~12,000 changed lines that are pure CRLF/LF noise (verified: `git diff -w --stat` → 14 real lines in `package-lock.json`). Lock endings to LF so this never recurs.

**Files:**
- Create: `.gitattributes` (repo root)
- Modify: `.gitignore` (repo root)

- [ ] **Step 1: Create `.gitattributes`**

```gitattributes
* text=auto eol=lf
*.png binary
*.webp binary
*.jpg binary
*.pdf binary
*.svg text eol=lf
```

- [ ] **Step 2: Add local agent dirs to `.gitignore`**

Append to the existing `.gitignore`:

```gitignore
.claude/
.planning/
```

- [ ] **Step 3: Renormalize and verify**

```bash
git checkout -b feat/site-completion
git add .gitattributes .gitignore
git add --renormalize .
git status --short
```

Expected: the modified-file list shrinks to genuinely-changed files only; `git diff --cached -w --stat` shows ~14 real changed lines (package-lock) plus the two new files.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: normalize line endings to LF, ignore local agent dirs"
```

### Task 2: Silence the PostHog 401

Every page load logs `401 @ https://us.i.posthog.com/flags/`. The site defines no feature flags, so stop requesting them; this both kills the console error and removes a wasted request.

**Files:**
- Modify: `project/src/layouts/BaseLayout.astro:107-115` (the `posthog.init` block)

- [ ] **Step 1: Add the flag-disable option**

In the inline script at `BaseLayout.astro` ~line 111, extend the init options object:

```js
posthog.init(key, {
  api_host: 'https://us.i.posthog.com',
  advanced_disable_feature_flags: true,
  // ...keep any existing options in place
});
```

- [ ] **Step 2: Verify**

```bash
cd project && npm run build && npm run preview &
sleep 3 && curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/
```

Expected: build exits 0, homepage returns 200. Then open http://localhost:4321 in a browser: console shows **no** `/flags/` request or 401. Kill the preview server.

If a 401 still appears from `/e/` or `/decide/` endpoints, the key itself is wrong → stop, record blocker N5, move on.

- [ ] **Step 3: Commit**

```bash
git add project/src/layouts/BaseLayout.astro
git commit -m "fix: stop PostHog feature-flag requests that 401 on every page"
```

### Task 3: Fix the silently-broken blog newsletter form

**The bug:** `BlogLayout.astro`'s newsletter fetch sends no `Authorization`/`apikey` headers, so the Supabase edge function returns 401 on **every** signup, and has since April. Commit `b1bcdcc` fixed the identical bug in `WaitlistForm.tsx` (see its lines 32-40 for the correct pattern) but missed this file.

**Files:**
- Modify: `project/src/layouts/BlogLayout.astro:159-165`

- [ ] **Step 1: Add the auth headers**

Replace the fetch block (currently lines 159-165) with:

```ts
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const res = await fetch(`${supabaseUrl}/functions/v1/submit-waitlist`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${supabaseKey}`,
    'apikey': supabaseKey,
  },
  body: JSON.stringify({ email, monthly_volume: 'newsletter' }),
});
```

(Keep `monthly_volume: 'newsletter'` for now — Task 14 replaces it with a proper `source` field.)

- [ ] **Step 2: Verify against the real function**

```bash
cd project && npm run build && npm run preview &
sleep 3
```

Open http://localhost:4321/blog/gst-on-sports-card-sales-canada/ in a browser, scroll to THE FLIP SHEET box, submit a test address like `ssc-test-blogform@example.com`. Expected: the "You're in. Watch your inbox." success message appears (not an error).

Then confirm the row landed:

```bash
# via Supabase MCP execute_sql or supabase CLI:
# SELECT email, monthly_volume, created_at FROM waitlist_signups WHERE email = 'ssc-test-blogform@example.com';
```

Expected: 1 row. Delete the test row afterwards:
`DELETE FROM waitlist_signups WHERE email = 'ssc-test-blogform@example.com';`

- [ ] **Step 3: Commit**

```bash
git add project/src/layouts/BlogLayout.astro
git commit -m "fix: blog newsletter form sends required auth headers (was silently failing since April)"
```

### Task 4: Delete dead animation code and orphan images

`HeroCinemagraph.tsx` is imported by nothing (verified by grep). The 121 loose `frame-*.webp` files at `project/public/hero-frames/` root belong to it — every live page uses a *subfolder* (`gretzky`, `bedard`, `celebrini`, `lemieux`).

**Files:**
- Delete: `project/src/components/HeroCinemagraph.tsx`
- Delete: `project/public/hero-frames/frame-*.webp` (root level only — **do not touch the subfolders**)

- [ ] **Step 1: Delete**

```bash
git rm project/src/components/HeroCinemagraph.tsx
git rm 'project/public/hero-frames/frame-*.webp'
ls project/public/hero-frames/
```

Expected `ls`: only directories (`bedard`, `celebrini`, `gretzky`, `lemieux`), no loose `.webp`.

- [ ] **Step 2: Verify build**

```bash
cd project && npm run build
```

Expected: exit 0, no unresolved-import errors.

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove unused HeroCinemagraph and 121 orphan hero frames"
```

### Task 5: Retire the orphaned spreadsheet-gate backend

`/spreadsheet` was replaced by a redirect in March, but its form component and edge function still exist. Keep the applied migration (never delete applied migrations); remove the dead code.

**Files:**
- Delete: `project/src/components/SpreadsheetForm.tsx`
- Delete: `supabase/functions/validate-spreadsheet-code/` (whole directory)

- [ ] **Step 1: Confirm nothing imports SpreadsheetForm**

```bash
grep -rn "SpreadsheetForm" project/src --include="*.astro" --include="*.tsx" | grep -v "components/SpreadsheetForm.tsx"
```

Expected: no output. (If anything imports it, stop and report instead of deleting.)

- [ ] **Step 2: Delete and verify build**

```bash
git rm project/src/components/SpreadsheetForm.tsx
git rm -r supabase/functions/validate-spreadsheet-code
cd project && npm run build
```

Expected: build exits 0.

- [ ] **Step 3: Undeploy the edge function**

```bash
supabase functions delete validate-spreadsheet-code --project-ref jqjfxcbyotfozaspqwfz
```

Expected: deletion confirmed. (If the CLI isn't authed, note it in the PR body as a deploy step instead.)

- [ ] **Step 4: Commit and open PR #1**

```bash
git commit -m "chore: retire orphaned spreadsheet access-code flow"
git push -u origin feat/site-completion
gh pr create --title "Phase 1: fix broken signups, kill dead code" --body "$(cat <<'EOF'
Fixes the blog newsletter form (missing auth headers — silently failing since April), silences the PostHog /flags 401, normalizes line endings, and removes dead animation + spreadsheet-gate code.

Per docs/superpowers/plans/2026-07-09-site-completion-prd.md, Phase 1.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

**STOP for Nathan's review/merge before Phase 2 work is pushed** (continue building Phase 2 locally on the same branch is fine if merge is pending; simpler: wait).

---

# PHASE 2 — Remove Tax Ready, honest SST wording (PR #2)

### Task 6: Redirects + page deletions

Replace both meta-refresh redirect pages with real HTTP redirects in `vercel.json`, delete the Tax Ready page and its exclusive assets, and fix the `/sitemap.xml` 404 while in there.

**Files:**
- Modify: `vercel.json` (repo root — currently only `{"framework": "astro"}`)
- Delete: `project/src/pages/taxready.astro`, `project/src/pages/spreadsheet.astro`, `project/src/components/ContactForm.tsx`, `project/public/hero-frames/lemieux/` (73 frames — only `/taxready` used them)

- [ ] **Step 1: Write the new `vercel.json`**

```json
{
  "framework": "astro",
  "redirects": [
    { "source": "/taxready", "destination": "/playbook", "permanent": true },
    { "source": "/spreadsheet", "destination": "/playbook", "permanent": true },
    { "source": "/sitemap.xml", "destination": "/sitemap-index.xml", "permanent": true }
  ]
}
```

- [ ] **Step 2: Delete files**

```bash
git rm project/src/pages/taxready.astro project/src/pages/spreadsheet.astro project/src/components/ContactForm.tsx
git rm -r project/public/hero-frames/lemieux
```

- [ ] **Step 3: Verify build**

```bash
cd project && npm run build
```

Expected: exit 0 (Tasks 7-10 haven't run yet, so internal `/taxready` links still exist in content — that's fine, Astro doesn't fail on them; the sweep in Task 10 Step 3 catches stragglers).

- [ ] **Step 4: Commit**

```bash
git commit -m "feat: remove Tax Ready service page, add proper 308 redirects"
```

### Task 7: Remove Tax Ready from Navigation and Footer

**Files:**
- Modify: `project/src/components/Navigation.astro:7`
- Modify: `project/src/components/Footer.astro:14,45-47`

- [ ] **Step 1: Navigation** — delete line 7: `{ name: 'Tax Ready', href: '/taxready' },`

- [ ] **Step 2: Footer** — delete the whole `<a href="/taxready">…Tax Ready…</a>` list item (lines ~44-48 including its `<li>` wrapper if present). Then update the tagline at line 14 from:

`AI-powered tools for sports card collectors. Track inventory, stay tax-ready, and make smarter decisions.`

to:

`AI-powered tools for sports card collectors. Track your inventory, stay onside with the CRA, and make smarter decisions.`

- [ ] **Step 3: Verify + commit**

```bash
cd project && npm run build
grep -rn "taxready" project/src/components/
```

Expected: build 0; grep returns nothing.

```bash
git add project/src/components/Navigation.astro project/src/components/Footer.astro
git commit -m "feat: drop Tax Ready from nav and footer"
```

### Task 8: Remove Tax Ready from the homepage

`project/src/pages/index.astro` references Tax Ready in four places (current line numbers): hero secondary CTA (57-59), the TAX READY product card (~112-119), a mid-page CTA (143-145), and the closing CTA (212-214).

**Files:**
- Modify: `project/src/pages/index.astro`

- [ ] **Step 1: Hero secondary CTA (lines 57-59)** — repoint to the Playbook. Replace the `<a href="/taxready">…Get Tax Ready…</a>` element with the same element styled identically but:

```html
<a href="/playbook" class="btn-ghost-glow inline-flex items-center justify-center min-h-[44px] px-8 py-3 border-2 border-white/80 text-white font-body font-semibold text-lg transition-all duration-300">
  Get the Free Tax Guide
</a>
```

(If the hero's *primary* button already points at `/playbook`, point this secondary one at `/waitlist` with the text `Join the Tracker Beta` instead — don't show two identical CTAs. Check the surrounding lines and pick accordingly.)

- [ ] **Step 2: Product card (~lines 112-119)** — delete the entire TAX READY card component invocation (the block with `title="TAX READY"`, `href="/taxready"`, `cta="Get Tax Ready"`). Leave the grid with 3 cards; Phase 3 Task 18 adds a 4th ("What I've Built"). If the grid uses a fixed 4-column class that looks broken with 3 items at desktop width, change it to `md:grid-cols-3` temporarily and note it for Task 18.

- [ ] **Step 3: Mid-page CTA (~143-145) and closing CTA (~212-214)** — both are `Get Tax Ready` buttons. Repoint both to `/playbook` with the text `Get the Free Tax Guide` (keep each one's existing classes).

- [ ] **Step 4: Verify + commit**

```bash
cd project && npm run build && grep -n "taxready\|Tax Ready" src/pages/index.astro
```

Expected: build 0, grep empty. Check the homepage at 375px and desktop in preview — card grid looks intentional, no dangling section.

```bash
git add project/src/pages/index.astro
git commit -m "feat: homepage without Tax Ready — CTAs repoint to the free Playbook"
```

### Task 9: Rewrite the FAQ

**Files:**
- Modify: `project/src/pages/faq.astro:10,14,25-26,64`

- [ ] **Step 1: Update the overview answer (line 10).** Replace the `a:` string with:

```
'Slab Savvy is a collection of tools and content for sports card collectors and dealers, built by a Canadian CPA who collects cards himself. It covers the business side of the hobby: AI-powered inventory tracking (Slab Savvy Tracker), a free Canadian tax guide for card sellers (the Tax Playbook), and AI card photo enhancement (DisplayMyCard).'
```

- [ ] **Step 2: Update the who-runs-it answer (line 14).** Replace with:

```
'Slab Savvy is run by Nathan Wiebe, a Chartered Professional Accountant (CPA) in Canada and a lifelong sports card collector. He builds the tools himself and writes all the tax content personally.'
```

- [ ] **Step 3: Delete the Tax Ready Q&A** (the object at lines ~24-27: `q: 'What is the Tax Ready service?' …`). Remove the whole entry from the array.

- [ ] **Step 4: Update the page description (line 64).** Replace with:

```
description="Direct answers about Slab Savvy: the Tracker, Canadian tax rules for card sellers, the free Tax Playbook, and the CPA behind it all."
```

- [ ] **Step 5: Verify + commit**

```bash
cd project && npm run build && grep -in "tax ready\|taxready" src/pages/faq.astro
```

Expected: build 0, grep empty.

```bash
git add project/src/pages/faq.astro
git commit -m "feat: FAQ without the Tax Ready service"
```

### Task 10: Repoint blog-post mentions + full content sweep

Three posts link to `/taxready`. Replace each paragraph with in-voice copy that keeps the helpful intent but points at what still exists.

**Files:**
- Modify: `project/src/content/blog/sports-card-tax-checklist-canada.md:118`
- Modify: `project/src/content/blog/sports-card-capital-gains-vs-business-income-canada.md:66`
- Modify: `project/src/content/blog/gst-on-sports-card-sales-canada.md:122`
- Modify: `project/public/llms.txt` (remove Tax Ready mentions)

- [ ] **Step 1: tax-checklist post (line 118).** Replace the paragraph with:

```markdown
If your records are a mess, start with the free [Tax Playbook](/playbook) — it comes with the same tracking spreadsheet I recommend to clients, and it will get you from shoebox-of-screenshots to something your accountant can actually work with.
```

- [ ] **Step 2: capital-gains post (line 66).** Replace the paragraph with:

```markdown
If you have a specific situation that does not fit neatly (inherited collection, one-time liquidation, mix of hobby and business), talk to a CPA who understands the hobby before you file. The [Tax Playbook](/playbook) covers the general rules so you can walk into that conversation already knowing what matters.
```

- [ ] **Step 3: GST post (line 122).** Replace the paragraph with:

```markdown
The free [Tax Playbook](/playbook) walks through where the GST line actually sits for card dealers and what to do as you approach it. Grab it before you cross $30K in sales, not after.
```

- [ ] **Step 4: llms.txt** — open `project/public/llms.txt`, delete any line/section describing the Tax Ready service (keep everything else intact).

- [ ] **Step 5: Repo-wide sweep — the acceptance gate for Phase 2**

```bash
grep -rin "taxready\|tax ready\|tax-ready" project/src project/public --include="*.astro" --include="*.tsx" --include="*.md" --include="*.txt" --include="*.ts"
```

Expected: **zero hits** (a hit like the checklist post's "tax-ready exports" phrasing is fine ONLY if it's generic prose, not a service reference — judge each survivor; the goal is no reader can find the scrapped service).

```bash
cd project && npm run build
git add -A && git commit -m "feat: blog and llms.txt repointed after Tax Ready removal"
```

### Task 11: Honest SST waitlist wording

**Files:**
- Modify: `project/src/pages/waitlist.astro:92`

- [ ] **Step 1:** Replace the badge text `BETA COMING SOON` (line 92) with:

```
IN PRIVATE TESTING — JOIN FOR FIRST ACCESS
```

- [ ] **Step 2: Verify + commit + PR #2**

```bash
cd project && npm run build
git add project/src/pages/waitlist.astro
git commit -m "feat: honest SST waitlist badge"
git push
gh pr create --title "Phase 2: Tax Ready removed, honest SST wording" --body "$(cat <<'EOF'
Removes the scrapped Tax Ready service everywhere (page → 308 redirect to /playbook, nav, footer, homepage, FAQ, 3 blog posts, llms.txt), deletes its exclusive assets (lemieux frames, ContactForm), and rewords the stale waitlist badge.

Per docs/superpowers/plans/2026-07-09-site-completion-prd.md, Phase 2. Product decision by Nathan 2026-07-09: "I don't think I'll have time to do this. I think scrap it."

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

**STOP for Nathan's merge.**

---

# PHASE 3 — Trust + the email engine (PR #3)

### Task 12: Migration — signup source + drip tracking

**Files:**
- Create: `supabase/migrations/20260709120000_add_signup_source_and_drip.sql`

**Interfaces:**
- Produces: columns `source text NOT NULL DEFAULT 'waitlist'`, `welcome_sent_at timestamptz`, `drip_stage int NOT NULL DEFAULT 0` on `public.waitlist_signups` — Tasks 13-15 depend on these exact names.

- [ ] **Step 1: Write the migration**

```sql
-- Adds funnel-source tracking and drip-email state to signups.
-- source: 'waitlist' | 'newsletter' | 'playbook'
-- drip_stage: 0 = welcome only, 1 = day-3 email sent, 2 = day-7 email sent (done)
ALTER TABLE public.waitlist_signups
  ADD COLUMN source text NOT NULL DEFAULT 'waitlist',
  ADD COLUMN welcome_sent_at timestamptz,
  ADD COLUMN drip_stage int NOT NULL DEFAULT 0;

-- Backfill: rows created by the blog form used monthly_volume as a source marker
UPDATE public.waitlist_signups SET source = 'newsletter', monthly_volume = NULL
  WHERE monthly_volume = 'newsletter';

CREATE INDEX idx_waitlist_drip ON public.waitlist_signups (drip_stage, created_at)
  WHERE drip_stage < 2;
```

- [ ] **Step 2: Apply and verify**

```bash
supabase db push --project-ref jqjfxcbyotfozaspqwfz
```

Then `SELECT column_name FROM information_schema.columns WHERE table_name = 'waitlist_signups';` — expected to include `source`, `welcome_sent_at`, `drip_stage`.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/20260709120000_add_signup_source_and_drip.sql
git commit -m "feat: signup source + drip-stage columns"
```

### Task 13: submit-waitlist v2 — store source, send welcome + notify Nathan

**Files:**
- Modify: `supabase/functions/submit-waitlist/index.ts` (full rewrite below)
- Create: `supabase/functions/_shared/emails.ts`

**Interfaces:**
- Consumes: Task 12 columns.
- Produces: `sendEmail(to, subject, html)` and `WELCOME_EMAILS` map in `_shared/emails.ts`; request body gains optional `source: 'waitlist' | 'newsletter' | 'playbook'` (defaults `'waitlist'`). Task 14's forms and Task 15's drip both import from `_shared/emails.ts`.
- Env: `RESEND_API_KEY` (optional — function must work without it), `RESEND_FROM` (optional, default `Nathan @ Slab Savvy <nathan@slabsavvycpa.com>`), `NOTIFY_EMAIL` (optional, default `slabsavvycpa@gmail.com`).

- [ ] **Step 1: Create `supabase/functions/_shared/emails.ts`**

```ts
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const FROM = Deno.env.get('RESEND_FROM') ?? 'Nathan @ Slab Savvy <nathan@slabsavvycpa.com>';

export const NOTIFY_EMAIL = Deno.env.get('NOTIFY_EMAIL') ?? 'slabsavvycpa@gmail.com';
export const GUMROAD_PLAYBOOK_URL = 'https://slabsavvycpa.gumroad.com/l/tax-playbook';
export const SITE_URL = 'https://www.slabsavvycpa.com';

export type SignupSource = 'waitlist' | 'newsletter' | 'playbook';

/** Sends via Resend. Returns true on success, false if no key or the API errored (never throws). */
export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!RESEND_API_KEY) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({ from: FROM, to: [to], subject, html }),
    });
    if (!res.ok) console.error('resend_error', res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error('resend_exception', String(err));
    return false;
  }
}

const wrap = (body: string) => `
<div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.6;">
  ${body}
  <p style="margin-top: 32px;">— Nathan<br><span style="color:#8a7a55;">Slab Savvy CPA · <a href="${SITE_URL}" style="color:#8a7a55;">slabsavvycpa.com</a></span></p>
  <p style="font-size: 12px; color: #999; margin-top: 24px;">You're getting this because you signed up at slabsavvycpa.com. Reply "unsubscribe" and I'll take you off the list — no hard feelings.</p>
</div>`;

export const WELCOME_EMAILS: Record<SignupSource, { subject: string; html: string }> = {
  playbook: {
    subject: 'Your Tax Playbook is inside',
    html: wrap(`
      <p>Hey — Nathan here. CPA by day, collector always.</p>
      <p><a href="${GUMROAD_PLAYBOOK_URL}"><strong>Grab your copy of the Card Collectors Tax Playbook here.</strong></a></p>
      <p>62 pages of plain-English Canadian tax rules for card sellers: what the CRA actually cares about, hobby vs business income, and how to keep records that don't fall apart in April. The download includes my card-tracking spreadsheet template.</p>
      <p>One ask: when something in there raises a question about <em>your</em> situation, hit reply. I read every one.</p>`),
  },
  newsletter: {
    subject: "You're on The Flip Sheet",
    html: wrap(`
      <p>Hey — Nathan here. You're on The Flip Sheet: tax tips, market takes, and business advice for Canadian card dealers.</p>
      <p>Expect roughly one email a month — more during tax season, when it actually matters. No spam, and the unsubscribe below always works.</p>
      <p>If you haven't grabbed it yet, start with the free <a href="${GUMROAD_PLAYBOOK_URL}">Card Collectors Tax Playbook</a> — it answers the questions every Canadian seller has in April.</p>`),
  },
  waitlist: {
    subject: "You're on the Tracker list",
    html: wrap(`
      <p>Hey — Nathan here. You're on the list for Slab Savvy Tracker: snap a photo of a card on Telegram, get it logged with comps in a spreadsheet you own.</p>
      <p>It's in private testing right now. You'll hear from me the moment beta spots open — first come, first in.</p>
      <p>While you wait: the free <a href="${GUMROAD_PLAYBOOK_URL}">Card Collectors Tax Playbook</a> covers the tax side of selling, so the business end of your hobby is handled before the software arrives.</p>`),
  },
};

export const DRIP_EMAILS: { stage: number; afterDays: number; subject: string; html: string }[] = [
  {
    stage: 1,
    afterDays: 3,
    subject: 'The mistake that costs card sellers the most',
    html: wrap(`
      <p>Quick one. The single most expensive mistake I see Canadian card sellers make isn't missing a receipt — it's guessing wrong on <strong>capital gains vs business income</strong>.</p>
      <p>It's the difference between paying tax on half your profit or all of it, and the CRA decides based on how you <em>behave</em>, not what you call yourself.</p>
      <p><a href="${SITE_URL}/blog/sports-card-capital-gains-vs-business-income-canada/">Here's the plain-English breakdown</a> — five minutes, could save you real money this April.</p>`),
  },
  {
    stage: 2,
    afterDays: 7,
    subject: 'Your listings deserve better photos',
    html: wrap(`
      <p>Last one from me for a while. Beyond the tax stuff, I build tools for this hobby — and the one that's live today is <a href="https://displaymycard.com">DisplayMyCard</a>.</p>
      <p>Phone-on-the-kitchen-table photos cost sellers real money. DisplayMyCard turns your card photo into a clean, pro-looking listing image with AI — $7.99/month, less than a blaster, and if it lifts one sale $50 it's paid for itself for months.</p>
      <p>I built it myself, I use it on my own listings, and there's a free tier to try. <a href="https://displaymycard.com">Have a look.</a></p>`),
  },
];
```

- [ ] **Step 2: Rewrite `supabase/functions/submit-waitlist/index.ts`**

```ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { sendEmail, WELCOME_EMAILS, NOTIFY_EMAIL, type SignupSource } from '../_shared/emails.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

const VALID_SOURCES: SignupSource[] = ['waitlist', 'newsletter', 'playbook']

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { email, monthly_volume, source } = await req.json()

    if (!email || !email.includes('@')) {
      return json(400, { success: false, error: 'A valid email address is required.' })
    }
    const signupSource: SignupSource = VALID_SOURCES.includes(source) ? source : 'waitlist'

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const cleanEmail = email.trim().toLowerCase()
    const { data: existing } = await supabase
      .from('waitlist_signups').select('id, welcome_sent_at').eq('email', cleanEmail).maybeSingle()

    const { error } = await supabase.from('waitlist_signups').upsert(
      {
        email: cleanEmail,
        monthly_volume: monthly_volume || null,
        source: signupSource,
        ip_address: req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown',
        user_agent: req.headers.get('user-agent') || 'unknown',
      },
      { onConflict: 'email' }
    )
    if (error) {
      console.error('signup_upsert_error', error.message)
      return json(500, { success: false, error: 'Something went wrong. Try again.' })
    }

    // Welcome email — once per address, best-effort (signup succeeds regardless)
    if (!existing?.welcome_sent_at) {
      const welcome = WELCOME_EMAILS[signupSource]
      const sent = await sendEmail(cleanEmail, welcome.subject, welcome.html)
      if (sent) {
        await supabase.from('waitlist_signups')
          .update({ welcome_sent_at: new Date().toISOString() }).eq('email', cleanEmail)
      }
    }

    // Notify Nathan — best-effort
    await sendEmail(
      NOTIFY_EMAIL,
      `New SSC signup: ${cleanEmail} (${signupSource})`,
      `<p><strong>${cleanEmail}</strong> signed up via <strong>${signupSource}</strong>${monthly_volume ? ` · volume: ${monthly_volume}` : ''}.</p>`
    )

    return json(200, { success: true })
  } catch (_err) {
    return json(500, { success: false, error: 'Something went wrong. Try again.' })
  }
})
```

- [ ] **Step 3: Test locally**

```bash
supabase functions serve submit-waitlist --env-file <(echo "") &
sleep 2
curl -s -X POST http://localhost:54321/functions/v1/submit-waitlist \
  -H "Content-Type: application/json" \
  -d '{"email":"ssc-test-v2@example.com","source":"playbook"}'
```

Expected: `{"success":true}` — proving the no-Resend-key path works. Check the local/remote table for the row with `source = 'playbook'`, then delete the test row.

- [ ] **Step 4: Deploy**

```bash
supabase functions deploy submit-waitlist --project-ref jqjfxcbyotfozaspqwfz
```

If `RESEND_API_KEY` isn't set yet (blocker N1), that's fine — signups store correctly and emails silently skip; record N1/N2 in WAITING-ON-NATHAN.

- [ ] **Step 5: Commit**

```bash
git add supabase/functions/_shared/emails.ts supabase/functions/submit-waitlist/index.ts
git commit -m "feat: signups send source-specific welcome email + notify Nathan (Resend)"
```

### Task 14: Frontend sources + the Playbook email gate

**Files:**
- Modify: `project/src/components/WaitlistForm.tsx:41-44` (add `source: 'waitlist'` to the body)
- Modify: `project/src/layouts/BlogLayout.astro` (newsletter fetch body → `source: 'newsletter'`, drop the `monthly_volume: 'newsletter'` hack)
- Create: `project/src/components/PlaybookForm.tsx`
- Modify: `project/src/pages/playbook.astro:60-125` (primary CTA becomes the form; Gumroad link becomes the fallback)

**Interfaces:**
- Consumes: Task 13's `source` body field.

- [ ] **Step 1: WaitlistForm** — in the `body: JSON.stringify({...})` at lines 41-44, add `source: 'waitlist',`.

- [ ] **Step 2: BlogLayout** — in the fetch body written in Task 3, replace `{ email, monthly_volume: 'newsletter' }` with `{ email, source: 'newsletter' }`.

- [ ] **Step 3: Create `PlaybookForm.tsx`** — modeled on WaitlistForm (same imports, same state/handling pattern, same input styling), email field only:

```tsx
import React, { useState } from 'react';
import { CheckCircle, Loader2, Mail } from 'lucide-react';
import { captureEvent } from '../lib/posthog';

export const PlaybookForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setIsSubmitting(true);
    try {
      const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
      const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/submit-waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
        },
        body: JSON.stringify({ email: email.trim(), source: 'playbook' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Something went wrong. Try again.');
        return;
      }
      captureEvent('playbook_signup', {});
      setIsSuccess(true);
    } catch (_err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-ssc-gold/10 border border-ssc-gold/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-ssc-gold" />
        </div>
        <h3 className="font-headline text-3xl text-ssc-gold tracking-wide mb-3">CHECK YOUR INBOX</h3>
        <p className="font-body text-ssc-text-muted max-w-md mx-auto">
          Your download link is on its way. If it's not there in two minutes, check spam — then rescue it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ssc-text-muted" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full pl-11 pr-4 py-3 min-h-[44px] bg-white border border-ssc-border text-ssc-text font-body placeholder:text-ssc-text-muted/60 focus:outline-none focus:border-ssc-gold focus:ring-1 focus:ring-ssc-gold transition-colors"
        />
      </div>
      {error && <p className="text-red-500 font-body text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 btn-shine bg-ssc-gold text-ssc-black font-body font-bold hover:bg-ssc-gold-dark disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px]"
      >
        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'SEND ME THE FREE PLAYBOOK'}
      </button>
    </form>
  );
};
```

- [ ] **Step 4: Wire into `playbook.astro`.** Import `import { PlaybookForm } from '../components/PlaybookForm';`. Replace the primary Gumroad button block (~lines 63-67) with `<PlaybookForm client:load />`. Below it add the fallback line (styled small):

```html
<p class="font-body text-sm text-ssc-text-muted mt-4">
  Prefer not to leave an email? <a href="https://slabsavvycpa.gumroad.com/l/tax-playbook" class="text-ssc-gold font-semibold hover:text-ssc-gold-dark">Grab it straight from Gumroad</a>.
</p>
```

Keep the second Gumroad CTA lower on the page (~lines 116-124) as-is — it's the post-content catch. Update its intro line `Check your Gumroad receipt for the spreadsheet link after download.` only if it now reads wrong in context.

**IMPORTANT dependency:** this gate only makes sense when welcome emails actually deliver (blockers N1 + N2). Build it, but if N1/N2 aren't done by PR time, note in the PR that the playbook.astro wiring commit should merge only after the Resend domain is verified — or ship with the form AND the visible Gumroad primary button both present.

- [ ] **Step 5: Verify + commit**

```bash
cd project && npm run build
```

Preview at 375px: form renders, fallback link visible. Submit a test email end-to-end once Resend is live; without Resend, confirm the row lands with `source='playbook'` and the success state shows. Delete test rows.

```bash
git add project/src/components/PlaybookForm.tsx project/src/components/WaitlistForm.tsx project/src/layouts/BlogLayout.astro project/src/pages/playbook.astro
git commit -m "feat: on-site Playbook email gate; all forms tag their signup source"
```

### Task 15: Drip sender + daily cron

**Files:**
- Create: `supabase/functions/send-drip/index.ts`
- Create: `.github/workflows/drip-cron.yml`

**Interfaces:**
- Consumes: `DRIP_EMAILS` from `_shared/emails.ts` (Task 13), `drip_stage`/`created_at` columns (Task 12).
- Env: `DRIP_SECRET` (Supabase secret + GitHub secret — blocker N3), `RESEND_API_KEY`.

- [ ] **Step 1: Create `supabase/functions/send-drip/index.ts`**

```ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { sendEmail, DRIP_EMAILS } from '../_shared/emails.ts'

Deno.serve(async (req) => {
  const secret = Deno.env.get('DRIP_SECRET') ?? ''
  if (!secret || req.headers.get('x-drip-secret') !== secret) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  let sentCount = 0
  // Reverse stage order: a row advanced to stage 1 this run must not also
  // match the stage-2 query in the same run (backlogged rows would get two
  // emails at once; reversed, they pace one stage per daily run).
  for (const drip of [...DRIP_EMAILS].reverse()) {
    const cutoff = new Date(Date.now() - drip.afterDays * 24 * 60 * 60 * 1000).toISOString()
    const { data: due, error } = await supabase
      .from('waitlist_signups')
      .select('id, email')
      .eq('drip_stage', drip.stage - 1)
      .not('welcome_sent_at', 'is', null)
      .lt('created_at', cutoff)
      .limit(50)
    if (error) {
      console.error('drip_query_error', error.message)
      continue
    }
    for (const row of due ?? []) {
      const ok = await sendEmail(row.email, drip.subject, drip.html)
      if (ok) {
        await supabase.from('waitlist_signups').update({ drip_stage: drip.stage }).eq('id', row.id)
        sentCount++
      }
    }
  }
  return new Response(JSON.stringify({ success: true, sent: sentCount }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

Note the guard `.not('welcome_sent_at', 'is', null)`: nobody enters the drip unless a welcome actually delivered — this keeps pre-Resend legacy rows out of the sequence forever (they have `welcome_sent_at IS NULL`).

- [ ] **Step 2: Create `.github/workflows/drip-cron.yml`**

```yaml
name: drip-cron
on:
  schedule:
    - cron: "0 15 * * *"   # daily 15:00 UTC ≈ 9am Alberta
  workflow_dispatch: {}

jobs:
  send-drip:
    runs-on: ubuntu-latest
    steps:
      - name: Invoke send-drip
        run: |
          curl -sf -X POST \
            "https://jqjfxcbyotfozaspqwfz.supabase.co/functions/v1/send-drip" \
            -H "x-drip-secret: ${{ secrets.DRIP_SECRET }}" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}" \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}"
```

(GitHub secrets needed: `DRIP_SECRET` (N3) and `SUPABASE_ANON_KEY` — the public anon key, safe as a secret store.)

- [ ] **Step 3: Deploy + test**

```bash
supabase functions deploy send-drip --project-ref jqjfxcbyotfozaspqwfz
curl -s -X POST "https://jqjfxcbyotfozaspqwfz.supabase.co/functions/v1/send-drip" -H "x-drip-secret: wrong" -H "Authorization: Bearer <anon-key>" -H "apikey: <anon-key>"
```

Expected: `{"error":"unauthorized"}` with 401. With the correct secret (once N3 done): `{"success":true,"sent":0}` (no rows due yet).

- [ ] **Step 4: Commit**

```bash
git add supabase/functions/send-drip/index.ts .github/workflows/drip-cron.yml
git commit -m "feat: 2-step drip sequence (day-3 tax post, day-7 DMC intro) on a daily cron"
```

### Task 16: About page with the real headshot

**Files:**
- Create: `project/public/nathan-wiebe.webp` (from the Golden Hour brand set)
- Create: `project/src/pages/about.astro`

- [ ] **Step 1: Pick and optimize the headshot.** Source: `~/Projects/9-ContentPipeline/brand-photos/identity/` (fall back to `content/` if identity has no portrait). Pick the clearest head-and-shoulders portrait. Convert:

```bash
ls ~/Projects/9-ContentPipeline/brand-photos/identity/
# pick <FILE>, then:
sips -Z 800 -s format webp ~/Projects/9-ContentPipeline/brand-photos/identity/<FILE> --out project/public/nathan-wiebe.webp
ls -la project/public/nathan-wiebe.webp
```

Expected: file ≤ 200KB (if larger, re-run with `-Z 600`). **Record blocker N4: Nathan approves the chosen photo in the PR.**

- [ ] **Step 2: Create `about.astro`.** Use `BaseLayout` + `Navigation` + `Footer` exactly like `faq.astro` does (copy its import/frame structure). Title: `About — Slab Savvy`. Description: `Nathan Wiebe: Canadian CPA, lifelong collector, and the builder behind Slab Savvy.` Content structure (style with existing tokens — `font-headline` gold headings, `font-body` text, max-w-3xl article):

```markdown
# THE CPA WHO COLLECTS                                [hero h1]

[Photo: /nathan-wiebe.webp, alt "Nathan Wiebe", displayed ~320px wide, sharp corners, next to or above the intro]

I'm Nathan Wiebe — a Chartered Professional Accountant in Canada and a
lifelong sports card collector. By day I do the books. The rest of the
time I'm in the same Facebook groups you are, chasing the same cardboard.

Slab Savvy exists because those two worlds kept colliding. Collectors
kept asking the same tax questions and getting confidently wrong answers
from the internet. Accountants kept not knowing what a YG is. Somebody
had to sit in the middle.

## WHAT I'VE MADE SO FAR                              [h2]

- **The Tax Playbook** — a free 62-page guide to Canadian taxes for card
  sellers. No paywall, no upsell inside. [→ /playbook]
- **DisplayMyCard** — AI photo enhancement that makes your listings look
  like they were shot in a studio, not on a kitchen table. [→ displaymycard.com]
- **Slab Savvy Tracker** — a Telegram bot that logs your cards into a
  spreadsheet you own. In private testing. [→ /waitlist]

I build these myself — the AI tools, the code, all of it. If you're
curious what a CPA with a code habit can put together, that's the
[What I've Built](/built) page.

## THE STRAIGHT-GOODS PROMISE                         [h2]

Everything here follows the same rule I use with clients: plain answers,
no scare tactics, no pretending the CRA is either asleep or omniscient.
The rules are knowable. Someone just has to translate them.

[CTA block, matching blog post CTA styling:]
Questions? Email slabsavvycpa@gmail.com — I read everything.
```

Include `jsonLd` on the page: `{'@type': 'AboutPage', mainEntity: {'@type': 'Person', name: 'Nathan Wiebe', jobTitle: 'Chartered Professional Accountant (CPA)', image: 'https://www.slabsavvycpa.com/nathan-wiebe.webp'}}` (follow the JSON-LD prop pattern other pages use with BaseLayout).

- [ ] **Step 3: Verify + commit**

```bash
cd project && npm run build
```

Preview `/about` at 375px and desktop: photo loads, no overflow.

```bash
git add project/public/nathan-wiebe.webp project/src/pages/about.astro
git commit -m "feat: About page — the CPA who collects, with a real face"
```

### Task 17: "What I've Built" portfolio page

**Files:**
- Create: `project/src/pages/built.astro`

- [ ] **Step 1: Create `built.astro`** (same layout skeleton as `about.astro`). Title: `What I've Built — Slab Savvy`. Description: `The tools, bots, and AI systems Nathan Wiebe has shipped — for collectors and for small businesses.` Content:

```markdown
# WHAT I'VE BUILT                                     [hero h1]

A CPA with a code habit. Everything below is live, shipped by me,
and built with the same AI-assisted process I now use for clients.

[Card grid, one card per item, matching homepage product-card styling:]

**DISPLAYMYCARD** — AI photo enhancement for card sellers. Upload a
phone photo, get a listing image that looks professionally shot.
Live SaaS product with paying subscribers. [displaymycard.com]

**SLAB SAVVY TRACKER** — Telegram bot: photo in, spreadsheet row out,
comps included. In private beta. [/waitlist]

**THE TAX PLAYBOOK** — 62-page plain-English Canadian tax guide for
card sellers, downloaded by collectors across the country. Free. [/playbook]

**THIS SITE** — designed, written, and built by me (with AI doing the
heavy lifting), including the animations. [/]

**BUSINESS AUTOMATION DEMOS** — AI systems built for local businesses:
instant lead-response for service companies, emergency-aware maintenance
triage for property managers. Built in days, not months.

[Closing CTA block:]
## WANT SOMETHING LIKE THIS FOR YOUR BUSINESS?        [h2]
I take on a small number of AI consulting projects — automation,
custom tools, and "can this even be done?" conversations.
[Button: mailto:slabsavvycpa@gmail.com?subject=AI%20consulting%20inquiry — "GET IN TOUCH"]
```

(No pricing, no service tiers — this is a portfolio with a door, per Nathan's decision #5. Don't link the demo URLs directly; describe them — the workers.dev URLs aren't branded.)

- [ ] **Step 2: Verify + commit**

```bash
cd project && npm run build
git add project/src/pages/built.astro
git commit -m "feat: What I've Built portfolio page with soft consulting CTA"
```

### Task 18: Wire the new pages into nav, footer, and homepage

**Files:**
- Modify: `project/src/components/Navigation.astro` (nav items array, ~line 5-9)
- Modify: `project/src/components/Footer.astro` (link list)
- Modify: `project/src/pages/index.astro` (4th product card + credential block photo)

- [ ] **Step 1: Navigation** — add `{ name: 'About', href: '/about' },` to the items array (after Blog/FAQ, matching existing order conventions). Keep nav ≤5 items; `/built` lives in the footer and About page, not the main nav.

- [ ] **Step 2: Footer** — in the slot where Tax Ready was removed (Task 7), add two links matching sibling markup exactly: `About` → `/about` and `What I've Built` → `/built`.

- [ ] **Step 3: Homepage 4th card** — in the product-card grid (Task 8 left 3 cards), add a card matching sibling component syntax:

```
title="BUILT BY A COLLECTOR"
description="Every tool here is built by the same CPA who writes the tax content — see what else is in the workshop."
href="/built"
cta="See What I've Built"
```

(Adjust prop names to match the actual card component's interface — read a sibling card invocation first. If Task 8 changed the grid to `md:grid-cols-3`, restore `md:grid-cols-2 lg:grid-cols-4` or whatever the original 4-card layout used.)

- [ ] **Step 4: Homepage credential block photo.** Find the trust/credentials section (the one listing CPA / Active Collector / 15+ FB Groups / AI-Enhanced). Add the headshot `/nathan-wiebe.webp` (~200px, sharp corners, `alt="Nathan Wiebe, CPA"`) beside the credentials so the block finally has a face. Match existing spacing patterns.

- [ ] **Step 5: Verify + commit + PR #3**

```bash
cd project && npm run build
```

Preview at 375px AND desktop: nav shows About, footer shows both links, homepage grid is 4 cards again, headshot renders in the credential block.

```bash
git add project/src/components/Navigation.astro project/src/components/Footer.astro project/src/pages/index.astro
git commit -m "feat: About + What I've Built wired into nav, footer, homepage"
git push
gh pr create --title "Phase 3: email engine, About page, portfolio" --body "$(cat <<'EOF'
Adds the owned-list engine (source-tagged signups, Resend welcome emails per source, Nathan-notification, day-3/day-7 drip via GitHub Actions cron), the on-site Playbook email gate (Gumroad now the fallback), the About page with Nathan's real headshot (N4: approve the photo), and the What I've Built portfolio page with a soft consulting CTA.

Nathan-steps before full effect: N1 RESEND_API_KEY, N2 domain DNS verification, N3 DRIP_SECRET (see plan §Nathan-only steps).

Per docs/superpowers/plans/2026-07-09-site-completion-prd.md, Phase 3.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

# PHASE 4 — Content cadence (not Sonnet-mechanical; runs with the slab-savvy-voice skill)

Not code tasks — listed so the PRD is complete. One post/month Jul–Dec, two/month Jan–Apr. Claude drafts with the `slab-savvy-voice` skill; Nathan reviews 15 min; each post doubles as a Facebook group post. Calendar:

| Month | Post | Angle |
|---|---|---|
| Jul | The mid-year checkup for card sellers | 6 things to fix in July that save April panic |
| Aug | What eBay actually reports to the CRA in 2026 | SIN collection, thresholds, what lands on CRA's desk |
| Sep | GST for box breakers | The $30K line when you run breaks, not sales |
| Oct | "I sold one big card" — the one-off seller's guide | Casual-collector segment, high search intent |
| Nov | Year-end moves for card dealers | Timing sales, harvesting losses, RRSP interplay |
| Dec | The records catch-up guide | Rebuilding cost basis from Gmail + eBay history |

Every post ends with the (now working) FLIP SHEET box and links to `/playbook`.

**Testimonials (deferred):** no fake quotes, ever. When Nathan has 1-2 real quotes from Playbook readers or DMC users, add a small quotes strip to `/playbook` and `/built`. Until then the sections simply don't exist.

---

# Definition of Done (whole project)

1. `npm run build` green; all pages 200; `/taxready`, `/spreadsheet`, `/sitemap.xml` return 308 to the right targets.
2. Zero references to Tax Ready anywhere a visitor can see (grep gate in Task 10 Step 5).
3. A signup from each of the 4 surfaces (waitlist, blog box, playbook form, and one legacy check) lands in `waitlist_signups` with the right `source`, triggers a welcome email (once N1/N2 done) and a notification to slabsavvycpa@gmail.com.
4. Drip cron runs green in GitHub Actions and advances `drip_stage` correctly (verify with a test row whose `created_at` is backdated 4 days: `UPDATE waitlist_signups SET created_at = now() - interval '4 days' WHERE email = '<test>';` → run workflow → expect stage 1 sent).
5. About + Built pages live, headshot approved by Nathan (N4), no console errors on any page, everything clean at 375px.
6. No PostHog 401s in the console.
