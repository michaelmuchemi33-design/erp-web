const LOGO = "https://i.postimg.cc/qBnzqpqk/blck-logo-erp.png";
const DASHBOARD = "https://i.postimg.cc/wMGLqBvh/erp-dashboard-looks-(1).png";
const SITE = "https://www.unity-software.online";
const WA = "https://wa.me/254778903044";

function shell(inner: string, preheader: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unity ERP</title>
</head>
<body style="margin:0;padding:0;background:#c2410c;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#c2410c;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 28px 8px;text-align:center;">
              <img src="${LOGO}" alt="Unity ERP" width="48" height="48" style="display:inline-block;border-radius:10px;" />
              <div style="margin-top:8px;font-size:14px;font-weight:700;color:#0f172a;letter-spacing:-0.02em;">Unity ERP</div>
              <div style="font-size:11px;color:#64748b;">by Unity Software Solutions</div>
            </td>
          </tr>
          <tr><td style="padding:8px 28px 32px;">${inner}</td></tr>
          <tr>
            <td style="padding:20px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;line-height:1.6;">
              Kenya · South Africa · Egypt<br/>
              <a href="${SITE}" style="color:#059669;">unity-software.online</a> ·
              <a href="${WA}" style="color:#059669;">WhatsApp +254 778 903 044</a><br/>
              erpintergration@gmail.com · +254 793 832 286
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function stepCard(n: string, title: string, body: string, linkLabel: string, href: string) {
  return `
  <table role="presentation" width="100%" style="background:#f8fafc;border-radius:12px;margin:0 0 12px;">
    <tr>
      <td style="padding:18px 18px;">
        <div style="font-size:20px;font-weight:800;color:#0f172a;">${n}</div>
        <div style="font-size:17px;font-weight:700;color:#0f172a;margin-top:4px;">${title}</div>
        <p style="margin:8px 0 12px;font-size:14px;line-height:1.55;color:#475569;">${body}</p>
        <a href="${href}" style="font-size:13px;font-weight:600;color:#059669;text-decoration:underline;">${linkLabel} →</a>
      </td>
    </tr>
  </table>`;
}

const industryBenefits: Record<string, string[]> = {
  Manufacturing: [
    "Track BOM-style production and raw materials in one place",
    "Link finished goods to sales and invoices automatically",
    "Reduce stockouts on critical components across branches",
  ],
  Construction: [
    "Project cost visibility against materials and labour",
    "Purchase orders tied to site stock movements",
    "Clearer job profitability for estimators and finance",
  ],
  "Hospital / Healthcare": [
    "Pharmacy and consumables tracking with alerts",
    "Simple operational records for clinic teams",
    "Invoicing linked to services and stock use",
  ],
  "Retail & POS": [
    "Multi-branch POS with live stock deduction",
    "Faster till-to-warehouse reconciliation",
    "Sales reports by outlet and product category",
  ],
  Education: [
    "Fee and operational inventory visibility",
    "Central records for multi-campus teams",
    "Procurement control for supplies and assets",
  ],
  Agriculture: [
    "Input and produce stock across stores or farms",
    "Supplier and buyer records in one CRM",
    "Seasonal purchase and sales tracking",
  ],
  Hospitality: [
    "Kitchen and store inventory control",
    "Outlet-level sales visibility",
    "Supplier ordering without spreadsheet chaos",
  ],
  Logistics: [
    "Warehouse transfers and dispatch-oriented stock",
    "Customer and consignment history in CRM",
    "Cost visibility for routes and inventory",
  ],
  "Finance & Accounting": [
    "Cleaner receivables with stock-linked invoices",
    "Operational ledgers for SME finance teams",
    "Export-ready reports for advisors",
  ],
  Other: [
    "CRM, inventory and invoicing in one cloud system",
    "AI Assistant for sales and stock questions",
    "Unlimited users on the standard plan after trial",
  ],
};

function benefitsFor(industry?: string | null, need?: string | null) {
  const base =
    industryBenefits[industry || ""] ||
    industryBenefits.Other;
  const extra: string[] = [];
  if (need?.toLowerCase().includes("inventory"))
    extra.push("Priority setup focus: inventory accuracy and reorder points");
  if (need?.toLowerCase().includes("crm") || need?.toLowerCase().includes("sales"))
    extra.push("Priority setup focus: pipeline, quotes and customer history");
  if (need?.toLowerCase().includes("account") || need?.toLowerCase().includes("finance"))
    extra.push("Priority setup focus: invoicing and receivables clarity");
  if (need?.toLowerCase().includes("pos") || need?.toLowerCase().includes("retail"))
    extra.push("Priority setup focus: POS and multi-outlet stock");
  return [...extra, ...base].slice(0, 5);
}

export function demoRequestEmail(opts: {
  name?: string | null;
  email: string;
  industry?: string | null;
  company_size?: string | null;
  primary_need?: string | null;
}) {
  const name = opts.name?.split(" ")[0] || "there";
  const benefits = benefitsFor(opts.industry, opts.primary_need);
  const benefitHtml = benefits
    .map(
      (b) =>
        `<li style="margin:0 0 8px;font-size:14px;color:#334155;line-height:1.45;">${b}</li>`
    )
    .join("");

  const industryLine = opts.industry
    ? `You told us you work in <strong>${opts.industry}</strong>${
        opts.company_size ? ` (${opts.company_size})` : ""
      }${opts.primary_need ? ` with a focus on <strong>${opts.primary_need}</strong>` : ""}.`
    : "Thanks for requesting access to Unity ERP.";

  const inner = `
    <h1 style="margin:0 0 12px;font-size:28px;line-height:1.2;font-weight:800;color:#0f172a;text-align:center;">
      Build your first workspace
    </h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#475569;text-align:center;">
      Hi ${name} — getting started with Unity ERP should not feel like starting from scratch.
      ${industryLine}
    </p>

    <img src="${DASHBOARD}" alt="Unity ERP Dashboard" width="504" style="width:100%;max-width:504px;height:auto;border-radius:12px;border:1px solid #e2e8f0;margin:0 0 20px;display:block;" />

    <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.04em;">
      Benefits tailored to your request
    </p>
    <ul style="margin:0 0 20px;padding-left:18px;">${benefitHtml}</ul>

    ${stepCard(
      "01.",
      "Check this inbox",
      "Your demo request is confirmed. Our team will follow up on WhatsApp or email to activate your trial workspace.",
      "Message sales on WhatsApp",
      WA
    )}
    ${stepCard(
      "02.",
      "See your live dashboard",
      "After activation you will log in to a cloud ERP dashboard like the one above — revenue, stock, orders, CRM and more in one place.",
      "Preview the product site",
      `${SITE}/features`
    )}
    ${stepCard(
      "03.",
      "Run inventory, CRM & invoices together",
      "Stop juggling spreadsheets. Unity ERP links sales, stock and finance — with Knight AI Assistant for quick answers.",
      "View Kenya ERP guide",
      `${SITE}/erp-system-kenya`
    )}

    <table role="presentation" width="100%" style="margin:24px 0 8px;">
      <tr>
        <td align="center">
          <a href="${SITE}/joined" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:999px;">
            Open confirmation page
          </a>
        </td>
      </tr>
    </table>

    <p style="margin:20px 0 0;font-size:16px;font-weight:700;color:#0f172a;text-align:center;">
      Or talk to a human in minutes
    </p>
    <p style="margin:8px 0 0;font-size:13px;line-height:1.55;color:#64748b;text-align:center;">
      WhatsApp <a href="${WA}" style="color:#059669;">+254 778 903 044</a> · Call +254 793 832 286<br/>
      Pricing from <strong>KES 3,000/month</strong> or <strong>KES 33,000/year</strong> · 60-day free trial
    </p>

    <table role="presentation" width="100%" style="margin-top:24px;background:#0f172a;border-radius:12px;">
      <tr>
        <td style="padding:16px 18px;">
          <div style="font-size:12px;font-weight:700;color:#34d399;margin-bottom:6px;">Unity ERP · Marketing note</div>
          <p style="margin:0;font-size:13px;line-height:1.5;color:#cbd5e1;">
            Active customers can receive <strong style="color:#fff;">free custom website design</strong>.
            All-in-one ERP + CRM + AI — built for Kenya, South Africa and Egypt.
          </p>
        </td>
      </tr>
    </table>
  `;

  return {
    subject: `${name}, your Unity ERP demo request is confirmed`,
    html: shell(
      inner,
      `Your Unity ERP demo is confirmed. See your dashboard preview and next steps.`
    ),
  };
}

export function invoiceEmail(opts: {
  email: string;
  name?: string | null;
  amount?: number | string | null;
  currency?: string | null;
  reference?: string | null;
  plan?: string | null;
}) {
  const name = opts.name?.split(" ")[0] || "there";
  const amount =
    opts.amount != null
      ? `${opts.currency || "KES"} ${Number(opts.amount).toLocaleString()}`
      : "As charged on Paystack";
  const ref = opts.reference || "—";
  const plan = opts.plan || "Unity ERP subscription";

  const inner = `
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#0f172a;text-align:center;">
      Payment received — invoice
    </h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#475569;text-align:center;">
      Hi ${name}, thank you for choosing Unity ERP. Here is a summary of your payment.
    </p>

    <table role="presentation" width="100%" style="background:#f8fafc;border-radius:12px;margin-bottom:20px;">
      <tr><td style="padding:16px 18px;font-size:14px;color:#334155;">
        <div style="margin-bottom:8px;"><strong>Plan</strong><br/>${plan}</div>
        <div style="margin-bottom:8px;"><strong>Amount</strong><br/>${amount}</div>
        <div style="margin-bottom:8px;"><strong>Reference</strong><br/>${ref}</div>
        <div><strong>Vendor</strong><br/>Unity Software Solutions</div>
      </td></tr>
    </table>

    <img src="${DASHBOARD}" alt="Unity ERP Dashboard" width="504" style="width:100%;max-width:504px;border-radius:12px;border:1px solid #e2e8f0;margin:0 0 20px;display:block;" />

    <p style="font-size:14px;line-height:1.6;color:#475569;">
      Your workspace access will be confirmed by our team shortly. Watch this inbox and WhatsApp for login details.
    </p>

    <table role="presentation" width="100%" style="margin:20px 0;">
      <tr><td align="center">
        <a href="${SITE}/pricing" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:999px;">
          View plans
        </a>
      </td></tr>
    </table>

    <p style="font-size:12px;color:#94a3b8;text-align:center;">
      This email confirms payment processed via Paystack. For billing questions: erpintergration@gmail.com
    </p>
  `;

  return {
    subject: `Unity ERP invoice — payment ${ref}`,
    html: shell(inner, `Payment received for Unity ERP. Reference ${ref}.`),
  };
}

export function contactAckEmail(opts: { name?: string | null; email: string; message?: string }) {
  const name = opts.name?.split(" ")[0] || "there";
  const inner = `
    <h1 style="margin:0 0 12px;font-size:24px;font-weight:800;color:#0f172a;text-align:center;">We received your message</h1>
    <p style="font-size:15px;line-height:1.6;color:#475569;text-align:center;">
      Hi ${name}, thanks for contacting Unity Software Solutions. Our team will reply shortly.
    </p>
    <img src="${DASHBOARD}" alt="Unity ERP" width="504" style="width:100%;max-width:504px;border-radius:12px;margin:16px 0;display:block;" />
    <p style="font-size:13px;color:#64748b;text-align:center;">
      Meanwhile explore <a href="${SITE}/erp-system-kenya" style="color:#059669;">ERP system Kenya</a> or
      <a href="${SITE}/pricing" style="color:#059669;">pricing</a>.
    </p>
  `;
  return {
    subject: "We received your message — Unity ERP",
    html: shell(inner, "Thanks for contacting Unity Software Solutions."),
  };
}
