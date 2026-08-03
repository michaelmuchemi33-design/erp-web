import { useEffect } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Check, ArrowRight } from "lucide-react";

export function PaymentCallbackShell() {
  useEffect(() => {
    document.title = "Payment received | Unity ERP";
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header />
      <main className="mx-auto max-w-lg px-6 py-28 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Check className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">Thank you</h1>
        <p className="mt-3 text-slate-600">
          Your payment callback was received. If you paid successfully, our team will
          activate Unity ERP and email you shortly.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Questions? erpintergration@gmail.com · +254 793 832 286
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Back to home <ArrowRight className="h-4 w-4" />
        </a>
      </main>
      <SiteFooter />
    </div>
  );
}
