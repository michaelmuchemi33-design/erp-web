import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, GitBranch, Package, Calculator, Users, Factory, ShoppingCart, Briefcase, Wallet, FileText, BarChart3 } from "lucide-react";

const features = [
  { icon: Bot, title: "AI Assistant", description: "Ask questions, get forecasts, and receive proactive recommendations." },
  { icon: GitBranch, title: "Workflow Automation", description: "Automate approvals, notifications, and repetitive tasks." },
  { icon: Package, title: "Inventory", description: "Real-time stock levels, reordering, and warehouse management." },
  { icon: Calculator, title: "Accounting", description: "General ledger, invoicing, payments, and reconciliation." },
  { icon: Users, title: "CRM", description: "Track leads, opportunities, and customer communications." },
  { icon: Factory, title: "Manufacturing", description: "BOMs, production planning, shop floor control, and quality." },
  { icon: ShoppingCart, title: "Purchasing", description: "Purchase orders, vendor management, and spend analytics." },
  { icon: Briefcase, title: "HR", description: "Recruiting, onboarding, time-off, and employee records." },
  { icon: Wallet, title: "Payroll", description: "Accurate payroll processing, taxes, and compliance." },
  { icon: FileText, title: "Reports", description: "Custom reports and scheduled exports for every team." },
  { icon: BarChart3, title: "Analytics", description: "Live dashboards and predictive business intelligence." },
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="scroll-mt-24 bg-slate-50/50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Powerful features, one platform
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to manage operations, people, and customers in one place.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <Card className="group h-full rounded-2xl border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-slate-200 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-all duration-300 group-hover:rotate-[5deg] group-hover:bg-emerald-100 group-hover:text-emerald-600">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}