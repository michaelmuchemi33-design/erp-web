import { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ResourcePage as ResourcePageType, resourcePages } from "@/content/resourcePages";

export function ResourcePageView({
  page,
  onOpenSignup,
}: {
  page: ResourcePageType;
  onOpenSignup?: () => void;
}) {
  useEffect(() => {
    document.title = `${page.title} | Unity ERP`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", page.description);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = page.description;
      document.head.appendChild(m);
    }
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
    .slice(0, 4);

  return (
    <article className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50/50 pt-28 pb-12 md:pt-32 md:pb-16">
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
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-wider text-amber-600"
          >
            {page.section}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-2 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl"
          >
            {page.hero}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg leading-relaxed text-slate-600"
          >
            {page.intro}
          </motion.p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-12 px-6">
          {page.sections.map((s, i) => (
            <motion.div
              key={s.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-2xl font-bold text-slate-950">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{s.body}</p>
              {s.bullets && (
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}

          <div className="rounded-3xl border border-slate-100 bg-slate-950 p-8 text-white">
            <h2 className="text-xl font-bold">
              All-in-one ERP with CRM and AI
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Unity ERP by Unity Software Solutions brings inventory, CRM, finance
              and AI into one platform — built for teams in Kenya, South Africa and Egypt.
            </p>
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
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main>
        <ResourcePageView page={page} onOpenSignup={() => setSignupOpen(true)} />
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
