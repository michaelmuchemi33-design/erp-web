import { useState, useEffect } from "react";
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
import { AboutPageShell } from "@/pages/AboutPage";

function HomePage({ onOpenSignup }: { onOpenSignup: () => void }) {
  return (
    <>
      <Header onOpenSignup={onOpenSignup} />
      <main>
        <Hero onOpenSignup={onOpenSignup} />
        <IndustryGrid />
        <DashboardShowcase />
        <TrustedCompanies />
        <Features />
        <PricingHero />
        <PricingCard onOpenSignup={onOpenSignup} />
        <Guarantee />
        <FAQ />
        <BottomCTA onOpenSignup={onOpenSignup} />
      </main>
      <div id="contact">
        <SiteFooter />
      </div>
    </>
  );
}

export default function App() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [path, setPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const onNav = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onNav);

    // Intercept internal links for SPA navigation
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (href.startsWith("#")) return;
      if (a.target === "_blank") return;
      e.preventDefault();
      window.history.pushState({}, "", href);
      setPath(href.split("?")[0].split("#")[0] || "/");
      window.scrollTo(0, 0);
    };
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onNav);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const isAbout = path === "/about" || path.startsWith("/about/");

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950 selection:bg-emerald-100 selection:text-emerald-900">
      {isAbout ? (
        <AboutPageShell />
      ) : (
        <HomePage onOpenSignup={() => setSignupOpen(true)} />
      )}
      {!isAbout && (
        <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
      )}
    </div>
  );
}
