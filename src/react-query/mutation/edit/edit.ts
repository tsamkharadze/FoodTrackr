import { fillProfileInfo } from "@/supabase/account";
import { useMutation } from "@tanstack/react-query";

export const useEditProfile = () => {
  return useMutation({
    mutationFn: fillProfileInfo,
  });
};
