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

export function RecentMeals() {
  const queryClient = useQueryClient();

  const recentMeals = useAtomValue(foodDiaryAtom);

  const { mutate, isPending } = useDeleteFoodFromDiary();

  const handleDeleteFoodFromDiary = (id: string) => {
    if (id) {
      mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["daily-food"] });
        },
      }); // Pass the ID to the mutate function
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Menu</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Food</TableCell>
            <TableCell>Meal Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Actions</TableCell> {/* Add an Actions column */}
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
                  disabled={isPending}
                  onClick={() => {
                    handleDeleteFoodFromDiary(meal.id);
                  }}
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
