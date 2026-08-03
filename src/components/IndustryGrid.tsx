import {
  useRef,
  useState } from "react";
import { motion,
  useInView,
  AnimatePresence } from "framer-motion";
import {
  Factory,
  HardHat,
  Building2,
  ShoppingCart,
  GraduationCap,
  Truck,
  Home,
  Leaf,
  Utensils,
  Landmark,
  ArrowRight,
  TrendingUp,
  Sparkles,
  X,
  Check,
  Loader2,
  Send,
  Heart,
  Zap,
  ShoppingBag,
  Wrench,
  Globe,
  HeartHandshake,
  Activity,
  Car,
  Briefcase,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

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
  summary: string;
  helps: string[];
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
    summary:
      "Connect shop floor to finance. Track BOMs, work orders, quality checks, and material consumption in real time.",
    helps: [
      "BOM & production planning",
      "Shop floor job tracking",
      "Quality & scrap reporting",
      "Raw material & WIP inventory",
      "Cost per batch visibility",
    ],
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
    summary:
      "Keep projects on budget and on schedule with job costing, subcontractors, materials, and progress billing in one place.",
    helps: [
      "Project & phase budgeting",
      "Material requests by site",
      "Subcontractor management",
      "Progress invoicing",
      "Risk and delay alerts",
    ],
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
    summary:
      "Coordinate patients, pharmacy, billing, and staffing so care teams and administrators share the same live picture.",
    helps: [
      "Admissions & bed management",
      "Pharmacy stock control",
      "Patient billing & claims",
      "Staff rostering",
      "Department cost tracking",
    ],
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
    summary:
      "Unify stores, online, and warehouse. Know what sold, what is low, and what to reorder before shelves go empty.",
    helps: [
      "Multi-branch POS",
      "Live stock across outlets",
      "Promotions & pricing",
      "Customer loyalty data",
      "Daily sales close-out",
    ],
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
    summary:
      "Manage admissions, fees, academics, and staff from one system built for schools, colleges, and training centres.",
    helps: [
      "Student admissions",
      "Fee collection & arrears",
      "Class & timetable setup",
      "Staff payroll",
      "Parent communication logs",
    ],
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
    summary:
      "Dispatch, fleet, warehouse, and invoicing connected so every shipment is tracked from pick-up to payment.",
    helps: [
      "Fleet & trip management",
      "Warehouse bin locations",
      "Delivery proof capture",
      "Fuel & maintenance costs",
      "Customer delivery SLAs",
    ],
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
    summary:
      "Leases, rent collection, maintenance tickets, and owner statements in one property operations hub.",
    helps: [
      "Unit & tenant registry",
      "Rent schedules & arrears",
      "Maintenance work orders",
      "Owner statements",
      "Lease renewal reminders",
    ],
  },
  {
    name: "Agriculture",
    icon: Leaf,
    kpi: "+12%",
    kpiLabel: "Yield Growth",
    accent: "text-emerald-600",
    light: "bg-emerald-50",
    chartColor: "#059669",
    status: "Live",
    ai: "Irrigation optimal",
    change: "+12%",
    data: [40, 45, 50, 55, 60, 68, 72, 80],
    summary:
      "Track farms, inputs, harvests, and sales so agribusinesses see cost per acre and stock ready for market.",
    helps: [
      "Farm & plot records",
      "Input inventory",
      "Harvest & yield logs",
      "Buyer & contract sales",
      "Season cost analysis",
    ],
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
    summary:
      "Rooms, F&B, inventory, and front-desk billing aligned for hotels, lodges, and restaurants.",
    helps: [
      "Reservations & occupancy",
      "F&B stock control",
      "Housekeeping tasks",
      "Guest folio billing",
      "Multi-outlet sales",
    ],
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
    summary:
      "General ledger, receivables, payables, and cash positions with reports your board can trust.",
    helps: [
      "Chart of accounts",
      "Invoicing & collections",
      "Bill payments",
      "Bank reconciliation",
      "Management reports",
    ],
  },
  // Row 3
  {
    name: "Automotive",
    icon: Car,
    kpi: "318",
    kpiLabel: "Jobs This Month",
    accent: "text-sky-600",
    light: "bg-sky-50",
    chartColor: "#0284c7",
    status: "Live",
    ai: "Parts low on 5 SKUs",
    change: "+9.1%",
    data: [28, 36, 40, 48, 52, 60, 66, 74],
    summary:
      "Workshops and dealers track jobs, parts, warranties, and customer vehicles without paper job cards.",
    helps: [
      "Job cards & labour",
      "Parts inventory",
      "Vehicle history",
      "Warranty claims",
      "Customer reminders",
    ],
  },
  {
    name: "Professional Services",
    icon: Briefcase,
    kpi: "126",
    kpiLabel: "Open Engagements",
    accent: "text-teal-600",
    light: "bg-teal-50",
    chartColor: "#0d9488",
    status: "Active",
    ai: "Utilization 78%",
    change: "+4.2%",
    data: [40, 44, 48, 52, 55, 60, 64, 70],
    summary:
      "Agencies, consultancies, and firms manage projects, time, billing, and retainers in one flow.",
    helps: [
      "Project & task tracking",
      "Time & expense capture",
      "Retainer billing",
      "Resource utilization",
      "Client profitability",
    ],
  },
  {
    name: "Fashion & Apparel",
    icon: ShoppingBag,
    kpi: "64%",
    kpiLabel: "Sell-through",
    accent: "text-rose-600",
    light: "bg-rose-50",
    chartColor: "#e11d48",
    status: "Synced",
    ai: "Season end soon",
    change: "+11.0%",
    data: [22, 30, 38, 45, 50, 58, 62, 72],
    summary:
      "From design batches to retail shelves — sizes, colours, and channels stay in sync.",
    helps: [
      "Style & variant SKUs",
      "Wholesale & retail channels",
      "Season planning",
      "Returns handling",
      "Outlet transfers",
    ],
  },
  {
    name: "Energy & Utilities",
    icon: Zap,
    kpi: "99.1%",
    kpiLabel: "Uptime",
    accent: "text-lime-700",
    light: "bg-lime-50",
    chartColor: "#65a30d",
    status: "Healthy",
    ai: "3 assets due service",
    change: "+1.4%",
    data: [75, 78, 80, 82, 85, 88, 90, 93],
    summary:
      "Asset-heavy operators track maintenance, spare parts, and field work against commercial performance.",
    helps: [
      "Asset registers",
      "Preventive maintenance",
      "Spare parts stock",
      "Work order dispatch",
      "Cost per asset",
    ],
  },
  {
    name: "Travel & Tourism",
    icon: Globe,
    kpi: "1.8K",
    kpiLabel: "Bookings",
    accent: "text-blue-500",
    light: "bg-blue-50",
    chartColor: "#3b82f6",
    status: "Live",
    ai: "Peak season +22%",
    change: "+14.5%",
    data: [20, 28, 35, 42, 50, 58, 65, 78],
    summary:
      "Packages, agents, payments, and departures managed so operators never overbook or lose deposits.",
    helps: [
      "Package & itinerary setup",
      "Agent commissions",
      "Booking & deposits",
      "Departure checklists",
      "Customer documents",
    ],
  },
  {
    name: "Clinics & Labs",
    icon: Activity,
    kpi: "540",
    kpiLabel: "Daily Visits",
    accent: "text-cyan-700",
    light: "bg-cyan-50",
    chartColor: "#0e7490",
    status: "Active",
    ai: "Queue peak 10am",
    change: "+6.8%",
    data: [35, 42, 50, 55, 60, 68, 72, 80],
    summary:
      "Outpatient clinics and labs run appointments, billing, and consumables without juggling spreadsheets.",
    helps: [
      "Appointments & queue",
      "Lab sample tracking",
      "Consumable stock",
      "Patient invoices",
      "Doctor schedules",
    ],
  },
  {
    name: "NGOs & Faith",
    icon: HeartHandshake,
    kpi: "28",
    kpiLabel: "Active Programs",
    accent: "text-indigo-500",
    light: "bg-indigo-50",
    chartColor: "#6366f1",
    status: "Synced",
    ai: "Grant report due",
    change: "+3.0%",
    data: [25, 30, 35, 40, 45, 50, 55, 60],
    summary:
      "Programs, donors, budgets, and field expenses tracked for transparent reporting.",
    helps: [
      "Program budgets",
      "Donor & pledge tracking",
      "Field expense claims",
      "Beneficiary registers",
      "Grant reporting packs",
    ],
  },
  {
    name: "Field Services",
    icon: Wrench,
    kpi: "94%",
    kpiLabel: "First-time Fix",
    accent: "text-stone-600",
    light: "bg-stone-50",
    chartColor: "#78716c",
    status: "Healthy",
    ai: "12 jobs today",
    change: "+5.6%",
    data: [40, 48, 52, 58, 62, 68, 72, 80],
    summary:
      "Dispatch technicians, track parts on vans, and invoice completed jobs the same day.",
    helps: [
      "Job scheduling",
      "Mobile tech updates",
      "Van stock",
      "SLA timers",
      "Same-day invoicing",
    ],
  },
  {
    name: "Wholesale Trade",
    icon: Heart,
    kpi: "890",
    kpiLabel: "Active SKUs",
    accent: "text-red-600",
    light: "bg-red-50",
    chartColor: "#dc2626",
    status: "Live",
    ai: "Fill rate 97%",
    change: "+7.9%",
    data: [30, 38, 45, 52, 58, 65, 70, 78],
    summary:
      "Distributors manage price lists, credit limits, van sales, and warehouse picks at scale.",
    helps: [
      "Customer price lists",
      "Credit control",
      "Sales orders & picks",
      "Route van sales",
      "Supplier returns",
    ],
  },
  {
    name: "Healthcare Retail",
    icon: Building2,
    kpi: "1.1K",
    kpiLabel: "Rx Filled",
    accent: "text-emerald-700",
    light: "bg-emerald-50",
    chartColor: "#047857",
    status: "Active",
    ai: "3 near expiry",
    change: "+4.4%",
    data: [32, 40, 46, 52, 58, 64, 70, 76],
    summary:
      "Pharmacies control batch expiry, prescriptions, and regulated stock with full audit trails.",
    helps: [
      "Batch & expiry control",
      "Prescription logging",
      "Supplier compliance",
      "Fast POS checkout",
      "Controlled substance logs",
    ],
  },
];

