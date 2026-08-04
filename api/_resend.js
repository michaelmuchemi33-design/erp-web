async function sendResendEmail(opts) {
  const key = process.env.RESEND_API_KEY || process.env.RESEND_KEY || "";
  if (!key) {
    console.error("RESEND_API_KEY missing");
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  const fromPrimary =
    opts.from ||
    process.env.RESEND_FROM ||
    "Unity ERP <hello@unity-software.online>";
  const fromFallback = "Unity ERP <onboarding@resend.dev>";
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
    let { res, data } = await post(fromPrimary);
    if (res.ok) {
      console.log("Resend sent", opts.to, data.id || data);
      return { ok: true, data };
    }
    console.error("Resend primary failed", res.status, JSON.stringify(data));
    // Always retry with Resend onboarding sender so clients still receive mail
    ({ res, data } = await post(fromFallback));
    if (res.ok) {
      console.log("Resend sent via fallback", opts.to, data.id || data);
      return { ok: true, data };
    }
    console.error("Resend fallback failed", res.status, JSON.stringify(data));
    return { ok: false, error: data };
  } catch (e) {
    console.error("Resend fetch failed", e);
    return { ok: false, error: String(e) };
  }
}

module.exports = { sendResendEmail };
