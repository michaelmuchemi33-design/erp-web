import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function LoginPageShell() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Sign in | Unity ERP";
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || !password) {
      setError("Enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Client workspaces live on subdomain app — send them to demo or ERP host
      window.location.href =
        "https://demo.unity-software.online/?email=" +
        encodeURIComponent(email.trim().toLowerCase());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not continue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f0ff] p-6 font-sans">
      <div className="grid w-full max-w-[920px] overflow-hidden rounded-[28px] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)] md:grid-cols-2 md:min-h-[560px]">
        <aside className="relative flex flex-col justify-between bg-gradient-to-br from-indigo-600 via-violet-600 to-violet-300 p-8 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xl font-bold">
            *
          </div>
          <div>
            <p className="text-sm text-white/90">You can easily</p>
            <h2 className="mt-2 max-w-[16ch] text-3xl font-bold leading-tight tracking-[-0.02em]">
              Get access your personal hub for clarity and productivity
            </h2>
            <p className="mt-3 max-w-[28ch] text-sm text-white/85">
              Unity ERP — inventory, CRM, finance and operations in one cloud system.
            </p>
          </div>
        </aside>

        <section className="flex flex-col justify-center px-8 py-10 md:px-10">
          <div className="text-2xl font-bold text-indigo-600">*</div>
          <h1 className="mt-1 text-3xl font-bold tracking-[-0.02em] text-slate-950">
            Create an account
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Access your tasks, stock, sales and projects anytime — keep everything flowing
            in one place.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {error && (
              <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
            )}
            <label className="block text-xs font-semibold text-slate-600">
              Your email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </label>
            <label className="block text-xs font-semibold text-slate-600">
              Password
              <div className="relative mt-1.5">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-3 pr-14 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500"
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white transition hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Started"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Prefer the guided demo?{" "}
            <a href="/#pricing" className="font-semibold text-indigo-600">
              Get the Demo
            </a>
            {" · "}
            <a
              href="https://demo.unity-software.online"
              className="font-semibold text-indigo-600"
            >
              Open demo
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
