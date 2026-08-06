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

      <section className="border-t border-slate-100 bg-slate-50/60 py-14">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Trusted payments</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Pay with confidence — then grow with Unity ERP
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              Checkout runs through Paystack (cards, M-Pesa where available). Free mode needs no credit card.
              Active plans include unlimited users on the standard tier, and eligible customers can request free
              website design for their business.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Transparent KES pricing — KES 3,000/month or KES 33,000/year</li>
              <li>• Invoice and receipt via email after payment</li>
              <li>• Sales on WhatsApp +254 778 903 044 · Call +254 793 832 286</li>
            </ul>
          </div>
          <figure className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
            <img
              src="https://www.unity-software.online/trust-thumbs-up.webp"
              alt="Happy professional recommending Unity ERP"
              className="aspect-[4/3] w-full object-cover object-top"
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
            />
          </figure>
        </div>
      </section>

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
                  src="/knight-logo.png"
                  alt="Unity ERP"
                  className="h-9 w-9 rounded-lg bg-black object-contain p-0.5"
                />
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Unity ERP
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
              © {new Date().getFullYear()} Unity ERP. All rights reserved.
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
