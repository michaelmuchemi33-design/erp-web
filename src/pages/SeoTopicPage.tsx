import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import type { SeoPage } from "@/content/seoPages";
import { setPageMeta, trimDesc, trimTitle } from "@/lib/pageMeta";
import { seoPages } from "@/content/seoPages";

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
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.h1,
      description: trimDesc(page.description),
      url: `https://www.unity-software.online/${page.slug}`,
      isPartOf: { "@type": "WebSite", name: "Unity ERP", url: "https://www.unity-software.online" },
      about: {
        "@type": "SoftwareApplication",
        name: "Unity ERP",
        applicationCategory: "BusinessApplication",
        offers: { "@type": "Offer", price: "3000", priceCurrency: "KES" },
      },
    });
    document.head.appendChild(script);
  }, [page]);

  const related = seoPages.filter((p) => p.slug !== page.slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main className="pt-28 pb-16">
        <article className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Unity ERP
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{page.intro}</p>

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

          <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-white">
            <h2 className="text-xl font-bold">Start your free Unity ERP trial</h2>
            <p className="mt-2 text-sm text-slate-300">
              60 days full access. CRM, inventory, accounting, POS, manufacturing and AI.
              KES 3,000/month after trial — or KES 33,000/year.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={() => setSignupOpen(true)}
                className="h-11 gap-2 rounded-full bg-white px-6 font-semibold text-slate-950 hover:bg-amber-50"
              >
                Start free trial <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href="/pricing"
                className="inline-flex h-11 items-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white hover:bg-white/10"
              >
                View pricing
              </a>
              <a
                href="/contact"
                className="inline-flex h-11 items-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white hover:bg-white/10"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-lg font-bold text-slate-950">Related guides</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 hover:border-amber-200"
                >
                  {r.h1}
                </a>
              ))}
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
