import { login, logout, registerUser } from "@/supabase/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerUser,
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });
};
