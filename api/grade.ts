import { supabase } from "@/lib/supabase";
import { Grade } from "@/types/database";

export async function fetchGrades(): Promise<Grade[]> {
  "use server";

  const { data, error } = await supabase.from("grade").select("*");

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}
