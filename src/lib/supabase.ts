import { createClient } from "@supabase/supabase-js";

/** Public (anon / publishable) client — safe in the browser */
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

/** Demo / trial / industry interest */
export async function trackLead(data: LeadInsert) {
  return supabase.from("leads").insert({
    ...data,
    email: data.email.trim().toLowerCase(),
    status: data.status || "new",
    created_at: new Date().toISOString(),
  });
}

/** Contact form */
export async function trackContact(data: ContactInsert) {
  return supabase.from("contact_messages").insert({
    ...data,
    email: data.email.trim().toLowerCase(),
    status: data.status || "new",
    created_at: new Date().toISOString(),
  });
}

/** Career applications */
export async function trackApplication(data: ApplicationInsert) {
  return supabase.from("applications").insert({
    ...data,
    email: data.email.trim().toLowerCase(),
    status: data.status || "new",
    created_at: new Date().toISOString(),
  });
}
