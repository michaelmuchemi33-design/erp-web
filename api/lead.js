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

    // 1) ALWAYS email the CLIENT at the address they typed
    const mail = demoRequestEmail({
      name: row.name,
      email,
      industry: row.industry,
      company_size: row.company_size,
      primary_need: row.primary_need,
    });

    const sentToClient = await sendResendEmail({
      to: email,
      subject: mail.subject,
      html: mail.html,
    });

    // 2) Notify sales inbox separately (does not replace client email)
    const salesTo = process.env.SALES_INBOX || "michaelmuchemi33@gmail.com";
    let sentToSales = { ok: false };
    if (salesTo && salesTo.toLowerCase() !== email) {
      sentToSales = await sendResendEmail({
        to: salesTo,
        subject: `New Unity ERP lead: ${email}`,
        html: `<p>New demo/trial request (client was emailed at <strong>${email}</strong>)</p>
          <ul>
            <li>Name: ${row.name || "—"}</li>
            <li>Client email: ${email}</li>
            <li>Phone: ${row.phone || "—"}</li>
            <li>Industry: ${row.industry || "—"}</li>
            <li>Need: ${row.primary_need || "—"}</li>
            <li>Source: ${row.source}</li>
          </ul>
          <p>Client welcome email sent: ${sentToClient.ok ? "yes" : "NO — check Resend"}</p>`,
      }).catch((e) => ({ ok: false, error: String(e) }));
    }

    return res.status(200).json({
      ok: true,
      saved,
      emailSent: !!sentToClient.ok,
      emailedTo: email,
      emailError: sentToClient.ok ? null : sentToClient.error || "client_email_failed",
      salesNotified: !!sentToSales.ok,
      saveError: saved ? null : saveError,
    });
  } catch (e) {
    console.error("lead handler", e);
    return res.status(500).json({
      error: String(e && e.message ? e.message : e),
    });
  }
};
