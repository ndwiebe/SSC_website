# SSC Site Activation — Finish-Off PRD (for Sonnet)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (or superpowers:subagent-driven-development for track-per-subagent). Steps use checkbox (`- [ ]`) syntax.

**Goal:** Activate everything the 2026-07-09 site-completion build left dormant — welcome/notify emails, the drip sequence, the real headshot — plus repo housekeeping and the July blog post.

**Context:** The full build (see `2026-07-09-site-completion-prd.md` + ledger `.superpowers/sdd/progress.md`) is MERGED TO MAIN and live-tested on slabsavvycpa.com. Signups are being captured and source-tagged in prod right now; emails silently skip until Resend is configured. Supabase project: `jqjfxcbyotfozaspqwfz`. Edge functions `submit-waitlist` and `send-drip` are deployed. GitHub repo: `ndwiebe/SSC_website`, workflow `.github/workflows/drip-cron.yml` (daily 15:00 UTC).

## Global Constraints (inherited from the build PRD — binding)

- TypeScript strict, no `any`, no `console.log`; edge functions may use structured `console.error`.
- Voice: Slab Savvy CPA (use the `slab-savvy-voice` skill for any new prose).
- Design tokens `ssc-*`, sharp corners, `min-h-[44px]`; test UI at 375px.
- No test framework in repo: verify via `npm run build` (from `project/`), curl with expected output, browser check.
- Branch per track → PR → **Nathan approves every merge to main**. Never push to main directly.
- Git author `Nathan Wiebe <dominathan@gmail.com>`. Never commit secrets.
- **vercel.json lives at `project/vercel.json`** (Vercel Root Directory = `project`) — the repo-root one was deleted for being ignored; do not recreate it.
- Clean up every test row you create in `waitlist_signups` (emails matching `ssc-test-%`).
- When a track blocks on a Nathan-only input, add one line to `~/jarvis-memory/_ops/WAITING-ON-NATHAN.md` and move to another track.

## Track status / triggers

| Track | Trigger | Blocked on Nathan? |
|---|---|---|
| A — Email activation | Nathan supplies Resend API key (+ later, DNS records) | YES (key, DNS) |
| B — Drip cron secrets | none — fully autonomous | NO |
| C — Headshot swap | Nathan sends a photo | YES (photo) |
| D — Repo/DB housekeeping | none | NO |
| E — July blog post | none (Nathan 15-min review before publish) | Review only |
| F — Final verification | after A + B | — |

Run B, D, E immediately; A and C when their inputs land.

---

## Track A — Email engine activation

### A1: Set the Resend key (trigger: Nathan provides it)

- [ ] `supabase secrets set RESEND_API_KEY=<key> --project-ref jqjfxcbyotfozaspqwfz`
  (Secrets propagate to running functions automatically within ~a minute; no redeploy needed. If in doubt: `supabase functions deploy submit-waitlist --project-ref jqjfxcbyotfozaspqwfz`.)
- [ ] **Sending-domain caveat:** until the domain is verified (A2), Resend's default onboarding sender can only deliver to the Resend account owner's own email address. So test accordingly:
- [ ] Test: `curl -s -X POST https://jqjfxcbyotfozaspqwfz.supabase.co/functions/v1/submit-waitlist -H "Content-Type: application/json" -H "Authorization: Bearer <ANON_KEY>" -H "apikey: <ANON_KEY>" -d '{"email":"<NATHAN'S OWN RESEND ACCOUNT EMAIL>","source":"playbook"}'`
  Expected: `{"success":true}`, the playbook welcome email arrives in that inbox, AND a notification lands at slabsavvycpa@gmail.com. Verify `welcome_sent_at` is now set on the row: `SELECT email, welcome_sent_at FROM waitlist_signups WHERE email='<that email>';`
- [ ] Delete the test row.

### A2: Verified domain (trigger: Nathan adds the 2 DNS records)

- [ ] In Resend, add domain `slabsavvycpa.com` → give Nathan the exact DKIM/SPF records to add at his registrar → wait for verified status.
- [ ] `supabase secrets set RESEND_FROM="Nathan @ Slab Savvy <nathan@slabsavvycpa.com>" --project-ref jqjfxcbyotfozaspqwfz`
- [ ] Re-run the A1 test with a NON-owner address you can check. Confirm delivery and that it's not in spam. Delete the test row.

## Track B — Drip cron secrets (autonomous — do first)

- [ ] Generate: `SECRET=$(openssl rand -hex 32)`
- [ ] `supabase secrets set DRIP_SECRET=$SECRET --project-ref jqjfxcbyotfozaspqwfz`
- [ ] `gh secret set DRIP_SECRET --repo ndwiebe/SSC_website --body "$SECRET"`
- [ ] `gh secret set SUPABASE_ANON_KEY --repo ndwiebe/SSC_website --body "<the public anon key — same one the frontend uses, from project/.env or Vercel env PUBLIC_SUPABASE_ANON_KEY>"`
- [ ] Trigger once: `gh workflow run drip-cron --repo ndwiebe/SSC_website` then `gh run watch` (or `gh run list --workflow=drip-cron` → check latest run succeeded).
  Expected: workflow green; the function returned `{"success":true,"sent":0}` (no rows due).
