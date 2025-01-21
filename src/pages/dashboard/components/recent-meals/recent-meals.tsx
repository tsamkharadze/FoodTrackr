import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAtomValue } from "jotai";
import { foodDiaryAtom } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { useDeleteFoodFromDiary } from "@/react-query/mutation/food/food-mutations";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export function RecentMeals() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const queryClient = useQueryClient();
  const recentMeals = useAtomValue(foodDiaryAtom);
  const { mutate, isPending } = useDeleteFoodFromDiary();

  const handleDeleteFoodFromDiary = (id: string) => {
    if (id) {
      mutate(id, {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["daily-food"] }),
      });
    }
  };

  return (
    <div data-theme="calories" className={cn("rounded-lg p-4")}>
      <Table>
        <TableCaption>{t("recent-meals-translation.menu")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>{t("recent-meals-translation.food")}</TableCell>
            <TableCell className="hidden md:table-cell">
              {t("recent-meals-translation.mealType")}
            </TableCell>
            <TableCell>{t("recent-meals-translation.date")}</TableCell>
            <TableCell>{t("recent-meals-translation.calories")}</TableCell>
            <TableCell>{t("recent-meals-translation.actions")}</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentMeals?.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>
                {lang === "en" ? meal.food_name_en : meal.food_name_ka}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {lang === "en" ? meal.meal_type_en : meal.meal_type_ka}
              </TableCell>
              <TableCell>{new Date(meal.date).toLocaleDateString()}</TableCell>
              <TableCell>
                {meal.calories} {lang === "en" ? "kcal" : "კკალ"}
              </TableCell>
              <TableCell>
                <Button
                  variant={"destructive"}
                  disabled={isPending}
                  onClick={() => handleDeleteFoodFromDiary(meal.id)}
                >
                  {t("recent-meals-translation.delete")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
