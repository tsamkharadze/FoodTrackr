import { fillProfileInfo } from "@/supabase/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../mutation-keys.enum";

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.EDIT_PROFILE],
    mutationFn: fillProfileInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
