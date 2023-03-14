import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

export const supabase = createClient<Database>(
  <string>process.env.NEXT_PUBLIC_SUPABASE_URL,
  <string>process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const database = {
  fetchLocations: async () => {
    let { data: Locations, error } = await supabase
      .from("locations")
      .select("*");

    if (error) {
      console.log(error);
    }

    return Locations ?? [];
  },
};
