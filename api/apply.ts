import type { VercelRequest, VercelResponse } from "@vercel/node";

const URL = process.env.SUPABASE_URL || "https://otuhzmexmljmdmvetfym.supabase.co";
const SERVICE =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const email = String(body?.email || "").trim().toLowerCase();
  if (!email.includes("@") || !body?.name || !body?.role) {
    return res.status(400).json({ error: "role, name, email required" });
  }
  const r = await fetch(`${URL}/rest/v1/applications`, {
    method: "POST",
    headers: {
      apikey: SERVICE,
      Authorization: `Bearer ${SERVICE}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      role: body.role,
      name: body.name,
      email,
      phone: body.phone || null,
      portfolio_url: body.portfolio_url || null,
      message: body.message || null,
      status: "new",
      created_at: new Date().toISOString(),
    }),
  });
  if (!r.ok) return res.status(r.status).json({ error: await r.text() });
  return res.status(200).json({ ok: true });
}
