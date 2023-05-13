import { Database } from "@/types/_supabase";

// Database types
export type Tables = Database["public"]["Tables"];
export type TABLE_NAME = keyof Tables;

// Generic types
export type Row<T extends keyof Tables> = Database["public"]["Tables"][T]["Row"];
export type Insert<T extends keyof Tables> = Database["public"]["Tables"][T]["Insert"];

// Read types
export type Activity = Row<"activities">;
export type Challenge = Row<"challenge">;
export type Grade = Row<"grade">;
export type ClimbingLocation = Row<"locations">;
export type ClimbingZone = Row<"climbing_zone">;
export type Technique = Row<"technique">;

// Create types
export type CreateActivity = Insert<"activities">;
export type CreateChallenge = Insert<"challenge">;
