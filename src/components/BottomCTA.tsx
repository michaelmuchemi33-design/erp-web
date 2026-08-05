import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";

export function BottomCTA({ onOpenSignup }: { onOpenSignup?: () => void } = {}) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300"
        >
          <Sparkles className="h-3.5 w-3.5" />
          2-month free trial · No credit card required
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title text-3xl font-bold text-white sm:text-4xl md:text-5xl"
        >
          Ready to Transform
          <br />
          Your Business?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-lg leading-relaxed text-slate-300"
        >
          Start your free 2-month trial today and experience Knight ERP with every
          feature unlocked. Pay securely when you are ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://checkout.swypt.io/erp"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#DD268A] px-8 py-6 text-base font-semibold text-white shadow-lg shadow-[#DD268A]/25 transition-all hover:scale-105 hover:opacity-90 hover:shadow-xl hover:shadow-[#DD268A]/30"
          >
            Pay Now
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>

          <Button
            onClick={onOpenSignup}
            variant="outline"
            className="h-13 gap-2 rounded-full border-slate-600 bg-transparent px-8 py-6 text-base font-semibold text-white transition-all hover:border-slate-400 hover:bg-white/5"
          >
            Book a Live Demo
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
