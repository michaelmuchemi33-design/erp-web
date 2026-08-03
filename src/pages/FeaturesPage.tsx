import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { Features } from "@/components/Features";
import { BottomCTA } from "@/components/BottomCTA";
import { PageBanner } from "@/components/PageBanner";

export function FeaturesPageShell() {
  const [signupOpen, setSignupOpen] = useState(false);
  useEffect(() => {
    document.title = "Features | Unity ERP — CRM, Inventory, Finance & AI";
    const d = document.querySelector('meta[name="description"]');
    if (d)
      d.setAttribute(
        "content",
        "Explore Unity ERP features: CRM, inventory, finance, manufacturing, multi-branch retail and AI assistant — all in one platform."
      );
  }, []);
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main>
        <div className="pt-16">
          <PageBanner
            title="Features"
            subtitle="CRM, inventory, finance and AI — everything in one system."
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Product</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Features
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Everything in one system — CRM, stock, finance and AI — so your team stops switching tools.
          </p>
        </div>
        <Features />
        <BottomCTA onOpenSignup={() => setSignupOpen(true)} />
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
