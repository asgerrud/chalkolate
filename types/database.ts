import { Database } from "@/types/supabase";

export type ClimbingLocation = Database["public"]["Tables"]["locations"]["Row"];
export type CreateClimbingLocation =
  Database["public"]["Tables"]["locations"]["Insert"];

export type Activity = Database["public"]["Tables"]["activities"]["Row"];
export type CreateActivity =
  Database["public"]["Tables"]["activities"]["Insert"];
