import type { VercelRequest, VercelResponse } from "@vercel/node";
import { contactAckEmail } from "./_emailTemplates";
import { sendResendEmail } from "./_resend";

const URL = process.env.SUPABASE_URL || "https://otuhzmexmljmdmvetfym.supabase.co";
const SERVICE =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const email = String(body?.email || "").trim().toLowerCase();
  if (!email.includes("@") || !body?.message) {
    return res.status(400).json({ error: "Email and message required" });
  }

  if (SERVICE) {
    await fetch(`${URL}/rest/v1/contact_messages`, {
      method: "POST",
      headers: {
        apikey: SERVICE,
        Authorization: `Bearer ${SERVICE}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: body.name || null,
        email,
        message: body.message,
        status: "new",
        created_at: new Date().toISOString(),
      }),
    });
  }

  const mail = contactAckEmail({ name: body.name, email, message: body.message });
  await sendResendEmail({ to: email, subject: mail.subject, html: mail.html });

  return res.status(200).json({ ok: true });
}
