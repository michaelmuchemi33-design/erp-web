import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Brand = {
  name: string;
  /** Simple recognizable mark using styled text + optional symbol */
  mark: string;
  color: string;
};

/** Integration / platform brands (wordmarks) */
const brands: Brand[] = [
  { name: "QuickBooks", mark: "qb", color: "#2CA01C" },
  { name: "Zoho", mark: "zoho", color: "#E42527" },
  { name: "Odoo", mark: "odoo", color: "#714B67" },
  { name: "M-Pesa", mark: "M-PESA", color: "#4CAF50" },
  { name: "SAP", mark: "SAP", color: "#0FAAFF" },
  { name: "Salesforce", mark: "salesforce", color: "#00A1E0" },
  { name: "Xero", mark: "xero", color: "#13B5EA" },
  { name: "NetSuite", mark: "NETSUITE", color: "#1B4F72" },
  { name: "Sage", mark: "sage", color: "#00DC00" },
  { name: "Shopify", mark: "shopify", color: "#96BF48" },
  { name: "Stripe", mark: "stripe", color: "#635BFF" },
  { name: "Paystack", mark: "paystack", color: "#0BA4DB" },
  { name: "Microsoft", mark: "Dynamics", color: "#00A4EF" },
  { name: "API", mark: "{ API }", color: "#0F172A" },
];

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div
      className="mx-6 flex h-14 shrink-0 items-center justify-center gap-2 md:mx-10"
      title={brand.name}
    >
      <span
        className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-2 text-xs font-extrabold tracking-tight text-white shadow-sm"
        style={{ backgroundColor: brand.color }}
      >
        {brand.mark.slice(0, 3).toUpperCase()}
      </span>
      <span className="whitespace-nowrap text-base font-bold tracking-tight text-slate-400 md:text-lg">
        {brand.name}
      </span>
    </div>
  );
}

export function TrustedCompanies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const row = [...brands, ...brands];

  return (
    <section className="overflow-hidden border-y border-slate-100 bg-white py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-slate-400"
        >
          Trusted by fast-moving teams · Integrates via API
        </motion.p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex min-w-max items-center"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: {
                duration: 50,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
          >
            {row.map((b, i) => (
              <BrandLogo key={`${b.name}-${i}`} brand={b} />
            ))}
          </motion.div>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-xl px-6 text-center text-xs text-slate-400">
        Connect payments, accounting and commerce through REST API & webhooks —
        including M-Pesa-friendly and Paystack flows.
      </p>
    </section>
  );
}
