import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import { AIAssistantChat } from "@/components/AIAssistantChat";
import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const float = {
  y: [0, -10, 0],
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
};

/** SEO-optimised rotating lines under the main H1 */
const rotatingLines = [
  {
    lead: "Cloud ERP & CRM",
    accent: "for Kenyan SMEs",
  },
  {
    lead: "Inventory, POS & Accounting",
    accent: "in One System",
  },
  {
    lead: "Manufacturing & Retail ERP",
    accent: "Built for Africa",
  },
  {
    lead: "AI-Powered Business Software",
    accent: "That Runs Itself",
  },
  {
    lead: "Affordable ERP Alternative",
    accent: "to Odoo & QuickBooks",
  },
  {
    lead: "Free Trial Cloud ERP",
    accent: "— Start in Minutes",
  },
];

const avatars = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/75.jpg",
  "https://randomuser.me/api/portraits/women/90.jpg",
  "https://randomuser.me/api/portraits/men/86.jpg",
];

const reviews = [
  {
    name: "Grace Wanjiku",
    role: "Operations · Nairobi Retail",
    text: "Stock finally matches the till across our Nairobi branches. Unity ERP paid for itself in fewer stockouts.",
    rating: 5,
  },
  {
    name: "James Otieno",
    role: "Director · Kisumu Manufacturing",
    text: "BOM and inventory in one place. We stopped juggling Excel and a separate invoicing app.",
    rating: 5,
  },
  {
    name: "Amina Hassan",
    role: "Finance · Mombasa Wholesale",
    text: "Invoices and stock stay linked. Month-end is calmer and receivables are clearer.",
    rating: 5,
  },
  {
    name: "David Kimani",
    role: "Founder · Thika Distribution",
    text: "The AI assistant answers sales and stock questions we used to chase on WhatsApp.",
    rating: 5,
  },
  {
    name: "Faith Naliaka",
    role: "Admin · Nairobi Clinic",
    text: "Pharmacy supplies are tracked properly. Staff learned it quickly without heavy training.",
    rating: 5,
  },
  {
    name: "Brian Ochieng",
    role: "Owner · Kisii Retail",
    text: "Affordable compared to bigger foreign suites. Support understands Kenyan business hours.",
    rating: 5,
  },
];

function TrustReviews() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div
      className="relative z-20 mt-2"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="flex flex-wrap items-center gap-4">
        {/* Avatar stack */}
        <div className="flex items-center">
          {avatars.map((src, i) => (
            <button
              key={src}
              type="button"
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              className="relative -ml-2 first:ml-0 rounded-full ring-2 ring-white transition hover:z-10 hover:scale-110"
              style={{ zIndex: avatars.length - i }}
              aria-label={`Review from ${reviews[i]?.name || "customer"}`}
            >
              <img
                src={src}
                alt=""
                className="h-9 w-9 rounded-full object-cover"
                width={36}
                height={36}
              />
            </button>
          ))}
          <span className="relative -ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white ring-2 ring-white">
            2K+
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-800">4.9/5</span>
            <span className="text-sm text-slate-500">from early customers</span>
          </div>
          <p className="text-sm font-medium text-slate-600">
            Trusted by 10+ businesses in Kenya alone
          </p>
        </div>
      </div>

      {/* Hover review card */}
      <AnimatePresence>
        {open !== null && reviews[open] && (
          <motion.div
            key={open}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full left-0 z-[100] mb-3 w-[min(100%,300px)] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5"
          >
            <div className="flex items-center gap-3">
              <img
                src={avatars[open]}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold text-slate-950">
                  {reviews[open].name}
                </p>
                <p className="text-xs text-slate-500">{reviews[open].role}</p>
              </div>
            </div>
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: reviews[open].rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              “{reviews[open].text}”
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Hero({ onOpenSignup }: { onOpenSignup?: () => void } = {}) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLineIndex((i) => (i + 1) % rotatingLines.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  const line = rotatingLines[lineIndex];

  return (
    <section className="relative overflow-visible bg-white pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-slate-100/60 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_1.15fr]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col gap-7 overflow-visible"
        >
          <motion.div
            variants={item}
            className="w-fit rounded-full border border-emerald-100 bg-emerald-50/80 px-4 py-2 text-xs font-semibold text-emerald-800 backdrop-blur"
          >
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            All-in-One ERP Software · Free Trial
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem]"
          >
            Run Your Entire Business
            <br />
            With One <span className="text-emerald-600">Intelligent ERP</span>
          </motion.h1>

          {/* Rotating SEO lines */}
          <motion.div variants={item} className="relative h-[3.25rem] overflow-hidden sm:h-14">
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIndex}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-x-0 text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl"
              >
                {line.lead}{" "}
                <span className="text-emerald-600">{line.accent}</span>
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-xl text-lg leading-relaxed text-slate-600"
          >
            One cloud platform for Manufacturing, Construction, Retail, Hospital,
            Education, Agriculture, Hospitality, Logistics, Finance and more —
            with CRM, inventory, accounting and AI in a single system.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <Button
              onClick={onOpenSignup}
              className="group relative overflow-hidden rounded-full bg-slate-950 px-7 py-6 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-slate-900/30"
            >
              Book a Free Demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              className="group rounded-full border-slate-200 bg-white px-7 py-6 text-base font-semibold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50"
            >
              <Play className="mr-2 h-4 w-4 fill-current text-slate-950 transition-transform group-hover:scale-110" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust / reviews under buttons */}
          <motion.div variants={item}>
            <TrustReviews />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-lg lg:max-w-xl">
            <AIAssistantChat />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
