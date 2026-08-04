import type { VercelRequest, VercelResponse } from "@vercel/node";

const URL =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://otuhzmexmljmdmvetfym.supabase.co";
const SERVICE =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "";
const ANON =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_TeZ72fuK0pP9UqzD9T9K-Q_cEmPRudZ";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const email = String(body?.email || "").trim().toLowerCase();
  if (!email.includes("@") || !body?.software) {
    return res.status(400).json({ error: "email and software required" });
  }

  const row = {
    email,
    name: body.name || null,
    role: body.role || null,
    software: body.software,
    software_id: body.software_id || null,
    employee_pays_usd: body.employee_pays_usd ?? 17,
    account_email: (body.account_email || email).toString().trim().toLowerCase(),
    source: body.source || "employee_discounts_page",
    status: "pending_payment",
    created_at: new Date().toISOString(),
  };

  for (const key of [SERVICE, ANON].filter(Boolean)) {
    const r = await fetch(`${URL}/rest/v1/employee_discounts`, {
      method: "POST",
      headers: {
        apikey: key as string,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (r.ok || r.status === 201) {
      return res.status(200).json({ ok: true });
    }
    if (key === ANON) {
      return res.status(r.status).json({ error: await r.text() });
    }
  }
  return res.status(500).json({ error: "Could not save" });
}
