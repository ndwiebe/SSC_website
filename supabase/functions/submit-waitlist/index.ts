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
