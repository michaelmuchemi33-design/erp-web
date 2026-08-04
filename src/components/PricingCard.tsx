import { useState } from "react";
import { payWithPaystack } from "@/lib/paystack";
import { trackLead } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  ArrowRight,
  Sparkles,
  Gift,
  Factory,
  HardHat,
  Building2,
  ShoppingCart,
  GraduationCap,
  Leaf,
  Utensils,
  Truck,
  Landmark,
  Users,
  Infinity as InfinityIcon,
  Cloud,
  Headphones,
  ExternalLink,
} from "lucide-react";

const industryModules = [
  { label: "Manufacturing", icon: Factory },
  { label: "Construction", icon: HardHat },
  { label: "Hospital", icon: Building2 },
  { label: "Retail & POS", icon: ShoppingCart },
  { label: "Education", icon: GraduationCap },
  { label: "Agriculture", icon: Leaf },
  { label: "Hospitality", icon: Utensils },
  { label: "Logistics", icon: Truck },
  { label: "Finance", icon: Landmark },
];

const coreFeatures = [
  "Free custom business website design",
  "Inventory Management",
  "Purchasing & Vendors",
  "CRM & Sales Pipeline",
  "HR & Payroll",
  "AI Assistant",
  "Advanced Reports & Analytics",
  "Multi-Branch Support",
  "API Access & Webhooks",
  "Cloud Backups",
  "Unlimited Users",
  "Unlimited Transactions",
  "Free Product Updates",
  "Email Support",
  "Priority Support",
];

