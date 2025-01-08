import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormData = {
  sex: string;
  age: number;
  height: number;
  weight: number;
};

const Test: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Submitted Data:", data);
  };

  const calculateBMI = (): string => {
    const height = watch("height");
    const weight = watch("weight");
    if (!height || !weight) return "N/A";

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(2);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">BMI Calculator</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full dark:bg-black bg-white p-4 shadow-md rounded-md"
      >
        {/* Sex */}
        <div>
          <Label htmlFor="sex" className="block mb-1">
            Sex
          </Label>
          <Select
            onValueChange={(value) => setValue("sex", value)}
            defaultValue="Male"
          >
            <SelectTrigger id="sex">
              <SelectValue placeholder="Select your sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.sex && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Age */}
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            type="number"
            id="age"
            placeholder="Enter your age"
            {...register("age", { required: true, valueAsNumber: true })}
          />
          {errors.age && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Height */}
        <div>
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            type="number"
            id="height"
            placeholder="Enter your height"
            {...register("height", { required: true, valueAsNumber: true })}
          />
          {errors.height && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Weight */}
        <div>
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            type="number"
            id="weight"
            placeholder="Enter your weight"
            {...register("weight", { required: true, valueAsNumber: true })}
          />
          {errors.weight && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          Calculate BMI
        </Button>
      </form>

      {/* BMI Result */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your BMI:</h2>
        <p className="text-lg">{calculateBMI()}</p>
      </div>
    </div>
  );
};

export default Test;
