import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IndustryGrid } from "@/components/IndustryGrid";
import { DashboardShowcase } from "@/components/DashboardShowcase";
import { TrustedCompanies } from "@/components/TrustedCompanies";
import { Features } from "@/components/Features";
import { PricingHero } from "@/components/PricingHero";
import { PricingCard } from "@/components/PricingCard";
import { Guarantee } from "@/components/Guarantee";
import { FAQ } from "@/components/FAQ";
import { BottomCTA } from "@/components/BottomCTA";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";

export default function App() {
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950 selection:bg-emerald-100 selection:text-emerald-900">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main>
        <Hero onOpenSignup={() => setSignupOpen(true)} />
        <IndustryGrid />
        <DashboardShowcase />
        <TrustedCompanies />
        <Features />
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
