import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Brand = {
  name: string;
  domain: string;
};

/** Platforms teams integrate with via API / payments / accounting */
const brands: Brand[] = [
  { name: "QuickBooks", domain: "quickbooks.intuit.com" },
  { name: "Zoho", domain: "zoho.com" },
  { name: "Odoo", domain: "odoo.com" },
  { name: "M-Pesa", domain: "safaricom.co.ke" },
  { name: "SAP", domain: "sap.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Xero", domain: "xero.com" },
  { name: "NetSuite", domain: "netsuite.com" },
  { name: "Sage", domain: "sage.com" },
  { name: "Shopify", domain: "shopify.com" },
  { name: "Stripe", domain: "stripe.com" },
  { name: "Paystack", domain: "paystack.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "Google", domain: "google.com" },
  { name: "Slack", domain: "slack.com" },
  { name: "HubSpot", domain: "hubspot.com" },
];

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div
      className="mx-5 flex h-16 w-[9.5rem] shrink-0 items-center justify-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-4 shadow-sm md:mx-7 md:w-44"
      title={brand.name}
    >
      <img
        src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`}
        alt={`${brand.name} logo`}
        width={36}
        height={36}
        className="h-9 w-9 object-contain"
        loading="lazy"
        onError={(e) => {
          const el = e.target as HTMLImageElement;
          el.src = `https://logo.clearbit.com/${brand.domain}`;
        }}
      />
      <span className="truncate text-sm font-bold tracking-tight text-slate-600">
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
    <section className="overflow-hidden border-y border-slate-100 bg-slate-50/80 py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-slate-500"
        >
          Trusted by fast-moving teams · Integrates via API
        </motion.p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent md:w-24" />

        <div className="flex overflow-hidden">
          <div className="flex animate-marquee items-center py-1">
            {row.map((brand, i) => (
              <BrandLogo key={`${brand.name}-${i}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
