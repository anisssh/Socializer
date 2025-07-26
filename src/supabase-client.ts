import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://oaclrpbuvgwdpfrnybtg.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
console.log("Supabase Key:", supabaseAnonKey);

export const supabase = createClient(supabaseURL, supabaseAnonKey)
