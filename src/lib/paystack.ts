const PAYSTACK_PUBLIC_KEY =
  (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string) ||
  "pk_live_25326faa1eb18c409d00036d4cc673d2820eb2ac";

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

/** Amount in major units. Default KES. Use currency USD for employee software ($17 / $20). */
export async function payWithPaystack(opts: {
  email: string;
  amountKes?: number;
  amount?: number;
  currency?: "KES" | "USD";
  planLabel: string;
  metadata?: Record<string, string>;
}) {
  await loadScript();
  if (!window.PaystackPop) throw new Error("Paystack not available");

  const currency = opts.currency || "KES";
  const major =
    currency === "USD"
      ? opts.amount ?? 17
      : opts.amountKes ?? opts.amount ?? 3000;

  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: opts.email.trim().toLowerCase(),
    amount: Math.round(major * 100),
    currency,
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
    },
    callback: (response: { reference: string }) => {
      window.location.href = `/payment/callback?reference=${encodeURIComponent(
        response.reference
      )}&email=${encodeURIComponent(opts.email)}&type=employee_discount`;
    },
    onClose: () => {
      /* user closed */
    },
  });
  handler.openIframe();
}
