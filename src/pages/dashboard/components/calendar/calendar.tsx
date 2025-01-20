import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { useGetFoods } from "@/react-query/query/profile/food";
import { useSetAtom } from "jotai";
import { foodDiaryAtom, selectedDateAtom } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function DashboardCalendar() {
  const { t } = useTranslation();
  const setFoodDiary = useSetAtom(foodDiaryAtom);
  const queryClient = useQueryClient();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const setSelectedDate = useSetAtom(selectedDateAtom);

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      dob: new Date(),
    },
    resolver: zodResolver(FormSchema),
  });
  const watchedDate = form.watch("dob");
  const date = dayjs(watchedDate).format("YYYY-MM-DD");
  const { data: foodData } = useGetFoods(date ?? "");
  console.log(foodData);
  useEffect(() => {
    if (foodData?.food_diary) {
      setFoodDiary(foodData.food_diary);
    }
  }, [foodData, setFoodDiary]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedDate = dayjs(data.dob).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);

    await queryClient.invalidateQueries({ queryKey: ["daily-food"] });

    toast({
      title: t("dashboard-translation.toast-header"),
      description: formattedDate,
    });
  }

  return (
    <div data-theme="calories" className={cn("rounded-lg p-4")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  {t("dashboard-translation.charts.select-date")}
                </FormLabel>
                <div className="flex items-center space-x-4">
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            dayjs(field.value).format("YYYY-MM-DD")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(selectedDate) => {
                          field.onChange(selectedDate);
                          setCalendarOpen(false);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button type="submit">
                    {t("dashboard-translation.buttons.submit")}
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
