import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  Bot,
  Users,
  Infinity,
  LayoutGrid,
  Mail,
  RefreshCw,
  Headphones,
} from "lucide-react";

const items = [
  { icon: LayoutGrid, label: "Full ERP access" },
  { icon: Bot, label: "AI Assistant" },
  { icon: Users, label: "Unlimited users" },
  { icon: Infinity, label: "Unlimited transactions" },
  { icon: LayoutGrid, label: "All industry modules" },
  { icon: Mail, label: "Email support" },
  { icon: RefreshCw, label: "Product updates" },
  { icon: Headphones, label: "Priority support" },
];

export function Guarantee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="border-y border-slate-100 bg-slate-50/60 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            What’s Included in Your Free Trial?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            You get the exact same experience as a paying customer. No feature gates. No time limits on modules.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-slate-200 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="font-semibold text-slate-800">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
