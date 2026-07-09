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
