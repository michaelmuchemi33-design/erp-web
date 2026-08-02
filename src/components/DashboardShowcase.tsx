import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Package, ShoppingBag, Factory, Activity } from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const revenueData = [
  { name: "Jan", value: 4200 },
  { name: "Feb", value: 5100 },
  { name: "Mar", value: 4800 },
  { name: "Apr", value: 6200 },
  { name: "May", value: 7100 },
  { name: "Jun", value: 8400 },
];

const expenseData = [
  { name: "Payroll", value: 35 },
  { name: "Ops", value: 25 },
  { name: "Marketing", value: 20 },
  { name: "R&D", value: 20 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

const stats = [
  { label: "Revenue", value: "$842K", change: "+12.5%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Expenses", value: "$214K", change: "-3.2%", icon: TrendingUp, color: "text-rose-600", bg: "bg-rose-50" },
  { label: "Inventory", value: "14.2K", change: "+5.1%", icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Orders", value: "3,842", change: "+8.7%", icon: ShoppingBag, color: "text-amber-600", bg: "bg-amber-50" },
];

const activity = [
  { text: "New purchase order #4921 approved", time: "2m ago" },
  { text: "Inventory alert: Widget A below safety stock", time: "15m ago" },
  { text: "Manufacturing batch #882 completed", time: "1h ago" },
  { text: "Invoice #1204 paid by Acme Corp", time: "3h ago" },
];

export function DashboardShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="dashboard" className="scroll-mt-24 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            One dashboard for every decision
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Real-time visibility into revenue, expenses, inventory, orders, manufacturing, and analytics.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-2xl border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-950">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl border-slate-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-slate-900">Revenue vs Expenses</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <Card className="rounded-2xl border-slate-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-slate-900">Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseData}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {expenseData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  {expenseData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      {d.name} {d.value}%
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <Card className="rounded-2xl border-slate-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-slate-900">Manufacturing Output</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2"
          >
            <Card className="rounded-2xl border-slate-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-slate-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {activity.map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                          <Activity className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-800">{item.text}</span>
                      </div>
                      <span className="text-xs text-slate-400">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}