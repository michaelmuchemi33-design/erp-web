import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { IndustryGrid } from "@/components/IndustryGrid";
import { BottomCTA } from "@/components/BottomCTA";

export function IndustriesPageShell() {
  const [signupOpen, setSignupOpen] = useState(false);
  useEffect(() => {
    document.title = "Industries | Unity ERP for Manufacturing, Retail, Healthcare & More";
    const d = document.querySelector('meta[name="description"]');
    if (d)
      d.setAttribute(
        "content",
        "Unity ERP industry solutions for manufacturing, construction, hospital, retail POS, education, agriculture, hospitality, logistics and finance."
      );
  }, []);
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main className="pt-8 md:pt-10">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-2">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Solutions</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Industries
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Click any industry to see how Unity ERP fits — then request a call back tagged to your sector.
          </p>
        </div>
        <IndustryGrid />
        <BottomCTA onOpenSignup={() => setSignupOpen(true)} />
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
