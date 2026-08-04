import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { blogPosts, blogCategories } from "@/content/blogPosts";
import { setPageMeta, trimDesc, trimTitle } from "@/lib/pageMeta";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlogIndexShell() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [cat, setCat] = useState<string>("All");

  useEffect(() => {
    setPageMeta({
      title: trimTitle("Unity ERP Blog | ERP, CRM, Inventory & Accounting Guides"),
      description: trimDesc(
        "Practical ERP guides for Kenyan and African SMEs: choose ERP, SAP vs cloud ERP, inventory, accounting, CRM and AI. Start a free Unity ERP trial."
      ),
      path: "/blog",
      keywords:
        "ERP blog Kenya, SAP alternative SME, inventory management guide, CRM Kenya, Unity ERP blog, free ERP trial",
    });
    window.scrollTo(0, 0);
  }, []);

  const list =
    cat === "All" ? blogPosts : blogPosts.filter((p) => p.category === cat);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main className="pt-28 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Blog
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            ERP insights for growing businesses
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Guides on ERP, inventory, accounting, CRM and AI — written for operators in
            Kenya and across Africa. Includes how Unity ERP compares with heavier suites
            like SAP for SME teams.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setSignupOpen(true)}
              className="h-11 gap-2 rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              < className="h-4 w-4" />
              Start free trial
            </Button>
            <a
              href="/pricing"
              className="inline-flex h-11 items-center rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              View pricing
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["All", ...blogCategories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  cat === c
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {list.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                {post.imageUrl && (
                  <div className="aspect-[16/11] overflow-hidden bg-slate-100">
                    <img
                      src={post.imageUrl}
                      alt={post.imageAlt || post.h1}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                      width={700}
                      height={438}
                    />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    {post.category}
                  </p>
                  <h2 className="mt-1 text-xl font-bold leading-snug text-slate-950">
                    {post.title.split("|")[0].trim()}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                    {post.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                    Read article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center">
            <p className="text-lg font-bold text-slate-950">
              Try Unity ERP free — inventory, CRM and finance in one place
            </p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
              Built for SMEs that need results faster than a multi-year SAP-style
              programme, with clear KES pricing.
            </p>
            <Button
              onClick={() => setSignupOpen(true)}
              className="mt-5 h-12 gap-2 rounded-full bg-slate-950 px-8 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
