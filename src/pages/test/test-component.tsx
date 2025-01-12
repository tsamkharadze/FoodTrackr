import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPopularFoods } from "./test";
import { Food } from "@/types/food";

export function FoodList() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const data = await getPopularFoods();
        setFoods(data);
      } catch (err) {
        setError(`Failed to load foods: ${err} `);
      } finally {
        setLoading(false);
      }
    }

    fetchFoods();
  }, []);

  if (loading) {
    return <div>Loading popular foods...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Foods</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Calories (per 100g)</TableHead>
              <TableHead>Protein (g)</TableHead>
              <TableHead>Carbs (g)</TableHead>
              <TableHead>Fat (g)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foods.map((food, index) => (
              <TableRow key={index}>
                <TableCell>{food.product_name}</TableCell>
                <TableCell>{food.brands}</TableCell>
                <TableCell>
                  {food.nutriments.energy_kcal_100g?.toFixed(1)}
                </TableCell>
                <TableCell>
                  {food.nutriments.proteins_100g?.toFixed(1)}
                </TableCell>
                <TableCell>
                  {food.nutriments.carbohydrates_100g?.toFixed(1)}
                </TableCell>
                <TableCell>{food.nutriments.fat_100g?.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
