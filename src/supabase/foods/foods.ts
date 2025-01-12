import { supabase } from "..";
import { Database } from "../supabase.types";

interface SupabaseError {
  message: string;
  details?: string;
  hint?: string;
}

export const getDailyFood = async (
  date: string,
): Promise<{
  food_diary: Database["public"]["Tables"]["food_diary"]["Row"][] | null;
  error: SupabaseError | null;
}> => {
  const { data: food_diary, error } = await supabase
    .from("food_diary")
    .select("*")
    .eq("date", date);

  return { food_diary, error };
};
