import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";

const KEY = "unity_demo_benefits_dismissed_v1";
const DASH = "/erp-dashboard.jpg";

const benefits = [
  "Live demo workspace with sample inventory, sales and CRM data",
  "Free onboarding training for your team (remote)",
  "M-Pesa-friendly operations and clear KES pricing",
  "Free website design benefit for active paying users",
  "Unlimited users on the standard plan",
  "AI assistant for everyday operational questions",
];

export function DemoBenefitsPopup({ force = false }: { force?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!force && sessionStorage.getItem(KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setOpen(true), 2500);
    return () => window.clearTimeout(t);
  }, [force]);

  function dismiss() {
    setOpen(false);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={dismiss}
      />
      <div
        role="dialog"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="border-b border-slate-100 bg-slate-50 px-1 pt-1">
          <img
            src={DASH}
            alt="Unity ERP dashboard preview with revenue and inventory"
            className="h-auto w-full rounded-t-xl object-cover object-top"
            width={800}
            height={450}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="relative p-5">
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-3 top-3 rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-indigo-600">
            Demo access
          </p>
          <h2 className="mt-1 pr-8 text-lg font-bold text-slate-950">
            What you get with Unity ERP
          </h2>
          <ul className="mt-3 space-y-2">
            {benefits.map((b) => (
              <li key={b} className="flex gap-2 text-sm text-slate-600">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://demo.unity-software.online"
            className="mt-5 flex h-11 w-full items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Open demo workspace
          </a>
          <a
            href="https://wa.me/254778903044"
            className="mt-2 flex h-10 w-full items-center justify-center text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            WhatsApp sales · +254 778 903 044
          </a>
        </div>
      </div>
    </div>
  );
}
