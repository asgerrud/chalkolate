export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          activity_date: string;
          duration: number | null;
          id: string;
          location: string | null;
          user_id: string | null;
        };
        Insert: {
          activity_date: string;
          duration?: number | null;
          id?: string;
          location?: string | null;
          user_id?: string | null;
        };
        Update: {
          activity_date?: string | null;
          duration?: number | null;
          id?: string;
          location?: string | null;
          user_id?: string | null;
        };
      };
      locations: {
        Row: {
          created_at: string | null;
          id: string;
          latitude: number | null;
          longitude: number | null;
          name: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          latitude?: number | null;
          longitude?: number | null;
          name?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
