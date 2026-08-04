import { paymentInvoiceEmail } from "./_emailTemplates.js";
import { sendResendEmail } from "./_resend.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const event = body.event || body.type;
    const data = body.data || {};

    if (event === "charge.success" || data.status === "success") {
      const email = (data.customer && data.customer.email) || data.email || "";
      const amount = data.amount ? data.amount / 100 : 0;
      const currency = data.currency || "KES";
      const reference = data.reference || "";
      const plan =
        (data.metadata && (data.metadata.plan || data.metadata.product)) ||
        "Unity ERP";
      const name = (data.customer && data.customer.first_name) || "";

      if (email) {
        const mail = paymentInvoiceEmail({
          name,
          email,
          amount,
          currency,
          reference,
          plan,
        });
        await sendResendEmail({
          to: email,
          subject: mail.subject,
          html: mail.html,
        });
        const salesTo = process.env.SALES_INBOX || "michaelmuchemi33@gmail.com";
        await sendResendEmail({
          to: salesTo,
          subject: `Paystack payment: ${reference} ${currency} ${amount}`,
          html: `<p>Payment from ${email}</p><p>${plan}</p><p>Ref ${reference}</p>`,
        }).catch(() => null);
      }
    }

    return res.status(200).json({ received: true });
  } catch (e) {
    console.error("paystack webhook", e);
    return res.status(200).json({ received: true, error: String(e) });
  }
}
