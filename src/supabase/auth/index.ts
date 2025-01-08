import { supabase } from "@/supabase";

export const registerUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return supabase.auth.signUp({ email, password });
};

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return supabase.auth
    .signInWithPassword({ email, password })
    .then((response) => {
      if (response.error) {
        throw response?.error;
      }
      return response;
    });
};
export const logout = () => {
  return supabase.auth.signOut();
};
