import { useState } from "react";
import { X, Sparkles } from "lucide-react";

export function PromoBanners() {
  const [hideFree, setHideFree] = useState(false);
  const [hideWork, setHideWork] = useState(false);

  if (hideFree && hideWork) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] flex flex-col gap-0 pointer-events-none">
      {!hideWork && (
        <div className="pointer-events-auto flex items-center justify-center gap-3 bg-red-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg">
          <span>
            We are actively onboarding new Unity ERP clients — talk to sales on{" "}
            <a href="https://wa.me/254778903044" className="underline">
              WhatsApp +254 778 903 044
            </a>
          </span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setHideWork(true)}
            className="shrink-0 rounded p-1 hover:bg-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {!hideFree && (
        <div className="pointer-events-auto flex items-center justify-center gap-3 bg-emerald-700 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg">
          <Sparkles className="hidden h-4 w-4 shrink-0 sm:block" />
          <span>
            Free website design for all active Unity ERP users — custom pages for your business included with your plan
          </span>
          <a
            href="/pricing"
            className="shrink-0 rounded-full bg-white/20 px-3 py-1 text-xs font-bold hover:bg-white/30"
          >
            See pricing
          </a>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setHideFree(true)}
            className="shrink-0 rounded p-1 hover:bg-emerald-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
