async function sendResendEmail(opts) {
  const key = process.env.RESEND_API_KEY || process.env.RESEND_KEY || "";
  if (!key) {
    console.error("RESEND_API_KEY missing");
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }
  const from =
    opts.from ||
    process.env.RESEND_FROM ||
    "Unity ERP <hello@unity-software.online>";
  const replyTo =
    process.env.RESEND_REPLY_TO ||
    process.env.SALES_INBOX ||
    "michaelmuchemi33@gmail.com";

  async function post(fromAddr) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddr,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        reply_to: replyTo,
      }),
    });
    const data = await res.json().catch(() => ({}));
    return { res, data };
  }

  try {
    let { res, data } = await post(from);
    if (!res.ok) {
      console.error("Resend error", res.status, JSON.stringify(data));
      ({ res, data } = await post("Unity ERP <onboarding@resend.dev>"));
      if (!res.ok) {
        return { ok: false, error: data };
      }
      return { ok: true, data };
    }
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

module.exports = { sendResendEmail };
