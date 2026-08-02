import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Factory,
  HardHat,
  Building2,
  ShoppingCart,
  GraduationCap,
  Truck,
  Home,
  Sprout,
  Utensils,
  Landmark,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Activity,
} from "lucide-react";

type Industry = {
  name: string;
  icon: React.ElementType;
  kpi: string;
  kpiLabel: string;
  accent: string;
  light: string;
  chartColor: string;
  status: string;
  ai: string;
  change: string;
  data: number[];
};

const industries: Industry[] = [
  {
    name: "Manufacturing",
    icon: Factory,
    kpi: "2,450",
    kpiLabel: "Total Production",
    accent: "text-purple-600",
    light: "bg-purple-50",
    chartColor: "#9333ea",
    status: "Live",
    ai: "Demand up 12%",
    change: "+16.4%",
    data: [30, 45, 38, 55, 48, 68, 62, 80],
  },
  {
    name: "Construction",
    icon: HardHat,
    kpi: "42",
    kpiLabel: "Active Projects",
    accent: "text-orange-600",
    light: "bg-orange-50",
    chartColor: "#ea580c",
    status: "Healthy",
    ai: "2 risks flagged",
    change: "+6.1%",
    data: [20, 35, 30, 50, 45, 60, 55, 72],
  },
  {
    name: "Hospital",
    icon: Building2,
    kpi: "92%",
    kpiLabel: "Bed Utilization",
    accent: "text-blue-600",
    light: "bg-blue-50",
    chartColor: "#2563eb",
    status: "Active",
    ai: "Staff optimized",
    change: "+2.3%",
    data: [60, 65, 70, 68, 75, 80, 78, 88],
  },
  {
    name: "Retail & POS",
    icon: ShoppingCart,
    kpi: "$1.2M",
    kpiLabel: "Monthly Sales",
    accent: "text-pink-600",
    light: "bg-pink-50",
    chartColor: "#db2777",
    status: "Synced",
    ai: "Peak at 2PM",
    change: "+8.7%",
    data: [25, 40, 35, 55, 50, 70, 65, 85],
  },
  {
    name: "Education",
    icon: GraduationCap,
    kpi: "3.4K",
    kpiLabel: "Enrollments",
    accent: "text-cyan-600",
    light: "bg-cyan-50",
    chartColor: "#0891b2",
    status: "Live",
    ai: "Admissions +9%",
    change: "+3.5%",
    data: [30, 42, 38, 48, 55, 60, 58, 70],
  },
  {
    name: "Logistics",
    icon: Truck,
    kpi: "96%",
    kpiLabel: "On-Time Delivery",
    accent: "text-indigo-600",
    light: "bg-indigo-50",
    chartColor: "#4f46e5",
    status: "Healthy",
    ai: "Route saved 8%",
    change: "+1.8%",
    data: [70, 72, 75, 78, 80, 85, 88, 92],
  },
  {
    name: "Real Estate",
    icon: Home,
    kpi: "840",
    kpiLabel: "Managed Units",
    accent: "text-amber-600",
    light: "bg-amber-50",
    chartColor: "#d97706",
    status: "Synced",
    ai: "Leases renewals due",
    change: "+5.4%",
    data: [35, 40, 38, 50, 48, 60, 58, 68],
  },
  {
    name: "Agriculture",
    icon: Sprout,
    kpi: "+12%",
    kpiLabel: "Yield Growth",
    accent: "text-emerald-600",
    light: "bg-emerald-50",
    chartColor: "#059669",
    status: "Live",
    ai: "Irrigation optimal",
    change: "+12%",
    data: [40, 45, 50, 55, 60, 68, 72, 80],
  },
  {
    name: "Hospitality",
    icon: Utensils,
    kpi: "81%",
    kpiLabel: "Occupancy Rate",
    accent: "text-fuchsia-600",
    light: "bg-fuchsia-50",
    chartColor: "#c026d3",
    status: "Active",
    ai: "Weekend surge",
    change: "+4.9%",
    data: [45, 50, 55, 60, 58, 70, 75, 82],
  },
  {
    name: "Finance",
    icon: Landmark,
    kpi: "$4.8M",
    kpiLabel: "Revenue Tracked",
    accent: "text-violet-600",
    light: "bg-violet-50",
    chartColor: "#7c3aed",
    status: "Healthy",
    ai: "Cash flow strong",
    change: "+7.2%",
    data: [30, 40, 45, 55, 60, 72, 78, 88],
  },
];

function buildPath(data: number[]) {
  const width = 100;
  const height = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  return data
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");
}

function buildAreaPath(data: number[]) {
  const line = buildPath(data);
  return `${line} 100,40 0,40`;
}

export function IndustryGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="industries" className="scroll-mt-24 bg-slate-50/50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Built for every industry
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Specialized dashboards, workflows, and KPIs tailored to how your business operates.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -10, scale: 1.03 }}
              style={{ cursor: "pointer" }}
              className="group relative overflow-hidden rounded-[18px] border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:border-slate-200 hover:bg-white hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)]"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i * 0.7) % 3,
                }}
                className="pointer-events-none absolute inset-0"
              />

              <div className="relative z-10">
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${industry.light} ${industry.accent} transition-all duration-300 group-hover:rotate-[5deg] group-hover:scale-110`}
                  >
                    <industry.icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                      <TrendingUp className="h-3 w-3" />
                      {industry.change}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {industry.status}
                    </span>
                  </div>
                </div>

                <h3 className="mb-0.5 text-sm font-semibold text-slate-900">{industry.name}</h3>
                <p className="text-2xl font-bold tracking-tight text-slate-950">{industry.kpi}</p>
                <p className="text-xs text-slate-500">{industry.kpiLabel}</p>

                <div className="relative mt-4 h-12 w-full overflow-hidden rounded-lg bg-gradient-to-b from-slate-50/50 to-transparent">
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full">
                    <defs>
                      <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={industry.chartColor} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={industry.chartColor} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d={buildAreaPath(industry.data)}
                      fill={`url(#grad-${i})`}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.8, delay: i * 0.05 + 0.3 }}
                    />
                    <motion.polyline
                      fill="none"
                      stroke={industry.chartColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={buildPath(industry.data)}
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.2, delay: i * 0.05, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 rounded-full border border-slate-100 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 transition-all duration-300 group-hover:border-emerald-100 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                    <Sparkles className="h-3 w-3" />
                    AI Insight
                  </span>
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-600"
                  >
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </motion.div>
                </div>

                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/40 blur-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}