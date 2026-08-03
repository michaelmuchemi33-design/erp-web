import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/content/blogPosts";
import { ArrowRight } from "lucide-react";

export function BlogPostShell({ post }: { post: BlogPost }) {
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    document.title = post.title;
    let d = document.querySelector('meta[name="description"]');
    if (!d) {
      d = document.createElement("meta");
      d.setAttribute("name", "description");
      document.head.appendChild(d);
    }
    d.setAttribute("content", post.description);
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
  }, [post]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main className="pt-28 pb-16">
        <article className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {post.category} · {post.readMinutes} min read
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{post.h1}</h1>
          <p className="mt-4 text-lg text-slate-600">{post.intro}</p>

          <div className="mt-10 space-y-10">
            {post.sections.map((sec) => (
              <section key={sec.h2}>
                <h2 className="text-2xl font-bold">{sec.h2}</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{sec.body}</p>
                {sec.h3?.map((h) => (
                  <div key={h.title} className="mt-4">
                    <h3 className="text-lg font-semibold text-slate-900">{h.title}</h3>
                    <p className="mt-2 text-slate-600">{h.body}</p>
                  </div>
                ))}
              </section>
            ))}
          </div>

          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold">Frequently asked questions</h2>
              <div className="mt-4 space-y-4">
                {post.faqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{f.q}</p>
                    <p className="mt-2 text-sm text-slate-600">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-white">
            <h2 className="text-xl font-bold">Try Unity ERP free for 60 days</h2>
            <p className="mt-2 text-sm text-slate-300">
              Full modules — CRM, inventory, accounting, POS, manufacturing and AI.
            </p>
            <Button
              onClick={() => setSignupOpen(true)}
              className="mt-6 h-11 gap-2 rounded-full bg-white px-6 font-semibold text-slate-950"
            >
              Start free trial <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <a href="/blog" className="mt-8 inline-block text-sm font-medium text-slate-500 hover:text-slate-900">
            ← All articles
          </a>
        </article>
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
