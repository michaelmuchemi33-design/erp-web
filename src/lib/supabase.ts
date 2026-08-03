import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  "https://otuhzmexmljmdmvetfym.supabase.co";

const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ||
  "sb_publishable_TeZ72fuK0pP9UqzD9T9K-Q_cEmPRudZ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type LeadInsert = {
  name?: string | null;
  email: string;
  phone?: string | null;
  industry?: string | null;
  company_size?: string | null;
  primary_need?: string | null;
  source?: string;
  status?: string;
};

export type ContactInsert = {
  name?: string | null;
  email: string;
  message: string;
  status?: string;
};

export type ApplicationInsert = {
  role: string;
  name: string;
  email: string;
  phone?: string | null;
  portfolio_url?: string | null;
  message?: string | null;
  status?: string;
};

async function postApi(path: string, data: object) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error((j as { error?: string }).error || res.statusText);
  }
  return { error: null };
}

/** Demo / trial / industry — uses /api/lead (service role) so RLS cannot block */
export async function trackLead(data: LeadInsert) {
  try {
    return await postApi("/api/lead", data);
  } catch {
    // Fallback direct (works once RLS policies are fixed)
    return supabase.from("leads").insert({
      ...data,
      email: data.email.trim().toLowerCase(),
      status: data.status || "new",
      created_at: new Date().toISOString(),
    });
  }
}

export async function trackContact(data: ContactInsert) {
  try {
    return await postApi("/api/contact", data);
  } catch {
    return supabase.from("contact_messages").insert({
      ...data,
      email: data.email.trim().toLowerCase(),
      status: data.status || "new",
      created_at: new Date().toISOString(),
    });
  }
}

export async function trackApplication(data: ApplicationInsert) {
  try {
    return await postApi("/api/apply", data);
  } catch {
    return supabase.from("applications").insert({
      ...data,
      email: data.email.trim().toLowerCase(),
      status: data.status || "new",
      created_at: new Date().toISOString(),
    });
  }
}
