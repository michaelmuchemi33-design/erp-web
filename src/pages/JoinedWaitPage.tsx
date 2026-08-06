import { useEffect } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Check, Phone, MessageCircle, Mail, Inbox } from "lucide-react";
import { DemoBenefitsPopup } from "@/components/DemoBenefitsPopup";

const DASHBOARD =
  "https://www.unity-software.online/erp-dashboard.jpg";

export function JoinedWaitShell() {
  useEffect(() => {
    document.title = "Check your email — Unity ERP";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header />
      <DemoBenefitsPopup force />
      <main className="mx-auto max-w-2xl px-6 py-28">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Check your email now
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            We have sent a welcome email with the Unity ERP dashboard preview and next
            steps to the address you entered.{" "}
            <strong className="text-slate-900">Open your inbox now</strong> — also check
            spam or promotions if you do not see it within a few minutes.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-lg shadow-slate-900/5">
          <img
            src={DASHBOARD}
            alt="Unity ERP dashboard preview — revenue, orders, inventory and CRM"
            className="w-full object-cover object-top"
            width={1200}
            height={750}
          />
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          Preview of the Unity ERP dashboard you will use after activation
        </p>

        <div className="mt-8 space-y-3 rounded-2xl border border-amber-100 bg-amber-50 p-6 text-left text-sm text-slate-800">
          <p className="flex items-center gap-2 font-semibold text-slate-900">
            <Inbox className="h-4 w-4 text-amber-600" />
            What to do now
          </p>
          <p>1. Open the inbox for the email address you used on the form</p>
          <p>2. Read the Unity ERP welcome email (check spam / promotions too)</p>
          <p>3. Sales will call or WhatsApp you to activate trial access</p>
          <p>4. Log in when you receive workspace instructions</p>
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

        <a
          href="/"
          className="mt-10 block text-center text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          ← Back to home
        </a>
      </main>
      <SiteFooter />
    </div>
  );
}
