import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import type { SeoPage } from "@/content/seoPages";
import { setPageMeta, trimDesc, trimTitle } from "@/lib/pageMeta";
import { seoPages, seoBySlug } from "@/content/seoPages";

/** Semantic cluster anchors for Kenya ERP hub */
const CLUSTER_LINKS: { href: string; label: string }[] = [
  { href: "/erp-system-kenya", label: "ERP system Kenya (hub)" },
  { href: "/best-erp-systems-kenya", label: "Best ERP systems in Kenya" },
  { href: "/what-is-erp", label: "What is ERP?" },
  { href: "/cloud-erp", label: "Cloud ERP" },
  { href: "/mpesa-erp-integration", label: "M-Pesa ERP integration" },
  { href: "/etims-erp-kenya", label: "eTIMS & tax-ready invoicing" },
  { href: "/crm-software-kenya", label: "CRM software Kenya" },
  { href: "/pricing", label: "Unity ERP pricing" },
  { href: "/blog/erp-systems-in-kenya-2026", label: "ERP systems in Kenya guide" },
  { href: "/free-erp-software", label: "Free ERP software trial" },
];

export function SeoTopicShell({ page }: { page: SeoPage }) {
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    setPageMeta({
      title: trimTitle(page.title),
      description: trimDesc(page.description),
      path: `/${page.slug}`,
      keywords: page.keywords,
    });

    const id = "seo-jsonld";
    document.getElementById(id)?.remove();
    const graph: object[] = [
      {
        "@type": "WebPage",
        "@id": `https://www.unity-software.online/${page.slug}#webpage`,
        name: page.h1,
        description: trimDesc(page.description),
        url: `https://www.unity-software.online/${page.slug}`,
        isPartOf: {
          "@type": "WebSite",
          name: "Unity ERP",
          url: "https://www.unity-software.online",
        },
        about: {
          "@type": "SoftwareApplication",
          name: "Unity ERP",
          applicationCategory: "BusinessApplication",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "KES",
          },
        },
      },
    ];
    if (page.faqs?.length) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      });
    }
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph,
    });
    document.head.appendChild(script);
  }, [page]);

  const relatedFromSlugs =
    page.relatedSlugs
      ?.map((s) => seoBySlug[s])
      .filter(Boolean)
      .slice(0, 8) ?? [];

  const related =
    relatedFromSlugs.length > 0
      ? relatedFromSlugs
      : seoPages.filter((p) => p.slug !== page.slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main className="pt-28 pb-16">
        <article className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Unity ERP · Semantic topic guide
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{page.intro}</p>

          <nav
            aria-label="Kenya ERP topic cluster"
            className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Explore related topics
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {CLUSTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`inline-block rounded-full border px-3 py-1 text-xs font-medium transition ${
                      l.href === `/${page.slug}`
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-800"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 space-y-10">
            {page.sections.map((s) => (
              <section key={s.h2}>
                <h2 className="text-2xl font-bold text-slate-950">{s.h2}</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{s.body}</p>
                {s.bullets && (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {page.faqs && page.faqs.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-bold text-slate-950">
                Frequently asked questions
              </h2>
              <div className="mt-6 space-y-4">
                {page.faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 open:shadow-sm"
                  >
                    <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                      {f.q}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-white">
            <h2 className="text-xl font-bold">Start your free Unity ERP trial</h2>
            <p className="mt-2 text-sm text-slate-300">
              60 days full access. CRM, inventory, accounting, POS, manufacturing and
              AI. KES 3,000/month or KES 33,000/year after trial.
            </p>
            <Button
              onClick={() => setSignupOpen(true)}
              className="mt-5 rounded-full bg-emerald-500 px-6 text-slate-950 hover:bg-emerald-400"
            >
              Book a free demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="mt-4 text-xs text-slate-400">
              WhatsApp{" "}
              <a className="underline" href="https://wa.me/254778903044">
                +254 778 903 044
              </a>{" "}
              ·{" "}
              <a className="underline" href="mailto:erpintergration@gmail.com">
                erpintergration@gmail.com
              </a>
            </p>
          </div>

          <section className="mt-14">
            <h2 className="text-lg font-bold text-slate-950">
              Related guides in this topic cluster
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <a
                    href={`/${r.slug}`}
                    className="block rounded-2xl border border-slate-100 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/50"
                  >
                    <span className="font-semibold text-slate-900">{r.h1}</span>
                    <span className="mt-1 block text-xs text-slate-500 line-clamp-2">
                      {r.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
