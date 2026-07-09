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
