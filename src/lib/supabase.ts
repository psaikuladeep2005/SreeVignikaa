import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "")
  .replace(/['"]/g, "")
  .trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")
  .replace(/['"]/g, "")
  .trim();

export const isSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    supabaseUrl !== "" &&
    supabaseUrl !== "https://your-project-id.supabase.co" &&
    supabaseAnonKey !== "" &&
    supabaseAnonKey !== "your-anon-key-here"
  );
};

// Create a single Supabase client for interacting with the database
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
