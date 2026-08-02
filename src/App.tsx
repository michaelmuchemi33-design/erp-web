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
import { ContactPageShell } from "@/pages/ContactPage";
import { ResourcePageShell } from "@/pages/ResourcePage";
import { pagesBySlug } from "@/content/resourcePages";

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

function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

export default function App() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [path, setPath] = useState(() =>
    typeof window !== "undefined" ? normalizePath(window.location.pathname) : "/"
  );

  useEffect(() => {
    const onNav = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onNav);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (href.startsWith("#")) return;
      if (a.target === "_blank") return;
      e.preventDefault();
      const next = href.split("?")[0].split("#")[0] || "/";
      window.history.pushState({}, "", next);
      setPath(normalizePath(next));
      window.scrollTo(0, 0);
    };
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onNav);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const isAbout = path === "/about";
  const isContact = path === "/contact";
  const resourceSlug = path.startsWith("/") ? path.slice(1) : path;
  const resourcePage = pagesBySlug[resourceSlug];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950 selection:bg-emerald-100 selection:text-emerald-900">
      {isAbout ? (
        <AboutPageShell />
      ) : isContact ? (
        <ContactPageShell />
      ) : resourcePage ? (
        <ResourcePageShell page={resourcePage} />
      ) : (
        <HomePage onOpenSignup={() => setSignupOpen(true)} />
      )}
      {!isAbout && !isContact && !resourcePage && (
        <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
      )}
    </div>
  );
}
