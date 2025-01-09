import { supabase } from "..";
import { Database } from "../supabase.types";

export const fillProfileInfo = async (
  data: Database["public"]["Tables"]["user_profiles"]["Insert"],
) => {
  return supabase.from("user_profiles").upsert(data);
};

export const getProfileInfo = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId);

  return { data: data || [], error };
};
