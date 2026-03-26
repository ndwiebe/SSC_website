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

-- No SELECT/UPDATE/DELETE policies needed — this is insert-only from the edge function
-- The edge function uses the service_role key, which bypasses RLS
