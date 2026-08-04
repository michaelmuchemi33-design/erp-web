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
import { FeaturesPageShell } from "@/pages/FeaturesPage";
import { IndustriesPageShell } from "@/pages/IndustriesPage";
import { PricingStandaloneShell } from "@/pages/PricingStandalonePage";
import { CareersPageShell } from "@/pages/CareersPage";
import { PaymentCallbackShell } from "@/pages/PaymentCallbackPage";
import { JoinedWaitShell } from "@/pages/JoinedWaitPage";
import { BlogIndexShell } from "@/pages/BlogIndexPage";
import { BlogPostShell } from "@/pages/BlogPostPage";
import { LoginPageShell } from "@/pages/LoginPage";
import { blogBySlug } from "@/content/blogPosts";
import { applyHomeMeta, detectCountryCode, getGeoPack, refineCountryFromIp } from "@/lib/geoMeta";
import { setPageMeta, routeMeta, trimDesc, trimTitle } from "@/lib/pageMeta";
import { PromoBanners } from "@/components/PromoBanners";
import { EmployeeDiscountsShell } from "@/pages/EmployeeDiscountsPage";
import { SeoTopicShell } from "@/pages/SeoTopicPage";
import { seoBySlug } from "@/content/seoPages";
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
    const scrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const onNav = () => {
      setPath(normalizePath(window.location.pathname));
      // next frame so new page is mounted then pin to top
      requestAnimationFrame(() => {
        scrollTop();
        requestAnimationFrame(scrollTop);
      });
    };
    window.addEventListener("popstate", onNav);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("https://wa.me")) return;
      if (href.startsWith("#")) return;
      if (a.target === "_blank") return;
      e.preventDefault();
      const next = href.split("?")[0].split("#")[0] || "/";
      window.history.pushState({}, "", next);
      setPath(normalizePath(next));
      scrollTop();
      requestAnimationFrame(() => {
        scrollTop();
        requestAnimationFrame(scrollTop);
      });
    };
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onNav);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Every route change: force viewport to top (pricing, features, SEO pages, etc.)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [path]);

  const isAbout = path === "/about";
  const isContact = path === "/contact";
  const isFeatures = path === "/features";
  const isIndustries = path === "/industries";
  const isPricing = path === "/pricing";
  const isCareers = path === "/careers";
  const isPaymentCallback = path === "/payment/callback" || path === "/payment/success";
  const isJoined = path === "/joined";
  const isBlogIndex = path === "/blog";
  const isLogin = path === "/login";
  const isEmployeeDiscounts = path === "/employee-discounts" || path === "/downloads/employee-discounts";
  const blogSlug = path.startsWith("/blog/") ? path.slice("/blog/".length) : "";
  const blogPost = blogSlug ? blogBySlug[blogSlug] : undefined;
  const resourceSlug = path.startsWith("/") ? path.slice(1) : path;
  const resourcePage = pagesBySlug[resourceSlug];
  const seoPage = seoBySlug[resourceSlug];

  // Self-canonical + short title/description on every route (SEO audit fix)
  useEffect(() => {
    const base = routeMeta[path];
    if (base) {
      setPageMeta({ title: base.title, description: base.description, path, keywords: base.keywords });
      return;
    }
    if (seoPage) {
      setPageMeta({
        title: trimTitle(seoPage.title),
        description: trimDesc(seoPage.description),
        path: `/${seoPage.slug}`,
        keywords: seoPage.keywords,
      });
      return;
    }
    if (blogPost) {
      setPageMeta({
        title: trimTitle(blogPost.title),
        description: trimDesc(blogPost.description),
        path: `/blog/${blogPost.slug}`,
        keywords: blogPost.keywords,
      });
      return;
    }
    if (resourcePage) {
      setPageMeta({
        title: trimTitle(`${resourcePage.title} | Unity ERP`),
        description: trimDesc(resourcePage.description || resourcePage.title),
        path: `/${resourceSlug}`,
      });
    }
  }, [path, seoPage, blogPost, resourcePage, resourceSlug]);


  return (
    <div className="min-h-screen overflow-x-hidden bg-white pb-24 font-sans text-slate-950 selection:bg-emerald-100 selection:text-emerald-900">
      {isAbout ? (
        <AboutPageShell />
      ) : isContact ? (
        <ContactPageShell />
      ) : isFeatures ? (
        <FeaturesPageShell />
      ) : isIndustries ? (
        <IndustriesPageShell />
      ) : isPricing ? (
        <PricingStandaloneShell />
      ) : isEmployeeDiscounts ? (
        <EmployeeDiscountsShell />
      ) : isCareers ? (
        <CareersPageShell />
      ) : isPaymentCallback ? (
        <PaymentCallbackShell />
      ) : isJoined ? (
        <JoinedWaitShell />
      ) : isLogin ? (
        <LoginPageShell />
      ) : isBlogIndex ? (
        <BlogIndexShell />
      ) : blogPost ? (
        <BlogPostShell post={blogPost} />
      ) : resourcePage ? (
        <ResourcePageShell page={resourcePage} />
      ) : seoPage ? (
        <SeoTopicShell page={seoPage} />
      ) : (
        <HomePage onOpenSignup={() => setSignupOpen(true)} />
      )}
      {!isAbout && !isContact && !isFeatures && !isIndustries && !isPricing && !isCareers && !isPaymentCallback && !isJoined && !isLogin && !isEmployeeDiscounts && !isBlogIndex && !blogPost && !resourcePage && !seoPage && (
        <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
      )}
      <PromoBanners />
    </div>
  );
}
