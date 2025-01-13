import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import useNutritionCalculator from "@/hooks/useNutritionCalculator";
import AvatarComp from "@/pages/profile/components/avatar";
import { useEditProfile } from "@/react-query/mutation/edit/edit";
import { useGetProfile } from "@/react-query/query/profile/profile";
import { userAtom } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "@/lib/validations/profile";

const Profile = () => {
  const [avatar_url, setAvatar] = useState("");
  const user = useAtomValue(userAtom);
  const userId = user?.user?.id;
  const { t } = useTranslation();
  const queryclient = useQueryClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      sex: "Male",
    },
  });

  const watchedValues = watch();
  const { bmi, dailyCalories, carbs, protein, fats } = useNutritionCalculator({
    sex: watchedValues?.sex?.toString() || "",
    age: watchedValues?.age || 0,
    height: watchedValues?.height || 0,
    weight: watchedValues?.weight || 0,
  });

  const { data: userProfile, isLoading } = useGetProfile({
    userId: userId as string,
  });

  const handleAvatarSelect = (avatarSvg: string) => {
    setAvatar(avatarSvg);
  };

  const { mutate: updateProfile } = useEditProfile();

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(
      {
        ...data,
        id: userId ?? "",
        email: user?.user.email ?? "",
        avatar_url,
        goal_calories: dailyCalories,
        goal_carbs: carbs,
        goal_fat: fats,
        goal_protein: protein,
        bmi,
      },
      {
        onSuccess: () => {
          queryclient.invalidateQueries({ queryKey: ["profileInfo", userId] });
          toast({
            title: "Success",
            description: "Profile updated successfully",
          });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update profile",
          });
        },
      }
    );
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="flex h-[500px] min-h-min items-center justify-center">
      <Card className="my-3">
        <CardHeader>
          <CardTitle>{t("profile-translation.profile.title")}</CardTitle>
          <CardDescription>
            {t("profile-translation.profile.description")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <CardContent>
            <div className="space-y-1">
              <Label htmlFor="nameEn">
                {t("profile-translation.profile.fields.name")}
              </Label>
              {errors.full_name && (
                <div className="text-sm font-medium text-destructive">
                  {errors.full_name.message}
                </div>
              )}
              <Input
                id="nameEn"
                type="text"
                placeholder={t(
                  "profile-translation.profile.fields.namePlaceholder"
                )}
                {...register("full_name")}
                defaultValue={userProfile?.full_name || ""}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="age">Age</Label>
              {errors.age && (
                <div className="text-sm font-medium text-destructive">
                  {errors.age.message}
                </div>
              )}
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                {...register("age", { valueAsNumber: true })}
                defaultValue={userProfile?.age || undefined}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="height">Height (cm)</Label>
              {errors.height && (
                <div className="text-sm font-medium text-destructive">
                  {errors.height.message}
                </div>
              )}
              <Input
                id="height"
                type="number"
                placeholder="Enter your height in cm"
                {...register("height", { valueAsNumber: true })}
                defaultValue={userProfile?.height || undefined}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="weight">Weight (kg)</Label>
              {errors.weight && (
                <div className="text-sm font-medium text-destructive">
                  {errors.weight.message}
                </div>
              )}
              <Input
                id="weight"
                type="number"
                placeholder="Enter your weight in kg"
                {...register("weight", { valueAsNumber: true })}
                defaultValue={userProfile?.weight || undefined}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="sex">Sex</Label>
              {errors.sex && (
                <div className="text-sm font-medium text-destructive">
                  {errors.sex.message}
                </div>
              )}
              <Select
                onValueChange={(value) =>
                  setValue("sex", value as "Male" | "Female")
                }
                defaultValue={userProfile?.sex?.toString() || "Male"}
              >
                <SelectTrigger id="sex">
                  <SelectValue placeholder="Select your sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <AvatarComp onAvatarSelect={handleAvatarSelect} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
