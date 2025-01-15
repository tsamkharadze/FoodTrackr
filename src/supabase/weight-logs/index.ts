import { supabase } from "..";
import { Database } from "../supabase.types";

export const updateWeight = async (
  data: Database["public"]["Tables"]["weight_logs"]["Insert"],
) => {
  return supabase.from("weight_logs").upsert(data);
};
