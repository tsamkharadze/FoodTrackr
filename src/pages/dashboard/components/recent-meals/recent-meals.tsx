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
        <TableCaption>Menu</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Food</TableCell>
            <TableCell>Meal Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentMeals?.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>{meal.food_name}</TableCell>
              <TableCell>{meal.meal_type}</TableCell>
              <TableCell>{new Date(meal.date).toLocaleDateString()}</TableCell>
              <TableCell>{meal.calories} kcal</TableCell>
              <TableCell>
                <Button
                  variant={"destructive"}
                  disabled={isPending}
                  onClick={() => handleDeleteFoodFromDiary(meal.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
