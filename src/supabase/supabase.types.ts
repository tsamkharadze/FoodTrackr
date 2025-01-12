export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      food_diary: {
        Row: {
          calories: number;
          carbs: number;
          created_at: string | null;
          date: string;
          fat: number;
          food_name: string;
          id: string;
          meal_type: string;
          protein: number;
          user_id: string;
        };
        Insert: {
          calories: number;
          carbs: number;
          created_at?: string | null;
          date: string;
          fat: number;
          food_name: string;
          id?: string;
          meal_type: string;
          protein: number;
          user_id: string;
        };
        Update: {
          calories?: number;
          carbs?: number;
          created_at?: string | null;
          date?: string;
          fat?: number;
          food_name?: string;
          id?: string;
          meal_type?: string;
          protein?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "food_diary_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      user_profiles: {
        Row: {
          age: number | null;
          avatar_url: string | null;
          bmi: number | null;
          created_at: string | null;
          email: string;
          full_name: string;
          goal_calories: number | null;
          goal_carbs: number | null;
          goal_fat: number | null;
          goal_protein: number | null;
          height: number | null;
          id: string;
          sex: string | null;
          weight: number | null;
        };
        Insert: {
          age?: number | null;
          avatar_url?: string | null;
          bmi?: number | null;
          created_at?: string | null;
          email: string;
          full_name: string;
          goal_calories?: number | null;
          goal_carbs?: number | null;
          goal_fat?: number | null;
          goal_protein?: number | null;
          height?: number | null;
          id: string;
          sex?: string | null;
          weight?: number | null;
        };
        Update: {
          age?: number | null;
          avatar_url?: string | null;
          bmi?: number | null;
          created_at?: string | null;
          email?: string;
          full_name?: string;
          goal_calories?: number | null;
          goal_carbs?: number | null;
          goal_fat?: number | null;
          goal_protein?: number | null;
          height?: number | null;
          id?: string;
          sex?: string | null;
          weight?: number | null;
        };
        Relationships: [];
      };
      weight_logs: {
        Row: {
          created_at: string | null;
          date: string;
          id: string;
          user_id: string;
          weight: number;
        };
        Insert: {
          created_at?: string | null;
          date: string;
          id?: string;
          user_id: string;
          weight: number;
        };
        Update: {
          created_at?: string | null;
          date?: string;
          id?: string;
          user_id?: string;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: "weight_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user_profiles";
            referencedColumns: ["id"];
          },
        ];
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
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
