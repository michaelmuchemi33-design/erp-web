import { motion } from "framer-motion";
import { ShieldCheck, Zap, Infinity } from "lucide-react";

export function PricingHero() {
  return (
    <section id="pricing" className="scroll-mt-24 relative overflow-hidden bg-white pt-32 pb-12 md:pt-36 md:pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-amber-50/50 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-emerald-50/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50/80 px-4 py-1.5 text-xs font-semibold text-amber-800"
        >
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          Simple, transparent pricing
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
        >
          Pricing That Grows
          <br />
          With Your Business
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg leading-relaxed text-slate-600"
        >
          One powerful plan. Every module. Unlimited users & transactions.
          <br className="hidden sm:block" />
          Start with a <span className="font-semibold text-slate-900">2-month free trial</span> — no credit card required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>No contracts</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Infinity className="h-4 w-4 text-slate-700" />
            <span>Unlimited everything</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
