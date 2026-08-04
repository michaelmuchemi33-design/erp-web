const LOGO = "https://i.postimg.cc/qBnzqpqk/blck-logo-erp.png";
const DASHBOARD = "https://i.postimg.cc/wMGLqBvh/erp-dashboard-looks-(1).png";
const SITE = "https://www.unity-software.online";
const WA = "https://wa.me/254778903044";

function shell(inner, preheader) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Unity ERP</title></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0f172a;padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;">
<tr><td style="padding:28px 28px 8px;text-align:center;">
<img src="${LOGO}" alt="Unity ERP" width="48" height="48" style="display:inline-block;border-radius:10px;"/>
<div style="margin-top:8px;font-size:14px;font-weight:700;color:#0f172a;">Unity ERP</div>
<div style="font-size:11px;color:#64748b;">by Unity Software Solutions</div>
</td></tr>
<tr><td style="padding:8px 28px 32px;">${inner}</td></tr>
<tr><td style="padding:20px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;line-height:1.6;">
Kenya · South Africa · Egypt<br/>
<a href="${SITE}" style="color:#059669;">unity-software.online</a> ·
<a href="${WA}" style="color:#059669;">WhatsApp +254 778 903 044</a>
</td></tr>
</table></td></tr></table></body></html>`;
}

function benefitsFor(industry, need) {
  const base = [
    "Inventory, CRM, finance and POS in one cloud system",
    "Multi-branch stock visibility without spreadsheet chaos",
    "Transparent KES pricing — from KES 3,000 per month",
    "Free limited access to explore before you upgrade",
    "Built for Kenyan and African SME workflows including M-Pesa-friendly operations",
  ];
  if (industry) base.unshift(`Tailored onboarding focus for ${industry} teams`);
  if (need) base.push(`Priority setup around: ${need}`);
  return base;
}

function demoRequestEmail({ name, email, industry, company_size, primary_need }) {
  const first = (name || "there").split(" ")[0];
  const benefits = benefitsFor(industry, primary_need)
    .map((b) => `<li style="margin:0 0 8px;color:#334155;font-size:14px;line-height:1.5;">${b}</li>`)
    .join("");
  const html = shell(
    `
    <h1 style="margin:0 0 12px;font-size:24px;line-height:1.25;color:#0f172a;">Welcome to Unity ERP, ${first}</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#475569;">
      Thanks for requesting access. We received <strong>${email}</strong>
      ${industry ? ` for <strong>${industry}</strong>` : ""}.
      Our team will follow up shortly. Meanwhile, here is what you can expect.
    </p>
    <img src="${DASHBOARD}" alt="Unity ERP dashboard" width="504" style="width:100%;max-width:504px;border-radius:12px;margin:8px 0 20px;border:1px solid #e2e8f0;"/>
    <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.04em;">Benefits for your team</p>
    <ul style="margin:0 0 20px;padding-left:18px;">${benefits}</ul>
    <table role="presentation" width="100%" style="margin:0 0 16px;"><tr><td align="center">
      <a href="${SITE}/pricing" style="display:inline-block;background:#059669;color:#fff;font-weight:700;font-size:14px;padding:14px 28px;border-radius:999px;text-decoration:none;">View pricing &amp; start</a>
    </td></tr></table>
    <p style="margin:0;font-size:13px;line-height:1.55;color:#64748b;">
      Prefer WhatsApp? Message us on <a href="${WA}" style="color:#059669;">+254 778 903 044</a>.
      Questions: reply to this email.
    </p>`,
    `Welcome to Unity ERP — your demo request is confirmed`
  );
  return {
    subject: "Welcome to Unity ERP — your request is confirmed",
    html,
  };
}

function paymentInvoiceEmail({ name, email, amount, currency, reference, plan }) {
  const first = (name || "there").split(" ")[0];
  const html = shell(
    `
    <h1 style="margin:0 0 12px;font-size:22px;color:#0f172a;">Payment received</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#475569;">
      Hi ${first}, thank you. We received your payment for <strong>${plan || "Unity ERP"}</strong>.
    </p>
    <table role="presentation" width="100%" style="background:#f8fafc;border-radius:12px;margin:0 0 16px;">
      <tr><td style="padding:16px;font-size:14px;color:#334155;line-height:1.7;">
        <strong>Amount:</strong> ${currency || "KES"} ${Number(amount || 0).toLocaleString()}<br/>
        <strong>Reference:</strong> ${reference || "—"}<br/>
        <strong>Email:</strong> ${email}
      </td></tr>
    </table>
    <img src="${DASHBOARD}" alt="Unity ERP" width="504" style="width:100%;max-width:504px;border-radius:12px;margin:0 0 16px;"/>
    <p style="margin:0;font-size:14px;color:#475569;line-height:1.6;">
      Our team will activate your workspace and follow up on WhatsApp or email if anything is needed.
    </p>`,
    `Unity ERP payment receipt ${reference || ""}`
  );
  return {
    subject: `Unity ERP receipt — ${currency || "KES"} ${amount || ""}`,
    html,
  };
}




module.exports = { demoRequestEmail, paymentInvoiceEmail };
