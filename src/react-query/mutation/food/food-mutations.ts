import { addFoodToDiary } from "@/supabase/foods/foods";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddFoodToDiary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFoodToDiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodDiary"] });
    },
  });
}
