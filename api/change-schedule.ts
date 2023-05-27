import { supabase } from "@/lib/supabase";
import { ChangeSchedule } from "@/types/database";

export async function fetchChangeSchedule(climbingZone: string): Promise<Partial<ChangeSchedule>> {
  const { data, error } = await supabase
    .from("change_schedule")
    .select("schedule_start_date, change_interval_weeks")
    .eq("climbing_zone", climbingZone)
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}
