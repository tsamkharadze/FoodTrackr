import { login, logout, registerUser } from "@/supabase/auth";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "./mutation-keys.enum";

export const useSignIn = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.LOGIN],
    mutationFn: login,
    ...queryOptions,
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.REGISTER],
    mutationFn: registerUser,
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.LOGOUT],
    mutationFn: logout,
  });
};
