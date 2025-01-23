import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useAtomValue } from "jotai";
import { foodDiaryAtom, profileAtom } from "@/store/auth";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const chartConfig = {
  calories: {
    label: "Total Calories",
  },
  cal: {
    label: "Calories",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CaloriesChart() {
  const { t } = useTranslation();
  const profile = useAtomValue(profileAtom);
  const dailyCaloriesLimit = profile?.goal_calories ?? 0;

  const foodDiary = useAtomValue(foodDiaryAtom);

  const totalCalories = foodDiary
    ? foodDiary.reduce((sum, meal) => sum + meal.calories, 0)
    : 0;
  const caloriePercentage =
    totalCalories && dailyCaloriesLimit
      ? (totalCalories * 100) / dailyCaloriesLimit
      : 0;
  const startAngle = 90;
  const endAngle = startAngle - (caloriePercentage * 360) / 100;

  const chartData = [
    {
      calories: dailyCaloriesLimit,
      fill: "var(--color-cal)",
    },
  ];

  return (
    <div data-theme="calories" className={cn("rounded-lg p-4")}>
      <Card className="h-[434px] flex flex-col ">
        <CardHeader className="items-center pb-0">
          <CardTitle>
            {t("dashboard-translation.charts.calories-title")}
          </CardTitle>
          <CardDescription>
            {t("dashboard-translation.charts.calories-description")}:
            {dailyCaloriesLimit}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={80}
              outerRadius={140}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="calories" background />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {totalCalories.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {t("dashboard-translation.charts.calories")}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
