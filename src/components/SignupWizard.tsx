import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Mail,
  X,
  Loader2,
} from "lucide-react";
import { trackLead } from "@/lib/supabase";
import { signInWithGoogle } from "@/lib/auth";

const industries = [
  "Manufacturing",
  "Construction",
  "Hospital / Healthcare",
  "Retail & POS",
  "Education",
  "Agriculture",
  "Hospitality",
  "Logistics",
  "Finance & Accounting",
  "Other",
];

type Answers = {
  industry: string;
  email: string;
  name: string;
  phone: string;
  company: string;
};

const initial: Answers = {
  industry: "",
  email: "",
  name: "",
  phone: "",
  company: "",
};

export function SignupWizard({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  /** demo = low friction (industry + email). paid = company details */
  const [mode, setMode] = useState<"demo" | "paid">("demo");

  useEffect(() => {
    if (!open) return;
    try {
      const m = sessionStorage.getItem("unity_signup_mode");
      if (m === "paid" || m === "free") setMode(m === "paid" ? "paid" : "demo");
      else setMode("demo");
    } catch {
      setMode("demo");
    }
    setStep(0);
    setDone(false);
    setError("");
  }, [open]);

  const totalSteps = mode === "demo" ? 2 : 3;

  const canNext =
    (step === 0 && !!answers.industry) ||
    (mode === "demo" &&
      step === 1 &&
      answers.email.includes("@") &&
      answers.email.includes(".")) ||
    (mode === "paid" &&
      step === 1 &&
      answers.company.trim().length > 1 &&
      answers.name.trim().length > 1) ||
    (mode === "paid" &&
      step === 2 &&
      answers.email.includes("@") &&
      answers.email.includes("."));

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const payload = {
        name: answers.name.trim() || answers.email.split("@")[0],
        email: answers.email.trim().toLowerCase(),
        phone: answers.phone.trim() || null,
        industry: answers.industry,
        company_size: answers.company.trim() || null,
        primary_need: mode === "demo" ? "demo_access" : "paid_signup",
        source: mode === "demo" ? "get_the_demo" : "signup_paid",
      };

      const leadRes = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!leadRes.ok) {
        await trackLead(payload as any);
      } else {
        const j = await leadRes.json().catch(() => ({}));
        if (!(j as { emailSent?: boolean }).emailSent) {
          console.warn("emailSent=false — check Resend on Vercel");
        }
      }

      setDone(true);
      try {
        sessionStorage.removeItem("unity_signup_mode");
      } catch {}
      window.setTimeout(() => {
        window.history.pushState({}, "", "/joined");
        window.dispatchEvent(new PopStateEvent("popstate"));
      }, 1600);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(0);
    setAnswers(initial);
    setDone(false);
    setError("");
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={reset}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl"
      >
        <button
          onClick={reset}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Check className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-950">Check your email now</h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              We sent your demo access link and next steps to
            </p>
            <p className="mt-2 break-all text-base font-semibold text-emerald-700">
              {answers.email}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Industry: <strong className="text-slate-800">{answers.industry}</strong>
              <br />
              Open the inbox (and spam) for the link to{" "}
              <span className="font-medium text-slate-800">demo.unity-software.online</span>
            </p>
            <Button onClick={reset} className="mt-8 h-11 rounded-full bg-slate-950 px-8 text-white">
              Close
            </Button>
          </div>
        ) : (
          <div className="p-8 md:p-10">
            <div className="mb-8 flex items-center gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-emerald-500" : "bg-slate-100"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="industry"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                >
                  <h3 className="text-xl font-bold text-slate-950">
                    What industry are you in?
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    We tailor the demo data to your sector.
                  </p>
                  <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {industries.map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => setAnswers((a) => ({ ...a, industry: ind }))}
                        className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${
                          answers.industry === ind
                            ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {mode === "paid" && step === 1 && (
                <motion.div
                  key="company"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                >
                  <h3 className="text-xl font-bold text-slate-950">Company details</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    For a paid workspace we need your company and contact name.
                  </p>
                  <label className="mt-5 block text-xs font-semibold text-slate-600">
                    Company name
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                      value={answers.company}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, company: e.target.value }))
                      }
                      placeholder="Acme Traders Ltd"
                    />
                  </label>
                  <label className="mt-3 block text-xs font-semibold text-slate-600">
                    Your name
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                      value={answers.name}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, name: e.target.value }))
                      }
                      placeholder="Jane Wanjiku"
                    />
                  </label>
                  <label className="mt-3 block text-xs font-semibold text-slate-600">
                    Phone (optional)
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                      value={answers.phone}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, phone: e.target.value }))
                      }
                      placeholder="+254…"
                    />
                  </label>
                </motion.div>
              )}

              {((mode === "demo" && step === 1) || (mode === "paid" && step === 2)) && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                >
                  <h3 className="text-xl font-bold text-slate-950">
                    {mode === "demo" ? "Get the demo in your inbox" : "Work email"}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {mode === "demo"
                      ? "Enter your email — we send the demo link straight to you. No long form."
                      : "We will send workspace instructions to this address."}
                  </p>
                  <label className="mt-5 block text-xs font-semibold text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> Email
                    </span>
                    <input
                      type="email"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                      value={answers.email}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, email: e.target.value }))
                      }
                      placeholder="you@company.com"
                      required
                    />
                  </label>
                  {mode === "demo" && (
                    <p className="mt-3 text-xs text-slate-500">
                      Selected industry:{" "}
                      <strong className="text-slate-800">{answers.industry}</strong>
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        sessionStorage.setItem("unity_demo_industry", answers.industry);
                        await signInWithGoogle();
                      } catch (e) {
                        setError(e instanceof Error ? e.message : "Google sign-in failed");
                      }
                    }}
                    className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-200 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Continue with Google
                  </button>
                  <p className="mt-2 text-center text-[11px] text-slate-400">
                    Google opens sign-in on this site, then the industry demo link is in your account flow.
                  </p>

                </motion.div>
              )}
            </AnimatePresence>

            {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}

            <div className="mt-8 flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="ghost"
                disabled={step === 0 || loading}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="h-11 px-4"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              {step < totalSteps - 1 ? (
                <Button
                  type="button"
                  disabled={!canNext}
                  onClick={() => setStep((s) => s + 1)}
                  className="h-11 rounded-full bg-slate-950 px-6 text-white"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  disabled={!canNext || loading}
                  onClick={submit}
                  className="h-11 rounded-full bg-emerald-600 px-6 text-white hover:bg-emerald-500"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : mode === "demo" ? (
                    <>Get the Demo <ArrowRight className="h-4 w-4" /></>
                  ) : (
                    <>Create account <ArrowRight className="h-4 w-4" /></>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
