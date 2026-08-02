import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { PricingHero } from "@/components/PricingHero";
import { PricingCard } from "@/components/PricingCard";
import { Guarantee } from "@/components/Guarantee";
import { FAQ } from "@/components/FAQ";
import { BottomCTA } from "@/components/BottomCTA";

export function PricingStandaloneShell() {
  const [signupOpen, setSignupOpen] = useState(false);
  useEffect(() => {
    document.title = "Pricing | Unity ERP — KES 3,000/month or KES 33,000/year";
    const d = document.querySelector('meta[name="description"]');
    if (d)
      d.setAttribute(
        "content",
        "Unity ERP pricing: KES 3,000 per month or KES 33,000 per year (1 month free). All modules, CRM and AI included."
      );
  }, []);
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main className="pt-16">
        <PricingHero />
        <PricingCard onOpenSignup={() => setSignupOpen(true)} />
        <Guarantee />
        <FAQ />
        <BottomCTA onOpenSignup={() => setSignupOpen(true)} />
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
