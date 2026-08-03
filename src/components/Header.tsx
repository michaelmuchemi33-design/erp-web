import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, ChevronDown, ArrowRight, Menu, X, BookOpen, Rocket, Video, Lightbulb, Bot, FileText, Building2, Code2, Webhook, Boxes, FileStack, Newspaper, HelpCircle, Headphones, MessageCircle, Activity, Users, Calculator, BarChart3, TrendingUp, Leaf, ShoppingCart, GraduationCap, Truck, Utensils, Landmark, Home, HardHat, Factory, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { slugFromLabel } from "@/content/resourcePages";

const links = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const resourcesMenu = {
  Learn: {
    icon: BookOpen,
    items: [
      { label: "Documentation", icon: FileText },
      { label: "Getting Started", icon: Rocket },
      { label: "Video Tutorials", icon: Video },
      { label: "Feature Guides", icon: Lightbulb },
      { label: "AI Assistant Guide", icon: Bot },
    ],
  },
  Industries: {
    icon: Building2,
    items: [
      { label: "Manufacturing ERP", icon: Factory },
      { label: "Construction ERP", icon: HardHat },
      { label: "Hospital ERP", icon: Building2 },
      { label: "Retail & POS", icon: ShoppingCart },
      { label: "Education ERP", icon: GraduationCap },
      { label: "Agriculture ERP", icon: Leaf },
      { label: "Hospitality ERP", icon: Utensils },
      { label: "Logistics ERP", icon: Truck },
      { label: "Finance & Accounting", icon: Landmark },
    ],
  },
  Downloads: {
    icon: FileStack,
    items: [
      { label: "Product Brochure", icon: FileText },
      { label: "Company Profile", icon: Building2 },
      { label: "Feature Comparison", icon: BarChart3 },
      { label: "API Documentation", icon: Code2 },
      { label: "Release Notes", icon: Newspaper },
    ],
  },
  Support: {
    icon: HeartHandshake,
    items: [
      { label: "Help Center", icon: HelpCircle },
      { label: "Knowledge Base", icon: BookOpen },
      { label: "Frequently Asked Questions", icon: MessageCircle },
      { label: "Contact Support", icon: Headphones },
      { label: "System Status", icon: Activity },
    ],
  },
  Developers: {
    icon: Code2,
    items: [
      { label: "API Documentation", icon: Code2 },
      { label: "Webhooks", icon: Webhook },
      { label: "Integrations", icon: Boxes },
      { label: "SDKs", icon: FileStack },
      { label: "Changelog", icon: Newspaper },
    ],
  },
  Blog: {
    icon: Newspaper,
    items: [
      { label: "ERP Guides", icon: BookOpen },
      { label: "Business Growth", icon: TrendingUp },
      { label: "AI & Automation", icon: Bot },
      { label: "Inventory Management", icon: Boxes },
      { label: "Accounting Tips", icon: Calculator },
      { label: "Manufacturing Insights", icon: Factory },
      { label: "Product Updates", icon: Rocket },
    ],
  },
};

const megaMenuColumns = [
  ["Learn", "Industries"],
  ["Downloads", "Support"],
  ["Developers", "Blog"],
];

export function Header({ onOpenSignup }: { onOpenSignup?: () => void } = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setResourcesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setResourcesOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5">
          <img
            src="/knight-logo.png"
            alt="Unity ERP"
            className="h-9 w-9 rounded-lg bg-black object-contain p-0.5"
          />
          <span className="text-xl font-bold tracking-tight text-slate-900">Unity ERP</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-950"
            >
              {link.label}
            </a>
          ))}

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setResourcesOpen((v) => !v)}
              className="group flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950"
            >
              Resources
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {resourcesOpen && (
                <>
                  {/* Dim backdrop so menu is never "hidden" behind content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[90] bg-slate-950/20 backdrop-blur-[2px]"
                    onClick={() => setResourcesOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="fixed left-1/2 top-20 z-[100] w-[min(920px,calc(100vw-2rem))] -translate-x-1/2 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_32px_100px_rgba(0,0,0,0.18)] md:p-8"
                  >
                    <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Resources</p>
                        <p className="text-sm text-slate-500">Guides, industries, support and developer docs</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResourcesOpen(false)}
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid max-h-[min(70vh,560px)] grid-cols-2 gap-6 overflow-y-auto pr-1 md:grid-cols-3 md:gap-8">
                      {megaMenuColumns.map((column, colIndex) => (
                        <div key={colIndex} className="space-y-6">
                          {column.map((sectionKey) => {
                            const section = resourcesMenu[sectionKey as keyof typeof resourcesMenu];
                            const SectionIcon = section.icon;
                            return (
                              <div key={sectionKey}>
                                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                                  <SectionIcon className="h-4 w-4 text-amber-500" />
                                  {sectionKey}
                                </div>
                                <ul className="space-y-0.5">
                                  {section.items.map((item) => (
                                    <li key={item.label}>
                                      <a
                                        href={`/${slugFromLabel(sectionKey, item.label)}`}
                                        onClick={() => setResourcesOpen(false)}
                                        className="group flex items-center gap-2.5 rounded-xl px-2 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-amber-50 hover:text-slate-950"
                                      >
                                        {item.icon ? <item.icon className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-amber-500" /> : null}
                                        <span className="relative">
                                          {item.label}
                                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-full" />
                                        </span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950">
            <Globe className="h-5 w-5" />
          </button>
          <Button onClick={onOpenSignup} className="group gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-slate-900/20">
            Book a Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <button
          className="rounded-md p-2 text-slate-700 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              {links.map((link) => (
                <a key={link.label} href={link.href} className="text-base font-medium text-slate-700" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              ))}

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Resources</p>
                {Object.entries(resourcesMenu).map(([section, { items }]) => (
                  <div key={section} className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">{section}</p>
                    {items.map((item) => (
                      <a key={item.label} href="#" className="block pl-2 text-sm text-slate-600">
                        {item.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>

              <Button onClick={() => { setMobileOpen(false); onOpenSignup?.(); }} className="w-full gap-2 rounded-full bg-slate-950 text-white">
                Book a Demo <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}