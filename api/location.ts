import { supabase } from "@/lib/supabase";
import { ClimbingLocation } from "@/types/database";

export async function fetchLocations(): Promise<ClimbingLocation[]> {
  "use server";

  const { data, error } = await supabase.from("locations").select("*");

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}