- [ ] Confirm the wrong-secret path still 401s (fail-closed): curl with `x-drip-secret: wrong` → 401.

## Track C — Headshot swap (trigger: Nathan sends a photo on Telegram)

- [ ] Optimize: crop head-and-shoulders, warm/golden grade to match the brand look if raw, `→ project/public/nathan-wiebe.webp` ≤200KB (Python Pillow works on this machine; `sips` lacks webp).
- [ ] `project/src/pages/about.astro`: swap the interim `<img src="/about-desk.webp">` block for the headshot (`alt="Nathan Wiebe, CPA"`), remove the interim HTML comment, and add `image: 'https://www.slabsavvycpa.com/nathan-wiebe.webp'` back into the JSON-LD Person entity.
- [ ] Homepage credential block (`project/src/pages/index.astro`, the CPA/Active Collector/15+ FB Groups/AI-Enhanced section): add the headshot ~200px, sharp corners, `alt="Nathan Wiebe, CPA"`, matching sibling spacing — this is the deferred Task 18 Step 4 from the build PRD.
- [ ] Keep `about-desk.webp` in use elsewhere on the About page only if it still fits the layout; otherwise delete the file (it was interim).
- [ ] Build, 375px + desktop check, PR titled "feat: real headshot on About + homepage". Nathan approves the photo in the PR (this is his N4 approval).

## Track D — Repo/DB housekeeping (autonomous)

- [ ] **Migration history reconciliation** so `supabase db push` works again. Current state: remote history has `20260709162510_create_prospects_table` (from the NAT-106 CRM workstream — its table is real and used; do NOT drop it) and an MCP-applied entry `20260709201721` whose DDL is the repo's `20260709120000_add_signup_source_and_drip.sql`.
  1. `supabase migration list --project-ref jqjfxcbyotfozaspqwfz` — record the exact remote entries.
  2. Pull the prospects DDL into the repo so local matches remote: `supabase db pull` (or write `supabase/migrations/20260709162510_create_prospects_table.sql` from the live schema: `prospects` table — get columns via `\d` equivalent SQL).
  3. Repair the timestamp mismatch: `supabase migration repair --status reverted 20260709201721 --project-ref ...` and `supabase migration repair --status applied 20260709120000 --project-ref ...` (this only edits the history table, not the schema — verify each command's plan output before confirming).
  4. Prove it: `supabase db push --project-ref jqjfxcbyotfozaspqwfz --dry-run` → "Remote database is up to date." If ANY repair step wants to run actual DDL, STOP and report — do not let it re-apply or revert schema.
- [ ] Add `*.jpeg binary` to `.gitattributes` (one line, closes a review note).
- [ ] Commit both on a branch → PR.

## Track E — July blog post (content; Nathan review before publish)

- [ ] Draft with the `slab-savvy-voice` skill: **"The Mid-Year Checkup for Card Sellers"** — 6 things to fix in July that save April panic (records catch-up, hobby-vs-business gut check, GST run-rate check at half-year, fee/shipping deduction hygiene, USD conversion notes, the one-page paper trail). ~1,500-2,000 words, hobby-native, specific dollar examples, NO scare tactics.
- [ ] Format as `project/src/content/blog/mid-year-checkup-card-sellers-canada.md` matching existing posts' frontmatter exactly (title, description, pubDate, author, category "tax-tips", tags). Internal links to `/playbook` and one prior post. The FLIP SHEET signup box renders automatically from BlogLayout.
- [ ] Build; verify the post renders at `/blog/mid-year-checkup-card-sellers-canada/` and appears on `/blog`.
- [ ] PR titled "content: July post — mid-year checkup". **Send Nathan the draft text on Telegram for his 15-minute review BEFORE merging.** Also give him a 150-word Facebook-group version of the same content in the PR body (one effort, two channels).

## Track F — Final verification (after A and B are live)

- [ ] **Backdated drip test (DoD #4 from the build PRD):** insert a test row: `INSERT INTO waitlist_signups (email, source, welcome_sent_at, created_at, drip_stage) VALUES ('ssc-test-drip@<address you can check>', 'playbook', now(), now() - interval '4 days', 0);` → `gh workflow run drip-cron` → expect `sent:1`, row `drip_stage=1`, the day-3 email received. Run again → expect `sent:0` (day-7 not due yet: created_at is only 4 days back). Delete the row.
- [ ] Full funnel: live browser signup on /playbook with a checkable address → success state → welcome email with the Gumroad link arrives → notification at slabsavvycpa@gmail.com → row source='playbook'. Delete the row.
- [ ] PostHog: confirm `playbook_signup` / `waitlist_signup` / `newsletter_signup` events appear (dashboard or MCP query).
- [ ] Update `~/jarvis-memory/projects/2026-07-09-ssc-website-audit.md` (flip the outstanding items) and remove the SSC line from `~/jarvis-memory/_ops/WAITING-ON-NATHAN.md`.

## Deferred / not in scope

- Testimonials (no fake quotes — wait for real ones, then a quotes strip on /playbook and /built)
- Second lead magnet (spreadsheet template as its own opt-in)
- Aug–Dec blog cadence (1/month; topics in the build PRD Phase 4 table)
- Welcome double-send race on concurrent same-email signups + drip 50/stage/day cap (accepted at current scale)
