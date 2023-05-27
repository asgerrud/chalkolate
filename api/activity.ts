import { supabase } from "@/lib/supabase";
import { Activity } from "@/types/database";

export async function fetchActivities(): Promise<Activity[]> {
  "use server";

  const { data, error } = await supabase.from("activities").select("*").order("activity_date", { ascending: false });

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}
