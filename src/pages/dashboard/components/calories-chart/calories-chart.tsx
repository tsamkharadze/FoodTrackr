import { TrendingUp } from "lucide-react";
import { useState } from "react";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useAtomValue } from "jotai";
import { profileAtom } from "@/store/auth";
import { cn } from "@/lib/utils";
import "./radial-chart.module.css";
import { useGetFoods } from "@/react-query/query/profile/food";
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
  const profile = useAtomValue(profileAtom);
  const dailyCaloriesLimit = profile?.goal_calories ?? 0;
  const { data } = useGetFoods("2025-01-13");
  const foodDiary = data?.food_diary ?? [];
  const [totalCalories, setTotalCalories] = useState(0);
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

  const addCalories = (amount: number) => {
    setTotalCalories((prevCalories) => prevCalories + amount);
  };

  console.log(foodDiary);
  return (
    <div data-theme="calories" className={cn("rounded-lg p-4")}>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Today's Calories Chart</CardTitle>
          <CardDescription>
            Recomended Calories {dailyCaloriesLimit}
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
                            Calories
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
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total calories consumed for the last 6 months
          </div>
        </CardFooter>
        <div className="mt-4 flex justify-center pb-4">
          <button
            onClick={() => addCalories(100)}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Add 100 Calories
          </button>
        </div>
      </Card>
    </div>
  );
}
