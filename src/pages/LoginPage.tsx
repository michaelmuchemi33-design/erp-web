import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { supabase } from "@/lib/supabase";
import { Loader2, LogIn, Check } from "lucide-react";

export function LoginPageShell() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "magic">("magic");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Login | Unity ERP";
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    setError("");
    setMessage("");
    try {
      if (mode === "magic") {
        const { error: err } = await supabase.auth.signInWithOtp({
          email: email.trim().toLowerCase(),
          options: {
            emailRedirectTo: "https://www.unity-software.online/joined",
          },
        });
        if (err) throw err;
        setMessage(
          "Check your email for a login link. If magic link is not enabled in Supabase Auth yet, contact support to activate your workspace."
        );
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });
        if (err) throw err;
        window.location.href = "/joined";
      }
      // Track login interest
      await supabase.from("leads").insert({
        email: email.trim().toLowerCase(),
        source: "login_page",
        primary_need: "ERP login / access request",
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Ensure Supabase Auth is enabled or request access via sales."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <Header />
      <main className="mx-auto flex max-w-md flex-col px-6 py-28">
        <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 shadow-sm">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <LogIn className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Log in to Unity ERP</h1>
          <p className="mt-2 text-sm text-slate-600">
            Customers with an active workspace can sign in. New here?{" "}
            <a href="/pricing" className="font-semibold text-emerald-700 underline">
              Start free
            </a>{" "}
            or wait for your sales activation call.
          </p>

          <div className="mt-6 flex gap-2 rounded-full bg-white p-1 ring-1 ring-slate-200">
            <button
              type="button"
              onClick={() => setMode("magic")}
              className={`flex-1 rounded-full py-2 text-xs font-semibold ${
                mode === "magic" ? "bg-slate-950 text-white" : "text-slate-600"
              }`}
            >
              Email link
            </button>
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full py-2 text-xs font-semibold ${
                mode === "login" ? "bg-slate-950 text-white" : "text-slate-600"
              }`}
            >
              Password
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <input
              type="email"
              required
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            {mode === "login" && (
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            )}
            {error && <p className="text-xs text-rose-600">{error}</p>}
            {message && (
              <p className="flex items-start gap-2 text-xs text-emerald-800">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              {mode === "magic" ? "Send login link" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Need help? WhatsApp{" "}
            <a href="https://wa.me/254778903044" className="font-medium text-slate-800 underline">
              +254 778 903 044
            </a>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
