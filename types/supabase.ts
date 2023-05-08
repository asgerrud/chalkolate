export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

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
          activity_date?: string;
          duration?: number | null;
          id?: string;
          location?: string | null;
          user_id?: string | null;
        };
      };
      challenge: {
        Row: {
          climbing_zone: number;
          created_at: string | null;
          deadline: string | null;
          grade: string | null;
          id: number;
          techniques: string[] | null;
          title: string | null;
        };
        Insert: {
          climbing_zone: number;
          created_at?: string | null;
          deadline?: string | null;
          grade?: string | null;
          id?: number;
          techniques?: string[] | null;
          title?: string | null;
        };
        Update: {
          climbing_zone?: number;
          created_at?: string | null;
          deadline?: string | null;
          grade?: string | null;
          id?: number;
          techniques?: string[] | null;
          title?: string | null;
        };
      };
      change_schedule: {
        Row: {
          change_interval_weeks: number | null;
          change_start_date: string | null;
          change_weekday: number | null;
          climbing_zone: number;
          created_at: string | null;
          id: number;
        };
        Insert: {
          change_interval_weeks?: number | null;
          change_start_date?: string | null;
          change_weekday?: number | null;
          climbing_zone: number;
          created_at?: string | null;
          id?: number;
        };
        Update: {
          change_interval_weeks?: number | null;
          change_start_date?: string | null;
          change_weekday?: number | null;
          climbing_zone?: number;
          created_at?: string | null;
          id?: number;
        };
      };
      climbing_zone: {
        Row: {
          created_at: string | null;
          id: number;
          location: string;
          title: string;
          type: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          location: string;
          title: string;
          type?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          location?: string;
          title?: string;
          type?: string | null;
        };
      };
      grade: {
        Row: {
          id: string;
          name: string | null;
          points: number | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
          points?: number | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          points?: number | null;
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
      technique: {
        Row: {
          description: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          description?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          description?: string | null;
          id?: number;
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
