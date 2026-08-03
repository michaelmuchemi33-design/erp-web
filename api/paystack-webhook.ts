/**
 * Paystack webhook — https://www.unity-software.online/api/paystack-webhook
 * On charge.success: email invoice via Resend
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import { invoiceEmail } from "./_emailTemplates";
import { sendResendEmail } from "./_resend";

export const config = { api: { bodyParser: false } };

async function rawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req as unknown as AsyncIterable<Buffer>) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  let body: Buffer;
  try {
    body = await rawBody(req);
  } catch {
    body = Buffer.from(JSON.stringify(req.body || {}));
  }

  const secret = process.env.PAYSTACK_SECRET_KEY || "";
  const signature = req.headers["x-paystack-signature"] as string | undefined;
  if (secret && signature) {
    const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
    if (hash !== signature) {
      return res.status(401).json({ error: "Invalid signature" });
    }
  }

  let event: {
    event?: string;
    data?: {
      reference?: string;
      amount?: number;
      currency?: string;
      customer?: { email?: string; first_name?: string; last_name?: string };
      metadata?: { plan?: string; name?: string };
    };
  };
  try {
    event = JSON.parse(body.toString("utf8"));
  } catch {
    event = req.body as typeof event;
  }

  console.log("Paystack event:", event?.event, event?.data?.reference);

  if (event?.event === "charge.success" && event.data) {
    const d = event.data;
    const email = d.customer?.email;
    if (email) {
      const amountKes = d.amount != null ? d.amount / 100 : null;
      const mail = invoiceEmail({
        email,
        name:
          d.metadata?.name ||
          [d.customer?.first_name, d.customer?.last_name].filter(Boolean).join(" ") ||
          null,
        amount: amountKes,
        currency: d.currency || "KES",
        reference: d.reference,
        plan: d.metadata?.plan || "Unity ERP plan",
      });
      await sendResendEmail({
        to: email,
        subject: mail.subject,
        html: mail.html,
      });
    }
  }

  return res.status(200).json({ received: true });
}
