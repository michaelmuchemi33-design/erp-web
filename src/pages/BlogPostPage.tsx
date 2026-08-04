import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/content/blogPosts";
import { ArrowRight } from "lucide-react";
import { setPageMeta, trimDesc, trimTitle } from "@/lib/pageMeta";
import { SeoInternalLinks } from "@/components/SeoInternalLinks";

function TrialCta({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Unity ERP</p>
          <p className="mt-2 text-lg font-bold text-slate-950 md:text-xl">
            Ready to run inventory, CRM and finance in one system?
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Start a free limited account or unlock full modules on a paid plan. No credit card for free signup.
          </p>
        </div>
        <Button
          onClick={onOpen}
          className="h-12 shrink-0 gap-2 rounded-full bg-emerald-600 px-8 text-sm font-semibold text-white shadow-md shadow-emerald-600/25 hover:bg-emerald-500"
        >
          Start free trial
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function BlogPostShell({ post }: { post: BlogPost }) {
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    setPageMeta({
      title: trimTitle(post.title),
      description: trimDesc(post.description),
      path: `/blog/${post.slug}`,
      keywords: post.keywords,
    });
    const id = "blog-jsonld";
    document.getElementById(id)?.remove();
    const s = document.createElement("script");
    s.id = id;
    s.type = "application/ld+json";
    s.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.h1,
      datePublished: post.date,
      description: post.description,
      author: { "@type": "Organization", name: "Unity Software Solutions" },
      publisher: {
        "@type": "Organization",
        name: "Unity Software Solutions",
        url: "https://www.unity-software.online",
      },
      mainEntityOfPage: `https://www.unity-software.online/blog/${post.slug}`,
    });
    document.head.appendChild(s);
    window.scrollTo(0, 0);
  }, [post]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main className="pt-20">
        <article className="mx-auto max-w-4xl px-6 py-10 md:py-14">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {post.category} · {post.readMinutes} min read
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl md:leading-tight">
            {post.h1}
          </h1>
          <p className="mt-2 text-sm text-slate-500">{post.date}</p>

          <div className="mt-6">
            <Button
              onClick={() => setSignupOpen(true)}
              className="h-11 gap-2 rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-slate-700">{post.intro}</p>

          <TrialCta onOpen={() => setSignupOpen(true)} />

          <div className="prose prose-slate mt-2 max-w-none">
            {post.sections.map((sec) => (
              <section key={sec.h2} className="mt-10">
                <h2 className="text-xl font-bold text-slate-950 md:text-2xl">
                  {sec.h2}
                </h2>
                <p className="mt-3 leading-relaxed text-slate-700">{sec.body}</p>
                {sec.h3?.map((h) => (
                  <div key={h.title} className="mt-5">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {h.title}
                    </h3>
                    <p className="mt-2 text-slate-700">{h.body}</p>
                  </div>
                ))}
              </section>
            ))}
          </div>

          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-12 border-t border-slate-100 pt-10">
              <h2 className="text-xl font-bold text-slate-950">FAQs</h2>
              <ul className="mt-6 space-y-5">
                {post.faqs.map((f) => (
                  <li key={f.q}>
                    <p className="font-semibold text-slate-900">{f.q}</p>
                    <p className="mt-1 text-slate-600">{f.a}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <TrialCta onOpen={() => setSignupOpen(true)} />

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="/pricing"
              className="inline-flex h-11 items-center rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              View pricing
            </a>
            <a
              href="/blog"
              className="inline-flex h-11 items-center rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              More articles
            </a>
          </div>
        </article>
        <SeoInternalLinks title="Related ERP guides" />
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
