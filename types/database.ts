import { Database } from "@/types/supabase";

export type Tables = Database["public"]["Tables"];

export type TABLE_NAME = keyof Tables;

export type Row<T extends keyof Tables> = Database["public"]["Tables"][T]["Row"];
export type Insert<T extends keyof Tables> = Database["public"]["Tables"][T]["Insert"];

export type Activity = Row<"activities">;
export type Challenge = Row<"challenge">;
export type Grade = Row<"grade">;
export type ClimbingLocation = Row<"locations">;

export type CreateClimbingLocation = Insert<"locations">;
export type CreateActivity = Insert<"activities">;
export type CreateChallenge = Insert<"challenge">;
