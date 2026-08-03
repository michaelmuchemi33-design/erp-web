export async function sendResendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  const key = process.env.RESEND_API_KEY || "";
  if (!key) {
    console.warn("RESEND_API_KEY missing — email skipped");
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }
  const from =
    opts.from ||
    process.env.RESEND_FROM ||
    "Unity ERP <onboarding@resend.dev>";

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
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("Resend error", res.status, data);
    return { ok: false, error: data };
  }
  return { ok: true, data };
}
