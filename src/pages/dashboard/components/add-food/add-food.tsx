import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@uidotdev/usehooks";
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
import { selectedDateAtom, userAtom } from "@/store/auth";
import { useFoodSearch } from "@/react-query/query/profile/food";
import { useAddFoodToDiary } from "@/react-query/mutation/food/food-mutations";
import { Food } from "@/types/food";
import useCalculateMealNutrients from "@/hooks/useCalculateMealNutrients";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useToday from "@/hooks/useToday";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { QUERY_KEYS } from "@/react-query/query/profile/query-keys.enum";
interface FoodType {
  value_en: string;
  value_ka: string;
}
export function FoodDiaryEntry() {
  const { t, i18n } = useTranslation(); // i18next hook
  const language = i18n.language === "ka" ? "ka" : "en";
  const name = language === "ka" ? "name_ka" : "name_en";
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [foodType, setFoodType] = useState<FoodType | null>(null);
  const selectedDate = useAtomValue(selectedDateAtom);
  const user = useAtomValue(userAtom);
  const today = useToday();

  const { data: foods = [], isLoading } = useFoodSearch(
    debouncedSearch,
    language,
  );
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

  const handleAddFood = () => {
    if (!selectedFood || !user) return;
    addFoodMutation(
      {
        user_id: user.user.id,
        food_name_en:
          selectedFood.name_en ||
          t("add-food-translation.food_diary.select_food"),
        food_name_ka:
          selectedFood.name_ka ||
          t("add-food-translation.food_diary.select_food"),

        date: selectedDate ? selectedDate : today,
        calories,
        protein,
        fat,
        carbs,
        meal_type_en: foodType?.value_en || "",
        meal_type_ka: foodType?.value_ka || "",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.PROFILE_INFO],
          });
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DAILY_FOOD] });
          toast({
            title: t("add-food-translation.food_diary.toast.title"),
            description: t("add-food-translation.food_diary.toast.description"),
          });
        },
      },
    );

    // Reset form
    setSelectedFood(null);
    setQuantity(100);
    setSearch("");
    setFoodType(null);
  };
  return (
    <div data-theme="calories" className={cn("rounded-lg p-4")}>
      <div className="space-y-4">
        <div className="flex md:flex-row flex-col gap-4">
          <div className="flex-1">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedFood
                    ? selectedFood[name]
                    : t("add-food-translation.food_diary.select_food")}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput
                    placeholder={t(
                      "add-food-translation.food_diary.search_foods_placeholder",
                    )}
                    value={search}
                    onValueChange={setSearch}
                  />
                  <CommandEmpty>
                    {t("add-food-translation.food_diary.no_foods_found")}
                  </CommandEmpty>
                  <CommandGroup>
                    {isLoading ? (
                      <CommandItem disabled>
                        {t("food_diary.loading")}
                      </CommandItem>
                    ) : (
                      foods?.map((food) => (
                        <CommandItem
                          key={food.id}
                          onSelect={() => handleSelect(food)}
                        >
                          {food[name]}
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className=" flex gap-4 ">
            <Select
              value={foodType ? JSON.stringify(foodType) : ""}
              onValueChange={(value) => {
                const parsedValue: FoodType = JSON.parse(value);
                setFoodType(parsedValue);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={t("add-food-translation.food_diary.meal_type")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    value={JSON.stringify({
                      value_en: "Breakfast",
                      value_ka: "საუზმე",
                    })}
                  >
                    {t("add-food-translation.food_diary.meal_types.breakfast")}
                  </SelectItem>
                  <SelectItem
                    value={JSON.stringify({
                      value_en: "Lunch",
                      value_ka: "სადილი",
                    })}
                  >
                    {t("add-food-translation.food_diary.meal_types.lunch")}
                  </SelectItem>
                  <SelectItem
                    value={JSON.stringify({
                      value_en: "Dinner",
                      value_ka: "ვახშამი",
                    })}
                  >
                    {t("add-food-translation.food_diary.meal_types.dinner")}
                  </SelectItem>
                  <SelectItem
                    value={JSON.stringify({
                      value_en: "Snack",
                      value_ka: "სნექი",
                    })}
                  >
                    {t("add-food-translation.food_diary.meal_types.snack")}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className=" w-32">
              <Input
                type="number"
                value={quantity === 0 ? "" : quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                step={10}
                min={0}
                placeholder={t(
                  "add-food-translation.food_diary.grams_placeholder",
                )}
              />
            </div>
          </div>

          <Button
            onClick={handleAddFood}
            disabled={!selectedFood || isAddLoading || !foodType}
          >
            {t("add-food-translation.food_diary.add_to_diary")}
          </Button>
        </div>
      </div>
    </div>
  );
}
