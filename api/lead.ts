import type { VercelRequest, VercelResponse } from "@vercel/node";

const URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://otuhzmexmljmdmvetfym.supabase.co";
const SERVICE =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const ANON =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_TeZ72fuK0pP9UqzD9T9K-Q_cEmPRudZ";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const email = String(body?.email || "").trim().toLowerCase();
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

  // Prefer service role (bypasses RLS); fall back to anon
  if (!SERVICE && !ANON) {
    return res.status(500).json({ error: "Server keys not configured" });
  }

  for (const key of [SERVICE, ANON].filter(Boolean)) {
    const r = await fetch(`${URL}/rest/v1/leads`, {
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
      return res.status(200).json({ ok: true });
    }
    const err = await r.text();
    if (key === ANON) {
      return res.status(r.status).json({ error: err || "Insert failed" });
    }
  }
  return res.status(500).json({ error: "Insert failed" });
}
