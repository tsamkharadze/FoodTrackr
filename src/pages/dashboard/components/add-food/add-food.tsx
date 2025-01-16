import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/auth";
import { useFoodSearch } from "@/react-query/query/profile/food";
import { useAddFoodToDiary } from "@/react-query/mutation/food/food-mutations";
import { Food } from "@/types/food";
import useCalculateMealNutrients from "@/hooks/useCalculateMealNutrients";
import useToday from "@/hooks/useToday";

export function FoodDiaryEntry() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState<number>(100);
  const today = useToday();
  const user = useAtomValue(userAtom);

  const { data: foods = [], isLoading } = useFoodSearch(search);
  const { mutate: addFoodMutation, status } = useAddFoodToDiary();
  const isAddLoading = status === "pending";

  const handleSelect = (food: Food) => {
    setSelectedFood(food);
    setOpen(false);
  };

  const { calories, carbs, fat, protein } = useCalculateMealNutrients(
    selectedFood,
    quantity,
  );
  console.log(calories, carbs, fat, protein);

  const handleAddFood = () => {
    if (!selectedFood || !user) return;
    addFoodMutation({
      user_id: user.user.id,
      food_name: selectedFood.name_en || "Unknown Food",
      date: today,
      calories,
      protein,
      fat,
      carbs,
      meal_type: "snacl",
    });

    // Reset form
    setSelectedFood(null);
    setQuantity(100);
    setSearch("");
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedFood ? selectedFood.name_en : "Select food..."}
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search foods..."
                  value={search}
                  onValueChange={setSearch}
                />
                <CommandEmpty>No foods found.</CommandEmpty>
                <CommandGroup>
                  {isLoading ? (
                    <CommandItem disabled>Loading...</CommandItem>
                  ) : (
                    foods?.map((food) => (
                      <CommandItem
                        key={food.id}
                        onSelect={() => handleSelect(food)}
                      >
                        {food.name_en}
                      </CommandItem>
                    ))
                  )}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-32">
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={0}
            placeholder="Grams"
          />
        </div>

        <Button
          onClick={handleAddFood}
          disabled={!selectedFood || isAddLoading}
        >
          Add to Diary
        </Button>
      </div>
    </div>
  );
}
