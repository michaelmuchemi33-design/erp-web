import { useEffect } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Check, Phone, MessageCircle, Mail } from "lucide-react";

export function JoinedWaitShell() {
  useEffect(() => {
    document.title = "You're in — Unity ERP | Sales will call you";
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header />
      <main className="mx-auto max-w-lg px-6 py-28 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          You have joined Unity ERP
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Your free / trial request is in. A sales specialist will call or message you
          shortly to activate limited free access or your full plan.
        </p>
        <div className="mt-8 space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left text-sm text-slate-700">
          <p className="font-semibold text-slate-900">What happens next</p>
          <p>1. We review your signup details</p>
          <p>2. Sales contacts you (call or WhatsApp)</p>
          <p>3. You receive access instructions for Unity ERP</p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="https://wa.me/254778903044"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp +254 778 903 044
          </a>
          <a
            href="tel:+254793832286"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            <Phone className="h-4 w-4" />
            Call +254 793 832 286
          </a>
          <a
            href="mailto:erpintergration@gmail.com"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            <Mail className="h-4 w-4" />
            Email us
          </a>
        </div>
        <a href="/" className="mt-10 inline-block text-sm font-medium text-slate-500 hover:text-slate-900">
          ← Back to home
        </a>
      </main>
      <SiteFooter />
    </div>
  );
}