export function PricingCard({ onOpenSignup }: { onOpenSignup?: () => void } = {}) {
  const [yearly, setYearly] = useState(false);
  const [payEmail, setPayEmail] = useState("");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");

  const monthlyPrice = 3000;
  const yearlyPrice = 33000; // 11 months = 1 month free
  const price = yearly ? yearlyPrice : monthlyPrice;
  const period = yearly ? "year" : "month";
  const monthlyEquivalent = yearly ? Math.round(yearlyPrice / 12) : null;
  const yearlySavings = monthlyPrice * 12 - yearlyPrice;

  return (
    <section className="bg-white pb-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col items-center justify-center gap-4"
        >
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                !yearly
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                yearly
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Yearly
            </button>
          </div>

          <AnimatePresence mode="wait">
            {yearly ? (
              <motion.div
                key="yearly-badge"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-700"
              >
                <Sparkles className="h-3.5 w-3.5" />
                1 month free — pay KES {yearlyPrice.toLocaleString()}/year
                (KES {monthlyEquivalent?.toLocaleString()}/mo)
              </motion.div>
            ) : (
              <motion.div
                key="monthly-badge"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-600"
              >
                Flexible monthly billing · Cancel anytime
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        
        {/* Free plan */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold text-slate-950">Free</h3>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Limited access
              </span>
            </div>
            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
              KES 0
              <span className="text-base font-medium text-slate-500"> / month</span>
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
              Try Unity ERP with limited features at no cost. After signup you get a
              confirmation page; our team contacts you to activate access and answer
              questions. Upgrade to monthly or yearly when you need full modules.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              {[
                "No payment card required",
                "Core screens to explore the product",
                "Guided activation by phone or WhatsApp",
                "Move to a paid plan anytime",
              ].map((x) => (
                <li key={x} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-stretch gap-2 md:w-52">
            <Button
              onClick={() => {
                try {
                  sessionStorage.setItem("unity_signup_mode", "free");
                } catch {}
                onOpenSignup?.();
              }}
              className="h-12 gap-2 rounded-full bg-slate-950 font-semibold text-white shadow-md shadow-slate-900/20 hover:bg-slate-800"
            >
              Create free account
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-center text-[11px] text-slate-400">
              Sales follow-up · not full production use
            </p>
          </div>
        </motion.div>

        {/* Main pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_24px_80px_rgb(0,0,0,0.07)]">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

            <CardContent className="p-0">
              <div className="grid lg:grid-cols-[1.05fr_1.4fr]">
                {/* Left: Price & CTA */}
                <div className="flex flex-col border-b border-slate-100 p-8 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
                  <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    Most Popular
                  </div>

                  <h2 className="text-2xl font-bold text-slate-950 md:text-3xl">
                    Knight ERP Enterprise
                  </h2>
                  <p className="mt-2 text-slate-500">
                    All modules included — CRM, inventory, finance, POS, and more.
                  </p>

                  <div className="mt-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={yearly ? "yearly" : "monthly"}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
                            KES {price.toLocaleString()}
                          </span>
                          <span className="text-lg font-medium text-slate-500">
                            / {period}
                          </span>
                        </div>
                        {yearly && (
                          <p className="mt-2 text-sm text-slate-500">
                            Equivalent to KES {monthlyEquivalent?.toLocaleString()}
                            /month
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Trial highlight */}
                  <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/80 to-amber-50/40 p-4">
                    <Gift className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <p className="font-semibold text-amber-900">
                        2-Month Free Trial Included
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-amber-800/90">
                        Full module access for 60 days on trial. Paid customers can request free custom website design. No credit card
                        required to start.
                      </p>
                    </div>
                  </div>

                  {/* Paystack — email collected for invoicing */}
                  <div className="mt-8 flex flex-col gap-3">
                    <label className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email for Paystack invoice / receipt
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={payEmail}
                      onChange={(e) => setPayEmail(e.target.value)}
                      className="h-12 w-full rounded-full border border-slate-200 px-5 text-sm outline-none ring-[#0BA4DB]/25 focus:ring-2"
                    />
                    {payError && (
                      <p className="text-left text-xs text-rose-600">{payError}</p>
                    )}
                    <Button
                      disabled={paying}
                      onClick={async () => {
                        if (!payEmail.includes("@")) {
                          setPayError("Enter a valid email for invoicing.");
                          return;
                        }
                        setPaying(true);
                        setPayError("");
                        try {
                          await trackLead({
                            email: payEmail,
                            primary_need: yearly
                              ? "Yearly plan Paystack"
                              : "Monthly plan Paystack",
                            source: "paystack_checkout",
                          });
                          await payWithPaystack({
                            email: payEmail,
                            amountKes: price,
                            planLabel: yearly
                              ? "Unity ERP Yearly"
                              : "Unity ERP Monthly",
                          });
                        } catch (err: unknown) {
                          setPayError(
                            err instanceof Error
                              ? err.message
                              : "Payment could not start"
                          );
                        } finally {
                          setPaying(false);
                        }
                      }}
                      className="h-12 w-full gap-2 rounded-full bg-[#0BA4DB] text-base font-semibold text-white hover:bg-[#0994c7]"
                    >
                      {paying
                        ? "Opening Paystack…"
                        : `Pay with Paystack — KES ${price.toLocaleString()}`}
                      <ExternalLink className="h-4 w-4" />
                    </Button>

                    <Button
                      onClick={onOpenSignup}
                      variant="outline"
                      className="h-12 w-full gap-2 rounded-full border-slate-200 bg-white text-base font-semibold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50"
                    >
                      Book a Live Demo
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Trust row */}
                  <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> Unlimited users
                    </span>
                    <span className="flex items-center gap-1.5">
                      <InfinityIcon className="h-3.5 w-3.5" /> Unlimited
                      transactions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Cloud className="h-3.5 w-3.5" /> Cloud hosted
                    </span>
                  </div>
                </div>

                {/* Right: Features */}
                <div className="p-8 md:p-10 lg:p-12">
                  <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Everything Included
                  </h3>

                  {/* Industry modules */}
                  <div className="mb-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Industry Modules
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {industryModules.map((mod) => {
                        const Icon = mod.icon;
                        return (
                        <div
                          key={mod.label}
                          className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-sm font-medium text-slate-700"
                        >
                          {Icon ? <Icon className="h-4 w-4 shrink-0 text-amber-600" /> : null}
                          {mod.label}
                        </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Core features */}
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Core Features
                    </p>
                    <div className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {coreFeatures.map((feature, i) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.02 }}
                          className="flex items-center gap-2.5"
                        >
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-sm font-medium text-slate-700">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Support note */}
                  <div className="mt-8 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">
                    <Headphones className="h-5 w-5 text-slate-600" />
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-800">
                        Priority support
                      </span>{" "}
                      included with every plan
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
