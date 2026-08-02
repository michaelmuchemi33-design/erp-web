import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/** Well-known platforms shown as grey wordmarks in a slow marquee */
const platforms = [
  "QuickBooks",
  "Zoho",
  "Odoo",
  "M-Pesa",
  "SAP",
  "Salesforce",
  "Xero",
  "NetSuite",
  "Microsoft Dynamics",
  "Sage",
  "FreshBooks",
  "Shopify",
  "Stripe",
  "Wave",
];

function LogoMark({ name }: { name: string }) {
  return (
    <div
      className="mx-8 flex shrink-0 items-center justify-center md:mx-12"
      title={name}
    >
      <span className="whitespace-nowrap text-lg font-bold tracking-tight text-slate-300 transition-colors duration-300 hover:text-slate-500 md:text-xl">
        {name}
      </span>
    </div>
  );
}

export function TrustedCompanies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Duplicate for seamless loop
  const row = [...platforms, ...platforms];

  return (
    <section className="overflow-hidden border-y border-slate-100 bg-white py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-slate-400"
        >
          Trusted by fast-moving teams
        </motion.p>
      </div>

      {/* Full-bleed marquee */}
      <div className="relative">
        {/* Soft edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex min-w-max items-center"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: {
                duration: 45,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
            style={{ x: 0 }}
          >
            {/*
              Move left→right: animate from 0% toward positive x.
              With duplicated content, we shift by half (one full set).
            */}
            {row.map((name, i) => (
              <LogoMark key={`${name}-${i}`} name={name} />
            ))}
          </motion.div>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-xl px-6 text-center text-xs text-slate-400">
        Integrates with the tools teams already use — accounting, CRM, payments and more.
      </p>
    </section>
  );
}
