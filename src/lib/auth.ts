import { supabase } from "@/lib/supabase";

export const DEMO_URL = "https://demo.unity-software.online";
export const SITE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://www.unity-software.online";

/**
 * After login: paid clients → https://{slug}.unity-software.online
 * everyone else → demo
 *
 * Looks up public.workspace_members or public.tenants by user email.
 * Table shapes supported (any one that exists):
 *   workspace_members(email, slug, status)
 *   tenants(slug, owner_email, status, paid_until)
 *   profiles(email, tenant_slug, plan)
 */
export async function resolveWorkspaceUrl(email: string): Promise<string> {
  const e = email.trim().toLowerCase();
  if (!e) return DEMO_URL;

  try {
    const { data: member } = await supabase
      .from("workspace_members")
      .select("slug, status")
      .eq("email", e)
      .maybeSingle();
    if (member?.slug && member.status !== "suspended") {
      return `https://${member.slug}.unity-software.online`;
    }
  } catch {
    /* table may not exist yet */
  }

  try {
    const { data: tenant } = await supabase
      .from("tenants")
      .select("slug, status, paid_until")
      .eq("owner_email", e)
      .maybeSingle();
    if (tenant?.slug && tenant.status === "active") {
      if (!tenant.paid_until || new Date(tenant.paid_until) > new Date()) {
        return `https://${tenant.slug}.unity-software.online`;
      }
    }
  } catch {
    /* optional */
  }

  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("tenant_slug, plan")
      .eq("email", e)
      .maybeSingle();
    if (profile?.tenant_slug && profile.plan && profile.plan !== "demo") {
      return `https://${profile.tenant_slug}.unity-software.online`;
    }
  } catch {
    /* optional */
  }

  return DEMO_URL;
}

export async function signInWithGoogle() {
  const redirectTo = `${SITE_URL}/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      queryParams: {
        access_type: "offline",
        prompt: "select_account",
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUpWithPassword(
  email: string,
  password: string,
  fullName?: string
) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: { full_name: fullName || "" },
      emailRedirectTo: `${SITE_URL}/auth/callback`,
    },
  });
  if (error) throw error;
  return data;
}

/** Call after session exists — redirect demo vs paid subdomain */
export async function redirectAfterAuth() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user?.email) {
    window.location.href = "/login?error=no_session";
    return;
  }
  const email = session.user.email;
  // Track lead lightly
  try {
    await supabase.from("leads").insert({
      email,
      name: (session.user.user_metadata?.full_name as string) || null,
      source: "google_or_email_login",
      primary_need: "workspace_access",
      status: "new",
    });
  } catch {
    /* ignore */
  }
  const url = await resolveWorkspaceUrl(email);
  window.location.href = url;
}
