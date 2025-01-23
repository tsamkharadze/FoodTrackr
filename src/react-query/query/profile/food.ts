import { getDailyFood, searchFoods } from "@/supabase/foods/foods";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys.enum";

export const useGetFoods = (date: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.DAILY_FOOD],
    queryFn: () => getDailyFood(date),
  });
};

export function useFoodSearch(query: string, searchOption: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.FOODS_SEARCH, query],
    queryFn: () => searchFoods(query, searchOption),
    // enabled: query.length > 2,
    initialData: [],
  });
}
