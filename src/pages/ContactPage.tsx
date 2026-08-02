import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SignupWizard } from "@/components/SignupWizard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  Check,
  MessageSquare,
  Clock,
  Building2,
} from "lucide-react";

export function ContactPageContent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "General inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email.includes("@") || !form.message.trim()) return;
    setLoading(true);
    setError("");
    try {
      const { error: dbError } = await supabase.from("contact_messages").insert({
        name: form.name.trim() || null,
        email: form.email.trim().toLowerCase(),
        message: [
          form.phone ? `Phone: ${form.phone}` : null,
          form.company ? `Company: ${form.company}` : null,
          `Subject: ${form.subject}`,
          "",
          form.message.trim(),
        ]
          .filter(Boolean)
          .join("\n"),
        created_at: new Date().toISOString(),
      });
      if (dbError) throw dbError;
      setDone(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "General inquiry",
        message: "",
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not send. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-white pt-28 pb-12 md:pt-32 md:pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50/80 px-4 py-1.5 text-xs font-semibold text-amber-800"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Contact us
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl"
          >
            We are here to help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-600"
          >
            Sales, support, or partnership — send a message and our team will reply within one business day.
          </motion.p>
        </div>
      </section>

      <section className="bg-slate-50/50 pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Info cards */}
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                title: "Email",
                body: "billing@knighterp.com",
                href: "mailto:billing@knighterp.com",
              },
              {
                icon: Phone,
                title: "Phone",
                body: "+1 (800) 555-0199",
                href: "tel:+18005550199",
              },
              {
                icon: MapPin,
                title: "Office",
                body: "1200 Tech Boulevard, Suite 400\nAustin, TX 78701",
              },
              {
                icon: Clock,
                title: "Hours",
                body: "Mon–Fri · 8:00 – 18:00 EAT",
              },
            ].map(({ icon: Icon, title, body, href }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{title}</p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-1 whitespace-pre-line text-sm text-slate-600 hover:text-amber-700"
                    >
                      {body}
                    </a>
                  ) : (
                    <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{body}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-slate-100 bg-slate-950 p-6 text-white">
              <div className="mb-2 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-amber-400" />
                <p className="font-bold">Prefer a live demo?</p>
              </div>
              <p className="text-sm text-slate-300">
                Book a walkthrough of Knight ERP tailored to your industry.
              </p>
              <a
                href="/"
                className="mt-4 inline-flex text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                Start free trial →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
            {done ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-950">Message sent</h3>
                <p className="mt-2 max-w-sm text-slate-600">
                  Thank you. We will get back to you within one business day.
                </p>
                <Button
                  onClick={() => setDone(false)}
                  className="mt-6 rounded-full bg-slate-950 px-6 text-white"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                      Name
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none ring-amber-500/20 focus:ring-2"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none ring-amber-500/20 focus:ring-2"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none ring-amber-500/20 focus:ring-2"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                      Company
                    </label>
                    <input
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none ring-amber-500/20 focus:ring-2"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none ring-amber-500/20 focus:ring-2"
                  >
                    <option>General inquiry</option>
                    <option>Sales & pricing</option>
                    <option>Technical support</option>
                    <option>Partnership</option>
                    <option>Demo request</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-500">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-amber-500/20 focus:ring-2"
                    placeholder="How can we help?"
                  />
                </div>
                {error && <p className="text-sm text-rose-600">{error}</p>}
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full gap-2 rounded-full bg-slate-950 text-base font-semibold text-white"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactPageShell() {
  const [signupOpen, setSignupOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950">
      <Header onOpenSignup={() => setSignupOpen(true)} />
      <main>
        <ContactPageContent />
      </main>
      <SiteFooter />
      <SignupWizard open={signupOpen} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
