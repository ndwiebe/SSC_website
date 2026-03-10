import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, code } = await req.json()

    const validCode = Deno.env.get('SPREADSHEET_ACCESS_CODE') || 'PLAYBOOK2025'
    const sheetUrl = Deno.env.get('SPREADSHEET_URL') || 'https://docs.google.com/spreadsheets/d/PLACEHOLDER/copy'

    if (!email || !code) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email and code are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (code.trim().toUpperCase() !== validCode.toUpperCase()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid access code. The code is included with your Tax Playbook purchase.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Store the email
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    await supabase.from('spreadsheet_access').insert({
      email: email.trim().toLowerCase(),
      access_code: code.trim().toUpperCase(),
      ip_address: req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown',
      user_agent: req.headers.get('user-agent') || 'unknown',
    })

    return new Response(
      JSON.stringify({ success: true, sheet_url: sheetUrl }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: 'Something went wrong. Try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
