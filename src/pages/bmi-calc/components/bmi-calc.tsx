import React from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useNutritionCalculator from "@/hooks/useNutritionCalculator";
import { useTranslation } from "react-i18next";

type FormData = {
  sex: string;
  age: number;
  height: number;
  weight: number;
};

const BmiCalc: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const sex = watch("sex");
  const age = watch("age");
  const height = watch("height");
  const weight = watch("weight");

  const { bmi, dailyCalories, carbs, protein, fats } = useNutritionCalculator({
    sex: sex || "",
    age: age || 0,
    height: height || 0,
    weight: weight || 0,
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {t("bmi-calc-translation.bmi-calc.title")}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full dark:bg-black bg-white p-4 shadow-md rounded-md"
      >
        {/* Sex */}
        <div>
          <Label htmlFor="sex" className="block mb-1">
            {t("bmi-calc-translation.bmi-calc.form.sex.label")}
          </Label>
          <Select
            onValueChange={(value) => setValue("sex", value)}
            defaultValue="Male"
          >
            <SelectTrigger id="sex">
              <SelectValue
                placeholder={t(
                  "bmi-calc-translation.bmi-calc.form.sex.placeholder",
                )}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">
                {t("bmi-calc-translation.bmi-calc.form.sex.male")}
              </SelectItem>
              <SelectItem value="Female">
                {t("bmi-calc-translation.bmi-calc.form.sex.female")}
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.sex && (
            <p className="text-red-500 text-sm">
              {t("bmi-calc-translation.bmi-calc.form.sex.error")}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <Label htmlFor="age">
            {t("bmi-calc-translation.bmi-calc.form.age.label")}
          </Label>
          <Input
            type="number"
            id="age"
            placeholder={t(
              "bmi-calc-translation.bmi-calc.form.age.placeholder",
            )}
            {...register("age", { required: true, valueAsNumber: true })}
          />
          {errors.age && (
            <p className="text-red-500 text-sm">
              {t("bmi-calc-translation.bmi-calc.form.age.error")}
            </p>
          )}
        </div>

        {/* Height */}
        <div>
          <Label htmlFor="height">
            {t("bmi-calc-translation.bmi-calc.form.height.label")}
          </Label>
          <Input
            type="number"
            id="height"
            placeholder={t(
              "bmi-calc-translation.bmi-calc.form.height.placeholder",
            )}
            {...register("height", { required: true, valueAsNumber: true })}
          />
          {errors.height && (
            <p className="text-red-500 text-sm">
              {t("bmi-calc-translation.bmi-calc.form.height.error")}
            </p>
          )}
        </div>

        {/* Weight */}
        <div>
          <Label htmlFor="weight">
            {t("bmi-calc-translation.bmi-calc.form.weight.label")}
          </Label>
          <Input
            type="number"
            id="weight"
            placeholder={t(
              "bmi-calc-translation.bmi-calc.form.weight.placeholder",
            )}
            {...register("weight", { required: true, valueAsNumber: true })}
          />
          {errors.weight && (
            <p className="text-red-500 text-sm">
              {t("bmi-calc-translation.bmi-calc.form.weight.error")}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button variant={"secondary"} type="submit" className="w-full">
          {t("bmi-calc-translation.bmi-calc.form.submit")}
        </Button>
      </form>

      {/* BMI Result */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">
          {t("bmi-calc-translation.bmi-calc.results.bmi.title")}
        </h2>
        <p className="text-lg">{bmi}</p>
      </div>

      {/* Daily Caloric Intake */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">
          {t("bmi-calc-translation.bmi-calc.results.daily-intake.title")}{" "}
          {dailyCalories}
          {t("bmi-calc-translation.bmi-calc.results.daily-intake.calories")}
        </h2>
      </div>

      {/* Macronutrient Result */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">
          {t("bmi-calc-translation.bmi-calc.results.macronutrients.title")}
        </h2>
        <p className="text-lg">
          {t("bmi-calc-translation.bmi-calc.results.macronutrients.carbs")}
          {carbs}
        </p>
        <p className="text-lg">
          {t("bmi-calc-translation.bmi-calc.results.macronutrients.protein")}{" "}
          {protein}
        </p>
        <p className="text-lg">
          {t("bmi-calc-translation.bmi-calc.results.macronutrients.fats")}{" "}
          {fats}
        </p>
      </div>
    </div>
  );
};

export default BmiCalc;
