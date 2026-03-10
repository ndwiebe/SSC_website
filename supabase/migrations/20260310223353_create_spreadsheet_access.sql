CREATE TABLE public.spreadsheet_access (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  access_code text NOT NULL,
  granted_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Index for quick lookups and preventing spam
CREATE INDEX idx_spreadsheet_access_email ON public.spreadsheet_access(email);

-- Enable RLS
ALTER TABLE public.spreadsheet_access ENABLE ROW LEVEL SECURITY;

-- No SELECT/UPDATE/DELETE policies needed — this is insert-only from the edge function
-- The edge function uses the service_role key, which bypasses RLS
