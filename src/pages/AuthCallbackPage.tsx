import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { redirectAfterAuth, DEMO_URL } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export function AuthCallbackShell() {
  const [msg, setMsg] = useState("Signing you in…");

  useEffect(() => {
    document.title = "Signing in | Unity ERP";
    let cancelled = false;

    (async () => {
      try {
        // Handle both PKCE code and hash tokens from Supabase
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else {
          // Hash fragment session is auto-parsed by supabase-js on getSession
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          if (!data.session) {
            // Give client a moment to pick up hash
            await new Promise((r) => setTimeout(r, 400));
            const again = await supabase.auth.getSession();
            if (!again.data.session) {
              throw new Error("No session returned from Google. Try again.");
            }
          }
        }
        if (cancelled) return;
        setMsg("Finding your workspace…");
        await redirectAfterAuth();
      } catch (e: unknown) {
        if (cancelled) return;
        const text = e instanceof Error ? e.message : "Sign-in failed";
        setMsg(text);
        window.setTimeout(() => {
          window.location.href = `/login?error=${encodeURIComponent(text)}`;
        }, 2200);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f3f0ff] px-6 font-sans">
      <div className="flex max-w-sm flex-col items-center rounded-3xl bg-white px-10 py-12 shadow-lg shadow-slate-900/10">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <p className="mt-4 text-center text-sm font-medium text-slate-700">{msg}</p>
        <p className="mt-2 text-center text-xs text-slate-400">
          New accounts open the demo. Paid workspaces open your company subdomain.
        </p>
        <a href={DEMO_URL} className="mt-6 text-xs font-semibold text-indigo-600">
          Open demo manually →
        </a>
      </div>
    </div>
  );
}
