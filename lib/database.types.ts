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
      articles: {
        Row: {
          id: number;
          user_id: number;
          title: string;
          inserted_at: string;
          content: string;
        };
        Insert: {
          user_id: number;
          title: string;
          content: string;
        }; // The data expected passed to an "insert" statement.
        Update: {
          user_id: number;
          title: string;
          content: string;
        }; // The data expected passed to an "update" statement.
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
  };
}
