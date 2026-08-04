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
      email,
      name: body.name || null,
      role: body.role || null,
      software: body.software || null,
      software_id: body.software_id || null,
      employee_pays_usd: body.employee_pays_usd || null,
      account_email: body.account_email || email,
      source: body.source || "employee_discounts_page",
      status: body.status || "pending_payment",
      created_at: new Date().toISOString(),
    };
    let saved = false;
    let err = null;
    for (const key of [SERVICE, ANON].filter(Boolean)) {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/employee_discounts`, {
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
      err = await r.text().catch(() => String(r.status));
    }
    if (!saved) {
      return res.status(500).json({ error: err || "Could not save" });
    }
    return res.status(200).json({ ok: true, saved: true });
  } catch (e) {
    return res.status(500).json({ error: String(e && e.message ? e.message : e) });
  }
}
