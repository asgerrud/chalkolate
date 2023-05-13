import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/_supabase";

export const supabase = createClient<Database>(
  <string>process.env.NEXT_PUBLIC_SUPABASE_URL,
  <string>process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
