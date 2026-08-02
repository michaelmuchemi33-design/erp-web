import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { AIAssistantChat } from "@/components/AIAssistantChat";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const float = {
  y: [0, -10, 0],
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
};

export function Hero({ onOpenSignup }: { onOpenSignup?: () => void } = {}) {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-slate-100/60 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_1.15fr]">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-7">
          <motion.div variants={item} className="w-fit rounded-full border border-emerald-100 bg-emerald-50/80 px-4 py-2 text-xs font-semibold text-emerald-800 backdrop-blur">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            All-in-One ERP Software
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem]"
          >
            Run Your Entire Business
            <br />
            With One <span className="text-emerald-600">Intelligent ERP</span>
          </motion.h1>

          <motion.p variants={item} className="max-w-xl text-lg leading-relaxed text-slate-600">
            One cloud platform for Manufacturing, Construction, Retail, Hospital, Education, Agriculture, Hospitality, Logistics, Finance and more.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <Button onClick={onOpenSignup} className="group relative overflow-hidden rounded-full bg-slate-950 px-7 py-6 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-slate-900/30">
              Book a Free Demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              className="group rounded-full border-slate-200 bg-white px-7 py-6 text-base font-semibold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              <Play className="mr-2 h-4 w-4 fill-current text-slate-950 transition-transform group-hover:scale-110" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div animate={float} className="w-full max-w-lg lg:max-w-xl">
            <AIAssistantChat />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}