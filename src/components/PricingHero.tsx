import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users } from "lucide-react";

export function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-10 pt-8 md:pb-12 md:pt-10">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-wider text-emerald-700"
        >
          Pricing
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-3 section-title text-4xl font-bold text-slate-950 sm:text-5xl"
        >
          Clear KES pricing for Unity ERP
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
        >
          Start on free limited access, then move to monthly or yearly when you are
          ready. Every paid plan includes all modules, unlimited users, and a 60-day
          full trial when you upgrade.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-slate-600"
        >
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            No long contracts
          </span>
          <span className="inline-flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            Cancel anytime
          </span>
          <span className="inline-flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-700" />
            Unlimited users on paid plans
          </span>
        </motion.div>
      </div>
    </section>
  );
}
