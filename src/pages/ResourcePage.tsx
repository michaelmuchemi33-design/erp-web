import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { Button } from "@/components/ui/button";
import { PageSkeleton } from "@/components/PageSkeleton";
import { PageBanner } from "@/components/PageBanner";
import {
  ArrowRight,
  ChevronRight,
  Check,
  Package,
  Shield,
  Headphones,
  Sparkles,
} from "lucide-react";
import {
  ResourcePage as ResourcePageType,
  resourcePages,
} from "@/content/resourcePages";

const invoicePackages = [
  {
    name: "Unity ERP Core License",
    detail: "Annual subscription — multi-user seats, all core modules",
    note: "Inventory, CRM, Finance, Purchasing, AI Assistant",
  },
  {
    name: "Inventory & Warehouse Module",
    detail: "Advanced stock & logistics add-on depth",
    note: "Multi-warehouse, bins, transfers, reorder points",
  },
  {
    name: "Implementation & Data Migration",
    detail: "Professional services — onboarding hours",
    note: "Opening balances, product import, user training",
  },
  {
    name: "Priority Support Package",
    detail: "12 months — faster response windows",
    note: "Email, phone and WhatsApp with Unity Software Solutions",
  },
];

export function ResourcePageView({
  page,
  onOpenSignup,
}: {
  page: ResourcePageType;
  onOpenSignup?: () => void;
}) {
  useEffect(() => {
    document.title = `${page.title} | Unity ERP`;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.setAttribute("name", "description");
      document.head.appendChild(desc);
    }
    desc.setAttribute("content", page.description);
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement("meta");
      keywords.setAttribute("name", "keywords");
      document.head.appendChild(keywords);
    }
    keywords.setAttribute("content", page.keywords);
  }, [page]);

  const related = resourcePages
    .filter((p) => p.section === page.section && p.slug !== page.slug)
    .slice(0, 6);

  return (
    <article className="bg-white">
      <div className="pt-16">
        <PageBanner title={page.hero} subtitle={page.section} />
      </div>
      <section className="border-b border-slate-100 bg-slate-50/50 pt-10 pb-10 md:pt-12 md:pb-12">
        <div className="mx-auto max-w-3xl px-6">
          <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs font-medium text-slate-400">
            <a href="/" className="hover:text-slate-700">
              Home
            </a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-500">{page.section}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-700">{page.hero}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
            {page.section}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {page.hero}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{page.intro}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-12 px-6">
          {page.sections.map((s, i) => (
            <motion.div
              key={s.heading}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.04 }}
            >
              <h2 className="text-2xl font-bold text-slate-950">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{s.body}</p>
              {s.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <Check className="h-3 w-3" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}

          {/* Always-on deep value blocks */}
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Why teams choose Unity ERP
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Unity Software Solutions built Unity ERP as a single system for CRM,
              inventory, finance and AI — so growing businesses in Kenya, South Africa
              and Egypt do not need a patchwork of tools.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Sparkles,
                  t: "CRM + AI",
                  d: "Pipeline, customers and natural-language answers from live data.",
                },
                {
                  icon: Package,
                  t: "Operations",
                  d: "Stock, purchasing, manufacturing and multi-branch retail in one ledger of truth.",
                },
                {
                  icon: Shield,
                  t: "Finance ready",
                  d: "Invoices, payables and reports that match what actually happened in the business.",
                },
              ].map(({ icon: Icon, t: title, d }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                >
                  <Icon className="mb-2 h-5 w-5 text-amber-600" />
                  <p className="font-bold text-slate-900">{title}</p>
                  <p className="mt-1 text-sm text-slate-600">{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Invoice-style packages */}
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Solution packages
            </h2>
            <p className="mt-2 text-slate-600">
              Typical commercial building blocks — similar to a professional Unity ERP
              engagement. Simple public pricing starts at{" "}
              <strong>KES 3,000/month</strong> or <strong>KES 33,000/year</strong>.
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Item</th>
                    <th className="hidden px-4 py-3 font-semibold sm:table-cell">
                      Scope
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoicePackages.map((row) => (
                    <tr key={row.name} className="bg-white">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{row.name}</p>
                        <p className="text-xs text-slate-500">{row.detail}</p>
                        <p className="mt-1 text-xs text-slate-600 sm:hidden">
                          {row.note}
                        </p>
                      </td>
                      <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Enterprise quotes, implementation hours and priority support are available on
              request via erpintergration@gmail.com or +254 793 832 286.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-950 p-8 text-white">
            <div className="flex items-start gap-3">
              <Headphones className="mt-1 h-6 w-6 shrink-0 text-amber-400" />
              <div>
                <h2 className="text-xl font-bold">Talk to Unity Software Solutions</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Kenya · South Africa · Egypt — email{" "}
                  <a
                    href="mailto:erpintergration@gmail.com"
                    className="text-amber-300 underline-offset-2 hover:underline"
                  >
                    erpintergration@gmail.com
                  </a>{" "}
                  or call / WhatsApp{" "}
                  <a href="tel:+254793832286" className="text-amber-300 hover:underline">
                    +254 793 832 286
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={onOpenSignup}
                className="h-11 gap-2 rounded-full bg-white px-6 font-semibold text-slate-950 hover:bg-amber-50"
              >
                {page.cta || "Start free trial"}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href="/contact"
                className="inline-flex h-11 items-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white hover:bg-white/10"
              >
                Contact us
              </a>
              <a
                href="/pricing"
                className="inline-flex h-11 items-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white hover:bg-white/10"
              >
                View pricing
              </a>
            </div>
          </div>

          {related.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                More in {page.section}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <a
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-amber-200 hover:bg-amber-50/50"
                  >
                    {r.hero}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}

export function ResourcePageShell({ page }: { page: ResourcePageType }) {
  const [signupOpen, setSignupOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const t = window.setTimeout(() => setReady(true), 180);
    return () => window.clearTimeout(t);
  }, [page.slug]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main>
        {ready ? (
          <ResourcePageView page={page} onOpenSignup={() => setSignupOpen(true)} />
        ) : (
          <PageSkeleton />
        )}
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
