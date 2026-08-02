import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, RefreshCw, Maximize2, MoreHorizontal, Send } from "lucide-react";
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

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-slate-100/60 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
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
            <Button className="group relative overflow-hidden rounded-full bg-slate-950 px-7 py-6 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-slate-900/30">
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
          <motion.div animate={float} className="w-full max-w-md">
            <div className="rounded-3xl border border-slate-100 bg-white/90 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                  <span className="font-bold text-slate-900">Unity AI Assistant</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                    Beta
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <RefreshCw className="h-4 w-4 cursor-pointer transition-colors hover:text-slate-600" />
                  <Maximize2 className="h-4 w-4 cursor-pointer transition-colors hover:text-slate-600" />
                  <MoreHorizontal className="h-4 w-4 cursor-pointer transition-colors hover:text-slate-600" />
                </div>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none bg-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-700">
                    Good morning! I can pull sales summaries, inventory alerts, finance insights, and purchase recommendations. What would you like to see?
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-start justify-end gap-3"
                >
                  <div className="rounded-2xl rounded-tr-none bg-slate-950 px-4 py-3 text-sm leading-relaxed text-white">
                    Show me sales and inventory alerts.
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none bg-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-700">
                    <p className="mb-3">Sales are up 18% this month. Two SKUs are below safety stock and a bulk purchase could save $12K.</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white p-3 shadow-sm">
                        <div className="text-xs font-medium text-slate-500">Sales</div>
                        <div className="mt-1 text-lg font-bold text-emerald-600">+$128K</div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "78%" }}
                            transition={{ delay: 1.6, duration: 0.8 }}
                            className="h-1.5 rounded-full bg-emerald-500"
                          />
                        </div>
                      </div>
                      <div className="rounded-xl bg-white p-3 shadow-sm">
                        <div className="text-xs font-medium text-slate-500">Inventory</div>
                        <div className="mt-1 text-lg font-bold text-amber-600">2 Alerts</div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "45%" }}
                            transition={{ delay: 1.8, duration: 0.8 }}
                            className="h-1.5 rounded-full bg-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-emerald-500/20">
                <input
                  type="text"
                  readOnly
                  placeholder="Ask Unity AI anything..."
                  className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="h-4 w-0.5 bg-emerald-500"
                />
                <button className="rounded-xl bg-slate-950 p-2 text-white transition-transform hover:scale-105">
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Sales summary", "Inventory alerts", "Finance insights", "Purchase recs"].map((prompt) => (
                  <span
                    key={prompt}
                    className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {prompt}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}