const PAYSTACK_PUBLIC_KEY =
  (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string) ||
  "pk_live_25326faa1eb18c409d00036d4cc673d2820eb2ac";

/** Approximate USD→KES for employee software shares (display USD, charge KES) */
export const USD_TO_KES = 130;

export function usdToKes(usd: number) {
  return Math.round(usd * USD_TO_KES);
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (opts: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load Paystack"));
    document.body.appendChild(s);
  });
}

/**
 * Charge via Paystack in KES (Kenya).
 * Prefer amountKes. If only USD amount is passed, convert with USD_TO_KES.
 */
export async function payWithPaystack(opts: {
  email: string;
  amountKes?: number;
  /** USD display amount — converted to KES unless amountKes is set */
  amountUsd?: number;
  amount?: number;
  planLabel: string;
  metadata?: Record<string, string>;
}) {
  await loadScript();
  if (!window.PaystackPop) throw new Error("Paystack not available");

  let kes =
    opts.amountKes ??
    (opts.amountUsd != null ? usdToKes(opts.amountUsd) : null) ??
    opts.amount ??
    3000;

  // Safety: never send tiny "dollar" amounts as KES by mistake
  if (kes < 100) {
    kes = usdToKes(kes);
  }

  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: opts.email.trim().toLowerCase(),
    amount: Math.round(kes * 100),
    currency: "KES",
    ref: `unity_${Date.now()}_${Math.floor(Math.random() * 1e6)}`,
    metadata: {
      custom_fields: [
        {
          display_name: "Plan",
          variable_name: "plan",
          value: opts.planLabel,
        },
        {
          display_name: "Product",
          variable_name: "product",
          value: opts.metadata?.product || "Unity ERP",
        },
        ...(opts.metadata?.software
          ? [
              {
                display_name: "Software",
                variable_name: "software",
                value: opts.metadata.software,
              },
            ]
          : []),
        ...(opts.metadata?.role
          ? [
              {
                display_name: "Role",
                variable_name: "role",
                value: opts.metadata.role,
              },
            ]
          : []),
      ],
      ...opts.metadata,
      amount_kes: String(kes),
    },
    callback: (response: { reference: string }) => {
      window.location.href = `/payment/callback?reference=${encodeURIComponent(
        response.reference
      )}&email=${encodeURIComponent(opts.email)}&type=${encodeURIComponent(
        opts.metadata?.product || "unity_erp"
      )}`;
    },
    onClose: () => {},
  });
  handler.openIframe();
}
