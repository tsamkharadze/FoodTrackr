import { Database } from "@/supabase/supabase.types";

export type Food = Database["public"]["Tables"]["foods_database"]["Row"];
