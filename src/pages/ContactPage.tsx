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
  MessageCircle,
  Send,
  Loader2,
  Check,
  ArrowUpRight,
  Clock,
} from "lucide-react";

const EMAIL = "erpintergration@gmail.com";
const WHATSAPP = "+254793832286";
const CALL = "+254793832286";
const WHATSAPP_LINK = `https://wa.me/254793832286`;
const CALL_LINK = `tel:+254793832286`;
const MAIL_LINK = `mailto:${EMAIL}`;

export function ContactPageContent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
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
      {/* Hero */}
      <section className="bg-white pt-28 pb-6 md:pt-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
          >
            Get in touch
          </motion.div>

          <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 leading-relaxed lg:text-right"
            >
              Tell us about your business and we will respond within 24 hours —
              sales, support, or a live demo.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Form + side panel */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:items-stretch">
            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-6 md:p-8"
            >
              {done ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">Message sent</h3>
                  <p className="mt-2 max-w-sm text-slate-600">
                    Thanks — we will get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setDone(false)}
                    className="mt-6 rounded-full bg-slate-950 px-6 text-white"
                  >
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Name
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Your full name"
                        className="w-full rounded-2xl border-0 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900/10"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@company.com"
                        className="w-full rounded-2xl border-0 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900/10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+254 7XX XXX XXX"
                        className="w-full rounded-2xl border-0 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900/10"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Topic
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                        className="w-full rounded-2xl border-0 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-slate-900/10"
                      >
                        <option>General inquiry</option>
                        <option>Sales & pricing</option>
                        <option>Technical support</option>
                        <option>Demo request</option>
                        <option>Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Anything else we should know?"
                      className="w-full resize-none rounded-2xl border-0 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>

                  {error && <p className="text-sm text-rose-600">{error}</p>}

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-slate-950 px-7 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : null}
                      Send Message
                    </button>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-slate-800"
                      title="WhatsApp"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Side visual / CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="relative overflow-hidden rounded-[28px] bg-slate-950 p-8 text-white min-h-[320px] flex flex-col justify-between"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 left-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                  Unity ERP
                </span>
                <h2 className="mt-6 text-2xl font-bold leading-snug md:text-3xl">
                  Ready to run your whole business in one place?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Start a free 2-month trial or message us on WhatsApp for a quick walkthrough.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium transition hover:bg-white/15"
                >
                  <MessageCircle className="h-5 w-5 text-emerald-400" />
                  WhatsApp · {WHATSAPP}
                </a>
                <a
                  href={CALL_LINK}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium transition hover:bg-white/15"
                >
                  <Phone className="h-5 w-5 text-amber-300" />
                  Call · {CALL}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom contact strip — simple like reference */}
      <section className="border-t border-slate-100 bg-white py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-3">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-700 transition group-hover:bg-emerald-50 group-hover:text-emerald-700">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-950">Call & WhatsApp</h3>
            <p className="mt-2 text-sm text-slate-600">
              WhatsApp: {WHATSAPP}
              <br />
              Call: {CALL}
            </p>
          </a>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-700">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-950">Working Hours</h3>
            <p className="mt-2 text-sm text-slate-600">
              Mon–Fri: 8am – 6pm EAT
              <br />
              Sat–Sun: By appointment
            </p>
          </div>

          <a href={MAIL_LINK} className="group text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-700 transition group-hover:bg-amber-50 group-hover:text-amber-700">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-950">Write to Us</h3>
            <p className="mt-2 text-sm text-slate-600 break-all">
              {EMAIL}
            </p>
          </a>
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
