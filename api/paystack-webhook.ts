/**
 * Live Webhook endpoint for Paystack (or compatible providers).
 * Deployed on Vercel at: https://www.unity-software.online/api/paystack-webhook
 *
 * Set in Vercel env (NOT VITE_):
 *   PAYSTACK_SECRET_KEY=sk_live_...
 *
 * Never expose the secret key in frontend code.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.PAYSTACK_SECRET_KEY || "";
  if (!secret) {
    return res.status(500).json({ error: "PAYSTACK_SECRET_KEY not configured" });
  }

  const signature = req.headers["x-paystack-signature"] as string | undefined;
  const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
  const hash = crypto.createHmac("sha512", secret).update(raw).digest("hex");

  if (!signature || hash !== signature) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  const event = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  // TODO: mark invoice paid in Supabase using service role if needed
  // event.event === "charge.success" → event.data.customer.email, amount, reference

  console.log("Paystack event:", event?.event, event?.data?.reference);

  return res.status(200).json({ received: true });
}
