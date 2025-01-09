import { atom } from "jotai";
import { Session } from "@supabase/supabase-js";
import { Database } from "@/supabase/supabase.types";

export const userAtom = atom<Session | null>(null);
export const profileAtom = atom<
  Database["public"]["Tables"]["user_profiles"]["Insert"] | null
>(null);
