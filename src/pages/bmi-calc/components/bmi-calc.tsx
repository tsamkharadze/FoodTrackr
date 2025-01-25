import React, { useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import i18n from "@/i18n";

type FormData = {
  sex: string;
  age: number;
  height: number;
  weight: number;
};

interface ViewBox {
  cx: number;
  cy: number;
}

const BMI_RANGES = {
  OVERWEIGHT: { min: 25, max: 29.9, color: "hsl(0, 100%, 50%)" },
  UNDERWEIGHT: { min: 0, max: 18.5, color: "hsl(200, 100%, 50%)" },
  NORMAL: { min: 18.5, max: 24.9, color: "hsl(120, 100%, 35%)" },
  OBESE: { min: 30, max: 40, color: "hsl(40, 100%, 50%)" },
};

// Custom label component for the radial chart
const CustomLabel = ({
  viewBox,
  weight,
  bmi,
}: {
  viewBox: ViewBox;
  weight: number;
  bmi: number;
}) => {
  return (
    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
      <tspan
        x={viewBox.cx}
        y={(viewBox.cy || 0) - 16}
        className="fill-foreground text-2xl font-bold"
      >
        {weight} kg
      </tspan>
      <tspan
        x={viewBox.cx}
        y={(viewBox.cy || 0) + 4}
        className="fill-muted-foreground"
      >
        BMI: {bmi.toFixed(1)}
      </tspan>
    </text>
  );
};

const BmiCalc: React.FC = () => {
  const { t } = useTranslation();
  const you = i18n.language === "ka" ? "შენ" : "you";
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setSubmittedData(data);
    setIsResultsVisible(true);
  };

  const { bmi, dailyCalories, carbs, protein, fats } = useNutritionCalculator({
    sex: submittedData?.sex || "",
    age: submittedData?.age || 0,
    height: submittedData?.height || 0,
    weight: submittedData?.weight || 0,
  });

  const chartData = [
    {
      name: "BMI Range",
      underweight: BMI_RANGES.UNDERWEIGHT.max,
      [you]: bmi ?? 0,
      overweight: BMI_RANGES.OVERWEIGHT.min,
      obese: BMI_RANGES.OBESE.max - BMI_RANGES.OVERWEIGHT.max,
    },
  ];

  const chartConfig = {
    overweight: {
      label: t("dashboard-translation.charts.overweight"),
      color: BMI_RANGES.OVERWEIGHT.color,
    },
    underweight: {
      label: t("dashboard-translation.charts.underweight"),
      color: BMI_RANGES.UNDERWEIGHT.color,
    },
    normal: {
      label: t("dashboard-translation.charts.normal"),
      color: BMI_RANGES.NORMAL.color,
    },
  } satisfies ChartConfig;

  const getBMICategory = (bmi: number) => {
    if (bmi < BMI_RANGES.UNDERWEIGHT.max)
      return t("dashboard-translation.charts.underweight");
    if (bmi < BMI_RANGES.NORMAL.max)
      return t("dashboard-translation.charts.normal");
    if (bmi < BMI_RANGES.OVERWEIGHT.max)
      return t("dashboard-translation.charts.overweight");
    return "Obese";
  };

  const category = bmi ? getBMICategory(bmi) : "Not available";

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

      {/* Results */}
      <Card
        className={`${isResultsVisible ? "visible" : "invisible"} mt-5 min-h-96 min-w-96 flex flex-col`}
      >
        <CardHeader className="items-center pb-0">
          <CardTitle>
            {t("dashboard-translation.charts.weight-status")}
          </CardTitle>
          <CardDescription>
            {t("dashboard-translation.charts.bmi-category")}: {category}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={180}
              endAngle={0}
              innerRadius={80}
              outerRadius={130}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <CustomLabel
                  viewBox={{ cx: 130, cy: 130 }}
                  weight={submittedData?.weight || 0}
                  bmi={bmi}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="overweight"
                fill={BMI_RANGES.OVERWEIGHT.color}
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey={you}
                fill={BMI_RANGES.NORMAL.color}
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="underweight"
                fill={BMI_RANGES.UNDERWEIGHT.color}
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm">
          <div>
            <p>
              {t("bmi-calc-translation.bmi-calc.results.bmi.title")}
              {bmi}
            </p>
            <p>
              {t("bmi-calc-translation.bmi-calc.results.daily-intake.title")}{" "}
              {dailyCalories}
              {t("bmi-calc-translation.bmi-calc.results.daily-intake.calories")}
            </p>
            <p>
              {`${t("dashboard-translation.charts.protein")}: ${protein?.toFixed(1)}`}
            </p>
            <p>
              {`${t("dashboard-translation.charts.fat")}: ${fats?.toFixed(1)}`}
            </p>
            <p>
              {`${t("dashboard-translation.charts.carb")}: ${carbs?.toFixed(1)}`}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BmiCalc;
