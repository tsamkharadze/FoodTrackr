import { useCallback, useEffect, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { userAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import { updateWeight } from "@/supabase/weight-logs";
import useToday from "@/hooks/useToday";

export function useWeightUpdate(initialWeight: number) {
  const [weight, setWeight] = useState(initialWeight);
  const [debouncedWeight, setDebouncedWeight] = useState(initialWeight);
  const user = useAtomValue(userAtom);
  const today = useToday();

  const queryClient = useQueryClient();

  // Update debounced value after 1 second of no changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedWeight(weight);
    }, 1000);

    return () => clearTimeout(timer);
  }, [weight]);

  const { mutate: updateUserWeight } = useMutation({
    mutationKey: ["weightLogs"],
    mutationFn: async (newWeight: number) => {
      if (!user?.user.id) throw new Error("User not authenticated");
      return updateWeight({
        date: today,
        user_id: user.user.id,
        weight: newWeight,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["weightLogs"] });
    },
  });

  // Effect to trigger the API call when debouncedWeight changes
  useEffect(() => {
    if (debouncedWeight !== initialWeight) {
      updateUserWeight(debouncedWeight);
    }
  }, [debouncedWeight, initialWeight, updateUserWeight]);

  const handleWeightChange = useCallback((difference: number) => {
    setWeight((prev) => prev + difference);
  }, []);

  return {
    weight,
    handleWeightChange,
  };
}
