import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  "https://otuhzmexmljmdmvetfym.supabase.co";

const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ||
  "sb_publishable_TeZ72fuK0pP9UqzD9T9K-Q_cEmPRudZ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
