const { paymentInvoiceEmail } = require("./_emailTemplates");
const { sendResendEmail } = require("./_resend");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
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
      const name =
        (data.customer && (data.customer.first_name || data.customer.last_name)) ||
        "";

      if (email && email.includes("@")) {
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
        if (salesTo !== email) {
          await sendResendEmail({
            to: salesTo,
            subject: `Payment received: ${reference} ${currency} ${amount}`,
            html: `<p>Paystack success</p><ul><li>${email}</li><li>${currency} ${amount}</li><li>${reference}</li><li>${plan}</li></ul>`,
          }).catch(() => null);
        }
      }
    }

    return res.status(200).json({ received: true });
  } catch (e) {
    console.error("paystack webhook", e);
    return res.status(200).json({ received: true, error: String(e) });
  }
};
