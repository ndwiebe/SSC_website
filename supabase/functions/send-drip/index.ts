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