function chartPoints(data: number[]) {
  const width = 100;
  const height = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / Math.max(data.length - 1, 1);
  return data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 8) - 4;
    return { x, y };
  });
}

/** Valid SVG path d for the area fill under the line */
function buildAreaPath(data: number[]) {
  const pts = chartPoints(data);
  if (!pts.length) return "M0 40 L100 40 Z";
  const line = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  return `${line} L100 40 L0 40 Z`;
}

/** Valid SVG path d for the stroke line */
function buildLinePath(data: number[]) {
  const pts = chartPoints(data);
  if (!pts.length) return "M0 20";
  return pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
}


function WaveSparkline({
  data,
  color,
  gradId,
}: {
  data: number[];
  color: string;
  gradId: string;
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (now - last > 40) {
        setPhase((p) => p + 0.08);
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const waved = useMemo(
    () => data.map((v, i) => v + Math.sin(phase + i * 0.75) * 5.5),
    [data, phase]
  );

  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={buildAreaPath(waved)} fill={`url(#${gradId})`} />
      <path
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d={buildLinePath(waved)}
      />
    </svg>
  );
}

function IndustryOverlay({
  industry,
  onClose,
}: {
  industry: Industry;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const Icon = industry.icon;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    setError("");
    try {
      const { error: dbError } = await supabase.from("leads").insert({
        name: name.trim() || null,
        email: email.trim().toLowerCase(),
        industry: industry.name,
        company_size: null,
        primary_need: `Industry interest: ${industry.name}`,
        source: "industry_overlay",
        created_at: new Date().toISOString(),
      });
      if (dbError) throw dbError;
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not submit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${industry.light} ${industry.accent}`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-3xl font-bold tracking-tight text-slate-950">{industry.name}</h3>
        <p className="mt-3 text-base leading-relaxed text-slate-600">{industry.summary}</p>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            How Knight ERP helps
          </p>
          <ul className="mt-3 space-y-2">
            {industry.helps.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check className="h-3 w-3" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Included modules</p>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              <li>CRM & sales pipeline</li>
              <li>Inventory & purchasing</li>
              <li>Finance & invoicing</li>
              <li>AI Assistant insights</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Typical outcomes</p>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              <li>One system of record</li>
              <li>Fewer stockouts & delays</li>
              <li>Faster month-end close</li>
              <li>Clear industry KPIs</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-sm text-slate-700">
          <span className="font-semibold text-emerald-800">Unity ERP</span> by Unity Software Solutions
          unifies CRM, operations and AI for teams in Kenya, South Africa and Egypt — with unlimited users
          on the standard plan.
        </div>

        <div className="mt-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-sm text-slate-700">
          <p className="font-semibold text-amber-900">Royalty benefit — free custom website</p>
          <p className="mt-1 text-slate-600">
            Subscribe to Unity ERP and get a free website design custom-built for your business
            (layout, branding and core pages). A complimentary creative royalty for customers who grow with us.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
          {done ? (
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
              <Check className="h-4 w-4" />
              Thanks — we will contact you about {industry.name}.
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">
                Get contacted for {industry.name}
              </p>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/20"
              />
              <input
                type="email"
                required
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/20"
              />
              {error && <p className="text-xs text-rose-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-slate-950 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Request a call back
              </button>
              <p className="text-[11px] text-slate-400">
                Tagged as industry: <span className="font-medium text-slate-600">{industry.name}</span>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function IndustryGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Industry | null>(null);

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
            Click any card to see how Unity ERP fits — plus a free custom business website as a customer royalty benefit.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              whileHover={{ y: -10, scale: 1.03 }}
              onClick={() => setSelected(industry)}
              style={{ cursor: "pointer" }}
              className="group relative overflow-hidden rounded-[18px] border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:border-slate-200 hover:bg-white hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)]"
            >
              <div className="relative z-10">
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${industry.light} ${industry.accent} transition-all duration-300 group-hover:rotate-[5deg] group-hover:scale-110`}
                  >
                    {industry.icon ? <industry.icon className="h-5 w-5" /> : null}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                      <TrendingUp className="h-3 w-3" />
                      {industry.change}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      {industry.status}
                    </span>
                  </div>
                </div>

                <h3 className="mb-0.5 text-sm font-semibold text-slate-900">{industry.name}</h3>
                <p className="text-2xl font-bold tracking-tight text-slate-950">{industry.kpi}</p>
                <p className="text-xs text-slate-500">{industry.kpiLabel}</p>

                <div className="relative mt-4 h-12 w-full overflow-hidden rounded-lg bg-gradient-to-b from-slate-50/50 to-transparent">
                  <WaveSparkline
                    data={industry.data}
                    color={industry.chartColor}
                    gradId={`grad-${i}`}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 rounded-full border border-slate-100 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 transition-all duration-300 group-hover:border-emerald-100 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                    <Sparkles className="h-3 w-3" />
                    AI Insight
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 opacity-0 transition group-hover:opacity-100">
                    View details <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <IndustryOverlay industry={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
