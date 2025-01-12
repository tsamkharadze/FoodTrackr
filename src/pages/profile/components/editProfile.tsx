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
import AvatarComp from "@/pages/profile/components/avatar";
import { useEditProfile } from "@/react-query/mutation/edit/edit";
import { useGetProfile } from "@/react-query/query/profile/profile";
import { userAtom } from "@/store/auth";
import type { Profile } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const [avatar_url, setAvatar] = useState("");
  const user = useAtomValue(userAtom);
  const userId = user?.user?.id;
  const { t } = useTranslation();
  const queryclient = useQueryClient();
  const { register, handleSubmit, formState, setValue } = useForm<Profile>();

  // Fetch profile
  const { data: userProfile, isLoading } = useGetProfile({
    userId: userId as string,
  });

  const handleAvatarSelect = (avatarSvg: string) => {
    setAvatar(avatarSvg);
  };

  const { mutate: updateProfile } = useEditProfile();

  const onSubmit: SubmitHandler<Profile> = (fieldInputs) => {
    updateProfile(
      {
        ...fieldInputs,
        id: userId ?? "",
        email: user?.user.email ?? "",
        avatar_url,
        sex: fieldInputs.sex as string | null | undefined,
      },
      {
        onSuccess: () => {
          queryclient.invalidateQueries({ queryKey: ["profileInfo", userId] });
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
              {/* Full Name */}
              <Label htmlFor="nameEn">
                {t("profile-translation.profile.fields.name")}
              </Label>
              {formState.errors.full_name && (
                <div className="text-red-500">
                  {formState.errors.full_name.message}
                </div>
              )}
              <Input
                type="text"
                placeholder={t(
                  "profile-translation.profile.fields.namePlaceholder"
                )}
                {...register("full_name", {
                  required: t("error-translation.mandatory"),
                  value: userProfile?.full_name || "",
                })}
              />
            </div>

            {/* Age */}
            <div className="space-y-1">
              <Label htmlFor="age">Age</Label>
              {formState.errors.age && (
                <div className="text-red-500">
                  {formState.errors.age.message}
                </div>
              )}
              <Input
                type="number"
                placeholder="Enter your age"
                {...register("age", {
                  required: "Age is required",
                  valueAsNumber: true,
                  value: userProfile?.age || undefined,
                })}
              />
            </div>

            {/* Height */}
            <div className="space-y-1">
              <Label htmlFor="height">Height (cm)</Label>
              {formState.errors.height && (
                <div className="text-red-500">
                  {formState.errors.height.message}
                </div>
              )}
              <Input
                type="number"
                placeholder="Enter your height in cm"
                {...register("height", {
                  required: "Height is required",
                  valueAsNumber: true,
                  value: userProfile?.height || undefined,
                })}
              />
            </div>

            {/* Weight */}
            <div className="space-y-1">
              <Label htmlFor="weight">Weight (kg)</Label>
              {formState.errors.weight && (
                <div className="text-red-500">
                  {formState.errors.weight.message}
                </div>
              )}
              <Input
                type="number"
                placeholder="Enter your weight in kg"
                {...register("weight", {
                  required: "Weight is required",
                  valueAsNumber: true,
                  value: userProfile?.weight || undefined,
                })}
              />
            </div>

            {/* Sex */}
            <div>
              <Label htmlFor="sex" className="block mb-1">
                Sex
              </Label>
              <Select
                onValueChange={(value) => setValue("sex", value)}
                defaultValue={userProfile?.sex?.toString() || "Male"}
              >
                <SelectTrigger id="sex">
                  <SelectValue placeholder={userProfile?.sex} />
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
            <Button type="submit">Confirm</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
