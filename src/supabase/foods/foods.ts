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
export const searchFoods = async (query: string, lang: string) => {
  if (!query || query.length <= 2) {
    return [];
  }

  const searchOption = lang === "ka" ? "name_ka" : "name_en";

  try {
    const { data, error } = await supabase
      .from("foods_database")
      .select("*")
      .ilike(searchOption, `%${query}%`)
      .limit(10);

    if (error) {
      console.error("Error fetching foods:", error);
      throw error;
    }

    return data ?? [];
  } catch (error) {
    console.error("Error during searchFoods:", error);
    return [];
  }
};

export const addFoodToDiary = async (
  entry: Database["public"]["Tables"]["food_diary"]["Insert"],
) => {
  const { data, error } = await supabase
    .from("food_diary")
    .insert([entry])
    .select();

  if (error) throw error;
  return data;
};

export const deleteFoodDiary = async (id: string) => {
  const { error } = await supabase.from("food_diary").delete().eq("id", id);

  if (error) {
    console.error("Error deleting data:", error);
  }
};
