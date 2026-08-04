const { demoRequestEmail } = require("./_emailTemplates");
const { sendResendEmail } = require("./_resend");

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://otuhzmexmljmdmvetfym.supabase.co";
const SERVICE =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "";
const ANON =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_TeZ72fuK0pP9UqzD9T9K-Q_cEmPRudZ";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const email = String(body.email || "").trim().toLowerCase();
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Valid email required" });
    }

    const row = {
      name: body.name || null,
      email,
      phone: body.phone || null,
      industry: body.industry || null,
      company_size: body.company_size || null,
      primary_need: body.primary_need || null,
      source: body.source || "signup_wizard",
      status: "new",
      created_at: new Date().toISOString(),
    };

    let saved = false;
    let saveError = null;
    for (const key of [SERVICE, ANON].filter(Boolean)) {
      try {
        const r = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(row),
        });
        if (r.ok || r.status === 201) {
          saved = true;
          break;
        }
        saveError = await r.text().catch(() => String(r.status));
      } catch (e) {
        saveError = String(e);
      }
    }

    const mail = demoRequestEmail({
      name: row.name,
      email,
      industry: row.industry,
      company_size: row.company_size,
      primary_need: row.primary_need,
    });

    const sent = await sendResendEmail({
      to: email,
      subject: mail.subject,
      html: mail.html,
    });

    const salesTo = process.env.SALES_INBOX || "michaelmuchemi33@gmail.com";
    if (salesTo && salesTo !== email) {
      try {
        await sendResendEmail({
          to: salesTo,
          subject: `New Unity ERP lead: ${email}`,
          html: `<p>Lead from ${row.source}</p>
            <ul>
              <li>Name: ${row.name || "—"}</li>
              <li>Email: ${email}</li>
              <li>Phone: ${row.phone || "—"}</li>
              <li>Industry: ${row.industry || "—"}</li>
              <li>Need: ${row.primary_need || "—"}</li>
            </ul>`,
        });
      } catch (_) {}
    }

    return res.status(200).json({
      ok: true,
      saved,
      emailSent: !!sent.ok,
      emailError: sent.ok ? null : sent.error || "send_failed",
      saveError: saved ? null : saveError,
    });
  } catch (e) {
    console.error("lead handler", e);
    return res.status(500).json({
      error: String(e && e.message ? e.message : e),
    });
  }
}
