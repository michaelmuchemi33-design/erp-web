import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { useRef, useState, useEffect } from "react";
import { PageSkeleton } from "@/components/PageSkeleton";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Target,
  Heart,
  Globe2,
  Lightbulb,
  Users,
  Shield,
  Rocket,
  Building2,
} from "lucide-react";

const timeline = [
  {
    year: "2019",
    title: "The idea",
    body: "Founders working with manufacturers and retailers in East Africa kept watching the same story: spreadsheets, paper, and three different systems that never talked to each other. Unity ERP began as a question — what if one platform could run the whole business?",
  },
  {
    year: "2020",
    title: "First build",
    body: "A lean team shipped the first inventory and accounting modules. Early pilots in Nairobi and Mombasa proved that local businesses needed software that understood mobile money, multi-branch retail, and intermittent connectivity.",
  },
  {
    year: "2021",
    title: "Industry depth",
    body: "We expanded into manufacturing BOMs, construction project costing, and hospital workflows. Every module was shaped by operators on the ground — not by generic feature lists.",
  },
  {
    year: "2023",
    title: "AI assistant",
    body: "Knight AI launched in beta: natural-language answers on stock, sales, and cash flow. The goal was simple — give managers insight without forcing them to learn another dashboard.",
  },
  {
    year: "2025",
    title: "One plan, every module",
    body: "We unified pricing into a single enterprise plan with unlimited users and transactions. Growth should not be punished by seat counts or module upsells.",
  },
  {
    year: "2026",
    title: "Today",
    body: "Unity ERP powers teams across manufacturing, construction, healthcare, education, retail, and logistics. We are still building in the open with customers who push us to go further.",
  },
];

const values = [
  {
    icon: Target,
    title: "Clarity over complexity",
    body: "Every screen should answer a real operational question. If it does not help the business move, it does not ship.",
  },
  {
    icon: Heart,
    title: "Built with operators",
    body: "We design with shop floor managers, accountants, and clinic admins — the people who live inside the system every day.",
  },
  {
    icon: Globe2,
    title: "Local, then global",
    body: "Payments, tax, and workflows that fit East Africa first. Patterns that travel well to any growing market.",
  },
  {
    icon: Lightbulb,
    title: "Intelligence that helps",
    body: "AI should surface the next action, not another chart. Forecasts, alerts, and recommendations that save time.",
  },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div ref={ref} className="relative pl-12 md:pl-16">
      {/* Node */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute left-0 top-2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center"
        style={{ left: 15 }}
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          {isInView && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/30" />
          )}
          <span className="relative h-3.5 w-3.5 rounded-full bg-amber-500 shadow-[0_0_16px_rgba(245,158,11,0.8)] ring-4 ring-slate-50" />
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
        className="mb-10 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:mb-12 md:p-7"
      >
        <div className="mb-2 inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
          {item.year}
        </div>
        <h3 className="text-xl font-bold text-slate-950 md:text-2xl">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
          {item.body}
        </p>
      </motion.div>
    </div>
  );
}

function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative bg-slate-50/60 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Our journey
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            From a workshop problem to a full ERP
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A short timeline of how Unity ERP grew — one module, one customer, one hard lesson at a time.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Base track */}
          <div className="absolute left-[15px] top-0 h-full w-px -translate-x-1/2 bg-slate-200" />

          {/* Progress line */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[15px] top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.65)]"
          />

          <div>
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage({
  onOpenSignup,
}: {
  onOpenSignup?: () => void;
}) {
  return (
    <>
      {/* Hero story */}
      <section className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-slate-100/80 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50/80 px-4 py-1.5 text-xs font-semibold text-amber-800"
          >
            <Building2 className="h-3.5 w-3.5" />
            About Unity ERP
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-[3.25rem]"
          >
            Software for the people
            <br />
            who <span className="text-amber-600">run the business</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600"
          >
            Unity ERP was born in the gap between ambition and tools. Founders and operators
            deserved one intelligent system — not a patchwork of spreadsheets, disconnected apps,
            and expensive seats. We build that system, module by module, with the people who use it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              onClick={onOpenSignup}
              className="h-12 gap-2 rounded-full bg-slate-950 px-7 text-base font-semibold text-white"
            >
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Button>
            <a
              href="/#pricing"
              className="inline-flex h-12 items-center rounded-full border border-slate-200 bg-white px-7 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              View pricing
            </a>
          </motion.div>
        </div>
      </section>

      {/* Story block */}
      <section className="border-y border-slate-100 bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Our story</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              One platform. Real operations.
            </h2>
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
              <p>
                We started beside factory floors and retail counters where stockouts, late invoices,
                and manual payroll were normal. The tools on offer were either too heavy, too foreign,
                or priced for corporations that did not look like our customers.
              </p>
              <p>
                So we built Unity ERP as a single cloud platform: inventory, finance, CRM, HR,
                manufacturing, and more — with an AI assistant that speaks the language of the business.
                Unlimited users. Transparent pricing. A two-month trial with everything unlocked.
              </p>
              <p>
                Today we serve teams who need software that respects how they already work, then
                quietly makes it better.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Users, label: "Unlimited users", sub: "No seat tax on growth" },
              { icon: Shield, label: "Cloud & secure", sub: "Backups and access control" },
              { icon: Rocket, label: "Fast to value", sub: "Live in weeks, not years" },
              { icon: Lightbulb, label: "AI assistant", sub: "Answers from your data" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition hover:border-amber-100 hover:bg-amber-50/40"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-bold text-slate-900">{label}</p>
                <p className="mt-1 text-sm text-slate-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Timeline />

      {/* Values */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">What we believe</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Principles that shape the product
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 md:p-8"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  {v.icon ? <v.icon className="h-5 w-5" /> : null}
                </div>
                <h3 className="text-lg font-bold text-slate-950">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Join teams building with Unity ERP
          </h2>
          <p className="mt-4 text-slate-300">
            Start a free two-month trial. Every module. No credit card required.
          </p>
          <Button
            onClick={onOpenSignup}
            className="mt-8 h-12 gap-2 rounded-full bg-white px-8 text-base font-semibold text-slate-950 hover:bg-amber-50"
          >
            Get demo access
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}

// Full page shell used when routed
export function AboutPageShell() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 160);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950 selection:bg-emerald-100 selection:text-emerald-900">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main>
        {ready ? (
          <AboutPage onOpenSignup={() => setSignupOpen(true)} />
        ) : (
          <PageSkeleton />
        )}
      </main>
      
      <section className="border-t border-slate-100 bg-slate-50/80 py-16" aria-label="Life around Unity ERP">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="section-title text-2xl text-slate-950 md:text-3xl">People and places behind the work</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            From shop floors to offices — the environments Unity ERP is built for.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <figure className="about-photo-strip overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <img src="https://www.unity-software.online/blog/office-team.webp" alt="Unity team collaboration" className="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async" width={480} height={600} />
            </figure>
            <figure className="about-photo-strip overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <img src="https://www.unity-software.online/blog/team-happy.webp" alt="Customers succeeding with Unity ERP" className="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async" width={480} height={600} />
            </figure>
            <figure className="about-photo-strip overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <img src="https://www.unity-software.online/blog/team-listening.webp" alt="Training and onboarding" className="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async" width={480} height={600} />
            </figure>
            <figure className="about-photo-strip overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <img src="https://www.unity-software.online/blog/team-women.webp" alt="Operators using Unity ERP" className="aspect-[4/5] w-full object-cover" loading="lazy" decoding="async" width={480} height={600} />
            </figure>
          </div>
        </div>
      </section>

      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
