import { useCallback, useEffect, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { profileAtom, userAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import { updateWeight } from "@/supabase/weight-logs";
import useToday from "@/hooks/useToday";
import { useEditProfile } from "../edit/edit";
import useNutritionCalculator from "@/hooks/useNutritionCalculator";

export function useWeightUpdate(initialWeight: number) {
  const [weight, setWeight] = useState(initialWeight);
  const [debouncedWeight, setDebouncedWeight] = useState(initialWeight);
  const [hasChanged, setHasChanged] = useState(false);
  const profile = useAtomValue(profileAtom);
  const user = useAtomValue(userAtom);
  const today = useToday();
  const queryClient = useQueryClient();

  // BMI წონის შეცვლის შემდგომ რომ დავთვალოთ ხელახლა მაკრონუტრიენტები
  const { bmi, dailyCalories, carbs, protein, fats } = useNutritionCalculator({
    sex: profile?.sex?.toString() || "",
    age: profile?.age || 0,
    height: profile?.height || 0,
    weight,
  });
  useEffect(() => {
    if (!hasChanged) {
      setWeight(initialWeight);
      setDebouncedWeight(initialWeight);
    }
  }, [initialWeight, hasChanged]);

  // ვანახლებთ 1 წამი უმოქმედობის შემდგომ
  useEffect(() => {
    if (!hasChanged) return;

    const timer = setTimeout(() => {
      setDebouncedWeight(weight);
    }, 1000);

    return () => clearTimeout(timer);
  }, [weight, hasChanged]);
  const { mutate: updateProfile } = useEditProfile();

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
      if (user?.user.id) {
        updateProfile(
          {
            ...profile,
            weight,
            email: profile?.email ?? "",
            full_name: profile?.full_name ?? "",
            id: profile?.id ?? "",
            bmi,
            goal_calories: dailyCalories,
            goal_carbs: carbs,
            goal_fat: fats,
            goal_protein: protein,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["profileInfo"] });
            },
          },
        );
      }
      queryClient.invalidateQueries({ queryKey: ["profileInfo"] });
      queryClient.invalidateQueries({ queryKey: ["weightLogs"] });
      setHasChanged(false);
    },
  });

  // Effect to trigger the API call when debouncedWeight changes
  useEffect(() => {
    if (hasChanged && debouncedWeight !== initialWeight) {
      updateUserWeight(debouncedWeight);
    }
  }, [debouncedWeight, initialWeight, updateUserWeight, hasChanged]);

  const handleWeightChange = useCallback((difference: number) => {
    setHasChanged(true);
    setWeight((prev) => prev + difference);
  }, []);

  return {
    weight,
    handleWeightChange,
  };
}
