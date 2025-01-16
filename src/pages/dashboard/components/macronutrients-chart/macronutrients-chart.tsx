"use client";

import { Pie, PieChart } from "recharts";
import "./macronutrients-chart.module.css";

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
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { foodDiaryAtom, profileAtom } from "@/store/auth";
import { useTranslation } from "react-i18next";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },

  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function MacronutrientsChart() {
  const { t } = useTranslation();
  const foodDiary = useAtomValue(foodDiaryAtom);
  const profile = useAtomValue(profileAtom);
  const totalCarb = foodDiary?.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = foodDiary?.reduce((sum, meal) => sum + meal.fat, 0);
  const totalProtein = foodDiary?.reduce((sum, meal) => sum + meal.protein, 0);

  const chartData = [
    {
      browser: t("dashboard-translation.charts.carb"),
      visitors: totalCarb,
      fill: "var(--color-chrome)",
    },
    {
      browser: t("dashboard-translation.charts.fat"),
      visitors: totalFat,
      fill: "var(--color-edge)",
    },
    {
      browser: t("dashboard-translation.charts.protein"),
      visitors: totalProtein,
      fill: "var(--color-other)",
    },
  ];
  return (
    <div data-theme="calories" className={cn("rounded-lg p-4")}>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>
            {" "}
            {t("dashboard-translation.charts.macronutrients-title")}:
          </CardTitle>
          <CardDescription>
            {t("dashboard-translation.charts.macronutrients-description")}:
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>
          <CardFooter className="flex-col gap-2 text-sm">
            <div>
              <p>
                {`${t("dashboard-translation.charts.protein")}: ${totalProtein}/`}
                <span className="text-gray-500">{profile?.goal_protein}</span>
              </p>
              <p>
                {`${t("dashboard-translation.charts.fat")}: ${totalFat}/`}
                <span className="text-gray-500">{profile?.goal_fat}</span>
              </p>
              <p>
                {`${t("dashboard-translation.charts.carb")}: ${totalCarb}/`}
                <span className="text-gray-500">{profile?.goal_carbs}</span>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
