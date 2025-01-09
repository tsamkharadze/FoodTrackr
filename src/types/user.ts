export interface Profile {
  full_name: string;
  email: string;
  id: string;
  avatar_url?: string | null;
  goal_calories?: number | null;
  goal_carbs?: number | null;
  goal_fat?: number | null;
  goal_protein?: number | null;
  created_at?: string | null;
  height?: number | null;
  weight?: number | null;
  sex?: string | number;
  age?: number | null;
}
