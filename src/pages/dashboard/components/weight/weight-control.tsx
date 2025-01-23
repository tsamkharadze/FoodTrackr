import { Minus, Plus, Scale } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { useAtomValue } from "jotai";
import { profileAtom } from "@/store/auth";

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
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useWeightUpdate } from "@/hooks/useWeightUpdate";
import { cn } from "@/lib/utils";

// BMI ranges
const BMI_RANGES = {
  OVERWEIGHT: { min: 25, max: 29.9, color: "hsl(0, 100%, 50%)" },
  UNDERWEIGHT: { min: 0, max: 18.5, color: "hsl(200, 100%, 50%)" },
  NORMAL: { min: 18.5, max: 24.9, color: "hsl(120, 100%, 35%)" },
  OBESE: { min: 30, max: 40, color: "hsl(40, 100%, 50%)" },
};

export function WeightStatusChart() {
  const { t, i18n } = useTranslation();
  const profile = useAtomValue(profileAtom);
  const you = i18n.language === "ka" ? "შენ" : "you";

  const { weight, handleWeightChange, isLoading } = useWeightUpdate(
    profile?.weight ?? 0,
  );

  // Calculate which category the current BMI falls into
  const getBMICategory = (bmi: number) => {
    if (bmi < BMI_RANGES.UNDERWEIGHT.max)
      return t("dashboard-translation.charts.underweight");
    if (bmi < BMI_RANGES.NORMAL.max)
      return t("dashboard-translation.charts.normal");
    if (bmi < BMI_RANGES.OVERWEIGHT.max)
      return t("dashboard-translation.charts.overweight");
    return "Obese";
  };

  const category = getBMICategory(profile?.bmi as number);

  // Create data for the chart
  const chartData = [
    {
      name: "BMI Range",
      underweight: BMI_RANGES.UNDERWEIGHT.max,
      [you]: profile?.bmi ?? 0,
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

  return (
    <div data-theme="calories" className={cn("rounded-lg p-4")}>
      <Card className="  flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>
            {t("dashboard-translation.charts.weight-status")}
          </CardTitle>
          <CardDescription>
            {t("dashboard-translation.charts.bmi-category")} : {category}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center pb-0">
          <Button onClick={() => handleWeightChange(-0.5)} disabled={isLoading}>
            <Minus />
          </Button>

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
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                            BMI: {profile?.bmi?.toFixed(1)}
                          </tspan>
                        </text>
                      );
                    }
                  }}
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

          <Button onClick={() => handleWeightChange(0.5)} disabled={isLoading}>
            <Plus />
          </Button>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            {t("dashboard-translation.charts.current-status")} : {category}{" "}
            <Scale className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
