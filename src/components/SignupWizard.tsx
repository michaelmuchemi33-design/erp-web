import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Building2,
  Users,
  Target,
  Mail,
  X,
  Loader2,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

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

const companySizes = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
];

const needs = [
  "Inventory & warehouse",
  "Accounting & finance",
  "CRM & sales",
  "HR & payroll",
  "Manufacturing / production",
  "Full ERP (everything)",
];

type Answers = {
  industry: string;
  companySize: string;
  need: string;
  email: string;
  name: string;
  phone: string;
};

const initial: Answers = {
  industry: "",
  companySize: "",
  need: "",
  email: "",
  name: "",
  phone: "",
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

  const totalSteps = 4;

  const canNext =
    (step === 0 && answers.industry) ||
    (step === 1 && answers.companySize) ||
    (step === 2 && answers.need) ||
    (step === 3 &&
      answers.email.includes("@") &&
      answers.email.includes(".") &&
      answers.name.trim().length > 1 &&
      answers.phone.replace(/\D/g, "").length >= 9);

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const payload = {
        name: answers.name.trim(),
        email: answers.email.trim().toLowerCase(),
        phone: answers.phone.trim(),
        industry: answers.industry,
        company_size: answers.companySize,
        primary_need: answers.need,
        source: "signup_wizard",
        created_at: new Date().toISOString(),
      };
      const { error: dbError } = await supabase.from("leads").insert(payload);
      if (dbError) throw dbError;

      // Send confirmation email via Edge Function (best-effort)
      try {
        await supabase.functions.invoke("send-demo-email", {
          body: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            industry: payload.industry,
            company_size: payload.company_size,
            primary_need: payload.primary_need,
          },
        });
      } catch (mailErr) {
        console.warn("Demo email function:", mailErr);
      }

      setDone(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
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
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
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
            <h3 className="text-2xl font-bold text-slate-950">You are on the list</h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              We received your request. A confirmation email with your demo access link
              will be sent to <span className="font-semibold text-slate-900">{answers.email}</span> shortly.
            </p>
            <Button
              onClick={reset}
              className="mt-8 h-11 rounded-full bg-slate-950 px-8 text-white"
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="p-8 md:p-10">
            {/* Progress */}
            <div className="mb-8 flex items-center gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-amber-500" : "bg-slate-100"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="s0"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                >
                  <div className="mb-2 flex items-center gap-2 text-amber-600">
                    <Building2 className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Step 1 of 4
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">
                    What industry are you in?
                  </h3>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {industries.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => setAnswers((a) => ({ ...a, industry: ind }))}
                        className={`rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all ${
                          answers.industry === ind
                            ? "border-amber-400 bg-amber-50 text-amber-900"
                            : "border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-200"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                >
                  <div className="mb-2 flex items-center gap-2 text-amber-600">
                    <Users className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Step 2 of 4
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">
                    How large is your company?
                  </h3>
                  <div className="mt-5 space-y-2">
                    {companySizes.map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setAnswers((a) => ({ ...a, companySize: size }))
                        }
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all ${
                          answers.companySize === size
                            ? "border-amber-400 bg-amber-50 text-amber-900"
                            : "border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-200"
                        }`}
                      >
                        {size}
                        {answers.companySize === size && (
                          <Check className="h-4 w-4 text-amber-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                >
                  <div className="mb-2 flex items-center gap-2 text-amber-600">
                    <Target className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Step 3 of 4
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">
                    What do you need most?
                  </h3>
                  <div className="mt-5 space-y-2">
                    {needs.map((n) => (
                      <button
                        key={n}
                        onClick={() => setAnswers((a) => ({ ...a, need: n }))}
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all ${
                          answers.need === n
                            ? "border-amber-400 bg-amber-50 text-amber-900"
                            : "border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-200"
                        }`}
                      >
                        {n}
                        {answers.need === n && (
                          <Check className="h-4 w-4 text-amber-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                >
                  <div className="mb-2 flex items-center gap-2 text-amber-600">
                    <Mail className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Step 4 of 4
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">
                    Where should we send your demo?
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    You will receive a confirmation email with demo access.
                  </p>
                  <div className="mt-5 space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={answers.name}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, name: e.target.value }))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-amber-500/20 focus:ring-2"
                    />
                    <input
                      type="email"
                      placeholder="Work email"
                      value={answers.email}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, email: e.target.value }))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-amber-500/20 focus:ring-2"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number (e.g. +254 7XX XXX XXX)"
                      value={answers.phone}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, phone: e.target.value }))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-amber-500/20 focus:ring-2"
                    />
                  </div>
                  {error && (
                    <p className="mt-3 text-sm text-rose-600">{error}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-slate-600 disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              {step < totalSteps - 1 ? (
                <Button
                  disabled={!canNext}
                  onClick={() => setStep((s) => s + 1)}
                  className="h-11 gap-2 rounded-full bg-slate-950 px-6 text-white disabled:opacity-40"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  disabled={!canNext || loading}
                  onClick={submit}
                  className="h-11 gap-2 rounded-full bg-[#DD268A] px-6 text-white disabled:opacity-40"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  Get demo access
                </Button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
