export async function sendResendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  const key = process.env.RESEND_API_KEY || process.env.RESEND_KEY || "";

  if (!key) {
    console.warn("RESEND_API_KEY missing — email skipped");
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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        reply_to: replyTo,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Resend error", res.status, data);
      // Fallback if custom domain not accepted yet
      if (res.status === 403 || res.status === 422) {
        const retry = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Unity ERP <onboarding@resend.dev>",
            to: [opts.to],
            subject: opts.subject,
            html: opts.html,
            reply_to: replyTo,
          }),
        });
        const data2 = await retry.json().catch(() => ({}));
        if (!retry.ok) {
          console.error("Resend retry error", retry.status, data2);
          return { ok: false, error: data2 };
        }
        return { ok: true, data: data2 };
      }
      return { ok: false, error: data };
    }
    return { ok: true, data };
  } catch (e) {
    console.error("Resend fetch failed", e);
    return { ok: false, error: String(e) };
  }
}
