import { fillProfileInfo } from "@/supabase/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["profile"],
    mutationFn: fillProfileInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
