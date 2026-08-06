import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  signInWithGoogle,
  signInWithPassword,
  signUpWithPassword,
  redirectAfterAuth,
} from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export function LoginPageShell() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    document.title = "Sign in | Unity ERP";
    const params = new URLSearchParams(window.location.search);
    const err = params.get("error");
    if (err) setError(err);

    // Already signed in?
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setInfo("Session found — opening your workspace…");
        redirectAfterAuth().catch(() => {});
      }
    });
  }, []);

  async function onGoogle() {
    setGoogleLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      // Browser redirects to Google
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Google sign-in failed");
      setGoogleLoading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      setError("Enter a valid email and password (min 6 characters).");
      return;
    }
    setLoading(true);
    setError("");
    setInfo("");
    try {
      if (mode === "signup") {
        const { user } = (await signUpWithPassword(email, password)).user
          ? { user: (await signUpWithPassword(email, password)).user }
          : { user: null };
        // avoid double call — fix properly
      }
      if (mode === "signup") {
        const data = await signUpWithPassword(email, password);
        if (data.session) {
          setInfo("Account created — opening workspace…");
          await redirectAfterAuth();
          return;
        }
        setInfo(
          "Check your email to confirm the account, then sign in. Or use Google for instant access."
        );
        setMode("signin");
      } else {
        await signInWithPassword(email, password);
        setInfo("Signed in — opening your workspace…");
        await redirectAfterAuth();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f0ff] p-6 font-sans">
      <div className="grid w-full max-w-[920px] overflow-hidden rounded-[28px] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)] md:min-h-[560px] md:grid-cols-2">
        <aside className="relative flex flex-col justify-between bg-gradient-to-br from-indigo-600 via-violet-600 to-violet-300 p-8 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xl font-bold">
            *
          </div>
          <div>
            <p className="text-sm text-white/90">You can easily</p>
            <h2 className="mt-2 max-w-[16ch] text-3xl font-bold leading-tight tracking-[-0.02em]">
              Get access your personal hub for clarity and productivity
            </h2>
            <p className="mt-3 max-w-[32ch] text-sm text-white/85">
              Sign in on unity-software.online. Demo users open the shared demo;
              paid companies open their own subdomain.
            </p>
          </div>
        </aside>

        <section className="flex flex-col justify-center px-8 py-10 md:px-10">
          <div className="text-2xl font-bold text-indigo-600">*</div>
          <h1 className="mt-1 text-3xl font-bold tracking-[-0.02em] text-slate-950">
            {mode === "signin" ? "Sign in" : "Create an account"}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Access tasks, stock, sales and projects in one place.
          </p>

          <button
            type="button"
            onClick={onGoogle}
            disabled={googleLoading || loading}
            className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or continue with email
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
            )}
            {info && (
              <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{info}</p>
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
                  minLength={6}
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
              disabled={loading || googleLoading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white transition hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : mode === "signin" ? (
                "Get Started"
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="font-semibold text-indigo-600"
                  onClick={() => {
                    setMode("signup");
                    setError("");
                    setInfo("");
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-semibold text-indigo-600"
                  onClick={() => {
                    setMode("signin");
                    setError("");
                    setInfo("");
                  }}
                >
                  Sign in
                </button>
              </>
            )}
            {" · "}
            <a href="https://demo.unity-software.online" className="font-semibold text-indigo-600">
              Open demo
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
