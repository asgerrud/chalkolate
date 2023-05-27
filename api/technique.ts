import { supabase } from "@/lib/supabase";
import { Technique } from "@/types/database";

export async function fetchTechniques(): Promise<Technique[]> {
  "use server";

  const { data, error } = await supabase.from("technique").select("*");

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}
