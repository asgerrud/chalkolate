import { supabase } from "@/lib/supabase";
import { Challenge, CreateChallenge } from "@/types/database";
import { PostgrestError } from "@supabase/supabase-js";

export async function getUserChallenges(userId: string): Promise<Challenge[]> {
  "use server";

  const { data, error } = await supabase
    .from("challenge")
    .select("*")
    .eq("user_id", userId)
    .order("end_date", { ascending: true });

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
}

export async function createChallenge(formData: CreateChallenge): Promise<{ data: Challenge; error: PostgrestError }> {
  "use server";

  const { data, error } = await supabase
    .from("challenge")
    .insert<CreateChallenge>(formData)
    .select()
    .single<Challenge>();
  return { data, error };
}
