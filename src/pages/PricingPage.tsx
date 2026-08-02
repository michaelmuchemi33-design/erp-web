import { Header } from "@/components/Header";
import { PricingHero } from "@/components/PricingHero";
import { PricingCard } from "@/components/PricingCard";
import { Guarantee } from "@/components/Guarantee";
import { FAQ } from "@/components/FAQ";
import { BottomCTA } from "@/components/BottomCTA";

export default function PricingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950 selection:bg-emerald-100 selection:text-emerald-900">
      <Header />
      <main>
        <PricingHero />
        <PricingCard />
        <Guarantee />
        <FAQ />
        <BottomCTA />
      </main>

      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://i.postimg.cc/qBnzqpqk/blck-logo-erp.png"
                  alt="Knight ERP"
                  className="h-9 w-9 rounded-lg object-contain"
                />
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Knight ERP
                </span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-slate-500">
                The all-in-one intelligent ERP platform for manufacturing, retail,
                healthcare, education and more.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Product
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li>
                  <a href="/#features" className="transition hover:text-slate-950">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/#industries" className="transition hover:text-slate-950">
                    Industries
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="transition hover:text-slate-950">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/#dashboard" className="transition hover:text-slate-950">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Resources
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li>
                  <a href="#" className="transition hover:text-slate-950">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-slate-950">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#faq" className="transition hover:text-slate-950">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-slate-950">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li>
                  <a href="#" className="transition hover:text-slate-950">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-slate-950">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-slate-950">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-slate-950">
                    System Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Knight ERP. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="transition hover:text-slate-950">
                Privacy
              </a>
              <a href="#" className="transition hover:text-slate-950">
                Terms
              </a>
              <a href="#" className="transition hover:text-slate-950">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
