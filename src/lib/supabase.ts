import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase env vars missing. Forms will show offline mode.");
}

export const supabase = createClient(
  supabaseUrl || "https://otuhzmexmljmdmvetfym.supabase.co",
  supabaseAnonKey || "sb_publishable_TeZ72fuK0pP9UqzD9T9K-Q_cEmPRudZ"
);
