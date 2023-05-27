import { supabase } from "@/lib/supabase";
import { ClimbingZone } from "@/types/database";

export async function fetchClimbingZones(): Promise<ClimbingZone[]> {
  "use server";

  const { data, error } = await supabase.from("climbing_zone").select("*");

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}
