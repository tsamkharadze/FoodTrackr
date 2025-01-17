import { getDailyFood, searchFoods } from "@/supabase/foods/foods";
import { useQuery } from "@tanstack/react-query";

export const useGetFoods = (date: string) => {
  return useQuery({
    queryKey: ["daily-food"],
    queryFn: () => getDailyFood(date),
  });
};

export function useFoodSearch(query: string, searchOption: string) {
  return useQuery({
    queryKey: ["foods", query],
    queryFn: () => searchFoods(query, searchOption),
    // enabled: query.length > 2,
    initialData: [],
  });
}
