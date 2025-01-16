import { addFoodToDiary, deleteFoodDiary } from "@/supabase/foods/foods";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useAddFoodToDiary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFoodToDiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodDiary"] });
    },
  });
}

export function useDeleteFoodFromDiary() {
  return useMutation({
    mutationFn: deleteFoodDiary,
    ...queryOptions,
  });
}
