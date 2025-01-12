import { getDailyFood } from "@/supabase/foods/foods";
import { useQuery } from "@tanstack/react-query";

export const useGetFoods = (date: string) => {
  return useQuery({
    queryKey: ["daily-food"],
    queryFn: () => getDailyFood(date),
  });
};
