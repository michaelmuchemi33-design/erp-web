import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Send, Loader2, Check, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function SiteFooter() {
  const [wishEmail, setWishEmail] = useState("");
  const [wishLoading, setWishLoading] = useState(false);
  const [wishDone, setWishDone] = useState(false);
  const [wishError, setWishError] = useState("");

  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactDone, setContactDone] = useState(false);
  const [contactError, setContactError] = useState("");

  async function submitWishlist(e: React.FormEvent) {
    e.preventDefault();
    if (!wishEmail.includes("@")) return;
    setWishLoading(true);
    setWishError("");
    try {
      const { error } = await supabase.from("wishlist").insert({
        email: wishEmail.trim().toLowerCase(),
        source: "footer",
        created_at: new Date().toISOString(),
      });
      if (error) throw error;
      setWishDone(true);
      setWishEmail("");
    } catch (err: unknown) {
      setWishError(err instanceof Error ? err.message : "Could not save. Try again.");
    } finally {
      setWishLoading(false);
    }
  }

  async function submitContact(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.email.includes("@") || !contact.message.trim()) return;
    setContactLoading(true);
    setContactError("");
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: contact.name.trim() || null,
        email: contact.email.trim().toLowerCase(),
        message: contact.message.trim(),
        created_at: new Date().toISOString(),
      });
      if (error) throw error;
      setContactDone(true);
      setContact({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setContactError(err instanceof Error ? err.message : "Could not send. Try again.");
    } finally {
      setContactLoading(false);
    }
  }

  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Brand + links */}
          <div className="grid gap-10 sm:grid-cols-2">
            <div className="space-y-4 sm:col-span-2">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://i.postimg.cc/qBnzqpqk/blck-logo-erp.png"
                  alt="Knight ERP"
                  className="h-9 w-9 rounded-lg object-contain"
                />
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Knight ERP
                </span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-slate-500">
                Enterprise resource planning for manufacturing, retail, healthcare,
                education and more. Built in Kenya for growing businesses.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Product
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li>
                  <a href="#features" className="transition hover:text-slate-950">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#industries" className="transition hover:text-slate-950">
                    Industries
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="transition hover:text-slate-950">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="transition hover:text-slate-950">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li>
                  <a href="mailto:unity-erp-software@protonmail.com" className="transition hover:text-slate-950">
                    unity-erp-software@protonmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+254793832286" className="transition hover:text-slate-950">
                    +254 793 832 286
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/254778903044" target="_blank" rel="noopener noreferrer" className="transition hover:text-slate-950">
                    WhatsApp +254 778 903 044
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Forms */}
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Wishlist */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-slate-900">
                <Mail className="h-5 w-5 text-amber-600" />
                <h4 className="font-bold">Join the wishlist</h4>
              </div>
              <p className="mb-4 text-sm text-slate-500">
                Get early updates and product news. No spam.
              </p>
              {wishDone ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                  <Check className="h-4 w-4" />
                  You are on the list
                </div>
              ) : (
                <form onSubmit={submitWishlist} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={wishEmail}
                    onChange={(e) => setWishEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none ring-amber-500/20 focus:ring-2"
                  />
                  {wishError && (
                    <p className="text-xs text-rose-600">{wishError}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={wishLoading}
                    className="h-10 w-full gap-2 rounded-full bg-slate-950 text-sm text-white"
                  >
                    {wishLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Join wishlist
                  </Button>
                </form>
              )}
            </div>

            {/* Write to us */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-slate-900">
                <MessageSquare className="h-5 w-5 text-amber-600" />
                <h4 className="font-bold">Write to us</h4>
              </div>
              <p className="mb-4 text-sm text-slate-500">
                Questions or custom needs? Send a short message.
              </p>
              {contactDone ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                  <Check className="h-4 w-4" />
                  Message sent — we will reply soon
                </div>
              ) : (
                <form onSubmit={submitContact} className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Name (optional)"
                    value={contact.name}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, name: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-amber-500/20 focus:ring-2"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={contact.email}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, email: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-amber-500/20 focus:ring-2"
                  />
                  <textarea
                    required
                    rows={3}
                    placeholder="Your message"
                    value={contact.message}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, message: e.target.value }))
                    }
                    className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-amber-500/20 focus:ring-2"
                  />
                  {contactError && (
                    <p className="text-xs text-rose-600">{contactError}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={contactLoading}
                    className="h-10 w-full gap-2 rounded-full bg-slate-950 text-sm text-white"
                  >
                    {contactLoading ? (
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
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Knight ERP. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="transition hover:text-slate-950">
              Privacy
            </a>
            <a href="#" className="transition hover:text-slate-950">
              Terms
            </a>
            <a href="#" className="transition hover:text-slate-950">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
