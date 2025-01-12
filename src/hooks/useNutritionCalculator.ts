import { useMemo } from "react";

type NutritionData = {
  bmi: number;
  dailyCalories: number;
  carbs: number;
  protein: number;
  fats: number;
};

const useNutritionCalculator = ({
  sex,
  age,
  height,
  weight,
}: {
  sex: string;
  age: number;
  height: number;
  weight: number;
}): NutritionData => {
  const bmi = useMemo(() => {
    if (height === 0) return 0;
    return parseFloat((weight / ((height / 100) * (height / 100))).toFixed(2)); // Ensure number
  }, [height, weight]);

  const dailyCalories = useMemo(() => {
    if (sex === "Male") {
      return parseFloat((10 * weight + 6.25 * height - 5 * age + 5).toFixed(2)); // BMR for males
    } else {
      return parseFloat(
        (10 * weight + 6.25 * height - 5 * age - 161).toFixed(2),
      ); // BMR for females
    }
  }, [sex, age, height, weight]);

  const { carbs, protein, fats } = useMemo(() => {
    const carbs = parseFloat(((dailyCalories * 0.4) / 4).toFixed(2)); // 40% calories from carbs
    const protein = parseFloat(((dailyCalories * 0.3) / 4).toFixed(2)); // 30% calories from protein
    const fats = parseFloat(((dailyCalories * 0.3) / 9).toFixed(2)); // 30% calories from fats
    return { carbs, protein, fats };
  }, [dailyCalories]);

  return {
    bmi,
    dailyCalories,
    carbs,
    protein,
    fats,
  };
};

export default useNutritionCalculator;
