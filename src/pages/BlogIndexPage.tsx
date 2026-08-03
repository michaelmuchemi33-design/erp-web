import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { blogPosts, blogCategories } from "@/content/blogPosts";
import { ArrowRight } from "lucide-react";

export function BlogIndexShell() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [cat, setCat] = useState<string>("All");

  useEffect(() => {
    document.title = "Unity ERP Blog — ERP Guides, Inventory, CRM, AI & Accounting";
    const d = document.querySelector('meta[name="description"]');
    if (d)
      d.setAttribute(
        "content",
        "Practical ERP guides for Kenyan and African SMEs: choose ERP, implementation, inventory, accounting, CRM and AI automation. Unity Software Solutions."
      );
  }, []);

  const list =
    cat === "All" ? blogPosts : blogPosts.filter((p) => p.category === cat);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main className="pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Blog
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            ERP insights for growing businesses
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Guides on ERP, inventory, accounting, CRM and AI — written for operators in Kenya and across Africa.
          </p>

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

          <div className="mt-10 space-y-4">
            {list.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition hover:border-amber-200 hover:bg-amber-50/30"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {post.category}
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">{post.title.split("|")[0].trim()}</h2>
                <p className="mt-2 text-sm text-slate-600">{post.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-amber-700">
                  Read article <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
