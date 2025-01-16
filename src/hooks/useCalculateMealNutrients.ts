import { Food } from "@/types/food";

const useCalculateMealNutrients = (meal: Food | null, quantity: number) => {
  const calories = ((meal?.calories_per_100 ?? 0) * quantity) / 100;
  const protein = ((meal?.proteins_per_100 ?? 0) * quantity) / 100;
  const fat = ((meal?.fats_per_100 ?? 0) * quantity) / 100;
  const carbs = ((meal?.carbs_per_100 ?? 0) * quantity) / 100;

  return { calories, protein, fat, carbs };
};

export default useCalculateMealNutrients;
