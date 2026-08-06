const LOGO = "https://i.postimg.cc/qBnzqpqk/blck-logo-erp.png";
const DASHBOARD = "https://www.unity-software.online/erp-dashboard.webp";
const SITE = "https://www.unity-software.online";
const DEMO = "https://demo.unity-software.online";
function demoUrl(industry) {
  if (!industry) return DEMO + "/?auto=1";
  return DEMO + "/?auto=1&industry=" + encodeURIComponent(industry);
}

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
  const packs = {
    "Manufacturing": [
      "BOM / formulas, work orders and WIP visibility",
      "Raw materials, finished goods and waste tracking",
      "Shop-floor inventory linked to sales and purchasing",
      "Production cost views and quality checkpoints",
    ],
    "Construction": [
      "Job costing by site and project",
      "Materials, suppliers and site stock movement",
      "Progress billing and purchase controls",
      "Multi-site visibility for contractors and owners",
    ],
    "Hospital / Healthcare": [
      "Pharmacy and consumables stock control",
      "Patient/customer records linked to billing",
      "Expiry-aware inventory for clinical supplies",
      "Clear invoicing for services and packages",
    ],
    "Retail & POS": [
      "POS-ready stock and multi-branch visibility",
      "Fast sales, receipts and daily cash-up style reports",
      "Reorder points to cut stockouts",
      "CRM history on walk-in and account customers",
    ],
    "Education": [
      "Fee-related invoicing and receivables tracking",
      "Inventory for books, uniforms and lab supplies",
      "Staff and department records in one place",
      "Reporting for administrators and finance teams",
    ],
    "Agriculture": [
      "Farm inputs, fertilizer and seed stock control",
      "Seasonal purchasing and supplier scorecards",
      "Batch-friendly inventory for produce and inputs",
      "Sales and customer records for co-ops and buyers",
    ],
    "Hospitality": [
      "F&B and room-service style inventory",
      "Purchasing for kitchens and outlets",
      "Guest/customer CRM and repeat visits",
      "Daily sales and expense visibility",
    ],
    "Logistics": [
      "Warehouse locations and stock transfers",
      "Fleet-adjacent cost and order tracking",
      "Delivery-oriented order status",
      "Supplier and customer master data in one ERP",
    ],
    "Finance & Accounting": [
      "Invoicing, receivables and payables in one ledger view",
      "Expense and revenue tracking for SMEs",
      "Inventory valuation support alongside books",
      "Reports for management and auditors",
    ],
    "Other": [
      "Inventory, CRM, finance and POS in one cloud system",
      "Multi-branch stock visibility where you need it",
      "AI assistant for everyday operational questions",
      "Clear KES pricing with free mode to explore",
    ],
  };
  const base = packs[industry] || packs["Other"];
  const extra = [];
  if (need) extra.push(`Priority noted: ${need}`);
  extra.push("Free mode available — no credit card required");
  extra.push("Open the shared demo workspace and explore with sample data");
  return [...base, ...extra];
}

function demoRequestEmail({ name, email, industry, company_size, primary_need }) {
  const first = (name || "there").split(" ")[0];
  const benefits = benefitsFor(industry, primary_need)
    .map((b) => `<li style="margin:0 0 10px;color:#334155;font-size:14px;line-height:1.55;">${b}</li>`)
    .join("");
  const sizeLine = company_size ? ` Team size noted: <strong>${company_size}</strong>.` : "";
  const needLine = primary_need ? ` Priority: <strong>${primary_need}</strong>.` : "";
  const html = shell(
    `
    <h1 style="margin:0 0 12px;font-size:24px;line-height:1.25;color:#0f172a;">Welcome to Unity ERP, ${first}</h1>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#475569;">
      Thanks for requesting a demo / trial. We received <strong>${email}</strong>
      ${industry ? ` for <strong>${industry}</strong>` : ""}.${sizeLine}${needLine}
      Our team will contact you soon. Below is a preview of the product and what you get.
    </p>

    <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.05em;">
      Unity ERP — product preview
    </p>
    <a href="${demoUrl(industry)}" style="display:block;text-decoration:none;"><img src="${DASHBOARD}" alt="Unity ERP dashboard — click to open demo" width="504" style="display:block;width:100%;max-width:504px;height:auto;border-radius:12px;margin:0 0 8px;border:1px solid #e2e8f0;" /></a>
    <p style="margin:0 0 18px;font-size:12px;line-height:1.5;color:#94a3b8;text-align:center;">
      Live cloud dashboard: stock, sales, customers and finance in one place
    </p>

    <p style="margin:0 0 12px;font-size:15px;line-height:1.65;color:#334155;">
      <strong style="color:#0f172a;">What is Unity ERP?</strong>
      Unity ERP by Unity Software Solutions is a cloud ERP and CRM for Kenyan and African SMEs.
      Run inventory, invoicing, POS, purchasing, CRM pipeline and reporting in one system —
      with M-Pesa-friendly operations, multi-branch stock visibility and AI assistance for common questions.
      Pricing from <strong>KES 3,000/month</strong> or <strong>KES 33,000/year</strong> (one month free on yearly).
      Free limited access is available so you can explore before you upgrade.
    </p>

    <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.04em;">Benefits for your team</p>
    <ul style="margin:0 0 20px;padding-left:18px;">${benefits}</ul>

    <table role="presentation" width="100%" style="margin:0 0 12px;"><tr><td align="center">
      <a href="${demoUrl(industry)}" style="display:inline-block;background:#4f46e5;color:#ffffff;font-weight:700;font-size:14px;padding:14px 28px;border-radius:999px;text-decoration:none;">
        ${industry ? `Open ${industry} demo →` : "Open Unity ERP demo →"}
      </a>
    </td></tr></table>
    <p style="margin:0 0 8px;font-size:13px;line-height:1.55;color:#475569;text-align:center;">
      One link — opens your industry workspace automatically (no long form).
    </p>
    <p style="margin:0 0 16px;font-size:12px;line-height:1.5;color:#64748b;text-align:center;">
      <a href="${demoUrl(industry)}" style="color:#4f46e5;font-weight:600;">demo.unity-software.online</a>
      ${industry ? ` · <strong>${industry}</strong>` : ""}
      · Shared demo · Resets daily
    </p>
    <p style="margin:0 0 16px;font-size:12px;line-height:1.5;color:#94a3b8;text-align:center;">
      Optional staff login: demo@unity-software.online
    </p>
    <table role="presentation" width="100%" style="margin:0 0 12px;"><tr><td align="center">
      <a href="${SITE}/pricing" style="display:inline-block;background:#059669;color:#ffffff;font-weight:700;font-size:14px;padding:14px 28px;border-radius:999px;text-decoration:none;">View pricing &amp; plans</a>
    </td></tr></table>
    <table role="presentation" width="100%" style="margin:0 0 16px;"><tr><td align="center">
      <a href="${SITE}" style="display:inline-block;color:#059669;font-weight:600;font-size:13px;text-decoration:underline;">Open unity-software.online</a>
    </td></tr></table>

    <p style="margin:0;font-size:13px;line-height:1.55;color:#64748b;">
      Prefer WhatsApp? Message us on <a href="${WA}" style="color:#059669;">+254 778 903 044</a>.
      Reply to this email anytime — we read every message.
    </p>`,
    `Welcome to Unity ERP — demo request confirmed. See your product preview inside.`
  );
  return {
    subject: "Welcome to Unity ERP — your demo request + product preview",
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
