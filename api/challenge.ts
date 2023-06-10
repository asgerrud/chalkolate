import { supabase } from "@/lib/supabase";
import { Challenge } from "@/types/database";

export async function fetchUserChallenges(userId: string): Promise<Challenge[]> {
  "use server";

  const { data, error } = await supabase
    .from("challenge")
    .select("*")
    .eq("user_id", userId)
    .order("end_date", { ascending: false });

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}
