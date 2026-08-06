import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "unity_promo_card_dismissed_v1";
const PORTRAIT = "/promo-sales-portrait.png";

export function PromoBanners() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close overlay"
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
        onClick={dismiss}
      />

      <div
        role="dialog"
        aria-labelledby="unity-promo-title"
        className="relative z-10 grid w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/20 sm:max-w-xl sm:grid-cols-[200px_1fr]"
      >
        <div className="relative hidden bg-slate-100 sm:block">
          <img
            src={PORTRAIT}
            alt="Unity ERP sales specialist"
            className="h-full w-full object-cover object-top"
            width={400}
            height={500}
          />
        </div>

        <div className="relative p-5 sm:p-6">
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-3 top-3 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>

          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-emerald-700">
            Unity ERP
          </p>
          <h2
            id="unity-promo-title"
            className="mt-1 pr-8 text-lg font-bold leading-snug tracking-[-0.02em] text-slate-950"
          >
            We are onboarding new clients
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Talk to sales on WhatsApp for a walkthrough of inventory, CRM, finance and
            POS — set up around how your business actually runs.
          </p>

          <a
            href="https://wa.me/254778903044"
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-500 active:scale-[0.98]"
          >
            WhatsApp +254 778 903 044
          </a>

          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-3">
            <p className="text-xs font-semibold text-slate-800">
              Free website design for active Unity ERP users
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Custom pages for your business can be included with your plan.
            </p>
            <a
              href="/pricing"
              className="mt-2 inline-block text-xs font-semibold text-emerald-700 underline-offset-2 hover:underline"
            >
              See pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
