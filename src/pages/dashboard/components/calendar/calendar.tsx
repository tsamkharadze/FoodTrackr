"use client";

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
  FormDescription,
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
import { useAtom } from "jotai";
import { foodDiaryAtom } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function DashboardCalendar() {
  const [foodDiary, setFoodDiary] = useAtom(foodDiaryAtom);
  const queryClient = useQueryClient();
  console.log(foodDiary);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const watchedDate = form.watch("dob");
  const date = dayjs(watchedDate).format("YYYY-MM-DD");
  const { data: foodData } = useGetFoods(date ?? "");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedDate = dayjs(data.dob).format("YYYY-MM-DD");

    // First invalidate and wait for the new data
    await queryClient.invalidateQueries({ queryKey: ["daily-food"] });

    // Then update the food diary state with the latest data
    if (foodData?.food_diary) {
      setFoodDiary(foodData.food_diary);
    }

    toast({
      title: "Date selected",
      description: formattedDate,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select Date</FormLabel>
              <Popover>
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
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select a date to view food diary
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
