import { sendResendEmail } from "./_resend.js";

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

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const email = String(body.email || "").trim().toLowerCase();
    const message = String(body.message || "").trim();
    if (!email.includes("@") || !message) {
      return res.status(400).json({ error: "Email and message required" });
    }

    const row = {
      name: body.name || null,
      email,
      message,
      status: "new",
      created_at: new Date().toISOString(),
    };

    for (const key of [SERVICE, ANON].filter(Boolean)) {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(row),
      });
      if (r.ok || r.status === 201) break;
    }

    const salesTo = process.env.SALES_INBOX || "michaelmuchemi33@gmail.com";
    await sendResendEmail({
      to: salesTo,
      subject: `Contact form: ${email}`,
      html: `<p>${message}</p><p>From: ${body.name || ""} &lt;${email}&gt;</p>`,
    });

    await sendResendEmail({
      to: email,
      subject: "We received your message — Unity Software Solutions",
      html: `<p>Thanks for contacting Unity Software Solutions. We will reply soon.</p>
        <p>WhatsApp: +254 778 903 044</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("contact handler", e);
    return res.status(500).json({ error: String(e && e.message ? e.message : e) });
  }
}
