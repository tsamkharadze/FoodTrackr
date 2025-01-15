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

export function RecentMeals() {
  const recentMeals = useAtomValue(foodDiaryAtom);

  return (
    <div>
      {/* <p className="text-center"> Menu</p> */}
      <Table>
        <TableCaption>Menu </TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Food</TableCell>
            <TableCell>Meal Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Calories</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentMeals?.map((meal) => (
            <TableRow key={meal.id}>
              <TableCell>{meal.food_name}</TableCell>
              <TableCell>{meal.meal_type}</TableCell>
              <TableCell>{new Date(meal.date).toLocaleDateString()}</TableCell>
              <TableCell>{meal.calories} kcal</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
