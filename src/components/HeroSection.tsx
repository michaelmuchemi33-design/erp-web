import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Cloud, ShieldCheck, TrendingUp, Bot, Sparkles, RefreshCw, Maximize2, MoreHorizontal } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Badge className="mb-6 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
              All-in-One ERP Software
            </Badge>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Run Your Entire Business
              <br />
              With One <span className="text-emerald-600">Intelligent ERP</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Unify all departments, automate processes, and grow faster with real-time insights and AI-Powered assistance.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button className="group h-12 gap-2 rounded-lg bg-emerald-600 px-6 text-base font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/25">
                Book a Free Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                className="group h-12 gap-2 rounded-lg border-slate-200 bg-white px-6 text-base font-semibold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Play className="h-3 w-3 fill-current" />
                </div>
                Watch 2-Min Overview
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 md:gap-8">
              {[
                { icon: Cloud, label: "Cloud Based" },
                { icon: ShieldCheck, label: "Secure & Reliable" },
                { icon: TrendingUp, label: "Scalable" },
                { icon: Bot, label: "AI-Powered" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Icon className="h-4 w-4 text-emerald-600" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[520px] rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.12)] md:p-6">
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <span className="font-semibold text-slate-900">Unity AI Assistant</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    Beta
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <RefreshCw className="h-4 w-4 cursor-pointer transition-colors hover:text-slate-600" />
                  <Maximize2 className="h-4 w-4 cursor-pointer transition-colors hover:text-slate-600" />
                  <MoreHorizontal className="h-4 w-4 cursor-pointer transition-colors hover:text-slate-600" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-700">
                    Good morning! I can see your inventory levels are low on 3 items. Would you like me to generate a purchase order?
                  </div>
                </div>

                <div className="flex items-start justify-end gap-2">
                  <div className="rounded-2xl rounded-tr-sm bg-emerald-600 px-4 py-3 text-sm leading-relaxed text-white">
                    Yes, please draft it for the usual suppliers.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-700">
                    Done. I've created PO-2024-0891 for KES 247,500 and sent it to your approval queue.
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-sm text-slate-500">AI Assistant is listening...</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}